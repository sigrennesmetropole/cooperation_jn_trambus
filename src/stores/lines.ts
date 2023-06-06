import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import type { LineModel } from '@/model/lines.model'

export const useLinesStore = defineStore('lines', () => {
  const lineDesciptions: Ref<LineModel[]> = ref([])

  function setLineDescriptions(lines: LineModel[]) {
    lineDesciptions.value = lines
  }

  return {
    lineDesciptions,
    setLineDescriptions,
  }
})
