<script lang="ts" setup>
import {
  LinePlanningStateTypes,
  LineName,
} from '@/model/line-planning-state.model'
import { usePlanningStore } from '@/stores/planning'
import UiPlanningLegend from '@/components/ui/UiPlanningLegend.vue'
const planningStore = usePlanningStore()

let items = [
  LinePlanningStateTypes.UNSTARTED,
  LinePlanningStateTypes.UNDER_CONSTRUCTION,
  LinePlanningStateTypes.COMMISIONING,
]
let lines = [LineName.LINE_1, LineName.LINE_2, LineName.LINE_3, LineName.LINE_4]

const updateLineState = (lineState: LinePlanningStateTypes) => {
  planningStore.setLinePlanningState(lineState)
}
</script>

<template>
  <UiPlanningLegend
    :items="items"
    :lines="lines"
    @update-line-planning-state="updateLineState"
    class="absolute right-8 top-8"
  ></UiPlanningLegend>
</template>
