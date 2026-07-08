import { useRef, useEffect } from "react"
import Map from "@arcgis/core/Map.js"
import MapView from "@arcgis/core/views/MapView.js"
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js"
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer.js"
import Graphic from "@arcgis/core/Graphic.js"
import Point from "@arcgis/core/geometry/Point.js"
import Polyline from "@arcgis/core/geometry/Polyline.js"
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

// Major waterways — simplified polyline paths through Richland Parish
const RIVERS = [
  {
    name: "Boeuf River",
    labelLon: -91.838, labelLat: 32.425,
    // flows N→S through western Richland Parish
    path: [
      [-91.855, 32.570], [-91.848, 32.535], [-91.838, 32.498],
      [-91.822, 32.462], [-91.810, 32.425], [-91.805, 32.388],
      [-91.800, 32.350], [-91.795, 32.308], [-91.790, 32.270]
    ]
  },
  {
    name: "Bayou Macon",
    labelLon: -91.510, labelLat: 32.415,
    // flows N→S through eastern Richland Parish
    path: [
      [-91.548, 32.572], [-91.532, 32.535], [-91.518, 32.495],
      [-91.505, 32.458], [-91.494, 32.418], [-91.483, 32.378],
      [-91.472, 32.338], [-91.465, 32.285]
    ]
  }
]

const RIVER_LINE = new SimpleLineSymbol({ color: [65, 130, 185, 0.9], width: 3 })

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

function makeRiverGraphics(river) {
  return [
    new Graphic({
      geometry: new Polyline({
        paths: [river.path],
        spatialReference: { wkid: 4326 }
      }),
      symbol: RIVER_LINE
    }),
    new Graphic({
      geometry: new Point({ longitude: river.labelLon, latitude: river.labelLat }),
      symbol: new TextSymbol({
        text: river.name,
        color: [30, 90, 155, 1],
        haloColor: [255, 255, 255, 0.92],
        haloSize: 2.5,
        font: { size: 11, family: "sans-serif", style: "italic", weight: "bold" }
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
      graphics: [
        ...RIVERS.flatMap(makeRiverGraphics),
        ...LANDMARKS.flatMap(makeLandmarkGraphics),
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
