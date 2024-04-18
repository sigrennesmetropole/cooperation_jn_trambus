<script lang="ts" setup>
import { PropType, Ref, ref } from 'vue'
import type {
  LineName,
  LinePlanningStateTypes,
} from '@/model/line-planning-state.model'
import { usePlanningStore } from '@/stores/planning'
import IconLine from '@/components/ui/icons/IconLine.vue'
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

planningStore.$subscribe(() => {
  for (let line of props.lines) {
    if (planningStore.selectedLine == 0) {
      selectedLine.value = null
    }
    if (line.number == planningStore.selectedLine) {
      selectedLine.value = line
    }
  }
})

function setSelectedLine(line: number) {
  if (planningStore.selectedLine == line) {
    planningStore.selectedLine = 0
  } else {
    planningStore.selectedLine = line
  }
  if (selectedLine.value?.number === line) {
    selectedLine.value = null
  }
}
</script>

<template>
  <div class="w-[202px] flex flex-col bg-white rounded-lg shadow-lg gap-3 p-4">
    <p class="font-dm-sans text-base font-bold">Statut des travaux</p>
    <div
      v-for="item of props.items"
      :key="item.id"
      class="flex-1 flex flex-row items-center relative hover:font-medium pl-4"
      :style="{
        borderLeft: '5px',
        borderLeftStyle: 'solid',
        borderLeftColor: item.color,
      }"
    >
      <label class="cursor-pointer" :for="item.id"
        >{{ item.printValue }}
      </label>
      <div class="mr-auto"></div>
      <input
        role="radio"
        type="radio"
        name="status"
        class="checked:bg-black checked:hover:bg-black checked:active:bg-black checked:focus:bg-black focus:outline-none focus:ring-1 focus:ring-white cursor-pointer"
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
      class="flex-1 flex flex-row items-center relative hover:font-medium"
    >
      <label class="cursor-pointer flex flex-row" :for="line.id"
        ><IconLine :line="line.number" size="m" class="mr-3 ml-px"></IconLine>
        {{ line.printValue }}
      </label>

      <div class="mr-auto"></div>
      <input
        type="radio"
        name="line"
        class="checked:bg-black checked:hover:bg-black checked:active:bg-black checked:focus:bg-black focus:outline-none focus:ring-1 focus:ring-white cursor-pointer"
        :id="line.id"
        :value="line"
        v-model="selectedLine"
        @click="setSelectedLine(line.number)"
      />
    </div>
  </div>
</template>
