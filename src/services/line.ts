import type { RennesApp } from '@/services/RennesApp'
import { RENNES_LAYER } from '@/stores/layers'
import { fetchStationsByLine } from '@/services/station'
import type { StationModel } from '@/model/stations.model'
import type { LineModel, LineNumber } from '@/model/lines.model'
import { useLinesStore } from '@/stores/lines'
import type { Point } from 'ol/geom'

export async function getLinesId(rennesApp: RennesApp) {
  const layer = await rennesApp.getLayerByKey(RENNES_LAYER.trambusLines)
  const ids: string[] = []
  layer.getFeatures().forEach((f) => {
    const li_nom = f.getProperties()['li_nom']
    const id = li_nom.split('T')[1]
    if (ids.indexOf(id) == -1) {
      ids.push(id)
    }
  })
  return ids.sort()
}

/**
 * Compute the first and the last stations of a line given the list of stations of the app
 * @param stations
 * @param lineNumber
 */
function _computeTerminus(stations: StationModel[], lineNumber: number) {
  const startStation = stations.find(
    // @ts-ignore
    (s) => s['ordre_t' + lineNumber.toString()] == 1
  )
  const endStation = stations.find(
    // @ts-ignore
    (s) => s['ordre_t' + lineNumber.toString()] == stations.length
  )
  return [startStation, endStation]
}

export async function fetchLineFrequency(
  rennesApp: RennesApp,
  lineNumber: number
) {
  const lines = await rennesApp.getFeaturesThatContainAttributeFromLayer(
    RENNES_LAYER.appTrambusLines,
    'li_code',
    lineNumber.toString()
  )
  const line = lines[0]
  const frequency = line.getProperties()['frequence'] // example: "4 min"
  const num_frequency = frequency.split(' ')[0]
  return num_frequency
}

export async function fetchLineDescriptions(rennesApp: RennesApp) {
  const lines = await getLinesId(rennesApp)
  const linesDescriptions: LineModel[] = []
  for (const line of lines) {
    const stations = await fetchStationsByLine(rennesApp, parseInt(line))
    const [startStation, endStation] = _computeTerminus(
      stations,
      parseInt(line)
    )
    const frequency = await fetchLineFrequency(rennesApp, parseInt(line))
    linesDescriptions.push({
      id: parseInt(line) as LineNumber,
      name: 'Ligne T' + line,
      start: startStation?.nom || '',
      end: endStation?.nom || '',
      frequency: parseInt(frequency),
      prettyPoint: (endStation?.point || startStation?.point) as Point,
    })
  }
  return linesDescriptions
}

export async function fetchLineDescription(
  rennesApp: RennesApp,
  lineNumber: number
) {
  const lines = await fetchLineDescriptions(rennesApp)
  return lines.find((line) => line.id == lineNumber)
}

export async function storeLineDescriptions(rennesApp: RennesApp) {
  const lineDesciptions = await fetchLineDescriptions(rennesApp)
  const linesStore = useLinesStore()
  linesStore.setLineDescriptions(lineDesciptions)
}

/**
 * get all the terminus of all the lines stores in the app
 */
export function getAllTerminus(): string[] {
  const startEndStations: string[] = []
  const linesStore = useLinesStore()
  linesStore.lineDesciptions.forEach((line) => {
    startEndStations.push(line.start)
    startEndStations.push(line.end)
  })
  return startEndStations
}

/**
 * get first and last stop of a line
 * @param lineNumber
 */
export function getTerminusOfLine(lineNumber: LineNumber): string[] {
  const linesStore = useLinesStore()
  const line = linesStore.lineDesciptions.find((line) => line.id == lineNumber)
  return line ? [line.start, line.end] : []
}
