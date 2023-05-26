<script lang="ts" setup>
import { PropType, Ref, ref } from 'vue'
import type {
  LineName,
  LinePlanningStateTypes,
} from '@/model/line-planning-state.model'
import { usePlanningStore } from '@/stores/planning'
const planningStore = usePlanningStore()

const props = defineProps({
  items: {
    type: Array as PropType<LinePlanningStateTypes[]>,
    default: () => [],
  },
  lines: {
    type: Array as PropType<LineName[]>,
    default: () => [],
  },
})

const selectedStatus: Ref<LinePlanningStateTypes | null> = ref(null)
const selectedLine: Ref<LineName | null> = ref(null)

const emit = defineEmits(['update-line-planning-state'])

const setLinePlanningState = (item: LinePlanningStateTypes) => {
  emit('update-line-planning-state', item)
  if (selectedStatus.value?.id === item.id) {
    selectedStatus.value = null
  }
}

function setSelectedLine(line: number) {
  if (planningStore.selectedLine == line) {
    planningStore.selectedLine = 0
  } else {
    planningStore.selectedLine = line
  }
  if (selectedLine.value?.number === line) {
    selectedLine.value = null
    //changer dynamiquement la class de l'input selectionné
  }
}
</script>

<template>
  <div class="w-[202px] flex flex-col bg-white rounded-lg shadow-lg gap-3 p-4">
    <p class="font-dm-sans text-base font-bold">Statut des travaux</p>
    <div
      v-for="item of props.items"
      :key="item.id"
      class="flex-1 flex flex-row items-center relative hover:font-medium cursor-pointer pl-4"
      :style="{
        borderLeft: '5px',
        borderLeftStyle: 'solid',
        borderLeftColor: item.color,
      }"
    >
      <label :for="item.id">{{ item.printValue }} </label>
      <div class="mr-auto"></div>
      <input
        role="radio"
        type="radio"
        name="status"
        class="checked:bg-black checked:hover:bg-black checked:active:bg-black checked:focus:bg-black focus:bg-black focus:outline-none focus:ring-1 focus:ring-black"
        :id="item.id"
        :value="item"
        v-model="selectedStatus"
        @click="setLinePlanningState(item)"
      />
    </div>
    <div class="border-b border-neutral-300"></div>
    <p class="font-dm-sans text-base font-bold">Lignes</p>
    <div
      v-for="line of props.lines"
      :key="line.id"
      class="flex-1 flex flex-row items-center relative hover:font-medium cursor-pointer"
    >
      <img :src="line.img" class="h-6 mr-3" />
      <label :for="line.id">{{ line.printValue }} </label>
      <div class="mr-auto"></div>
      <input
        type="radio"
        name="line"
        class="checked:bg-black checked:hover:bg-black checked:active:bg-black checked:focus:bg-black focus:bg-black focus:outline-none focus:ring-1 focus:ring-black"
        :id="line.id"
        :value="line"
        v-model="selectedLine"
        @click="setSelectedLine(line.number)"
      />
    </div>
  </div>
</template>

<style setup>
/* input {
  accent-color: black;
} */
</style>
