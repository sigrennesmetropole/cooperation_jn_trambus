<script setup lang="ts">
import Calendar from '@/assets/icons/calendar.svg'
import Localization from '@/assets/icons/localization-icon.svg'
import chatBubble from '@/assets/icons/chat-bubble.svg'
import likeThumb from '@/assets/icons/like-thumb.svg'
import multiplePerson from '@/assets/icons/multiple-person.svg'
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    default: '',
  },
  date: {
    type: String,
    default: '01/01/2001',
  },
  place: {
    type: String,
    default: '',
  },
  content: {
    type: String,
    default: '',
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
})

const style = computed(() => {
  if (props.status === 'open') {
    return {
      buttonStyle: 'bg-amber-400',
      textStyle: 'text-black',
      textContent: 'Ouverte',
    }
  } else if (props.status === 'inAnalysis') {
    return {
      buttonStyle: 'bg-slate-500',
      textStyle: 'text-white',
      textContent: 'En analyse',
    }
  } else {
    return {
      buttonStyle: 'bg-white border border-neutral-300',
      textStyle: 'text-black',
      textContent: 'Terminée',
    }
  }
})
</script>

<template>
  <div class="flex flex-row gap-4 py-4 border-b border-b-slate-200">
    <slot name="img"></slot>
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
      <p class="font-dm-sans font-normal text-xs">{{ props.content }}</p>
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
