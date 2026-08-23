import { useEffect, useState } from 'react'
import { displayUrl, fetchProfile, telHref, type Profile } from './api/profile'
import './App.css'

function App() {
  const [flipped, setFlipped] = useState(false)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const load = () => {
    setLoading(true)
    setError(null)
    fetchProfile()
      .then((data) => {
        setProfile(data)
        setLoading(false)
      })
      .catch((reason: unknown) => {
        setProfile(null)
        setError(reason instanceof Error ? reason.message : 'Request failed')
        setLoading(false)
      })
  }

  useEffect(() => {
    load()
  }, [])

  const flip = () => {
    if (profile) {
      setFlipped((value) => !value)
    }
  }

  return (
    <main className="desk">
      <p className="proof-label">visiting card</p>

      <div className="sheet">
        <span className="mark mark-tl" aria-hidden="true" />
        <span className="mark mark-tr" aria-hidden="true" />
        <span className="mark mark-bl" aria-hidden="true" />
        <span className="mark mark-br" aria-hidden="true" />

        <article
          className={flipped ? 'card is-flipped' : 'card'}
          tabIndex={profile ? 0 : -1}
          aria-busy={loading}
          aria-label={
            flipped
              ? 'Card reverse. Click to return to the front.'
              : 'Visiting card. Click to flip.'
          }
          onClick={flip}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              flip()
            }
          }}
        >
          <section className="face face-front">
            {loading && (
              <p className="status">setting type</p>
            )}

            {error && (
              <div className="status">
                <p>sheet not assembled</p>
                <button
                  type="button"
                  className="retry"
                  onClick={(event) => {
                    event.stopPropagation()
                    load()
                  }}
                >
                  retry
                </button>
              </div>
            )}

            {profile && (
              <>
                <header className="row">
                  <span className="initials">{profile.initials}</span>
                </header>

                <div className="nameblock">
                  <p className="lastname">{profile.lastName}</p>
                  <p className="firstname">{profile.firstName}</p>
                  <p className="role">{profile.title}</p>
                </div>

                <footer className="row">
                  <span className="location">{profile.location}</span>
                  <a
                    className="link"
                    href={`mailto:${profile.email}`}
                    onClick={(event) => event.stopPropagation()}
                  >
                    {profile.email}
                  </a>
                </footer>
              </>
            )}
          </section>

          <section className="face face-back">
            {profile && (
              <>
                <header className="row">
                  <span className="spec">reverse</span>
                  <span className="spec">{profile.initials}</span>
                </header>

                <div className="back-body">
                  <div className="contacts">
                    <a
                      className="link"
                      href={telHref(profile.phone)}
                      onClick={(event) => event.stopPropagation()}
                    >
                      {profile.phone}
                    </a>
                    <a
                      className="link"
                      href={profile.telegram}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(event) => event.stopPropagation()}
                    >
                      {displayUrl(profile.telegram)}
                    </a>
                    <a
                      className="link"
                      href={profile.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(event) => event.stopPropagation()}
                    >
                      {displayUrl(profile.linkedin)}
                    </a>
                  </div>

                  <div className="colophon">
                    <p className="colophon-label">{profile.tagline}</p>
                    <p className="colophon-body">{profile.stack.join(', ')}</p>
                  </div>
                </div>
              </>
            )}
          </section>
        </article>
      </div>

      <p className="hint">
        {loading
          ? 'fetching the sheet'
          : error
            ? error
            : flipped
              ? 'front'
              : 'click to flip'}
      </p>
    </main>
  )
}

export default App
