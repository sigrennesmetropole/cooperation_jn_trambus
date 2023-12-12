<script setup lang="ts">
import { UiLinkFooter } from '@sigrennesmetropole/cooperation_jn_common_ui'
import type { PropType } from 'vue'
import type { LegalItem } from '@sigrennesmetropole/cooperation_jn_common_ui/dist/model/legalItem.model'

const props = defineProps({
  textColor: {
    type: String,
    required: false,
    default: 'neutral-500',
  },
  legalList: Array as PropType<LegalItem[]>,
})

function openLink(linkToFollow: string) {
  window.open(linkToFollow, '_blank')
}
</script>

<template class="mt-auto">
  <footer
    class="flex flex-col p-2 gap-4 font-dm-sans divide-y divide-neutral-200"
    id="footer"
  >
    <div
      class="flex flex-wrap items-end gap-[7px] pt-2 font-dm-sans font-normal text-xs leading-4 text-neutral-500 underline hover:cursor-pointer"
    >
      <UiLinkFooter
        v-for="item in props.legalList"
        tabindex="0"
        :key="item['name']"
        @keydown.enter="openLink(item['link'])"
        @click="openLink(item['link'])"
        :textColor="props.textColor"
        >{{ item['name'] }}</UiLinkFooter
      >
    </div>
  </footer>
</template>
