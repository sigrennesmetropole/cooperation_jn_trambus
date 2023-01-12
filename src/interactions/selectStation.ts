// @ts-nocheck
/**
 * TODO : delete ts-nocheck and ask to VC System how we have an error on import of vcsLayerName
 * Error : Module '"@vcmap/core"' has no exported member 'vcsLayerName'.
 * */
import {
  AbstractInteraction,
  EventType,
  ModificationKeyType,
  vcsLayerName,
  type InteractionEvent,
} from '@vcmap/core'
import type { Feature } from 'ol'
import type { Point } from 'ol/geom'
import { useLineViewsStore } from '@/stores/views'

class SelectStationInteraction extends AbstractInteraction {
  private readonly _stationsLayerName: string

  constructor(stationsLayerName: string) {
    super(EventType.CLICKMOVE, ModificationKeyType.NONE)

    this._stationsLayerName = stationsLayerName
  }

  async pipe(event: InteractionEvent): Promise<InteractionEvent> {
    const isLayerFeature =
      event.feature?.[vcsLayerName] === this._stationsLayerName
    if (isLayerFeature) {
      const lineStore = useLineViewsStore()
      document.body.style.cursor = 'pointer'
      let stationName: string = ''
      if (event.type & EventType.CLICK) {
        console.log('click station')
      } else if (event.type & EventType.MOVE) {
        const feature: Feature<Point> = event.feature as Feature<Point>
        stationName = feature?.get('nom')
        lineStore.selectedStation = stationName
      }
    } else {
      document.body.style.cursor = 'auto'
    }
    return event
  }
}

export default SelectStationInteraction
