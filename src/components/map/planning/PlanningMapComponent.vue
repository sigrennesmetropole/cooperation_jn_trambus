<script setup lang="ts">
import { onMounted, provide, ref } from 'vue'
import Map from 'ol/Map'
import UiOLMap from '@/components/ui/UiOLMap.vue'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import WMTS from 'ol/source/WMTS'
import WMTSTileGrid from 'ol/tilegrid/WMTS'
import { fromLonLat, get as getProjection } from 'ol/proj'
import { getWidth } from 'ol/extent'
import GeoJSON from 'ol/format/GeoJSON'
import { Vector as VectorSource } from 'ol/source'
import { Vector as VectorLayer } from 'ol/layer'
import { Style, Stroke } from 'ol/style'
import type { StyleFunction } from 'ol/style/Style'
import type { FeatureLike } from 'ol/Feature'

import { getTrambusLineNumber, lineColors } from '@/styles/common'

import { usePlanningStore } from '@/stores/planning'
import PlanningLegend from '@/components/map/planning/PlanningLegend.vue'
import { Overlay } from 'ol'
import UiLineButton from '@/components/map/buttons/UiLineButton.vue'
import type { Corner } from '@/components/map/buttons/UiLineButton.vue'
import OlNavigationButtons from '@/components/map/buttons/OlNavigationButtons.vue'
import type { LineNumber } from '@/model/lines.model'
import { LinePlanningStateTypes } from '@/model/line-planning-state.model'
import type { Positioning } from 'ol/Overlay'
import { useConfigStore } from '@/stores/config'
import { useLinesStore } from '@/stores/lines'

const planningStore = usePlanningStore()
const configStore = useConfigStore()
const linesStore = useLinesStore()

// Create map and provide it to the descendant to avoid reactivity on map object
let map = new Map({ controls: [] })
provide('map', map)

const mapLoaded = ref(false)
const linesRef = ref([])

const resolutions = []
const matrixIds = []
const proj3857 = getProjection('EPSG:3857')
const maxResolution = getWidth(proj3857!.getExtent()) / 256

for (let i = 0; i < 20; i++) {
  matrixIds[i] = 'EPSG:3857:' + i.toString()
  resolutions[i] = maxResolution / Math.pow(2, i)
}

const tileGrid = new WMTSTileGrid({
  origin: [-20037508, 20037508],
  resolutions: resolutions,
  matrixIds: matrixIds,
})

const rennesBaseMap = new TileLayer({
  source: new WMTS({
    url: configStore.config?.trambus.ogc.project_planning_base_map_url,
    layer: 'ref_fonds:pvci_simple_gris',
    matrixSet: 'EPSG:3857',
    format: 'image/png',
    projection: 'EPSG:3857',
    tileGrid: tileGrid,
    style: 'normal',
  }),
})

const innerWhiteStyle = new Style({
  stroke: new Stroke({
    color: '#FFFFFF',
    width: 7,
  }),
  zIndex: 1,
})

const blackBorderStyle = new Style({
  stroke: new Stroke({
    color: '#0F172A', // slate-800
    width: 9,
  }),
  zIndex: 0,
})

function activeLineBorderStyle(line: LineNumber): Style {
  return new Style({
    stroke: new Stroke({
      color: lineColors[line],
      width: 9,
    }),
    zIndex: 0,
  })
}

function lineStatusStyle(lineState: LinePlanningStateTypes): Style {
  return new Style({
    stroke: new Stroke({
      color: lineState.color,
      width: 4,
    }),
    zIndex: 2,
  })
}

const inactiveLineStyle: Style[] = [
  // Border
  new Style({
    stroke: new Stroke({
      color: '#FFFFFF',
      width: 2,
    }),
    zIndex: 1,
  }),
  new Style({
    stroke: new Stroke({
      color: '#525252', // neutral-600
      width: 4,
    }),
    zIndex: 0,
  }),
]

function convertAttributeToDate(attribute: string): Date {
  // The string format is "YYYY S1" or "YYYY S2"
  const year = parseInt(attribute.split(' ')[0])
  const month = attribute.split(' ')[1] == 'S1' ? 1 : 7
  return new Date(year, month)
}

function getState(feature: FeatureLike): LinePlanningStateTypes {
  const inProgressDate = convertAttributeToDate(
    String(feature.get('phase_travaux'))
  )
  const commisionedDate = convertAttributeToDate(
    String(feature.get('phase_livre'))
  )
  const selectedDate = planningStore.getSelectedDate()

  if (selectedDate >= commisionedDate) {
    return LinePlanningStateTypes.COMMISIONING
  } else if (selectedDate >= inProgressDate && selectedDate < commisionedDate) {
    return LinePlanningStateTypes.UNDER_CONSTRUCTION
  } else {
    return LinePlanningStateTypes.UNSTARTED
  }
}

function isLineSelected(feature: FeatureLike): boolean {
  return planningStore.selectedLine == getTrambusLineNumber(feature)
}

function isLinePlanningStateActivated(): boolean {
  return planningStore.selectedLineState !== null
}

function isLinePlanningStateSelected(feature: FeatureLike): boolean {
  return planningStore.isLinePlanningStateHighlighted(getState(feature))
}

const styleFunction: StyleFunction = function (feature: FeatureLike): Style[] {
  // Inactive state
  if (isLinePlanningStateActivated() && !isLinePlanningStateSelected(feature)) {
    if (isLineSelected(feature)) {
      return [
        activeLineBorderStyle(getTrambusLineNumber(feature) as LineNumber),
        innerWhiteStyle,
      ]
    }
    return inactiveLineStyle
  }

  // No active/selected line
  if ([1, 2, 3, 4].indexOf(planningStore.selectedLine) == -1)
    return [
      lineStatusStyle(getState(feature)),
      // Border
      innerWhiteStyle,
      blackBorderStyle,
    ]

  // Active line style
  if (isLineSelected(feature)) {
    return [
      lineStatusStyle(getState(feature)),
      // Border
      activeLineBorderStyle(getTrambusLineNumber(feature) as LineNumber),
      innerWhiteStyle,
    ]
  }
  return inactiveLineStyle
}

const planningLayer = new VectorLayer({
  source: new VectorSource({
    url: configStore.config?.trambus.ogc.project_planning_layer_url,
    format: new GeoJSON(),
  }),
  style: styleFunction,
})

function addOverlay(
  olMap: Map,
  lng: number,
  lat: number,
  lineButtonComponent: typeof UiLineButton | null
) {
  const anchor: Corner = lineButtonComponent?.$props.corner ?? 'tl'
  const positioning: Record<Corner, Positioning> = {
    br: 'bottom-right',
    bl: 'bottom-left',
    tr: 'top-right',
    tl: 'top-left',
  }
  const overlay = new Overlay({
    element: lineButtonComponent?.$el,
    position: fromLonLat([lng, lat]),
    positioning: positioning[anchor],
  })
  olMap.addOverlay(overlay)
}

function setupMap() {
  map.setTarget('mapContainer')
  map.setView(
    new View({
      center: fromLonLat([-1.67, 48.101]),
      zoom: 12,
      maxZoom: 15,
      minZoom: 12,
    })
  )
  map.setLayers([rennesBaseMap, planningLayer])
  linesRef.value.forEach((lineRef, index) => {
    let point = linesStore.lineDesciptions[index].prettyPoint!
    point.transform('EPSG:3857', 'EPSG:4326')
    addOverlay(
      map,
      point.getCoordinates()[0],
      point.getCoordinates()[1],
      linesRef.value[index]
    )
  })

  mapLoaded.value = true
}

onMounted(async () => {
  setupMap()
})

planningStore.$subscribe(() => {
  planningLayer.setStyle(styleFunction)
})

function setSelectedLine(line: number) {
  // If the line is currently active, set the selected line to 0  to make
  // neutral state
  if (planningStore.selectedLine == line) {
    planningStore.selectedLine = 0
  } else {
    planningStore.selectedLine = line
  }
}
</script>
<template>
  <UiOLMap v-if="mapLoaded"></UiOLMap>
  <OlNavigationButtons></OlNavigationButtons>
  <div class="absolute left-10 top-10 flex flex-row gap-1">
    <UiLineButton
      v-for="line in linesStore.lineDesciptions"
      :key="line.id"
      ref="linesRef"
      :line="line.id"
      :chevron="false"
      :active="
        planningStore.selectedLine === line.id ||
        planningStore.selectedLine == 0
      "
      :corner="'br'"
      @click="setSelectedLine(line.id)"
    >
    </UiLineButton>
  </div>
  <PlanningLegend></PlanningLegend>
</template>
