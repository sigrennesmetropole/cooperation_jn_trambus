import { describe, it, expect, vi, beforeEach } from 'vitest'

import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import MapComponent from '../../map/MapComponent.vue'

import { usePanelsStore } from '@/stores/panels'
import { useLayersStore } from '@/stores/layers'
import { useLineViewsStore, useViewsStore } from '@/stores/views'

const wrapper = mount(MapComponent, {
  global: {
    plugins: [
      createTestingPinia({
        createSpy: vi.fn,
      }),
    ],
  },
})
const panelsStore = usePanelsStore()
const layersStore = useLayersStore()
const viewStore = useViewsStore()
const lineStore = useLineViewsStore()
describe('MapComponent', () => {
  beforeEach(() => {
    viewStore.currentView = 'home'
  })

  describe('when instantiate map componant', () => {
    beforeEach(async () => {})
    it('should display other lines ', () => {})
  })
})
