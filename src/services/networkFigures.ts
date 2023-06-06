import { getLinesId } from '@/services/line'
import type { NetworkFigureModel } from '@/model/network-figures.model'
import type { RennesApp } from '@/services/RennesApp'
import bikeIcon from '@/assets/icons/bike.svg'
import linesIcon from '@/assets/icons/lines.svg'
import stationIcon from '@/assets/icons/station.svg'
import { getStations } from '@/services/station'

const CYCLING_DISTANCE = 128

export async function fetchNetworkFigure(rennesApp: RennesApp) {
  const networkFigures: NetworkFigureModel[] = []

  const lines = await getLinesId(rennesApp)
  networkFigures.push({
    id: 'lines',
    figure: lines.length,
    description: 'Nouvelles lignes',
    icon: linesIcon,
  })

  const stations = await getStations(rennesApp)
  networkFigures.push({
    id: 'stations',
    figure: stations.length,
    description: 'Nouvelles stations',
    icon: stationIcon,
  })

  networkFigures.push({
    id: 'bike',
    figure: CYCLING_DISTANCE,
    description: 'Aménagement cyclables',
    unit: 'km',
    icon: bikeIcon,
  })

  return networkFigures
}
