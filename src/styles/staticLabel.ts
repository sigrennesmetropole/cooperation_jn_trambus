import type { FeatureLike } from 'ol/Feature'
import { Icon, Style } from 'ol/style'

import MetroAIcon from '@/assets/icons/metro-a.svg'
import MetroBIcon from '@/assets/icons/metro-b.svg'

import BusC1Icon from '@/assets/icons/bus-c1.svg'
import BusC2Icon from '@/assets/icons/bus-c2.svg'
import BusC3Icon from '@/assets/icons/bus-c3.svg'
import BusC5Icon from '@/assets/icons/bus-c5.svg'
import BusC6Icon from '@/assets/icons/bus-c6.svg'
import BusC7Icon from '@/assets/icons/bus-c7.svg'

import BikeIcon from '@/assets/icons/velo.svg'

import type { LayersVisibility } from '@/stores/layers'

export function staticLabelStyle(line: string, isLayerShown: boolean): Style[] {
  if (!isLayerShown) {
    return []
  }

  const iconMapping: Record<string, string> = {
    a: MetroAIcon,
    b: MetroBIcon,
    c1: BusC1Icon,
    c2: BusC2Icon,
    c3: BusC3Icon,
    c5: BusC5Icon,
    c6: BusC6Icon,
    c7: BusC7Icon,
    bike: BikeIcon,
  }

  const imgSource = iconMapping[line]
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
  const layerName = feature.getProperties()['layerName']
  const line = feature.getProperties()['line']
  if (layerName && line) {
    return staticLabelStyle(line, layerVisibilities[layerName])
  }

  return []
}
