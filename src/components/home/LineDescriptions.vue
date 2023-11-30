<script setup lang="ts">
import { reactive, onMounted, ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import type { LineModel } from '@/model/lines.model'
import UiLineDescription from '@/components/ui/UiLineDescription.vue'
import { useHomeViewsStore } from '@/stores/views'
import type { LineNumber } from '@/model/lines.model'
import type { RennesApp } from '@/services/RennesApp'
import { fetchLineDescriptions } from '@/services/line'

const state = reactive({
  lineDescription: null as null | LineModel[],
})
const router = useRouter()
const homeViewStore = useHomeViewsStore()
const rennesApp = inject('rennesApp') as RennesApp

onMounted(async () => {
  state.lineDescription = await fetchLineDescriptions(rennesApp)
})

function goToLinePage(line: number) {
  homeViewStore.setSelectedLineOnHomePage(null)
  router.push(`/line/${line}`)
}

const lineActive = ref<number | null>(null)

function overLine(line: number) {
  if (lineActive.value === null) {
    lineActive.value = line
  } else {
    return
  }
  homeViewStore.setSelectedLineOnHomePage(line as LineNumber)
}

function leaveLine() {
  lineActive.value = null
  homeViewStore.setSelectedLineOnHomePage(null)
}
</script>

<template>
  <div class="flex flex-col p-0 gap-2">
    <h2 class="font-dm-sans font-bold text-lg leading-6">
      Les nouvelles lignes
    </h2>
    <ul
      class="flex flex-col p-0 gap-2 grow"
      aria-label="Liste des nouvelles lignes"
    >
      <UiLineDescription
        v-for="lineDescription in state.lineDescription"
        role="button"
        @click="goToLinePage(lineDescription.id)"
        @mouseover="overLine(lineDescription.id)"
        @mouseleave="leaveLine()"
        :class="lineActive === lineDescription.id ? 'bg-slate-100' : ''"
        :key="lineDescription.id"
        :line="lineDescription.id"
        :name="lineDescription.name"
        :start="lineDescription.start"
        :end="lineDescription.end"
        :frequency="lineDescription.frequency"
      >
      </UiLineDescription>
    </ul>
  </div>
</template>
