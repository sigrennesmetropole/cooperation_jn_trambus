<script setup lang="ts">
import IconLine from '../ui/icons/IconLine.vue'
import type { PropType } from 'vue'
import type { LineNumber } from '@/model/lines.model'
import IconTwoDirectionArrow from './icons/IconTwoDirectionArrow.vue'

const props = defineProps({
  line: {
    type: Number as PropType<LineNumber>,
    required: true,
  },
  name: String,
  start: String,
  end: String,
  frequency: Number,
  duration: {
    type: Boolean,
    default: true,
  },
})
</script>
<template>
  <button
    class="flex items-center px-0 py-3 gap-3 font-dm-sans"
    :aria-label="`Ligne ${props.line} : de la station ${props.start} à la station ${props.end}.`"
  >
    <IconLine :line="line" :size="'xl'"></IconLine>
    <div class="flex flex-col items-start p-0 grow">
      <div class="text-base font-bold" aria-hidden="true">
        {{ props.name }}
      </div>
      <div class="flex items-center p-0 gap-2">
        <div class="text-sm font-normal text-neutral-800" aria-hidden="true">
          {{ props.start }}
        </div>
        <IconTwoDirectionArrow></IconTwoDirectionArrow>
        <div class="text-sm font-normal text-neutral-800" aria-hidden="true">
          {{ props.end }}
        </div>
      </div>
    </div>
    <div
      class="flex flex-col items-start p-0 px-3 py-2 border border-slate-200 rounded"
      v-show="props.duration"
      aria-hidden="true"
    >
      <div class="text-xs text-neutral-700 font-normal">Toutes les</div>
      <div class="font-bold text-sm text-neutral-800">
        {{ props.frequency }} min
      </div>
    </div>
  </button>
</template>
