<script lang="ts" setup>
import { usePanelsStore } from '@/stores/panels'
import UiPanelControlButton from '@/components/ui/UiPanelControlButton.vue'
import { computed } from 'vue'
import { useViewsStore } from '@/stores/views'
const viewStore = useViewsStore()

const panelStore = usePanelsStore()
function toggleInformationPanel() {
  panelStore.toggleInformationPanel()
}

const leftAlignment = computed(() =>
  panelStore.isInformationPanelShown
    ? 'relative top-28'
    : 'absolute left-0 top-28'
)
const isConsultationPage = computed(() => {
  if (viewStore.currentView === 'consultation') {
    return true
  }
  return false
})
</script>

<template>
  <div class="flex shadow-sm min-h-screen">
    <div
      class="px-6 py-8 bg-white flex flex-col gap-2 max-h-screen overflow-y-auto scrollbar-hide"
      :class="isConsultationPage ? 'w-[600px]' : 'w-[450px]'"
      v-if="panelStore.isInformationPanelShown"
    >
      <slot></slot>
    </div>
    <div class="max-h-0 top-28">
      <UiPanelControlButton
        :anchor-position="'left'"
        :is-open="panelStore.isInformationPanelShown"
        @click="toggleInformationPanel"
        :class="leftAlignment"
        ariaLabelButton="Rétracter le panneau latéral pour afficher la carte sur tout l'écran"
      ></UiPanelControlButton>
    </div>
  </div>
</template>
