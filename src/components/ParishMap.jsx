import { useRef, useEffect } from "react"
import Map from "@arcgis/core/Map.js"
import MapView from "@arcgis/core/views/MapView.js"
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js"
import Basemap from "@arcgis/core/Basemap.js"
import WebTileLayer from "@arcgis/core/layers/WebTileLayer.js"
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer.js"
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol.js"
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol.js"
import Zoom from "@arcgis/core/widgets/Zoom.js"
import { PARISH_BOUNDARY_URL } from "../config/esri.js"

// CartoDB Positron — free, no API key required, clean light style
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

export default function ParishMap({ className = "" }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const parishLayer = new FeatureLayer({
      url: PARISH_BOUNDARY_URL,
      popupEnabled: false
    })

    const map = new Map({
      basemap: lightBasemap,
      layers: [parishLayer]
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
        // Apply renderer based on actual geometry type
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

    return () => {
      view.destroy()
    }
  }, [])

  return <div ref={containerRef} className={className} />
}
