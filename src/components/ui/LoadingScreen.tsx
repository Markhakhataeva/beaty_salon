export function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-nude-50 flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-rose-100 border-t-rose-500 animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-rose-500 text-xl">✦</span>
          </div>
        </div>
        <div className="text-center">
          <h2 className="font-display text-2xl gradient-text">LUMIÈRE</h2>
          <p className="text-nude-500 text-sm mt-1 font-body">Загрузка...</p>
        </div>
      </div>
    </div>
  )
}
