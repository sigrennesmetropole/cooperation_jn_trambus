import {
  AbstractInteraction,
  EventType,
  ModificationKeyType,
  PointerKeyType,
  vcsLayerName,
  GeoJSONLayer,
  type OpenlayersMap,
  type CesiumMap,
  type InteractionEvent,
} from '@vcmap/core'
import { useStationsStore } from '@/stores/stations'
import { useLineViewsStore, useViewsStore } from '@/stores/views'
import {
  useLineInteractionStore,
  usePoiInteractionStore,
} from '@/stores/interactionMap'
import router from '@/router'
import { viewList } from '@/model/views.model'
import type { RennesApp } from '@/services/RennesApp'
import { RENNES_LAYER } from '@/stores/layers'
import { Feature } from 'ol'
import { Point } from 'ol/geom'
import { Style } from 'ol/style'
import { displayCurrentPoi, undisplayCurrentPoi } from '@/services/poi'
import { isTrambusStopBelongsToLine } from '@/services/station'
import { usePanelsStore } from '@/stores/panels'
import type { FeatureLike } from 'ol/Feature'

class mapClickAndMoveInteraction extends AbstractInteraction {
  private _rennesApp: RennesApp
  private viewsWithPoiDisplayed = [
    viewList.home,
    viewList.line,
    viewList.consultation,
  ]
  constructor(rennesApp: RennesApp) {
    super(EventType.CLICKMOVE, ModificationKeyType.NONE, PointerKeyType.ALL)
    this._rennesApp = rennesApp
  }

  _interactionStation(event: InteractionEvent) {
    const stationsStore = useStationsStore()
    document.body.style.cursor = 'pointer'
    const feature: Feature<Point> = event.feature as Feature<Point>
    const stationName = feature?.get('nom')
    if (event.type & EventType.CLICK) {
      const viewStore = useViewsStore()
      if ([viewList.line, viewList.station].includes(viewStore.currentView)) {
        const lineViewStore = useLineViewsStore()
        const lineNumber = lineViewStore.selectedLine
        const stationId = feature?.get('id')
        if (isTrambusStopBelongsToLine(feature, lineNumber)) {
          router.push(`/line/${lineNumber}/station/${stationId}`)
          const panelStore = usePanelsStore()
          panelStore.isInformationPanelShown = true
        }
      }
    } else if (event.type & EventType.MOVE) {
      stationsStore.addStationToDisplay(stationName)
      stationsStore.flagClearStationsExceptPermanently = true
    }
  }

  isFeatureLine(feature: Feature, lines: string[]) {
    const id = feature.getId()
    if (id === undefined) {
      return false
    }
    if (!id.toString().includes('trambus_lignes')) {
      return false
    }
    const li_nom = feature.get('li_nom')
    if (li_nom === undefined || li_nom === null || li_nom === '') {
      return false
    }
    if (lines.includes(li_nom)) {
      return false
    }
    return true
  }

  getAllLines(event: InteractionEvent) {
    const lines: string[] = []
    if (event.map.className === 'OpenlayersMap') {
      const map = event.map as OpenlayersMap
      map.olMap!.forEachFeatureAtPixel(
        [event.windowPosition.x, event.windowPosition.y],
        (feat: FeatureLike) => {
          if (this.isFeatureLine(feat as Feature, lines)) {
            lines.push(feat.get('li_nom'))
          }
        },
        { hitTolerance: 10 }
      )
    } else if (event.map.className === 'CesiumMap') {
      const cesiumMap = event.map as CesiumMap
      const scene = cesiumMap.getScene()
      const pickedObjects = scene!.drillPick(event.windowPosition)
      pickedObjects.forEach((object) => {
        if (object.primitive && object.primitive.olFeature) {
          const feature = object.primitive.olFeature
          if (this.isFeatureLine(feature, lines)) {
            lines.push(feature.get('li_nom'))
          }
        }
      })
    }
    return lines
  }

  async _interactionLine(event: InteractionEvent) {
    document.body.style.cursor = 'pointer'
    if (event.type & EventType.CLICK) {
      if (event.position === undefined) {
        return
      }
      const lineInteractionStore = useLineInteractionStore()

      const trambusLines = this.getAllLines(event)
      lineInteractionStore.selectTrambusLines(trambusLines)

      const metroLines = this.getAllMetroLines(event)
      lineInteractionStore.selectMetroLines(metroLines)

      const busLines = this.getAllBusLines(event)
      lineInteractionStore.selectBusLines(busLines)

      lineInteractionStore.isBikeSelected = this.isBike(event)

      lineInteractionStore.selectClickPosition(event.windowPosition)

      const customLayer: GeoJSONLayer = await this._rennesApp.getLayerByKey(
        RENNES_LAYER.customLayerLabelLine
      )

      const new_feature = new Feature()
      const point = new Point(event.position)
      new_feature.setGeometry(point.transform('EPSG:3857', 'EPSG:4326'))
      new_feature.setStyle(new Style({}))
      customLayer.removeAllFeatures()
      customLayer.addFeatures([new_feature])
      lineInteractionStore.selectFeatureLabel(new_feature)
    }
  }

  _interactionPoi(event: InteractionEvent) {
    const viewStore = useViewsStore()
    if (this.viewsWithPoiDisplayed.includes(viewStore.currentView)) {
      document.body.style.cursor = 'auto'
      const poiInteractionStore = usePoiInteractionStore()
      const feature: Feature<Point> = event.feature as Feature<Point>
      if (feature.getId() !== poiInteractionStore.currentFeaturePoi?.getId()) {
        undisplayCurrentPoi(this._rennesApp)
        poiInteractionStore.selectCurrentFeaturePoi(feature)
        if (poiInteractionStore.currentFeaturePoi) {
          // @ts-ignore
          displayCurrentPoi(poiInteractionStore.currentFeaturePoi)
        }
      }
    }
  }

  getAllMetroLines(event: InteractionEvent) {
    const lines: string[] = []
    if (event.map.className === 'OpenlayersMap') {
      const map = event.map as OpenlayersMap
      map.olMap!.forEachFeatureAtPixel(
        [event.windowPosition.x, event.windowPosition.y],
        (feat: FeatureLike) => {
          if (feat.get('ligne')) {
            lines.push(feat.get('ligne'))
          }
        },
        { hitTolerance: 10 }
      )
    } else if (event.map.className === 'CesiumMap') {
      const cesiumMap = event.map as CesiumMap
      const scene = cesiumMap.getScene()
      const pickedObjects = scene!.drillPick(event.windowPosition)
      pickedObjects.forEach((object) => {
        if (object.primitive && object.primitive.olFeature) {
          const feature = object.primitive.olFeature
          if (feature.get('ligne')) {
            lines.push(feature.get('ligne'))
          }
        }
      })
    }
    return lines
  }

  getAllBusLines(event: InteractionEvent) {
    const lines: string[] = []
    if (event.map.className === 'OpenlayersMap') {
      const map = event.map as OpenlayersMap
      map.olMap!.forEachFeatureAtPixel(
        [event.windowPosition.x, event.windowPosition.y],
        (feat: FeatureLike) => {
          if (feat.get('li_num')) {
            lines.push(feat.get('li_num'))
          }
        },
        { hitTolerance: 10 }
      )
    } else if (event.map.className === 'CesiumMap') {
      const cesiumMap = event.map as CesiumMap
      const scene = cesiumMap.getScene()
      const pickedObjects = scene!.drillPick(event.windowPosition)
      pickedObjects.forEach((object) => {
        if (object.primitive && object.primitive.olFeature) {
          const feature = object.primitive.olFeature
          if (feature.get('li_num')) {
            lines.push(feature.get('li_num'))
          }
        }
      })
    }
    return lines
  }

  isBike(event: InteractionEvent) {
    // @ts-ignore
    return event.feature?.[vcsLayerName] === RENNES_LAYER.bike
  }

  async pipe(event: InteractionEvent): Promise<InteractionEvent> {
    // @ts-ignore
    const isFeatureTrambusStpos =
      // @ts-ignore
      event.feature?.[vcsLayerName] === RENNES_LAYER.trambusStops
    const isFeatureLine =
      // @ts-ignore
      event.feature?.[vcsLayerName] === RENNES_LAYER.trambusLines
    // @ts-ignore
    const isFeaturePOI = event.feature?.[vcsLayerName] === RENNES_LAYER.poi
    // @ts-ignore
    const isFeatureMetro = event.feature?.[vcsLayerName] === RENNES_LAYER.metro
    // @ts-ignore
    const isFeatureBus = event.feature?.[vcsLayerName] === RENNES_LAYER.bus
    // @ts-ignore
    const isFeatureBike = event.feature?.[vcsLayerName] === RENNES_LAYER.bike

    if (isFeatureTrambusStpos) {
      this._interactionStation(event)
    } else if (
      isFeatureLine ||
      isFeatureMetro ||
      isFeatureBus ||
      isFeatureBike
    ) {
      await this._interactionLine(event)
    } else if (isFeaturePOI) {
      this._interactionPoi(event)
    } else {
      const stationsStore = useStationsStore()
      if (stationsStore.flagClearStationsExceptPermanently) {
        stationsStore.clearStationsExceptPermanently()
        stationsStore.flagClearStationsExceptPermanently = false
      }
      const viewStore = useViewsStore()
      if (this.viewsWithPoiDisplayed.includes(viewStore.currentView)) {
        const poiInteractionStore = usePoiInteractionStore()
        if (poiInteractionStore.currentFeaturePoi) {
          undisplayCurrentPoi(this._rennesApp)
        }
      }

      document.body.style.cursor = 'auto'
    }
    return event
  }
}

export default mapClickAndMoveInteraction
