<script setup lang="ts">
import fabriqueCitoyenne from '@/assets/icons/fabrique-citoyenne.svg'
import router from '@/router'
import { usePanelsStore } from '@/stores/panels'
import { computed } from 'vue'

const panelStore = usePanelsStore()

const leftAlignment = computed(() =>
  panelStore.isInformationPanelShown
    ? 'absolute left-[462px] top-3'
    : 'absolute left-3 top-3'
)

function goToConsultation() {
  router.push('/consultation')
}
</script>

<template>
  <div
    class="z-10 flex flex-row gap-4 p-2 bg-[#261E69] rounded-lg text-white items-center"
    :class="leftAlignment"
  >
    <div class="flex flex-row gap-3 px-2">
      <img :src="fabriqueCitoyenne" class="w-9 h-9 my-auto" />
      <div>
        <h4 class="font-dm-sans font-bold text-lg leading-6">
          La Fabrique Citoyenne
        </h4>
        <p class="font-dm-sans font-normal text-sm">
          Découvrez l'espace concertation et <br />
          contribuez au transport de demain
        </p>
      </div>
    </div>
    <button
      tabindex="0"
      class="font-dm-sans font-medium text-base border border-white px-4 py-3 rounded-lg h-12"
      @click="goToConsultation()"
      @keydown.enter="goToConsultation()"
    >
      Découvrir
    </button>
  </div>
</template>
