<script setup lang="ts">
import Calendar from '@/assets/icons/calendar.svg'
import Localization from '@/assets/icons/localization-icon.svg'
import chatBubble from '@/assets/icons/chat-bubble.svg'
import likeThumb from '@/assets/icons/like-thumb.svg'
import multiplePerson from '@/assets/icons/multiple-person.svg'
import { computed, ref } from 'vue'

const isHovered = ref(false)

const props = defineProps({
  img: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    default: 'open',
  },
  date: {
    type: String,
    default: 'Non renseigné',
  },
  place: {
    type: String,
    default: 'Non renseigné',
  },
  content: {
    type: String,
    default: 'Non renseigné',
  },
  meta_description: {
    type: String,
    default: 'Non renseigné',
  },
  comment: {
    type: Number,
    default: 0,
  },
  like: {
    type: Number,
    default: 0,
  },
  person: {
    type: Number,
    default: 0,
  },
  url: {
    type: String,
    default: '',
  },
})

const style = computed(() => {
  if (props.status === 'open') {
    return {
      buttonStyle: 'bg-amber-400',
      textStyle: 'text-black',
      textContent: 'Ouverte',
    }
  } else {
    return {
      buttonStyle: 'bg-white border border-neutral-300',
      textStyle: 'text-black',
      textContent: 'Terminée',
    }
  }
})

function goTo(link: string) {
  window.open(link, '_blank')
}
</script>

<template>
  <div
    class="flex flex-row gap-4 py-4 border-b border-b-slate-200"
    @click="goTo(props.url)"
    @mouseover="isHovered = true"
    @mouseout="isHovered = false"
    :class="{ 'cursor-pointer': isHovered }"
  >
    <div
      class="h-[133px] w-[200px] rounded-lg flex items-center justify-center"
    >
      <img
        class="w-full h-full object-cover"
        :src="props.img"
        alt="Illustration de la concertation"
      />
    </div>

    <div class="flex flex-col gap-2">
      <p class="font-dm-sans font-bold text-base">{{ props.title }}</p>
      <div class="flex flex-row gap-3 h-8">
        <button
          :class="style.buttonStyle"
          class="flex items-center py-1 px-2 rounded h-[28px]"
        >
          <div
            class="font-medium font-dm-sans text-sm text-center items-center"
            :class="style.textStyle"
          >
            {{ style.textContent }}
          </div>
        </button>
        <div class="flex flex-row gap-1.5 items-center">
          <img :src="Calendar" class="w-[15px] h-[15px]" />
          <p class="font-dm-sans font-normal text-xs">
            Cloturée le <br />
            {{ props.date }}
          </p>
        </div>
        <div class="flex flex-row gap-1.5 items-center">
          <img :src="Localization" class="w-4 h-4" />
          <p class="font-dm-sans font-normal text-xs">{{ props.place }}</p>
        </div>
      </div>
      <p class="font-dm-sans font-normal text-xs w-[320px]">
        {{ props.meta_description }}
      </p>
      <div class="flex flex-row gap-3 py-3">
        <div class="flex flex-row gap-1.5 items-center">
          <img :src="chatBubble" class="w-4 h-4" />
          <p>{{ props.comment }}</p>
        </div>
        <div class="border border-l border-slate-200"></div>
        <div class="flex flex-row gap-1.5 items-center">
          <img :src="likeThumb" class="w-4 h-4" />
          <p>{{ props.like }}</p>
        </div>
        <div class="border border-l border-slate-200"></div>
        <div class="flex flex-row gap-1.5 items-center">
          <img :src="multiplePerson" class="w-4 h-4" />
          <p>{{ props.person }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
