import imgBikeRack from '@/assets/icons/services/bike-rack.png'
import imgInformationKiosk from '@/assets/icons/services/information-kiosk.png'
import imgStartNetworkInformation from '@/assets/icons/services/star-network-information.png'
import imgSeats from '@/assets/icons/services/seats.png'
import imgTicketMachine from '@/assets/icons/services/ticket-machine.png'
import imgComfort from '@/assets/icons/services/comfort.png'
import imgAccessibility from '@/assets/icons/services/accessibility.png'

export type ServiceType =
  | 'ticket-machine'
  | 'information-kiosk'
  | 'star-network-information'
  | 'accessibility'
  | 'bike-rack'
  | 'comfort'
  | 'seats'

export const TEXT_OF_SERVICE: Record<ServiceType, string> = {
  'ticket-machine': 'Distributeur de titre',
  'information-kiosk': "Borne d'information voyageur",
  'star-network-information': 'Information sur le réseau STAR',
  accessibility: 'Montée possible aux 4 portes',
  'bike-rack': 'Arceau vélo',
  comfort: 'Abri confortable',
  seats: 'Nombreuses assises',
}

// Montée possible aux 4 portes

// Abri confortable
// Nombreuses assises

export const IMG_OF_SERVICE: Record<ServiceType, string> = {
  'ticket-machine': imgTicketMachine,
  'information-kiosk': imgInformationKiosk,
  'star-network-information': imgStartNetworkInformation,
  accessibility: imgAccessibility,
  'bike-rack': imgBikeRack,
  comfort: imgComfort,
  seats: imgSeats,
}

export interface ServiceModel {
  type: ServiceType
  idStation: number
}
