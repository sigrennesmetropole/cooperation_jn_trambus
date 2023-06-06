<script setup lang="ts">
import { computed } from 'vue'

import MetroAIcon from '@/assets/icons/metro-a.svg'
import MetroBIcon from '@/assets/icons/metro-b.svg'

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
    <div class="flex round-md">
      <img v-if="props.lines.indexOf('a') > -1" :src="MetroAIcon" />
      <img v-if="props.lines.indexOf('b') > -1" :src="MetroBIcon" />
    </div>
  </div>
</template>
