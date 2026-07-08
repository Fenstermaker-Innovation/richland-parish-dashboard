import { useRef, useEffect, useState } from "react"
import Map from "@arcgis/core/Map.js"
import MapView from "@arcgis/core/views/MapView.js"
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js"
import Basemap from "@arcgis/core/Basemap.js"
import WebTileLayer from "@arcgis/core/layers/WebTileLayer.js"
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer.js"
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol.js"
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol.js"
import { PARISH_BOUNDARY_URL } from "../config/esri.js"
import { COMMUNITY_VOICE_RESPONSES_URL } from "../config/surveys.js"

const lightBasemap = new Basemap({
  baseLayers: [
    new WebTileLayer({
      urlTemplate: "https://{subDomain}.basemaps.cartocdn.com/light_all/{level}/{col}/{row}.png",
      subDomains: ["a", "b", "c", "d"],
      copyright: "© OpenStreetMap contributors © CARTO"
    })
  ],
  title: "Light",
  id: "light-responses"
})

function ResponseMap() {
  const containerRef = useRef(null)
  const [count, setCount] = useState(null)

  useEffect(() => {
    const layers = []

    const parishLayer = new FeatureLayer({
      url: PARISH_BOUNDARY_URL,
      renderer: new SimpleRenderer({
        symbol: new SimpleFillSymbol({
          color: [43, 51, 45, 0.08],
          outline: { color: [107, 127, 91, 0.6], width: 1.5 }
        })
      }),
      popupEnabled: false
    })
    layers.push(parishLayer)

    if (COMMUNITY_VOICE_RESPONSES_URL) {
      const responseLayer = new FeatureLayer({
        url: COMMUNITY_VOICE_RESPONSES_URL,
        renderer: new SimpleRenderer({
          symbol: new SimpleMarkerSymbol({
            color: [107, 127, 91, 0.8],
            outline: { color: [247, 245, 240, 1], width: 1.5 },
            size: 10
          })
        }),
        popupEnabled: false
      })
      layers.push(responseLayer)

      responseLayer.queryFeatureCount().then(setCount).catch(() => {})
    }

    const map = new Map({ basemap: lightBasemap, layers })
    const view = new MapView({
      container: containerRef.current,
      map,
      center: [-91.77, 32.37],
      zoom: 10,
      ui: { components: [] }
    })

    view.when(() => {
      parishLayer.queryExtent().then((result) => {
        if (!result?.extent) return
        const paddedExtent = result.extent.expand(1.25)
        view.goTo(paddedExtent).then(() => {
          view.constraints.geometry = paddedExtent
          view.constraints.minScale = view.scale * 1.05
          view.constraints.maxScale = 10000
        })
      })
    })

    return () => view.destroy()
  }, [])

  return { containerRef, count }
}

export default function LiveResponsesSection() {
  const { containerRef, count } = ResponseMap()

  return (
    <section id="live-responses" className="bg-sand py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="section-label">Live Responses</p>
          <h2 className="font-serif text-forest text-4xl lg:text-5xl font-semibold mb-5">
            The Community is Speaking
          </h2>
          <p className="font-sans text-forest/60 text-base max-w-xl mx-auto leading-relaxed">
            Every dot on this map is a Richland Parish resident who shared their voice.
            Watch the conversation grow in real time.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Response count card */}
          <div className="lg:w-56 flex-shrink-0 bg-ivory border border-eucalyptus/20 p-8 text-center">
            <p className="font-serif text-5xl font-semibold text-forest mb-2">
              {count !== null ? count.toLocaleString() : "—"}
            </p>
            <p className="font-sans text-xs text-forest/40 tracking-widest uppercase">
              Responses
            </p>
            {!COMMUNITY_VOICE_RESPONSES_URL && (
              <p className="font-sans text-xs text-eucalyptus mt-4 leading-relaxed">
                Connect your Survey123 response layer in{" "}
                <code className="bg-sand px-1">surveys.js</code> to see live counts
              </p>
            )}
          </div>

          {/* Map */}
          <div className="flex-1 h-96 lg:h-[480px]">
            <div ref={containerRef} className="w-full h-full" />
          </div>
        </div>
      </div>
    </section>
  )
}
