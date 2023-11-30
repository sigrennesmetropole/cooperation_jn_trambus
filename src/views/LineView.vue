<script setup lang="ts">
import { onBeforeMount, reactive, onMounted, ref, inject } from 'vue'

import type {
  LineModel,
  SelectedTrambusLine,
  LineNumber,
} from '@/model/lines.model'
import type { TravelTimeModel } from '@/model/travel-time.model'
import type { PhotoModel } from '@/model/photos.model'
import { apiClientService } from '@/services/api.client'
import LineFigures from '@/components/line/LineFigures.vue'
import UiTravelTime from '@/components/ui/UiTravelTime.vue'
import ThermometerStations from '@/components/line/ThermometerStations.vue'
import ParkingsInformations from '@/components/line/ParkingsInformations.vue'
import { useRoute } from 'vue-router'
import { useMap3dStore } from '@/stores/map'
import { useViewsStore } from '@/stores/views'
import { useLayersStore } from '@/stores/layers'
import { useLineViewsStore } from '@/stores/views'
import UiLineHeader from '@/components/ui/UiLineHeader.vue'
import { viewList } from '@/model/views.model'
import BackButton from '@/components/home/BackButton.vue'
import { useTraveltimeInteractionStore } from '@/stores/interactionMap'
import type { RennesApp } from '@/services/RennesApp'
import { fetchParkingsByStations } from '@/services/parking'
import type { ParkingModel } from '@/model/parkings.model'
import type { StationModel } from '@/model/stations.model'
import { fetchStationsByLine, completeStationsData } from '@/services/station'
import { useLineInteractionStore } from '@/stores/interactionMap'
import { poiStoreSubcribe } from '@/services/poi'
import { useStationsStore } from '@/stores/stations'
import SkipLinksLineView from '@/components/accessibility/SkipLinksLineView.vue'
import FooterAreaLink from '@/components/home/FooterAreaLink.vue'
import { legalList } from '@/constants/legalLinks'
import { fetchTravelTimeByLine } from '@/services/travelTime'
import { fetchLineDescription } from '@/services/line'
import { useLinesStore } from '@/stores/lines'

const openLink = (link: string) => {
  window.open(link, '_blank')
}

const map3dStore = useMap3dStore()
const viewStore = useViewsStore()
const stationStore = useStationsStore()

const layerStore = useLayersStore()
const lineStore = useLineViewsStore()
const traveltimeInteractionStore = useTraveltimeInteractionStore()
const lineInteractionStore = useLineInteractionStore()
const linesStore = useLinesStore()

const rennesApp = inject('rennesApp') as RennesApp

const state = reactive({
  lineDescription: null as null | LineModel | undefined,
  travelTimes: null as null | TravelTimeModel[],
  photo: null as null | PhotoModel,
  parkings: null as null | ParkingModel[],
  stations: null as null | StationModel[],
})

let currentLine: SelectedTrambusLine

onBeforeMount(async () => {
  const { params } = useRoute()
  const routeParams = ref(params)
  currentLine = Number(routeParams.value.id) as SelectedTrambusLine
  let isFromLineToLine = false
  if (viewStore.currentView === viewList.line) {
    isFromLineToLine = true
  }
  viewStore.setCurrentView(viewList.line, currentLine, null)
  if (isFromLineToLine) {
    await poiStoreSubcribe(rennesApp)
  }
  const travelTimes = await fetchTravelTimeByLine(rennesApp, currentLine)
  traveltimeInteractionStore.setDisplayTravelTimes(travelTimes)

  state.lineDescription = await fetchLineDescription(
    rennesApp,
    lineStore.selectedLine
  )
  state.travelTimes = await fetchTravelTimeByLine(
    rennesApp,
    lineStore.selectedLine
  )
  state.travelTimes.forEach((tt) => {
    stationStore.addStationToDisplayPermanently(tt.start)
    stationStore.addStationToDisplayPermanently(tt.end)
  })

  state.photo = await apiClientService.fetchPhotoByLine(lineStore.selectedLine)
  const stations = await fetchStationsByLine(rennesApp, lineStore.selectedLine)

  state.parkings = await fetchParkingsByStations(rennesApp, stations)

  state.stations = await completeStationsData(
    stations,
    lineStore.selectedLine,
    state.parkings
  )
})

onMounted(async () => {
  console.log('Mounted')
  lineInteractionStore.resetLinesLabels()
  layerStore.setVisibilities(map3dStore.is3D(), {
    trambusLines: true,
    trambusStops: true,
    parking: true,
    poi: true,
    metro: false,
    bus: false,
    bike: false,
    _traveltimeArrow: true,
    concertations: false,
    cityPlans: false,
  })
})

function onTravelTimesClicked(travelTime: TravelTimeModel) {
  if (travelTime == traveltimeInteractionStore.selectedTraveltime) {
    traveltimeInteractionStore.selectTraveltime(null)
  } else {
    traveltimeInteractionStore.selectTraveltime(travelTime)
  }
}

linesStore.$subscribe(async () => {
  if (linesStore.lineDesciptions.length > 0) {
    stationStore.lineViewSetUpStationsToDisplay(
      lineStore.selectedLine as LineNumber,
      false
    )
  }
})
</script>

<template>
  <SkipLinksLineView></SkipLinksLineView>
  <div class="flex flex-col items-start py-0 gap-2">
    <div class="flex items-center p-0 gap-4">
      <BackButton title="Retour vers la page d'accueil."></BackButton>
      <UiLineHeader
        v-if="state.lineDescription"
        :line="state.lineDescription?.id!"
        :name="state.lineDescription?.name"
        :start="state.lineDescription?.start"
        :end="state.lineDescription?.end"
      >
      </UiLineHeader>
    </div>
  </div>

  <template v-if="state.photo !== null && state.photo !== undefined">
    <img
      :key="state.photo.url"
      :src="state.photo.url"
      alt="photomontage simulant l'intégration de la ligne dans le paysage urbain"
      class="h-[184px] -mx-6 max-w-7xl mb-2"
    />
  </template>

  <LineFigures
    v-if="state.lineDescription && state.parkings && state.stations"
    :line="state.lineDescription?.id"
    :nb_parking="state.parkings.length"
    :nb_station="state.stations.length"
  />

  <section id="new-travel-times">
    <h2 class="font-dm-sans font-bold text-lg leading-6">
      Nouveaux temps de parcours
    </h2>
    <div title="Liste des temps de parcours.">
      <UiTravelTime
        v-for="travelTime in state.travelTimes"
        role="button"
        @click="onTravelTimesClicked(travelTime)"
        :key="travelTime.line"
        :newDuration="travelTime.new"
        :oldDuration="travelTime.old"
        :lineNumber="travelTime.line"
        :startStation="travelTime.start"
        :endStation="travelTime.end"
        :colored="travelTime == traveltimeInteractionStore.selectedTraveltime"
        :clickable="true"
      >
      </UiTravelTime>
    </div>
  </section>
  <template v-if="state.parkings && state.parkings.length > 0">
    <div class="border-b border-neutral-300 mt-2"></div>
    <ParkingsInformations :parkings="state.parkings" />
  </template>
  <div class="border-b border-neutral-300 mb-3"></div>
  <section id="stations-list">
    <ThermometerStations
      v-if="state.lineDescription && state.stations"
      :line="state.lineDescription?.id"
      :stations="state.stations"
    />
  </section>
  <div class="border-b border-neutral-300 my-3"></div>
  <section id="footer">
    <FooterAreaLink
      class="mt-auto"
      @openLink="openLink($event)"
      :legalList="legalList"
    ></FooterAreaLink>
  </section>
</template>
