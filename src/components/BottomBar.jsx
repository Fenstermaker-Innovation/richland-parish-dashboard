export default function BottomBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-forest/96 backdrop-blur-sm border-t border-eucalyptus/25">
      <div className="flex items-center justify-center gap-5 py-2.5 px-6">
        <div className="flex-1 flex items-center gap-2 justify-end max-w-xs">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-sage/40" />
          <span className="text-sage/50 text-sm">✦</span>
        </div>

        <div className="flex flex-col items-center">
          <p className="font-serif italic font-bold text-sage text-lg lg:text-xl tracking-widest whitespace-nowrap"
             style={{ letterSpacing: "0.18em", textShadow: "0 1px 2px rgba(29, 53, 33, 0.45)" }}>
            Rooted in Richland
          </p>
          <p className="font-sans font-bold text-eucalyptus text-[10px] tracking-widest whitespace-nowrap hidden sm:block"
             style={{ letterSpacing: "0.12em", textShadow: "0 1px 2px rgba(29, 53, 33, 0.35)" }}>
            Strong Roots, Smart Growth.
          </p>
        </div>

        <div className="flex-1 flex items-center gap-2 max-w-xs">
          <span className="text-sage/50 text-sm">✦</span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-sage/40" />
        </div>
      </div>
    </div>
  )
}
