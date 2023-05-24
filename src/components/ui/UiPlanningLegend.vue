<script lang="ts" setup>
import type { PropType } from 'vue'
import type {
  LineName,
  LinePlanningStateTypes,
} from '@/model/line-planning-state.model'

const props = defineProps({
  items: {
    type: Array as PropType<LinePlanningStateTypes[]>,
    default: () => [],
  },
  lines: {
    type: Array as PropType<LineName[]>,
    default: () => [],
  },
  highlightedItemId: String,
})

const emit = defineEmits(['update-line-planning-state'])

const setLinePlanningState = (item: LinePlanningStateTypes) => {
  emit('update-line-planning-state', item)
}

function isHighlighted(item: LinePlanningStateTypes): boolean {
  return props.highlightedItemId == null || props.highlightedItemId == item.id
}
</script>

<template>
  <div
    class="h-[357px] w-[202px] flex flex-col bg-white rounded-lg shadow-lg gap-3 p-4"
  >
    <p class="font-dm-sans text-base font-bold">Statut des travaux</p>
    <div
      v-for="item of items"
      :key="item.id"
      @click="setLinePlanningState(item)"
      class="flex-1 flex flex-row items-center relative hover:font-medium cursor-pointer pl-4"
      :class="{ 'text-neutral-500': !isHighlighted(item) }"
      :style="{
        borderLeft: '5px',
        borderLeftStyle: 'solid',
        borderLeftColor: isHighlighted(item)
          ? item.color
          : item.deemphasizedColor,
      }"
    >
      <label class="container">{{ item.printValue }} </label>
      <input type="radio" />
      <span class="checkmark"></span>
    </div>
    <div class="border-b border-neutral-300"></div>
    <p class="font-dm-sans text-base font-bold">Lignes</p>
    <div
      v-for="line of lines"
      :key="line.id"
      class="flex-1 flex flex-row items-center relative hover:font-medium cursor-pointer"
    >
      <img :src="line.img" class="w-6 mr-3" />
      <label class="container">{{ line.printValue }} </label>
      <input type="radio" />
      <span class="checkmark"></span>
    </div>
  </div>
</template>

<style setup>
input {
  height: 24px;
  width: 24px;
}

input {
  accent-color: black;
}
</style>
