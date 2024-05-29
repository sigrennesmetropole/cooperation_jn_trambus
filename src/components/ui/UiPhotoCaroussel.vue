<script setup lang="ts">
import type { PropType } from 'vue'
import { ref, onMounted } from 'vue'
import iconMultiply from '@/assets/icons/icon-multiply.svg'
import iconArrowRight from '@/assets/icons/arrow-right-caroussel.svg'
import iconArrowLeft from '@/assets/icons/arrow-left-caroussel.svg'
import { UiButton } from '@sigrennesmetropole/cooperation_jn_common_ui'

const props = defineProps({
  photos: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  currentImage: {
    type: String,
    default: null,
  },
})

const indexCurrentImage = ref<number>(0)
const emit = defineEmits(['closeCaroussel'])

onMounted(async () => {
  props.photos.forEach((photo, index) => {
    if (photo == props.currentImage) {
      indexCurrentImage.value = index
    }
  })
})
</script>
<template>
  <div class="fixed top-0 left-0 w-full h-full z-20 bg-slate-900 bg-opacity-60">
    <div class="flex flex-row mt-14 mx-auto h-[85%] w-[80%] justify-center">
      <div class="flex flex-col">
        <UiButton
          class="shadow-md rounded-lg p-2 flex gap-3 w-9 h-9 shrink-0 grow-0 visible justify-center items-center my-auto ui-btn-floating"
          @click="
            indexCurrentImage > 0
              ? indexCurrentImage--
              : (indexCurrentImage = props.photos.length - 1)
          "
        >
          <img :src="iconArrowLeft" />
        </UiButton>
      </div>
      <div class="flex flex-col content-around bg-white p-3 rounded-lg mx-3">
        <img
          :key="props.photos[indexCurrentImage]"
          :src="props.photos[indexCurrentImage]"
          class="w-full h-[90%]"
        />
        <div class="flex flex-grow items-center justify-center">
          <span class="font-dm-sans font-normal text-lg">
            Illustrations des aménagements prévus autour des futures stations,
            avec voies de bus dédiées, arborées et agrémentées de zones
            piétonnes et cyclables.
          </span>
        </div>
      </div>
      <div class="flex flex-col">
        <img
          :src="iconMultiply"
          class="w-4 h-4 cursor-pointer -mb-4"
          @click="emit('closeCaroussel')"
        />

        <UiButton
          class="shadow-md rounded-lg p-2 flex gap-3 w-9 h-9 shrink-0 grow-0 visible justify-center items-center my-auto ui-btn-floating"
          @click="
            indexCurrentImage < props.photos.length - 1
              ? indexCurrentImage++
              : (indexCurrentImage = 0)
          "
        >
          <img :src="iconArrowRight" />
        </UiButton>
      </div>
    </div>
  </div>
</template>
