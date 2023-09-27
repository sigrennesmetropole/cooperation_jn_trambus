import { LineString, Point } from 'ol/geom'
import type Feature from 'ol/Feature'

export async function lineStringsFromStationPois(
  station: Feature,
  pois: Feature[]
) {
  const promises = pois.map(async (poi) => {
    const lineString = new LineString([
      (station?.getGeometry() as Point).getCoordinates(),
      (poi?.getGeometry() as Point).getCoordinates(),
    ])
    return lineString
  })
  const lineStrings = await Promise.all(promises)
  return lineStrings
}
