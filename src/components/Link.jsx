import { ArrowIcon } from './Icons'

export function AppLink({ to, children, className = '', onClick, ...props }) {
  const external = /^(https?:|mailto:)/.test(to)
  const base = import.meta.env.BASE_URL.replace(/\/$/, '')
  const href = `${base}${to}` || '/'

  if (external) {
    return (
      <a href={to} className={className} target="_blank" rel="noreferrer" onClick={onClick} {...props}>
        {children}
      </a>
    )
  }

  const navigate = (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    window.history.pushState({}, '', href)
    window.dispatchEvent(new PopStateEvent('popstate'))
    window.scrollTo({ top: 0, behavior: 'instant' })
    onClick?.(event)
  }

  return <a href={href} className={className} onClick={navigate} {...props}>{children}</a>
}

export function TextLink({ to, children, external = false }) {
  return (
    <AppLink to={to} className="text-link">
      {children}
      <ArrowIcon diagonal={external} />
    </AppLink>
  )
}
