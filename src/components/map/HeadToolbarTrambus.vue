<script setup lang="ts">
import { computed } from 'vue'

import UiButton from '@/components/ui/UiButton.vue'
import { UiIconButton } from '@sigrennesmetropole/cooperation_jn_common_ui'
import IconCalendar from '@/components/ui/icons/IconCalendar.vue'
import IconVelo from '@/components/ui/icons/logo-transports-icons/IconVelo.vue'
import IconBus from '@/components/ui/icons/logo-transports-icons/IconBus.vue'
import IconMetro from '@/components/ui/icons/logo-transports-icons/IconMetro.vue'
import IconTB from '@/components/ui/icons/logo-transports-icons/IconTB.vue'

import LoginButtons from '@/components/map/buttons/LoginButtons.vue'

import { usePanelsStore } from '@/stores/panels'
import { useLayersStore } from '@/stores/layers'
import type { RennesLayer } from '@/stores/layers'
import { useViewsStore, useLineViewsStore } from '@/stores/views'
import { viewList } from '@/model/views.model'

const panelStore = usePanelsStore()
const layerStore = useLayersStore()
const viewStore = useViewsStore()
const lineStore = useLineViewsStore()

const isLayerButtonsVisible = computed(() => {
  return [viewList.home, viewList.line, viewList.station].includes(
    viewStore.currentView
  )
})

const isTrambusButtonVisible = computed(() => {
  return [viewList.line, viewList.station].includes(viewStore.currentView)
})

const isPlanningButtonVisible = computed(() => {
  return viewStore.currentView == viewList.home
})

function onPlanningButtonClicked() {
  panelStore.isPlanningViewShown = true
  panelStore.hasPlanningViewRendered = true
}

function toggleLayer(name: RennesLayer) {
  layerStore.toggleLayer(name)
}

function activeAllTrambusLine() {
  lineStore.displayOtherLines()
}
</script>

<template>
  <div class="absolute right-2 top-2 z-10 flex [&>*]:m-1" id="head-toolbar">
    <div
      class="inline-flex shadow-sm rounded-md"
      role="group"
      v-show="isLayerButtonsVisible"
    >
      <UiIconButton
        @click="() => activeAllTrambusLine()"
        :active="lineStore.displayedOtherLines"
        type="button"
        class="rounded-l-lg px-3 py-3 border border-gray-200 bg-white text-gray-900 inline-flex items-center"
        v-if="isTrambusButtonVisible"
        titleButton="Afficher les autres lignes de trambus"
        ariaLabelButton="Afficher les autres lignes de trambus sur la carte"
      >
        <IconTB :active="lineStore.displayedOtherLines"></IconTB>
      </UiIconButton>
      <UiIconButton
        @click="() => toggleLayer('metro')"
        :active="layerStore.visibilities.metro"
        type="button"
        :class="{ 'rounded-l-lg': !isTrambusButtonVisible }"
        class="px-3 py-3 border border-gray-200 bg-white text-gray-900 inline-flex items-center"
        titleButton="Afficher les lignes de métros"
        ariaLabelButton="Afficher les lignes de métros sur la carte"
      >
        <IconMetro :active="layerStore.visibilities.metro"></IconMetro>
      </UiIconButton>
      <UiIconButton
        @click="() => toggleLayer('bus')"
        :active="layerStore.visibilities.bus"
        type="button"
        class="border-t px-3 py-3 border-b border-gray-200 bg-white text-gray-900 inline-flex items-center"
        titleButton="Afficher les lignes de bus"
        ariaLabelButton="Afficher les lignes de bus sur la carte"
      >
        <IconBus :active="layerStore.visibilities.bus"></IconBus>
      </UiIconButton>
      <UiIconButton
        @click="() => toggleLayer('bike')"
        :active="layerStore.visibilities.bike"
        type="button"
        class="rounded-r-md px-3 py-3 border border-gray-200 bg-white text-gray-900 inline-flex items-center"
        titleButton="Afficher les pistes cyclables"
        ariaLabelButton="Afficher les pistes cyclables sur la carte"
      >
        <IconVelo :active="layerStore.visibilities.bike"></IconVelo>
      </UiIconButton>
    </div>
    <UiButton
      class="ui-btn-floating ui-btn-regular-size"
      @click="onPlanningButtonClicked"
      :icon="IconCalendar"
      :disabled="false"
      v-show="isPlanningButtonVisible"
    >
      <span class="font-dm-sans font-medium text-base">
        Planning du projet
      </span>
    </UiButton>
    <LoginButtons> </LoginButtons>
  </div>
</template>
