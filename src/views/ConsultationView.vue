<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { viewList } from '@/model/views.model'
import { useViewsStore } from '@/stores/views'
import ChevronArrowRight from '@/assets/icons/chevron-left.svg'

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
  </main>
</template>
