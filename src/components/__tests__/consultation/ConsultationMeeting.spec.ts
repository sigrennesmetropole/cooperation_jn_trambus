import ConsultationComponent from '@/components/consultation/ConsultationMeeting.vue'
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

describe('ConsultationComponent', () => {
  const wrapper = mount(ConsultationComponent, {
    props: {
      illustration: 'src/assets/illustrations/ex_consultation.png',
      title: 'Vos réactions au futur aménagement du réseau trambus',
      status: 'open',
      date: '15/10/2023',
      place: 'Zone géographique',
      content:
        'Appaisement du traffic et végétalisation des espaces. La rue chicogné va faire l’objet d’une requalification',
      comment: 481,
      like: 1291,
      person: 353,
    },
  })

  it('renders correctly', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
})
