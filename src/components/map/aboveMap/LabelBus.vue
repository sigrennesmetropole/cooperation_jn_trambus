<script setup lang="ts">
import { computed } from 'vue'

import BusC1Icon from '@/assets/icons/bus-c1.svg'
import BusC2Icon from '@/assets/icons/bus-c2.svg'
import BusC3Icon from '@/assets/icons/bus-c3.svg'
import BusC4Icon from '@/assets/icons/bus-c4.svg'
import BusC5Icon from '@/assets/icons/bus-c5.svg'
import BusC6Icon from '@/assets/icons/bus-c6.svg'
import BusC7Icon from '@/assets/icons/bus-c7.svg'

const props = defineProps<{
  lines: string[]
  topPosition: number
  leftPosition: number
}>()

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
</script>

<template>
  <div
    class="absolute"
    :style="positionStyle"
    v-if="props.lines.length > 0"
    aria-hidden="true"
  >
    <div class="flex p-2 round-md">
      <img v-if="props.lines.indexOf('C1') > -1" :src="BusC1Icon" />
      <img v-if="props.lines.indexOf('C2') > -1" :src="BusC2Icon" />
      <img v-if="props.lines.indexOf('C3') > -1" :src="BusC3Icon" />
      <img v-if="props.lines.indexOf('C4') > -1" :src="BusC4Icon" />
      <img v-if="props.lines.indexOf('C5') > -1" :src="BusC5Icon" />
      <img v-if="props.lines.indexOf('C6') > -1" :src="BusC6Icon" />
      <img v-if="props.lines.indexOf('C7') > -1" :src="BusC7Icon" />
    </div>
  </div>
</template>
