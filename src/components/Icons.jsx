export function ArrowIcon({ diagonal = false }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="icon">
      {diagonal ? (
        <path d="M5 15 15 5M7 5h8v8" />
      ) : (
        <path d="M3 10h13M11 5l5 5-5 5" />
      )}
    </svg>
  )
}

export function MenuIcon({ open }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="menu-icon">
      {open ? <path d="m5 5 14 14M19 5 5 19" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
    </svg>
  )
}

export function DownloadIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="icon">
      <path d="M10 2v10m-4-4 4 4 4-4M3 15v2h14v-2" />
    </svg>
  )
}
