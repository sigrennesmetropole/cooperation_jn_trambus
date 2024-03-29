<script setup lang="ts">
import { inject, computed } from 'vue'
import { cloneViewPointAndResetCameraPosition } from '@/helpers/viewpointHelper'

import TravelMap from '@/assets/icons/travel-map.svg'
import { IconHome } from '@sigrennesmetropole/cooperation_jn_common_ui'
import { IconPlus } from '@sigrennesmetropole/cooperation_jn_common_ui'
import { IconMinus } from '@sigrennesmetropole/cooperation_jn_common_ui'
import { UiIconButton } from '@sigrennesmetropole/cooperation_jn_common_ui'
import { UiDescribeButton3D } from '@sigrennesmetropole/cooperation_jn_common_ui'
import { UiDescribeButtonCompass } from '@sigrennesmetropole/cooperation_jn_common_ui'

import CompassComponent from '@/components/map/CompassComponent.vue'

import { useMap3dStore } from '@/stores/map'
import { useViewsStore } from '@/stores/views'
import { viewList } from '@/model/views.model'
import type { RennesApp } from '@/services/RennesApp'
import { useRouter } from 'vue-router'
import { IconSynchronize } from '@sigrennesmetropole/cooperation_jn_common_ui'
import { useMapViewPointStore } from '@/stores/map'
import { useStationsStore } from '@/stores/stations'
import type { Viewpoint } from '@vcmap/core'
import { useLayersStore } from '@/stores/layers'
import { tiltViewpoint } from '@/helpers/viewpointHelper'

const stationsStore = useStationsStore()
const rennesApp = inject('rennesApp') as RennesApp
const map3dStore = useMap3dStore()
const viewStore = useViewsStore()
const router = useRouter()
const mapStore = useMapViewPointStore()
const layersStore = useLayersStore()

async function toggle3DMap() {
  layersStore.removeAlternativeOrtho()
  map3dStore.toggle3D()
}

async function zoom(out = false, zoomFactor = 2): Promise<void> {
  const activeMap = rennesApp.maps.activeMap
  const viewpoint = await activeMap?.getViewpoint()
  const maxZoom = rennesApp.get3DMap().getScene()!.screenSpaceCameraController
    .maximumZoomDistance

  if (activeMap && viewpoint) {
    let distance = viewpoint.distance! / zoomFactor
    if (out) {
      distance = Math.min(viewpoint.distance! * zoomFactor, maxZoom)
    }
    const newVp = cloneViewPointAndResetCameraPosition(viewpoint, distance)
    await rennesApp.maps?.activeMap.gotoViewpoint(newVp)
  }
}

const shouldDisplayHomeButton = () => {
  return ![viewList.traveltimes, viewList.home].includes(viewStore.currentView)
}

const heightClass = computed(() => {
  if (!shouldDisplayHomeButton() && map3dStore.is3D()) {
    return ['h-[24rem]']
  } else if (map3dStore.is3D()) {
    return ['h-[28rem]']
  }
  return ['h-90']
})

async function resetZoom() {
  if (viewStore.currentView !== 'station') {
    let viewpoint = rennesApp.viewpoints.getByKey(mapStore.viewPoint)
    viewpoint = tiltViewpoint(viewpoint!)
    const activeMap = rennesApp.maps.activeMap
    await activeMap!.gotoViewpoint(viewpoint!)
  } else {
    await rennesApp.maps?.activeMap!.gotoViewpoint(
      stationsStore.viewPointStation as Viewpoint
    )
  }
}

function setAlternativeMapChecked() {
  if (layersStore.visibilities.alternativeRennesOrtho === false) {
    layersStore.displayAlternativeOrtho()
  } else {
    layersStore.removeAlternativeOrtho()
  }
}
</script>

<template>
  <div
    :class="heightClass"
    class="transition-[height] absolute right-2 bottom-10 flex flex-col [&>*]:m-2 text-gray-dark items-center w-32 select-none [&>*:last-child]:mb-0"
  >
    <UiIconButton
      class="rounded-lg"
      @click="setAlternativeMapChecked()"
      v-show="map3dStore.is3D()"
      ariaLabelButton="Plan de ville"
      titleButton="Plan de ville"
      heightTitle="30"
      widthTitle="200"
      positionX="-210"
      positionY="12"
    >
      <img :src="TravelMap" />
    </UiIconButton>

    <UiIconButton
      class="rounded-lg"
      @click="router.push('/home')"
      v-show="shouldDisplayHomeButton()"
      ariaLabelButton="Revenir à l'accueil"
      titleButton="Revenir à l'accueil"
      heightTitle="30"
      widthTitle="200"
      positionX="-210"
      positionY="12"
    >
      <IconHome />
    </UiIconButton>
    <div class="flex flex-col zoom-buttons text-2xl [&>*]:p-2" role="group">
      <UiIconButton
        class="rounded-t-lg"
        @click="() => zoom(false)"
        ariaLabelButton="Zoom avant sur la carte"
        titleButton="Zoom avant sur la carte"
        heightTitle="30"
        widthTitle="200"
        positionX="-210"
        positionY="12"
      >
        <IconPlus />
      </UiIconButton>
      <UiIconButton
        @click="() => zoom(true)"
        ariaLabelButton="Zoom arrière sur la carte"
        titleButton="Zoom arrière sur la carte"
        heightTitle="30"
        widthTitle="200"
        positionX="-210"
        positionY="12"
      >
        <IconMinus />
      </UiIconButton>
      <UiIconButton
        class="rounded-b-lg"
        @click="() => resetZoom()"
        ariaLabelButton="Réinitialiser le zoom"
        titleButton="Réinitialiser le zoom"
        heightTitle="30"
        widthTitle="200"
        positionX="-210"
        positionY="12"
      >
        <IconSynchronize />
      </UiIconButton>
    </div>
    <UiIconButton
      class="rounded-lg"
      @click="toggle3DMap"
      :ariaLabelButton="
        map3dStore.is3D() ? 'Passer la carte en 2D' : 'Passer la carte en 3D'
      "
      :titleButton="
        map3dStore.is3D() ? 'Passer la carte en 2D' : 'Passer la carte en 3D'
      "
      heightTitle="30"
      widthTitle="200"
      positionX="-210"
      positionY="12"
    >
      {{ map3dStore.is3D() ? '2D' : '3D' }}
    </UiIconButton>
    <CompassComponent v-if="map3dStore.is3D()" />
  </div>

  <div class="absolute right-[120px] bottom-10 h-12" v-if="!map3dStore.is3D()">
    <UiDescribeButton3D></UiDescribeButton3D>
  </div>
  <div class="absolute right-[130px] bottom-12" v-else>
    <UiDescribeButtonCompass></UiDescribeButtonCompass>
  </div>
</template>
