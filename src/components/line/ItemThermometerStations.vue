<script setup lang="ts">
import { ref, computed } from 'vue'
import type { PropType } from 'vue'
import IconLine from '@/components/ui/icons/IconLine.vue'
import IconBus from '@/components/ui/icons/IconBus.vue'
import IconParking from '@/components/ui/icons/IconParking.vue'
import type { LineNumber } from '@/model/lines.model'
import { getColorLine } from '@/services/color'
import type { BusNumber } from '@/model/bus.model'
import { useStationsStore } from '@/stores/stations'
import { useRouter } from 'vue-router'

const props = defineProps({
  index: {
    type: Number,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  line: {
    type: Number as PropType<LineNumber>,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  desserte: {
    type: String,
    required: true,
  },
  li_code: {
    type: String,
    required: true,
  },
  parking: {
    type: Boolean,
    required: false,
    default: false,
  },
  is_last_elem: {
    type: Boolean,
    required: true,
    default: false,
  },
  is_station_after_select: {
    type: Boolean,
    required: true,
    default: false,
  },
})
const stationActive = ref<Boolean>(false)
const stationInteractionOnMap = ref<Boolean>(false)
const borderColor = ref(getColorLine('border', props.line, 'classic'))
const router = useRouter()

let desserteSplit = props.desserte
  .split(' ')
  .filter((bus) => bus !== undefined && bus != '')
const desserteTab = ref<BusNumber[]>(
  desserteSplit.map((bus) => {
    let new_bus: BusNumber = bus as BusNumber
    return new_bus
  })
)

var lineTab = ref<LineNumber[]>([])
if (props.li_code != '') {
  let li_code_split = props.li_code.trim().split(' ')
  lineTab.value = li_code_split.map((line) => {
    let new_line: LineNumber = parseInt(line) as LineNumber
    return new_line
  })
}

const stationsStore = useStationsStore()
stationsStore.$subscribe(async () => {
  if (
    stationsStore.stationIsInStationsToDisplay(props.name) &&
    !stationsStore.stationIsInStationsToDisplayPermanently(props.name)
  ) {
    stationInteractionOnMap.value = true
  } else if (stationInteractionOnMap.value) {
    stationInteractionOnMap.value = false
  }
})

function getClassCircle() {
  let marginLeftNegative = '-ml-1'
  let border2px = 'border-2'
  if (stationActive.value || stationInteractionOnMap.value) {
    return [
      'min-w-[16px]',
      'w-4',
      'h-4',
      'border-black',
      marginLeftNegative,
      'border-[3px]',
    ]
  }
  if (props.index == 1 || props.is_last_elem) {
    return [
      'min-w-[16px]',
      'w-4',
      'h-4',
      marginLeftNegative,
      borderColor.value,
      'border-4',
    ]
  }
  return ['min-w-[8px]', 'w-2', 'h-2', borderColor.value, border2px]
}

function getClassBeforeCircle() {
  if (props.index == 1) {
    return []
  }
  var classBefore = [
    'before:absolute',
    "before:content-['']",
    'before:border-l-2',
    'before:' + getColorLine('border', props.line, 'classic'),
  ]
  let ml = 'before:ml-px'
  let bottom = 'before:bottom-[65%]'
  let height = 'before:h-[91%]'
  if (stationActive.value || stationInteractionOnMap.value) {
    ml = 'before:ml-[5px]'
    bottom = 'before:bottom-[75%]'
    height = 'before:h-[90%]'
  } else if (props.is_last_elem) {
    ml = 'before:ml-[3px]'
    height = 'before:h-[95%]'
  } else if (props.is_station_after_select) {
    height = 'before:h-[80%]'
  }

  return classBefore.concat([ml, bottom, height])
}

const classCircle = computed(() => {
  var classObject = ['rounded-full', 'mr-2', 'mb-3', 'mt-2']
  classObject = classObject.concat(getClassCircle())
  classObject = classObject.concat(getClassBeforeCircle())
  return classObject
})

function goToStationPage() {
  router.push(`/line/${props.line}/station/${props.id}`)
}
</script>

<template>
  <div
    class="flex items-center mb-1 cursor-pointer h-7"
    :aria-label="`Station ${name}.`"
    :class="stationActive || stationInteractionOnMap ? 'bg-slate-100' : ''"
    @mouseover="stationActive = true"
    @mouseleave="stationActive = false"
    tabindex="0"
    @click="goToStationPage()"
    role="button"
  >
    <div :id="'divcircle-' + name" :class="classCircle" />
    <p class="font-dm-sans font-bold text-base -tracking-[1%] w-80 h-6 mb-1">
      {{ name }}
    </p>
    <div class="ml-auto mr-1">
      <div class="flex">
        <template v-for="(line_connected, index) in lineTab" :key="index">
          <IconLine :line="line_connected" :size="'m'" class="mb-1 ml-px" />
        </template>
        <template v-for="(bus, index) in desserteTab" :key="index">
          <IconBus :bus="bus" :size="'m'" class="mb-1 ml-px" />
        </template>
        <template v-if="parking !== undefined && parking">
          <IconParking :size="'m'" class="mb-1 ml-px" />
        </template>
      </div>
    </div>
  </div>
</template>
