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
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol.js"
import TextSymbol from "@arcgis/core/symbols/TextSymbol.js"
import Zoom from "@arcgis/core/widgets/Zoom.js"
import { PARISH_BOUNDARY_URL } from "../config/esri.js"

// CartoDB Voyager — shows roads, terrain, and water bodies (rivers in blue) with no auth required
const basemap = new Basemap({
  baseLayers: [
    new WebTileLayer({
      urlTemplate: "https://{subDomain}.basemaps.cartocdn.com/rastertiles/voyager/{level}/{col}/{row}.png",
      subDomains: ["a", "b", "c", "d"],
      copyright: "© OpenStreetMap contributors © CARTO"
    })
  ],
  title: "Voyager",
  id: "voyager"
})

const FILL_SYMBOL = new SimpleFillSymbol({
  color: [107, 127, 91, 0.22],
  outline: new SimpleLineSymbol({ color: [43, 51, 45, 1], width: 3.5 })
})

const LINE_SYMBOL = new SimpleLineSymbol({ color: [43, 51, 45, 1], width: 3.5 })

// Historic landmarks in Richland Parish
const LANDMARKS = [
  { name: "Richland Parish Courthouse", lon: -91.7554, lat: 32.4817 },
  { name: "Delhi Historic District",    lon: -91.4898, lat: 32.4579 },
  { name: "Mangham Town Hall",          lon: -91.7793, lat: 32.2995 },
  { name: "Holly Ridge Community",      lon: -91.7440, lat: 32.2287 },
  { name: "Archibald Historic Site",    lon: -91.7204, lat: 32.5126 },
  { name: "Girard Historic District",   lon: -91.6525, lat: 32.5357 },
  { name: "Start Community",            lon: -91.8434, lat: 32.3115 },
  { name: "Boeuf River Ferry Site",     lon: -91.8050, lat: 32.3850 },
]

// Water body label points — call out the two major waterways
const WATER_LABELS = [
  { name: "Boeuf River",  lon: -91.8220, lat: 32.4200 },
  { name: "Bayou Macon",  lon: -91.5200, lat: 32.3800 },
]

// Shield + star SVG — classic historic landmark marker shape
const SHIELD_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 32" width="26" height="32">
  <path d="M2,2 h22 v20 l-11,8 l-11,-8 Z" fill="#7A5C2E" stroke="#F7F5F0" stroke-width="1.8"/>
  <polygon points="13,7 14.5,12 19.5,12 15.5,15 17,20 13,17 9,20 10.5,15 6.5,12 11.5,12" fill="#F7F5F0"/>
</svg>`

const MARKER = new PictureMarkerSymbol({
  url: `data:image/svg+xml;base64,${btoa(SHIELD_SVG)}`,
  width: 26,
  height: 32
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
        haloColor: [255, 248, 240, 0.95],
        haloSize: 2,
        yoffset: -26,
        font: { size: 9, family: "sans-serif", weight: "bold" }
      })
    })
  ]
}

function makeWaterLabelGraphic(w) {
  return new Graphic({
    geometry: new Point({ longitude: w.lon, latitude: w.lat }),
    symbol: new TextSymbol({
      text: w.name,
      color: [40, 100, 160, 1],
      haloColor: [255, 255, 255, 0.8],
      haloSize: 2,
      font: { size: 10, family: "sans-serif", style: "italic", weight: "bold" }
    })
  })
}

export default function ParishMap({ className = "" }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const parishLayer = new FeatureLayer({
      url: PARISH_BOUNDARY_URL,
      popupEnabled: false
    })

    const landmarkLayer = new GraphicsLayer({
      graphics: [
        ...LANDMARKS.flatMap(makeLandmarkGraphics),
        ...WATER_LABELS.map(makeWaterLabelGraphic),
      ]
    })

    const map = new Map({
      basemap,
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
