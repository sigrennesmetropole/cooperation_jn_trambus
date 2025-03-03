import type { RennesApp } from '@/services/RennesApp'
import { RENNES_LAYER } from '@/stores/layers'
import { Point } from 'ol/geom'
import { transform } from 'ol/proj'
import type { Feature } from 'ol'
import { generatePoiStyle, generatePoiStyleWithoutLabel } from '@/styles/common'
import { useMap3dStore } from '@/stores/map'
import { usePoiInteractionStore } from '@/stores/interactionMap'
import type { Geometry } from 'ol/geom'
import {
  filterFeatureByParkingAndLine,
  filterFeatureByPoiAndStation,
  filterFeatureByPoiAndLine,
  removeFiltersOnPoiAndParking,
} from '@/services/filter'
import { viewList } from '@/model/views.model'
import type { View } from '@/model/views.model'
import { vectorStyleSymbol, StyleItem, createSync } from '@vcmap/core'
import { setDistanceDisplayConditionFeature } from '@/services/setDistanceDisplayCondition'
import { usePoiParkingStore } from '@/stores/poiParking'
import { useStationsStore } from '@/stores/stations'
import { useLineViewsStore } from '@/stores/views'
import { splitName } from '@/helpers/nameFormatHelper'

const DEFAULT_MAX_SCALE = 8000

export async function fixGeometryOfPoi(rennesApp: RennesApp) {
  const layer = await rennesApp.getLayerByKey(RENNES_LAYER.poi)

  layer.getFeatures().forEach((f) => {
    const coordinates = [
      f.getProperties()['site_x'],
      f.getProperties()['site_y'],
    ]
    f.setGeometry(new Point(transform(coordinates, 'EPSG:4326', 'EPSG:3857')))
    let echelleMax = f.get('echelle_max')
    if (echelleMax) {
      echelleMax /= 5
    } else {
      echelleMax = DEFAULT_MAX_SCALE
    }
    f.set('olcs_scaleByDistance', [echelleMax - 1, 1, echelleMax, 0])
  })
}

export function displayCurrentPoi(feature: Feature<Geometry>) {
  const map3dStore = useMap3dStore()
  if (feature === null) return
  const full_name = feature.getProperties()['site_nom']
  const name = splitName(full_name)

  const styleItem = generatePoiStyle(
    name,
    feature.getProperties()['distance'],
    map3dStore.is3D(),
    false,
    true
  )
  // @ts-ignore
  feature[createSync] = true
  feature.setStyle(styleItem.style)
}

export function undisplayCurrentPoi(rennesApp: RennesApp) {
  const poiInteractionStore = usePoiInteractionStore()
  const map3dStore = useMap3dStore()
  if (poiInteractionStore.currentFeaturePoi === null) return
  const styleItem = generatePoiStyleWithoutLabel(map3dStore.is3D())
  setDistanceDisplayConditionFeature(styleItem, rennesApp.get2DMap())
  poiInteractionStore.currentFeaturePoi.setStyle(styleItem.style)
  poiInteractionStore.selectCurrentFeaturePoi(null)
}

async function resetStyleOfPoi(view: View, rennesApp: RennesApp) {
  const map3dStore = useMap3dStore()
  const layer = await rennesApp.getLayerByKey(RENNES_LAYER.poi)
  layer.getFeatures().forEach((f) => {
    let styleItem: StyleItem
    if (view === viewList.station) {
      let name = f.getProperties()['site_nom']
      // Needed because Cesium does not support single quotes in labels (it breaks the label)
      name = name.replace("'", ' ')

      styleItem = generatePoiStyle(
        name,
        f.getProperties()['distance'],
        map3dStore.is3D(),
        true,
        false
      )
    } else {
      styleItem = generatePoiStyleWithoutLabel(map3dStore.is3D())
      setDistanceDisplayConditionFeature(styleItem, rennesApp.get2DMap())
    }

    //@ts-expect-error
    f[vectorStyleSymbol] = styleItem
    f.setStyle(styleItem.style)
  })
}

async function filterFeaturesOnLine(rennesApp: RennesApp) {
  const lineViewStore = useLineViewsStore()
  await filterFeatureByParkingAndLine(rennesApp, lineViewStore.selectedLine)
}

export async function poiStoreSubcribe(rennesApp: RennesApp) {
  const poiStore = usePoiParkingStore()
  const stationsStore = useStationsStore()
  const lineViewStore = useLineViewsStore()
  await removeFiltersOnPoiAndParking(rennesApp)
  await fixGeometryOfPoi(rennesApp)
  if (
    poiStore.currentProfile === viewList.station &&
    stationsStore.currentStationView
  ) {
    await filterFeaturesOnLine(rennesApp)
    await filterFeatureByPoiAndStation(
      rennesApp,
      stationsStore.currentStationView
    )
  } else if (
    poiStore.currentProfile === viewList.line &&
    lineViewStore.selectedLine
  ) {
    await filterFeaturesOnLine(rennesApp)
    await filterFeatureByPoiAndLine(rennesApp, lineViewStore.selectedLine)
  }
  await resetStyleOfPoi(poiStore.currentProfile!, rennesApp)
}
