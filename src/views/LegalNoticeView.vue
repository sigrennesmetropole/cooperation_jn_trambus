<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onBeforeMount, ref } from 'vue'
import { useViewsStore } from '@/stores/views'
import HeaderLegalNotice from '@/components/legal/HeaderLegalNotice.vue'
import LegalNotice from '@/components/legal/LegalNotice.vue'
import Privacy from '@/components/legal/PrivacyLegal.vue'
import SiteMap from '@/components/legal/SiteMap.vue'
import Accessibility from '@/components/legal/AccessibilityLegal.vue'
import Cookies from '@/components/legal/CookiesLegal.vue'
import CGULegal from '@/components/legal/CGULegal.vue'

const viewStore = useViewsStore()

const { params } = useRoute()
const routeParams = ref(params)
const legalLink = routeParams.value.legallink

onBeforeMount(async () => {
  viewStore.setLegalNoticeAsCurrentView()
})
</script>

<template>
  <div class="flex flex-row bg-neutral-100">
    <div
      class="w-screen h-screen font-dm-sans font-medium flex flex-col overflow-y-scroll"
    >
      <HeaderLegalNotice></HeaderLegalNotice>
      <LegalNotice v-if="legalLink == 'mentions-legales'"></LegalNotice>
      <Privacy v-else-if="legalLink == 'confidentialite'"></Privacy>
      <SiteMap v-else-if="legalLink == 'plan-du-site'"></SiteMap>
      <Accessibility v-else-if="legalLink == 'accessibilite'"></Accessibility>
      <Cookies v-else-if="legalLink == 'cookies'"></Cookies>
      <CGULegal v-else-if="legalLink == 'cgu'"></CGULegal>
    </div>
  </div>
</template>
