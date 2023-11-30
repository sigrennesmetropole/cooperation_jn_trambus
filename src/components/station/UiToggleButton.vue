<script setup lang="ts">
defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },

  state: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <button
    :disabled="disabled"
    :class="{
      'bg-slate-300 pl-0.5': !state,
      'bg-black pl-5': state,
    }"
    class="transition-all duration-300 ease-in-out w-[42px] h-6 pr-5 py-0.5 rounded-[30px] justify-start items-start gap-2.5 inline-flex"
  >
    <div class="w-5 h-5 relative">
      <div
        class="w-5 h-5 left-0 top-0 absolute bg-white rounded-full shadow"
      ></div>
    </div>
  </button>
</template>
