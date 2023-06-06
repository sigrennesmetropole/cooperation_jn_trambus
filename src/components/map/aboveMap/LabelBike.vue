<script setup lang="ts">
import { computed } from 'vue'

import BikeIcon from '@/assets/icons/velo.svg'

const props = defineProps<{
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
  <div class="absolute" :style="positionStyle" aria-hidden="true">
    <div class="flex round-md space-x-1">
      <img :src="BikeIcon" />
    </div>
  </div>
</template>
