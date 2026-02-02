export function Foreground() {
  return (
    <div className="pointer-events-none">
      <div className="fixed -bottom-40 left-0 brightness-30 max-w-md animate-in fade-in slide-in-from-left-4 duration-1000">
        <img src="/left-rocks.png" />
      </div>
      <div className="fixed -bottom-45 right-0 brightness-30 max-w-md animate-in fade-in slide-in-from-right-4 duration-1000">
        <img src="/right-rocks.png" />
      </div>
    </div>
  )
}
