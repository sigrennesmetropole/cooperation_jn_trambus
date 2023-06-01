<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { viewList } from '@/model/views.model'
import { useViewsStore } from '@/stores/views'
import ChevronArrowRight from '@/assets/icons/chevron-left.svg'
import ConsultationMeeting from '@/components/consultation/ConsultationMeeting.vue'

const viewStore = useViewsStore()

onBeforeMount(() => {
  viewStore.currentView = viewList['consultation']
})
</script>

<template>
  <main class="h-screen">
    <div class="flex flex-row">
      <UiButton
        class="shadow-md rounded-lg p-2 flex gap-2.5 shrink-0 grow-0 mr-4"
        @click="$router.push(viewList.home)"
      >
        <img :src="ChevronArrowRight" />
      </UiButton>
      <div class="font-dm-sans grow font-bold text-2xl">Concertations</div>
    </div>
    <div class="flex flex-col">
      <h2
        class="font-dm-sans font-bold text-lg leading-6 mt-6 pb-6 border-b border-b-slate-200"
      >
        Les concertations ouvertes
      </h2>
      <ConsultationMeeting
        :illustration="'src/assets/illustrations/ex_consultation.png'"
        :title="'Vos réactions au futur aménagement du réseau trambus'"
        :status="'open'"
        :date="'15/10/2023'"
        :place="'Zone géographique'"
        :content="'Appaisement du traffic et végétalisation des espaces. La rue chicogné va faire l’objet d’une requalification'"
        :comment="481"
        :like="1291"
        :person="353"
      ></ConsultationMeeting>
      <ConsultationMeeting
        :illustration="'src/assets/illustrations/ex_consultation.png'"
        :title="'Trambus'"
        :status="'inAnalysis'"
        :date="'15/10/2023'"
        :place="'Ligne 4'"
        :content="'Appaisement du traffic et végétalisation des espaces. La rue chicogné va faire l’objet d’une requalification'"
        :comment="120"
        :like="364"
        :person="56"
      ></ConsultationMeeting>
      <h2
        class="font-dm-sans font-bold text-lg leading-6 border-b border-b-slate-200 mt-6 pb-6"
      >
        Les concertations terminées
      </h2>
      <ConsultationMeeting
        :illustration="'src/assets/illustrations/ex_consultation.png'"
        :title="'Trambus'"
        :status="'closed'"
        :date="'15/10/2023'"
        :place="'Gare'"
        :content="'Appaisement du traffic et végétalisation des espaces. La rue chicogné va faire l’objet d’une requalification'"
        :comment="61"
        :like="579"
        :person="237"
      ></ConsultationMeeting>
    </div>
  </main>
</template>
