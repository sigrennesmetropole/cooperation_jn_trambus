import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import type { TravelTimeModel } from '@/model/travel-time.model'
import type { Cartesian2 } from '@vcmap-cesium/engine'
import type { Feature } from 'ol'
import type { Geometry } from 'ol/geom'
import type { RennesApp } from '@/services/RennesApp'
import { getCartesianPositionFromFeature } from '@/helpers/featureHelper'
import type { Viewpoint } from '@vcmap/core'
import { getCenterOfArrow } from '@/helpers/arcHelpers'
import {
  addGenericListenerForUpdatePositions,
  updateCartesianPositions,
} from '@/services/aboveMapService'

export const useTraveltimeInteractionStore = defineStore(
  'traveltime-interaction-map',
  () => {
    const selectedTraveltime: Ref<TravelTimeModel | null> = ref(null)
    const displayedTravelTimes: Ref<TravelTimeModel[]> = ref([])

    function selectTraveltime(traveltime: TravelTimeModel | null) {
      selectedTraveltime.value = traveltime
    }

    function addDisplayTravelTime(traveltime: TravelTimeModel) {
      displayedTravelTimes.value.push(traveltime)
    }

    function isOnlySelected(travelTime: TravelTimeModel) {
      return (
        displayedTravelTimes.value.length === 1 &&
        displayedTravelTimes.value[0].id === travelTime.id
      )
    }
    function setDisplayTravelTimes(travelTimes: TravelTimeModel[]) {
      displayedTravelTimes.value = travelTimes
    }
    function removeDisplayTravelTime() {
      displayedTravelTimes.value = []
    }

    return {
      selectedTraveltime,
      displayedTravelTimes,
      addDisplayTravelTime,
      isOnlySelected,
      setDisplayTravelTimes,
      removeDisplayTravelTime,
      selectTraveltime,
    }
  }
)

export const useTravelTimeBoxesStore = defineStore(
  'travelTime-boxes-map',
  () => {
    const travelTimeBoxes: Ref<
      {
        travelTimeFeature: TravelTimeModel
        feature: Feature
        cartesian: Cartesian2
      }[]
    > = ref([])
    const previousViewPoint: Ref<Viewpoint | null> = ref(null)

    async function setTravelTimeBoxes(
      rennesApp: RennesApp,
      travelTimes: TravelTimeModel[],
      is3D: boolean
    ) {
      travelTimeBoxes.value = []
      travelTimes.forEach((travelTime) => {
        const feature = getCenterOfArrow(rennesApp, is3D, travelTime)
        feature.then((feat) => {
          const cartesian = getCartesianPositionFromFeature(rennesApp, feat)

          if (cartesian !== undefined) {
            travelTimeBoxes.value.push({
              travelTimeFeature: travelTime,
              cartesian: cartesian,
              feature: feat,
            })
          }
        })
      })
    }

    function cleanTravelTimesBoxes() {
      travelTimeBoxes.value = []
    }

    function updatePositionsTravelTimeBoxes(rennesApp: RennesApp) {
      updateCartesianPositions(rennesApp, travelTimeBoxes.value)
    }

    function addListenerForUpdatePositions(rennesApp: RennesApp) {
      addGenericListenerForUpdatePositions(
        rennesApp,
        previousViewPoint.value,
        updatePositionsTravelTimeBoxes
      )
    }

    return {
      travelTimeBoxes,
      addListenerForUpdatePositions,
      setTravelTimeBoxes,
      cleanTravelTimesBoxes,
    }
  }
)

export const useLineInteractionStore = defineStore(
  'line-interaction-map',
  () => {
    const selectedTrambusLines: Ref<string[]> = ref([])
    const selectedMetroLines: Ref<string[]> = ref([])
    const selectedBusLines: Ref<string[]> = ref([])
    const isBikeSelected: Ref<boolean> = ref(false)
    const clickPosition: Ref<Cartesian2 | null> = ref(null)
    const featureLabel: Ref<Feature<Geometry> | null> = ref(null)

    function selectTrambusLines(lines: string[]) {
      selectedTrambusLines.value = lines
    }

    function selectMetroLines(lines: string[]) {
      selectedMetroLines.value = lines
    }

    function selectBusLines(lines: string[]) {
      selectedBusLines.value = lines
    }

    function selectClickPosition(cartesian: Cartesian2 | null) {
      clickPosition.value = cartesian
    }

    function selectFeatureLabel(feature: Feature<Geometry>) {
      featureLabel.value = feature
    }

    function resetLinesLabels() {
      selectedTrambusLines.value = []
      selectedMetroLines.value = []
      selectedBusLines.value = []
      isBikeSelected.value = false
      clickPosition.value = null
      featureLabel.value = null
    }

    return {
      selectedTrambusLines,
      selectTrambusLines,
      selectedMetroLines,
      selectMetroLines,
      selectedBusLines,
      selectBusLines,
      isBikeSelected,
      clickPosition,
      selectClickPosition,
      featureLabel,
      selectFeatureLabel,
      resetLinesLabels,
    }
  }
)

export const usePoiInteractionStore = defineStore('poi-interaction-map', () => {
  const currentFeaturePoi: Ref<Feature<Geometry> | null> = ref(null)

  function selectCurrentFeaturePoi(feature: Feature<Geometry> | null) {
    currentFeaturePoi.value = feature
  }

  return {
    currentFeaturePoi,
    selectCurrentFeaturePoi,
  }
})

export const useTrambusLineInteractionStore = defineStore(
  'trambus-line-interaction',
  () => {
    // const trambusLines: Ref<string[]> = ref(['T1', 'T2', 'T3', 'T4'])
    const trambusLines: Ref<
      {
        line: string
        feature: Feature
        cartesian: Cartesian2
      }[]
    > = ref([])
    const previousViewPoint: Ref<Viewpoint | null> = ref(null)

    async function initializeTrambusLines(rennesApp: RennesApp) {
      // Read from layer (?) -> get Features
      const staticLabelLayer = await rennesApp.getLayerByKey('staticLabel')
      staticLabelLayer.getFeatures().forEach((f) => {
        if (f.getProperties()['layerName'] === 'trambus') {
          const line = f.getProperties()['line']
          const cartesian = getCartesianPositionFromFeature(rennesApp, f)
          trambusLines.value.push({
            line: line,
            feature: f,
            cartesian: cartesian!,
          })
        }
      })
    }

    function updatePositionsStaticTrambusLines(rennesApp: RennesApp) {
      updateCartesianPositions(rennesApp, trambusLines.value)
    }

    function addListenerForUpdatePositions(rennesApp: RennesApp) {
      addGenericListenerForUpdatePositions(
        rennesApp,
        previousViewPoint.value,
        updatePositionsStaticTrambusLines
      )
    }

    return {
      trambusLines,
      addListenerForUpdatePositions,
      initializeTrambusLines,
    }
  }
)
