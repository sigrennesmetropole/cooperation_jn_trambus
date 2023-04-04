<script setup lang="ts">
import { ref } from 'vue'
import type { LineNumber } from '@/model/lines.model'
import ItemThermometerStations from '@/components/line/ItemThermometerStations.vue'
import type { StationModel } from '@/model/stations.model'
import { useStationsStore } from '@/stores/stations'

type actionItem = 'leave' | 'over'

const props = defineProps<{
  line: LineNumber
  stations: StationModel[]
}>()

const stationsStore = useStationsStore()
const idStationAfterSelectStation = ref<number>(0)

function mouseOverAndLeaveItem(
  action: actionItem,
  stationName: string,
  index: number
) {
  if (
    action == 'leave' &&
    stationsStore.stationIsInStationsToDisplay(stationName)
  ) {
    stationsStore.deleteStationToDisplay(stationName)
  } else if (
    action == 'over' &&
    !stationsStore.stationIsInStationsToDisplay(stationName)
  ) {
    stationsStore.addStationToDisplay(stationName)
  }

  if (index + 1 < props.stations.length) {
    idStationAfterSelectStation.value = props.stations[index + 1].id
  }
}
</script>

<template>
  <div class="flex flex-col items-start p-0 gap-2">
    <h2 class="font-dm-sans font-bold text-lg leading-6">
      Toutes les stations
    </h2>
  </div>

  <div>
    <div
      class="list-stations"
      title="Liste des nouvelles stations."
      v-if="props.stations.length > 0"
    >
      <ItemThermometerStations
        v-for="(station, index) in props.stations"
        :key="index"
        @mouseover="mouseOverAndLeaveItem('over', station.nom, index)"
        @mouseleave="mouseOverAndLeaveItem('leave', station.nom, index)"
        @focus="mouseOverAndLeaveItem('over', station.nom, index)"
        @blur="mouseOverAndLeaveItem('leave', station.nom, index)"
        :index="index + 1"
        :id="station.id"
        :line="props.line"
        :name="station.nom"
        :parking="station.parking"
        :desserte="station.desserte"
        :li_code="station.li_code"
        :is_last_elem="index + 1 === props.stations.length"
        :is_station_after_select="station.id === idStationAfterSelectStation"
      />
    </div>
  </div>
</template>

<style scoped>
.list-stations {
  list-style: none;
}

.list-stations > a {
  position: relative;
}
</style>
