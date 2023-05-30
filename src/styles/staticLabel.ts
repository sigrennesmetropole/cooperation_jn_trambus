import type { FeatureLike } from 'ol/Feature'
import { Icon, Style } from 'ol/style'

import MetroAIcon from '@/assets/icons/metro-a.svg'
import MetroBIcon from '@/assets/icons/metro-b.svg'
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

export function staticLabelStyleFunction(
  feature: FeatureLike,
  layerVisibilities: LayersVisibility
): Style[] {
  const metroLine = feature.getProperties()['line']
  return metroStaticLabelStyle(metroLine, layerVisibilities[RENNES_LAYER.metro])
}
