<script setup lang="ts">
import fabriqueCitoyenne from '@/assets/icons/fabrique-citoyenne.svg'

function goToConsultation() {
  console.log('go to the concertation page')
}
</script>

<template>
  <div
    class="absolute left-1/4 top-2 z-10 flex flex-row gap-4 p-2 bg-[#261E69] rounded-lg text-white items-center"
  >
    <div class="flex flex-row gap-3 px-2">
      <img :src="fabriqueCitoyenne" />
      <div>
        <h4 class="font-dm-sans font-bold text-lg leading-6">
          La fabrique Citoyenne
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
