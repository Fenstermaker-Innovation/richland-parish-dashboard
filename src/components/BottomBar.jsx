export default function BottomBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-forest/96 backdrop-blur-sm border-t border-eucalyptus/25">
      <div className="flex items-center justify-center gap-5 py-3 px-6">
        <div className="flex-1 flex items-center gap-2 justify-end max-w-xs">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-sage/40" />
          <span className="text-sage/50 text-sm">✦</span>
        </div>

        <p className="font-serif italic text-sage text-xl lg:text-2xl tracking-widest whitespace-nowrap"
           style={{ letterSpacing: "0.18em" }}>
          Rooted in Richland
        </p>

        <div className="flex-1 flex items-center gap-2 max-w-xs">
          <span className="text-sage/50 text-sm">✦</span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-sage/40" />
        </div>
      </div>
    </div>
  )
}
