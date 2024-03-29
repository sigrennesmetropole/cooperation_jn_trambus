import {
  VcsApp,
  VcsModule,
  CesiumMap,
  EventType,
  GeoJSONLayer,
  OpenlayersMap,
  Viewpoint,
} from '@vcmap/core'
import mapClickAndMoveInteraction from '@/interactions/clickAndMoveInteraction'
import type { RennesLayer } from '@/stores/layers'
import { useMap3dStore } from '@/stores/map'

export class RennesApp extends VcsApp {
  readonly mapConfig
  constructor(mapConfig: object) {
    super()
    this.mapConfig = mapConfig
  }

  async initializeMap() {
    const context = new VcsModule(this.mapConfig)
    await this.addModule(context)

    const cesiumMap = this.get3DMap()
    await cesiumMap?.initialize()
    if (cesiumMap && cesiumMap.getScene()) {
      const homeViewPoint = this.viewpoints.getByKey('rennes') as Viewpoint
      cesiumMap.getScene()!.screenSpaceCameraController.maximumZoomDistance =
        homeViewPoint.distance!
      cesiumMap.getScene()!.skyAtmosphere.show = false
      cesiumMap.getScene()!.globe.showGroundAtmosphere = false
      cesiumMap.getScene()!.skyBox.show = false
    }

    // block max zoom level to initial one
    const olMap = this.get2DMap().olMap
    if (olMap) {
      olMap.getView().setMinZoom(olMap.getView().getZoom()!)
    }
    this.maps.eventHandler.featureInteraction.setActive(EventType.CLICKMOVE)
    this.maps.eventHandler.addPersistentInteraction(
      new mapClickAndMoveInteraction(this)
    )

    const mapStore = useMap3dStore()
    mapStore.isInitializeMap = true
  }

  async getLayerByKey(key: RennesLayer) {
    const layer: GeoJSONLayer = this.layers.getByKey(key) as GeoJSONLayer
    await layer.fetchData()
    return layer
  }

  async getFeaturesFromLayer(key: RennesLayer) {
    const layer = await this.getLayerByKey(key)
    return layer.getFeatures()
  }

  async filterFeaturesByAttribute(
    attribute: string,
    value: string,
    layer: GeoJSONLayer
  ) {
    const selected = layer
      .getFeatures()
      .filter((feature) => feature.getProperties()[attribute] === value)
    return selected
  }

  async getFeaturesByAttributeFromLayer(
    layer_key: RennesLayer,
    attribute: string,
    value: string
  ) {
    const layer = await this.getLayerByKey(layer_key)
    const features = await this.filterFeaturesByAttribute(
      attribute,
      value,
      layer
    )
    return features
  }

  async getFeatureByAttributeFromLayer(
    layer_key: RennesLayer,
    attribute: string,
    value: string
  ) {
    const features = await this.getFeaturesByAttributeFromLayer(
      layer_key,
      attribute,
      value
    )
    return features[0]
  }

  async filterFeaturesThatContainAttribute(
    attribute: string,
    value: string,
    layer: GeoJSONLayer
  ) {
    const selected = layer
      .getFeatures()
      .filter((feature) => feature.getProperties()[attribute].includes(value))
    return selected
  }

  async getFeaturesThatContainAttributeFromLayer(
    layer_key: RennesLayer,
    attribute: string,
    value: string
  ) {
    const layer = await this.getLayerByKey(layer_key)
    const features = await this.filterFeaturesThatContainAttribute(
      attribute,
      value,
      layer
    )
    return features
  }

  get3DMap(): CesiumMap {
    return this.maps.getByKey('cesium') as CesiumMap
  }

  get2DMap(): OpenlayersMap {
    return this.maps.getByKey('ol') as OpenlayersMap
  }
}
