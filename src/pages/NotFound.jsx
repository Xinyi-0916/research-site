import { AppLink } from '../components/Link'

export default function NotFound() {
  return (
    <section className="not-found">
      <div className="content-wrap">
        <p className="eyebrow">404</p>
        <h1>This page is not part of the research site.</h1>
        <AppLink to="/" className="primary-button">Return home</AppLink>
      </div>
    </section>
  )
}
