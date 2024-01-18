import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'

type ConfigType = {
  trambus: {
    projectPlanningBaseMapUrl: string
    projectPlanningLayerUrl: string
    fabriqueCitoyenneCGUUrl: string
  }
  link: {
    coopterr_link: string
    solar_link: string
    trambus_link: string
    ondes_link: string
    contact_link: string
  }
}

export const useConfigStore = defineStore('configStore', () => {
  const config: Ref<ConfigType | null> = ref(null)

  function setConfig(newConfig: ConfigType | null) {
    config.value = newConfig
  }

  return {
    config,
    setConfig,
  }
})
