<script setup lang="ts">
import { useRouter } from 'vue-router'
import ChevronArrowLeft from '@/assets/icons/chevron-left.svg'
import UiButton from '@/components/ui/UiButton.vue'
import { usePanelsStore } from '@/stores/panels'
import { useTraveltimeInteractionStore } from '@/stores/interactionMap'

const traveltimeInteractionStore = useTraveltimeInteractionStore()
const router = useRouter()
const panelStore = usePanelsStore()

const props = defineProps({
  url: {
    type: String,
    default: '/home',
  },
})

function backButtonClicked() {
  router.push(props.url)
  // Reset any selection
  traveltimeInteractionStore.selectTraveltime(null)
  panelStore.isInformationPanelShown = true
}
</script>

<template>
  <UiButton
    class="shadow-md rounded-lg p-2 flex gap-2.5 shrink-0 grow-0 visible ui-btn-floating"
    @click="backButtonClicked"
  >
    <img :src="ChevronArrowLeft" />
  </UiButton>
</template>
<style></style>
