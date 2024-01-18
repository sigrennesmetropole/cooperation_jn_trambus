<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import {
  UiHeaderFullScreen,
  UiMidLegalNotice,
} from '@sigrennesmetropole/cooperation_jn_common_ui'
import logoRennes from '@/assets/illustrations/logoRennes.png'
import { legalList } from '@/constants/legalLinks'
import { useViewsStore } from '@/stores/views'
import { viewList } from '@/model/views.model'

const router = useRouter()
const { params } = useRoute()
const routeParams = ref(params)
const legalLink = routeParams.value.legallink.toString()
const viewStore = useViewsStore()

function goTo(link: string) {
  router.push(link)
}
const close = () => {
  if (viewStore.currentView == viewList.legalnotice) {
    window.close()
  }
}
</script>

<template>
  <UiHeaderFullScreen @close-legal="close">
    <template v-slot:title-img>
      <img class="ml-8" :src="logoRennes" alt="Rennes Métropole" />
    </template>
    <template v-slot:mid-content>
      <UiMidLegalNotice
        :go-to="goTo"
        :legal-link="legalLink"
        :legal-list="legalList"
      >
      </UiMidLegalNotice>
    </template>
    <template v-slot:button-content>
      <span class="text-base font-medium">Fermer</span>
    </template>
  </UiHeaderFullScreen>
</template>
