import ConsultationComponent from '@/components/home/ConsultationComponent.vue'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'

describe('ConsultationComponent.vue', () => {
  let wrapper: VueWrapper

  beforeEach(async () => {
    wrapper = mount(ConsultationComponent, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            stubActions: false,
            stubPatch: false,
            fakeApp: true,
          }),
        ],
      },
    })
  })

  it('renders the component correctly', () => {
    expect(wrapper.exists()).toBe(true)

    expect(wrapper.html()).toMatchSnapshot()
  })
})
