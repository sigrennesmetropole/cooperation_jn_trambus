<script setup lang="ts">
import { reactive, onMounted, inject } from 'vue'
import UiTravelTime from '../ui/UiTravelTime.vue'
import type { TravelTimeModel } from '@/model/travel-time.model'
import UiOverflowContainer from '../ui/UiOverflowContainer.vue'
import UiLinkPrimary from '../ui/UiLinkPrimary.vue'
import { UiButtonWithTooltip } from '@sigrennesmetropole/cooperation_jn_common_ui'
import { fetchTravelTime } from '@/services/travelTime'
import type { RennesApp } from '@/services/RennesApp'

const state = reactive({
  travelTimes: null as null | TravelTimeModel[],
})
const rennesApp = inject('rennesApp') as RennesApp

onMounted(async () => {
  state.travelTimes = await fetchTravelTime(rennesApp, 3)
})
</script>

<template>
  <div class="relative">
    <h2 class="font-dm-sans font-bold text-lg leading-6">
      Temps de parcours théorique
    </h2>
    <div class="ml-2">
      <UiButtonWithTooltip
        widthButton="4"
        heightButton="4"
        positionRight="130px"
        positionTop="5px"
        text="Les temps de parcours présentés sont estimés de façon théorique. Ils sont calculés à l'heure de pointe du matin en direction de Rennes et sont comparés aux temps de parcours théoriques actuels."
        widthBoxText="w-[280px]"
      ></UiButtonWithTooltip>
    </div>
  </div>

  <div class="flex flex-col items-start gap-3 pt-0 pr-9 pb-0 pl-0">
    <UiOverflowContainer class="w-[450px] -mx-6">
      <ul
        class="flex flex-row items-start gap-2 w-[450px]"
        title="Liste des temps de parcours"
      >
        <UiTravelTime
          class="w-80 flex-none"
          v-for="travelTime in state.travelTimes"
          :key="travelTime.line"
          :newDuration="travelTime.new"
          :oldDuration="travelTime.old"
          :lineNumber="travelTime.line"
          :startStation="travelTime.start"
          :endStation="travelTime.end"
          :clickable="false"
        >
        </UiTravelTime>
      </ul>
    </UiOverflowContainer>

    <UiLinkPrimary
      :url="'/traveltimes'"
      :arrowStrokeColor="'stroke-red-600'"
      :underlineColor="'bg-red-600'"
      :aria-label="'Voir plus de futurs temps de parcours'"
    >
      Voir plus
    </UiLinkPrimary>
  </div>

  <div class="border-b border-neutral-300 mb-3"></div>
</template>
