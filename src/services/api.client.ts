import { photoFixtures } from '@/model/photos.fixtures'
import type { PhotoModel } from '@/model/photos.model'
import { servicesFixtures } from '@/model/services.fixtures'
import type { ServiceModel } from '@/model/services.model'

class ApiClientService {
  async fetchPhotos() {
    return new Promise<PhotoModel[]>((resolve) => {
      resolve(photoFixtures())
    })
  }

  async fetchFirstPhotoOfLine(lineNumber: number) {
    return new Promise<PhotoModel>((resolve) => {
      resolve(photoFixtures().find((photo) => photo.line == lineNumber)!)
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
