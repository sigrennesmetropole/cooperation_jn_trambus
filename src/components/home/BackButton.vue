<script setup lang="ts">
import ChevronArrowLeft from '@/assets/icons/chevron-left.svg'
import UiButton from '@/components/ui/UiButton.vue'
import { useRouter } from 'vue-router'
import { useTraveltimeInteractionStore } from '@/stores/interactionMap'

const traveltimeInteractionStore = useTraveltimeInteractionStore()

const props = defineProps({
  url: {
    type: String,
    default: '/home',
  },
})
const router = useRouter()

function backButtonClicked() {
  router.push(props.url)
  // Reset any selection
  traveltimeInteractionStore.selectTraveltime(null)
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
