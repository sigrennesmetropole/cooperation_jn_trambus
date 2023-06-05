import type { RennesApp } from '@/services/RennesApp'
import type { TravelTimeModel } from '@/model/travel-time.model'
import { RENNES_LAYER } from '@/stores/layers'
import type { LineNumber } from '@/model/lines.model'

export async function getAllTravelTimes(rennesApp: RennesApp) {
  const layer = await rennesApp.getLayerByKey(RENNES_LAYER.trambusTempsParcours)
  const travelTimes: TravelTimeModel[] = []
  layer.getFeatures().forEach((feature) => {
    const num_line = feature.get('li_code').split('T')[1]
    travelTimes.push({
      id: feature.get('id'),
      line: num_line as LineNumber,
      new: parseInt(feature.get('temps_futur')),
      old: parseInt(feature.get('temps_actuel')),
      start: feature.get('arret_depart'),
      end: feature.get('arret_destination'),
    })
  })

  // Sort travelTimes by line
  travelTimes.sort((a, b) => {
    return a.line - b.line
  })

  return travelTimes
}

export async function fetchTravelTime(
  rennesApp: RennesApp,
  count: number | null = null
) {
  const allTravelTimes = await getAllTravelTimes(rennesApp)
  if (count == null) {
    return allTravelTimes
  } else {
    return allTravelTimes.slice(0, count)
  }
}

export async function fetchTravelTimeByLine(
  rennesApp: RennesApp,
  lineNumber: number
) {
  const allTravelTimes = await getAllTravelTimes(rennesApp)
  return allTravelTimes.filter((travel) => travel.line == lineNumber)
}
