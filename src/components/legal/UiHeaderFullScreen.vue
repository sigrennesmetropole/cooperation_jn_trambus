<script setup lang="ts">
function restartHome() {
  window.close()
}
</script>

<template>
  <div
    class="absolute top-0 left-0 flex flex-row items-center justify-between px-9 gap-12 w-[100%] h-[72px] bg-white shadow z-40"
  >
    <div class="flex flex-row items-center">
      <slot name="title-img"></slot>
    </div>
    <slot name="mid-content"></slot>
    <div>
      <button
        @click="restartHome()"
        class="bg-white border border-black shadow-sm rounded-lg gap-3 px-4 py-3 items-center flex flex-row justify-center"
      >
        <slot name="button-content"></slot>
      </button>
    </div>
  </div>
</template>
