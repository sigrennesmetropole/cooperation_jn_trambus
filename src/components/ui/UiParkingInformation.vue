<script setup lang="ts">
import ParkingIcon from '@/assets/icons/parkingRelais.png'

const props = defineProps({
  name: String,
  station: String,
  place: Number,
})
</script>
<template>
  <div class="flex flex-row items-center gap-4 h-20">
    <img :src="ParkingIcon" />
    <div class="flex flex-col items-start justify-center p-0 h-16">
      <div class="font-dm-sans font-bold text-base leading-6">
        Parking {{ props.name }}
      </div>
      <div class="flex flex-row items-center p-0 gap-3 h-5">
        <div class="h-5 font-dm-sans font-normal text-sm leading-5">
          {{ props.station }}
        </div>
      </div>
    </div>
  </div>
</template>
