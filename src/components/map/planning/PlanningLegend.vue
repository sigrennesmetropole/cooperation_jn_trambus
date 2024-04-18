<script lang="ts" setup>
import {
  LinePlanningStateTypes,
  LineName,
  linesImg,
} from '@/model/line-planning-state.model'
import { usePlanningStore } from '@/stores/planning'
import { useLinesStore } from '@/stores/lines'
import UiPlanningLegend from '@/components/ui/UiPlanningLegend.vue'
import type { LineNumber } from '@/model/lines.model'
const planningStore = usePlanningStore()
const linesStore = useLinesStore()

let items = [
  LinePlanningStateTypes.UNSTARTED,
  LinePlanningStateTypes.UNDER_CONSTRUCTION,
  LinePlanningStateTypes.COMMISIONING,
]
let lines = linesStore.lineDesciptions.map(
  (line, idx) =>
    new LineName(
      'line' + line.id,
      line.name,
      linesImg[idx],
      (idx + 1) as LineNumber
    )
)

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
