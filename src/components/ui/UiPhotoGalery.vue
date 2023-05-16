<script setup lang="ts">
import { usePanelsStore } from '@/stores/panels'
import { computed, PropType } from 'vue'
import UiPanelControlButton from './UiPanelControlButton.vue'
const panelStore = usePanelsStore()

const emit = defineEmits(['toggleEvent', 'clickImage'])

const props = defineProps({
  galleryShown: {
    type: Boolean,
    default: false,
  },
  photos: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
})

function sendEvent() {
  emit('toggleEvent')
}

function clickImage(photo: string) {
  emit('clickImage', photo)
}

const panelClass = computed(() => {
  if (panelStore.isInformationPanelShown == true) {
    return 'ml-[450px]'
  }
  return ''
})
</script>
<template>
  <div class="flex flex-col items-center justify-end p-0" :class="panelClass">
    <UiPanelControlButton
      :is-open="props.galleryShown"
      :anchor-position="'bottom'"
      @click="sendEvent"
      ariaLabelButton="Afficher les images de la métropole de Rennes"
    ></UiPanelControlButton>
    <div
      class="flex flex-row items-start p-3 gap-3 w-auto h-[172px] bg-white rounded-l-xl rounded-r-xl rounded-t-none rounded-b-none"
      :class="{ hidden: !props.galleryShown }"
    >
      <img
        v-for="photo in props.photos.slice(0, 3)"
        :key="photo"
        :src="photo"
        class="w-52 h-[156px] cursor-pointer"
        @click="clickImage(photo)"
        alt="''"
      />
    </div>
  </div>
</template>
