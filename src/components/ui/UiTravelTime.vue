<script setup lang="ts">
import type { LineNumber } from '@/model/lines.model'
import { type PropType, computed } from 'vue'
import IconLine from '../ui/icons/IconLine.vue'
import IconLineArrow from './icons/IconLineArrow.vue'
import { getColorLine } from '@/services/color'

const props = defineProps({
  newDuration: Number,
  oldDuration: Number,
  lineNumber: {
    type: Number as PropType<LineNumber>,
    required: true,
  },
  startStation: String,
  endStation: String,
  colored: {
    type: Boolean,
    default: true,
  },
  clickable: {
    type: Boolean,
  },
})

const containerStyle = computed(() => {
  let bgColor = 'bg-slate-100'
  let borderColor = 'border-slate-50'
  let clickable = ''
  if (props.colored) {
    bgColor = getColorLine('bg', props.lineNumber, 100)
    borderColor = getColorLine('border', props.lineNumber, 50)
  }
  if (props.clickable == false) {
    clickable = 'disabled'
  }

  return [bgColor, borderColor, clickable]
})
</script>
<template>
  <a
    class="flex items-center px-3 py-0 gap-2.5 rounded font-dm-sans hover:bg-white hover:border-slate-600 border"
    :class="containerStyle"
    :id="props.lineNumber + ':' + props.startStation + '-' + props.endStation"
    href="#"
  >
    <div
      class="flex flex-col justify-center items-start pt-3 pr-3 pb-3 pl-0"
      :aria-label="
        'Pour la ligne ' +
        props.lineNumber +
        ' entre la station' +
        props.startStation +
        ' et la station' +
        props.endStation +
        ' le temps de parcours est de ' +
        props.newDuration +
        ' minutes au lieu de ' +
        props.oldDuration +
        ' minutes'
      "
    >
      <div class="flex items-center px-0.5 py-0 gap-1 rounded">
        <div class="font-bold text-base leading-5" aria-hidden="true">
          {{ props.newDuration }} min
        </div>
      </div>
      <div class="flex flex-col items-start p-0 gap-1">
        <div
          class="font-normal text-xs leading-4 text-neutral-500"
          aria-hidden="true"
        >
          au lieu de {{ props.oldDuration }}
        </div>
      </div>
    </div>
    <IconLineArrow :lineNumber="props.lineNumber"></IconLineArrow>
    <div class="flex flex-col items-start p-0 gap-1 grow">
      <div
        class="flex flex-col justify-center items-start p-0 gap-1.5"
        aria-hidden="true"
      >
        <div class="font-medium text-sm leading-5">
          {{ props.startStation }}
        </div>
        <div class="font-medium text-sm leading-5" aria-hidden="true">
          {{ props.endStation }}
        </div>
      </div>
    </div>
    <IconLine :line="lineNumber" :size="'l'"></IconLine>
  </a>
</template>

<style scoped>
.disabled {
  cursor: default;
  pointer-events: none;
}
</style>
