<script setup lang="ts">
import { computed } from 'vue'
import { getColorLine } from '@/services/color'
import { useRouter } from 'vue-router'
import { useLineViewsStore } from '@/stores/views'
import type { LineNumber } from '@/model/lines.model'
import { usePanelsStore } from '@/stores/panels'

import MetroAIcon from '@/assets/icons/metro-a.svg'
import MetroBIcon from '@/assets/icons/metro-b.svg'

import BusC1Icon from '@/assets/icons/bus-c1.svg'
import BusC2Icon from '@/assets/icons/bus-c2.svg'
import BusC3Icon from '@/assets/icons/bus-c3.svg'
import BusC4Icon from '@/assets/icons/bus-c4.svg'
import BusC5Icon from '@/assets/icons/bus-c5.svg'
import BusC6Icon from '@/assets/icons/bus-c6.svg'
import BusC7Icon from '@/assets/icons/bus-c7.svg'

import BikeIcon from '@/assets/icons/velo.svg'
import { RENNES_LAYER, useLayersStore } from '@/stores/layers'

const props = defineProps<{
  lines: string[]
  topPosition: number
  leftPosition: number
  metroLines: string[]
  busLines: string[]
  bike: boolean
}>()

const lineViewStore = useLineViewsStore()
const layerStore = useLayersStore()
const router = useRouter()
const panelStore = usePanelsStore()

const positionStyle = computed(() => {
  let style: string = ''
  const size_text = 9
  const label_height = 24
  if (
    props.topPosition + label_height > window.innerHeight ||
    props.leftPosition + size_text > window.innerWidth
  ) {
    style = 'display: none;'
  } else {
    style += 'top: ' + props.topPosition + 'px; '
    style += 'left: ' + props.leftPosition + 'px; '
  }
  return style
})

const goToLinePage = (line: string) => {
  const num_line = line.replace('T', '')
  if (parseInt(num_line) != lineViewStore.selectedLine) {
    router.push(`/line/${num_line}`)
    panelStore.isInformationPanelShown = true
  }
}

const getBgColorLine = (line: string) => {
  const num_line = parseInt(line.replace('T', '')) as LineNumber
  return getColorLine('bg', num_line, 600)
}
</script>

<template>
  <div class="absolute" :style="positionStyle" aria-hidden="true">
    <div class="flex p-1 round-md" v-if="props.lines.length > 0">
      <div
        v-for="line in props.lines"
        :key="line"
        class="px-2 py-0 border cursor-pointer text-white rounded-md border-black mr-1 font-bold font-dm-sans text-sm text-center items-center"
        :class="getBgColorLine(line)"
        @click="goToLinePage(line)"
      >
        {{ line }}
      </div>
    </div>
    <div
      class="flex p-1 round-md space-x-1"
      v-if="layerStore.visibilities[RENNES_LAYER.metro]"
    >
      <img v-if="props.metroLines.indexOf('a') > -1" :src="MetroAIcon" />
      <img v-if="props.metroLines.indexOf('b') > -1" :src="MetroBIcon" />
    </div>
    <div
      class="flex p-1 round-md space-x-1"
      v-if="layerStore.visibilities[RENNES_LAYER.bus]"
    >
      <img v-if="props.busLines.indexOf('C1') > -1" :src="BusC1Icon" />
      <img v-if="props.busLines.indexOf('C2') > -1" :src="BusC2Icon" />
      <img v-if="props.busLines.indexOf('C3') > -1" :src="BusC3Icon" />
      <img v-if="props.busLines.indexOf('C4') > -1" :src="BusC4Icon" />
      <img v-if="props.busLines.indexOf('C5') > -1" :src="BusC5Icon" />
      <img v-if="props.busLines.indexOf('C6') > -1" :src="BusC6Icon" />
      <img v-if="props.busLines.indexOf('C7') > -1" :src="BusC7Icon" />
    </div>
    <div
      class="flex p-1 round-md"
      v-if="layerStore.visibilities[RENNES_LAYER.bike]"
    >
      <img v-if="props.bike" :src="BikeIcon" />
    </div>
  </div>
</template>
