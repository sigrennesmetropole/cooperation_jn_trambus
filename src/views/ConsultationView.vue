<script setup lang="ts">
import { ref, Ref, onBeforeMount } from 'vue'
import { viewList } from '@/model/views.model'
import { useViewsStore } from '@/stores/views'
import ChevronArrowRight from '@/assets/icons/chevron-left.svg'
import ProjectMeeting from '@/components/consultation/ProjectMeeting.vue'
import ExplanationComponent from '@/components/consultation/ExplanationComponent.vue'
import { apiProjectService } from '@/services/api-project'
const viewStore = useViewsStore()

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
    geojson: string
    nb_comments: number
    nb_likes: number
    nb_persons: number
    url: string
  }[]
> = ref([])

onBeforeMount(async () => {
  viewStore.currentView = viewList['consultation']
  const projectInformations = await apiProjectService.getProjectInformations()
  for (let project of projectInformations) {
    projects.value.push(project)
  }
})
</script>

<template>
  <main class="h-screen">
    <div class="flex flex-row">
      <UiButton
        class="shadow-md rounded-lg p-2 flex gap-2.5 shrink-0 grow-0 mr-4 cursor-pointer"
        @click="$router.push(viewList.home)"
      >
        <img :src="ChevronArrowRight" />
      </UiButton>
      <div class="font-dm-sans grow font-bold text-2xl">Concertations</div>
    </div>
    <div class="-mx-6 mt-6">
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
      >
      </ProjectMeeting>
    </div>
  </main>
</template>
