import { useRef, useEffect } from "react"
import Map from "@arcgis/core/Map.js"
import MapView from "@arcgis/core/views/MapView.js"
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js"
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer.js"
import Graphic from "@arcgis/core/Graphic.js"
import Point from "@arcgis/core/geometry/Point.js"
import Basemap from "@arcgis/core/Basemap.js"
import WebTileLayer from "@arcgis/core/layers/WebTileLayer.js"
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer.js"
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol.js"
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol.js"
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol.js"
import TextSymbol from "@arcgis/core/symbols/TextSymbol.js"
import Zoom from "@arcgis/core/widgets/Zoom.js"
import { PARISH_BOUNDARY_URL } from "../config/esri.js"

const lightBasemap = new Basemap({
  baseLayers: [
    new WebTileLayer({
      urlTemplate: "https://{subDomain}.basemaps.cartocdn.com/light_all/{level}/{col}/{row}.png",
      subDomains: ["a", "b", "c", "d"],
      copyright: "© OpenStreetMap contributors © CARTO"
    })
  ],
  title: "Light",
  id: "light"
})

const FILL_SYMBOL = new SimpleFillSymbol({
  color: [107, 127, 91, 0.18],
  outline: new SimpleLineSymbol({ color: [43, 51, 45, 1], width: 4 })
})

const LINE_SYMBOL = new SimpleLineSymbol({ color: [43, 51, 45, 1], width: 4 })

const LANDMARKS = [
  { name: "Richland Parish Courthouse", lon: -91.7554, lat: 32.4817 },
  { name: "Delhi Historic District",    lon: -91.4898, lat: 32.4579 },
  { name: "Mangham Town Hall",          lon: -91.7793, lat: 32.2995 },
  { name: "Boeuf River Landing",        lon: -91.8050, lat: 32.3850 },
]

const MARKER = new SimpleMarkerSymbol({
  style: "circle",
  color: [107, 127, 91, 1],
  size: 10,
  outline: { color: [255, 248, 240, 1], width: 1.5 }
})

function makeLandmarkGraphics(landmark) {
  const point = new Point({ longitude: landmark.lon, latitude: landmark.lat })
  return [
    new Graphic({ geometry: point, symbol: MARKER }),
    new Graphic({
      geometry: point,
      symbol: new TextSymbol({
        text: landmark.name,
        color: [43, 51, 45, 1],
        haloColor: [255, 248, 240, 0.9],
        haloSize: 2,
        yoffset: -20,
        font: { size: 10, family: "sans-serif", weight: "bold" }
      })
    })
  ]
}

export default function ParishMap({ className = "" }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const parishLayer = new FeatureLayer({
      url: PARISH_BOUNDARY_URL,
      popupEnabled: false
    })

    const landmarkLayer = new GraphicsLayer({
      graphics: LANDMARKS.flatMap(makeLandmarkGraphics)
    })

    const map = new Map({
      basemap: lightBasemap,
      layers: [parishLayer, landmarkLayer]
    })

    const view = new MapView({
      container: containerRef.current,
      map,
      center: [-91.77, 32.37],
      zoom: 10,
      ui: { components: [] },
      constraints: { snapToZoom: false }
    })

    const zoom = new Zoom({ view })
    view.ui.add(zoom, "bottom-right")

    view.when(() => {
      parishLayer.load().then(() => {
        const symbol = parishLayer.geometryType === "polygon" ? FILL_SYMBOL : LINE_SYMBOL
        parishLayer.renderer = new SimpleRenderer({ symbol })

        parishLayer.queryExtent().then((result) => {
          if (!result?.extent) return
          const paddedExtent = result.extent.expand(1.35)
          view.goTo(paddedExtent, { duration: 1200 }).then(() => {
            view.constraints.geometry = paddedExtent
            view.constraints.minScale = view.scale * 1.05
            view.constraints.maxScale = 10000
          })
        })
      })
    })

    return () => { view.destroy() }
  }, [])

  return <div ref={containerRef} className={className} />
}
