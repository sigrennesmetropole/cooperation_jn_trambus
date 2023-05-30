import type { FeatureLike } from 'ol/Feature'
import { Icon, Style } from 'ol/style'

import MetroAIcon from '@/assets/icons/metro-a.svg'
import MetroBIcon from '@/assets/icons/metro-b.svg'

import BusC1Icon from '@/assets/icons/bus-c1.svg'
import BusC2Icon from '@/assets/icons/bus-c2.svg'
import BusC3Icon from '@/assets/icons/bus-c3.svg'
import BusC4Icon from '@/assets/icons/bus-c4.svg'
import BusC5Icon from '@/assets/icons/bus-c5.svg'
import BusC6Icon from '@/assets/icons/bus-c6.svg'
import BusC7Icon from '@/assets/icons/bus-c7.svg'

import { type LayersVisibility, RENNES_LAYER } from '@/stores/layers'

export function metroStaticLabelStyle(
  metroLine: string,
  isMetroLayerShown: boolean
): Style[] {
  if (!isMetroLayerShown) {
    return []
  }
  let imgSource
  if (metroLine === 'a') {
    imgSource = MetroAIcon
  } else if (metroLine === 'b') {
    imgSource = MetroBIcon
  }
  if (imgSource) {
    return [
      new Style({
        image: new Icon({
          opacity: 1,
          src: imgSource,
          scale: 1,
        }),
      }),
    ]
  } else {
    return []
  }
}

export function busStaticLabelStyle(
  busLine: string,
  isBusLayerShown: boolean
): Style[] {
  const busIconMapping: Record<string, string> = {
    c1: BusC1Icon,
    c2: BusC2Icon,
    c3: BusC3Icon,
    c4: BusC4Icon,
    c5: BusC5Icon,
    c6: BusC6Icon,
    c7: BusC7Icon,
  }

  if (!isBusLayerShown) {
    return []
  }
  const imgSource = busIconMapping[busLine]
  if (imgSource) {
    return [
      new Style({
        image: new Icon({
          opacity: 1,
          src: imgSource,
          scale: 1,
        }),
      }),
    ]
  }
  return []
}

export function staticLabelStyleFunction(
  feature: FeatureLike,
  layerVisibilities: LayersVisibility
): Style[] {
  const layerType = feature.getProperties()['type']
  if (layerType === 'metro') {
    const metroLine = feature.getProperties()['line']
    return metroStaticLabelStyle(
      metroLine,
      layerVisibilities[RENNES_LAYER.metro]
    )
  } else if (layerType === 'bus') {
    const busLine = feature.getProperties()['line']
    return busStaticLabelStyle(busLine, layerVisibilities[RENNES_LAYER.bus])
  }
  return []
}
