import { getLinesId } from '@/services/line'
import type { NetworkFigureModel } from '@/model/network-figures.model'
import type { RennesApp } from '@/services/RennesApp'
import bikeIcon from '@/assets/icons/bike.svg'
import linesIcon from '@/assets/icons/lines.svg'
import stationIcon from '@/assets/icons/station.svg'
import { getStations } from '@/services/station'
import { useConfigStore } from '@/stores/config'

const CYCLING_DISTANCE = 128

export async function fetchNetworkFigure(rennesApp: RennesApp) {
  const configStore = useConfigStore()

  const networkFigures: NetworkFigureModel[] = []

  const lines = await getLinesId(rennesApp)
  networkFigures.push({
    id: 'lines',
    figure: lines.length,
    description: 'Lignes',
    icon: linesIcon,
  })

  const stations = await getStations(rennesApp)
  networkFigures.push({
    id: 'stations',
    figure: stations.length,
    description: 'Stations',
    icon: stationIcon,
  })

  networkFigures.push({
    id: 'bike',
    figure:
      configStore.config?.trambus.misc.cycling_distance || CYCLING_DISTANCE,
    description: 'Aménagement cyclable',
    unit: 'km',
    icon: bikeIcon,
  })

  return networkFigures
}
