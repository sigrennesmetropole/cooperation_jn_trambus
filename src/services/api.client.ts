import { stationsFixtures } from '@/model/stations.fixtures'
import type { StationModel } from '@/model/stations.model'
import { photoFixtures } from '@/model/photos.fixtures'
import type { PhotoModel } from '@/model/photos.model'
import { servicesFixtures } from '@/model/services.fixtures'
import type { ServiceModel } from '@/model/services.model'
import { filterStationsByLineNumber } from '@/services/station'

class ApiClientService {
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
