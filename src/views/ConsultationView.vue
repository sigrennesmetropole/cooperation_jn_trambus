<script setup lang="ts">
import { ref, Ref, onBeforeMount, onMounted, inject } from 'vue'
import { viewList } from '@/model/views.model'
import { useViewsStore } from '@/stores/views'
import ProjectMeeting from '@/components/consultation/ProjectMeeting.vue'
import ExplanationComponent from '@/components/consultation/ExplanationComponent.vue'
import { apiProjectService } from '@/services/api-project'
import type { RennesApp } from '@/services/RennesApp'
import { useLineInteractionStore } from '@/stores/interactionMap'
import { RENNES_LAYER, useLayersStore } from '@/stores/layers'
import { useMap3dStore } from '@/stores/map'
import GeoJSON from 'ol/format/GeoJSON'
import BackButton from '@/components/home/BackButton.vue'

const viewStore = useViewsStore()
const lineInteractionStore = useLineInteractionStore()
const layerStore = useLayersStore()
const map3dStore = useMap3dStore()

let projects: Ref<
  {
    id: string
    img: string
    title: string
    meta_description: string
    status: string
    date_end: string
    content: string
    location: string
    geojson: object
    nb_comments: number
    nb_likes: number
    nb_persons: number
    url: string
  }[]
> = ref([])

const rennesApp = inject('rennesApp') as RennesApp

onBeforeMount(async () => {
  viewStore.currentView = viewList['consultation']
  const projectInformations = await apiProjectService.getProjectInformations()
  for (let project of projectInformations) {
    projects.value.push(project)
  }
})

onMounted(async () => {
  lineInteractionStore.resetLinesLabels()
  layerStore.setVisibilities(map3dStore.is3D(), {
    trambusLines: true,
    trambusStops: false,
    parking: true,
    poi: true,
    metro: false,
    bus: false,
    bike: false,
    _traveltimeArrow: false,
    concertations: true,
    cityPlans: false,
  })
})

async function showConcertations(geojson: object) {
  const features = new GeoJSON().readFeatures(geojson)
  const concertationLayer = await rennesApp.getLayerByKey(
    RENNES_LAYER.concertations
  )
  concertationLayer.removeAllFeatures()
  concertationLayer.addFeatures(features)
}

async function removeConcertations() {
  const concertationLayer = await rennesApp.getLayerByKey(
    RENNES_LAYER.concertations
  )
  concertationLayer.removeAllFeatures()
}
</script>

<template>
  <main class="h-screen">
    <div class="flex flex-row">
      <div class="flex items-center p-0 mb-2 gap-4">
        <BackButton title="Retour vers la page d'accueil."></BackButton>
        <div class="font-dm-sans grow font-bold text-2xl mt-1">
          Concertations
        </div>
      </div>
    </div>
    <div>
      <ExplanationComponent></ExplanationComponent>
    </div>
    <div class="flex flex-col">
      <h2
        class="font-dm-sans font-bold text-lg leading-6 mt-6 pb-6 border-b border-b-slate-200"
      >
        Les concertations ouvertes
      </h2>
      <ProjectMeeting
        v-for="project in projects.filter((i) => i.status != 'closed')"
        :key="project.id"
        :img="project.img"
        :title="project.title"
        :status="project.status"
        :date="project.date_end"
        :place="project.location"
        :content="project.content"
        :meta_description="project.meta_description"
        :comment="project.nb_comments"
        :like="project.nb_likes"
        :person="project.nb_persons"
        :url="project.url"
        @mouseover="showConcertations(project.geojson)"
        @mouseleave="removeConcertations()"
      >
      </ProjectMeeting>
      <h2
        class="font-dm-sans font-bold text-lg leading-6 border-b border-b-slate-200 mt-6 pb-6"
      >
        Les concertations terminées
      </h2>
      <ProjectMeeting
        v-for="project in projects.filter((i) => i.status == 'closed')"
        :key="project.id"
        :img="project.img"
        :title="project.title"
        :status="project.status"
        :date="project.date_end"
        :place="project.location"
        :content="project.content"
        :meta_description="project.meta_description"
        :comment="project.nb_comments"
        :like="project.nb_likes"
        :person="project.nb_persons"
        :url="project.url"
        @mouseover="showConcertations(project.geojson)"
        @mouseleave="removeConcertations()"
      >
      </ProjectMeeting>
    </div>
  </main>
</template>
