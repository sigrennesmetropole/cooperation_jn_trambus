<script lang="ts" setup>
import { ref } from 'vue'
import { computed } from 'vue'
import iconToolTipBlack from '@/assets/icons/icon-tooltip.svg'
import iconTooltipGrey from '@/assets/icons/icon-tooltip-grey.svg'

const props = defineProps({
  text: String,
  widthButton: String,
  heightButton: {
    type: String,
    default: '12',
  },
  widthBoxText: String,
  positionRight: {
    type: String,
    default: '16px',
  },
  positionTop: {
    type: String,
    default: '16px',
  },
})

const displayTooltip = ref(false)

const classDimensionButton = computed(() => {
  return 'w-' + props.widthButton + ' h-' + props.heightButton
})

const stylePositionButton = computed(() => {
  const positionTop = 'top: ' + props.positionTop + ';'
  const positionRight = 'right: ' + props.positionRight + ';'
  return positionTop + ' ' + positionRight
})

const stylePositionText = computed(() => {
  const propsPosTop = parseInt(props.positionTop.replace('px', '')) + 8
  const positionTop =
    'top: ' + (parseInt(props.heightButton) * 4 + propsPosTop) + 'px;'
  const popsPosRight = parseInt(props.positionRight.replace('px', '')) + 20
  const positionRight = 'right: -' + popsPosRight + 'px;'
  return positionTop + ' ' + positionRight
})
</script>
<template>
  <div class="absolute z-9" :style="stylePositionButton">
    <button
      class="bg-white rounded flex items-center justify-center cursor-pointer"
      :class="classDimensionButton"
      @click="displayTooltip = !displayTooltip"
      :aria-label="'Contenu tooltip:' + props.text"
    >
      <img v-if="!displayTooltip" :src="iconTooltipGrey" class="w-5 h-5" />
      <img v-else :src="iconToolTipBlack" class="w-5 h-5" />
    </button>
  </div>
  <div
    class="absolute z-50"
    :class="props.widthBoxText"
    :style="stylePositionText"
    v-if="displayTooltip"
  >
    <div class="bg-neutral-800 opacity-90 p-2 gap-3 rounded z-[1000]">
      <template v-if="props.text !== ''">
        <span class="text-sm font-normal text-neutral-200">
          {{ props.text }}
        </span>
      </template>
      <template v-else>
        <slot></slot>
      </template>
    </div>
  </div>
</template>
