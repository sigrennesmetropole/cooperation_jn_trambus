<script setup lang="ts">
import fabriqueCitoyenne from '@/assets/illustrations/fabrique-citoyenne-logo.png'
</script>

<template>
  <div class="bg-[#f0eeff] px-8 py-6 flex flex-row gap-6 items-center">
    <img :src="fabriqueCitoyenne" class="w-[192px] h-[128px]" />
    <div class="font-dm-sans text-[#312783]">
      <h2 class="text-2xl font-bold">
        Bienvenue dans l'espace des concertations
      </h2>
      <p class="text-sm font-normal">
        Aidez nous à améliorer votre projet en contribuant aux concertations.
      </p>
    </div>
  </div>
</template>
