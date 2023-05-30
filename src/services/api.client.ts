import { linesFixtures } from '@/model/lines.fixtures'
import type { LineModel } from '@/model/lines.model'
import { stationsFixtures } from '@/model/stations.fixtures'
import type { StationModel } from '@/model/stations.model'
import { photoFixtures } from '@/model/photos.fixtures'
import type { PhotoModel } from '@/model/photos.model'
import { travelTimeFixtures } from '@/model/travel-time.fixtures'
import type { TravelTimeModel } from '@/model/travel-time.model'
import type { NetworkFigureModel } from '../model/network-figures.model'
import { servicesFixtures } from '@/model/services.fixtures'
import type { ServiceModel } from '@/model/services.model'
import { filterStationsByLineNumber } from '@/services/station'

import bikeIcon from '../assets/icons/bike.svg'
import linesIcon from '../assets/icons/lines.svg'
import stationIcon from '../assets/icons/station.svg'

const CYCLING_DISTANCE = 128

export const networkFiguresFixtures = async (): Promise<
  NetworkFigureModel[]
> => [
  {
    id: 'lines',
    figure: await apiClientService.numberOfLine(),
    description: 'Nouvelles lignes',
    icon: linesIcon,
  },
  {
    id: 'stations',
    figure: await apiClientService.numberOfStations(),
    description: 'Nouvelles stations',
    icon: stationIcon,
  },
  {
    id: 'bike',
    figure: CYCLING_DISTANCE,
    description: 'Aménagement cyclables',
    unit: 'km',
    icon: bikeIcon,
  },
]

class ApiClientService {
  async fetchNetworkFigure() {
    return new Promise<NetworkFigureModel[]>((resolve) => {
      resolve(networkFiguresFixtures())
    })
  }

  async fetchTravelTimeByLine(lineNumber: number) {
    return new Promise<TravelTimeModel[]>((resolve) => {
      resolve(
        travelTimeFixtures().filter((travel) => travel.line == lineNumber)
      )
    })
  }

  async fetchTravelTimeByIndex(index: number) {
    return new Promise<TravelTimeModel>((resolve) => {
      resolve(travelTimeFixtures()[index])
    })
  }

  async fetchTravelTime(count: number | null = null) {
    return new Promise<TravelTimeModel[]>((resolve) => {
      if (count == null) {
        resolve(travelTimeFixtures())
      } else {
        resolve(travelTimeFixtures().slice(0, count))
      }
    })
  }

  async fetchLineDescriptions() {
    return new Promise<LineModel[]>((resolve) => {
      resolve(linesFixtures())
    })
  }

  async numberOfLine() {
    return new Promise<number>((resolve) => {
      resolve(linesFixtures().length)
    })
  }

  async fetchLineDescription(lineNumber: number) {
    return new Promise<LineModel>((resolve) => {
      resolve(linesFixtures()[lineNumber - 1])
    })
  }

  async fetchLineFrequency(lineNumber: number) {
    return new Promise<number>((resolve) => {
      resolve(linesFixtures()[lineNumber - 1]['frequency'])
    })
  }

  async fetchPhotos() {
    return new Promise<PhotoModel[]>((resolve) => {
      resolve(photoFixtures())
    })
  }

  async fetchPhotoByLine(lineNumber: number) {
    return new Promise<PhotoModel>((resolve) => {
      resolve(photoFixtures().find((photo) => photo.line == lineNumber)!)
    })
  }

  async fetchStationsOrderByLine(lineNumber: number) {
    return new Promise<StationModel[]>((resolve) => {
      resolve(stationsFixtures())
    }).then((val) => {
      const num_line = 'T' + lineNumber.toString()
      val = filterStationsByLineNumber(val, num_line)
      return val
    })
  }

  async numberOfStations() {
    const lines = []
    const stations = []
    const linesDescription = await apiClientService.fetchLineDescriptions()
    for (const lineDescription of linesDescription) {
      lines.push(lineDescription.id)
    }
    for (const numberLine of lines) {
      const stationList = await apiClientService.fetchStationsOrderByLine(
        numberLine
      )
      stations.push(stationList.length)
    }
    const initValue = 0
    const sumStations = stations.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      initValue
    )
    return sumStations
  }

  async fetchStationDescription(stationId: number) {
    return new Promise<StationModel>((resolve) => {
      resolve(stationsFixtures().find((station) => station.id == stationId)!)
    })
  }
  /* eslint-disable @typescript-eslint/no-unused-vars */
  async fetchServicesByStation(stationId: number) {
    //TODO: when RENNES send data of services, filter services by stationId
    return new Promise<ServiceModel[]>((resolve) => {
      resolve(servicesFixtures())
    })
  }
  /* eslint-enable @typescript-eslint/no-unused-vars */
}

export const apiClientService = new ApiClientService()
