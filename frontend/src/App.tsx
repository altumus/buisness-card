import { useState } from 'react'
import { profile } from './data/profile'
import './App.css'

function App() {
  const [flipped, setFlipped] = useState(false)

  const flip = () => setFlipped((value) => !value)

  return (
    <main className="desk">
      <p className="proof-label">цифровая визитка</p>

      <div className="sheet">
        <span className="mark mark-tl" aria-hidden="true" />
        <span className="mark mark-tr" aria-hidden="true" />
        <span className="mark mark-bl" aria-hidden="true" />
        <span className="mark mark-br" aria-hidden="true" />

        <article
          className={flipped ? 'card is-flipped' : 'card'}
          tabIndex={0}
          aria-label={
            flipped
              ? 'Оборот визитки. Нажмите, чтобы вернуть лицевую сторону.'
              : 'Визитка. Нажмите, чтобы перевернуть.'
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
            <header className="row">
              <span className="initials">{profile.initials}</span>
              <span className="spec">90 x 50 мм</span>
            </header>

            <div className="nameblock">
              <p className="lastname">{profile.lastName}</p>
              <p className="firstname">{profile.firstName}</p>
            </div>

            <footer className="row">
              <span className="title">{profile.title}</span>
              <a
                className="mail"
                href={`mailto:${profile.email}`}
                onClick={(event) => event.stopPropagation()}
              >
                {profile.email}
              </a>
            </footer>
          </section>

          <section className="face face-back">
            <header className="row">
              <span className="spec">оборот</span>
              <span className="spec">{profile.initials}</span>
            </header>

            <div className="colophon">
              <p className="colophon-label">состав работы</p>
              <p className="colophon-body">{profile.stack.join(', ')}</p>
            </div>
          </section>
        </article>
      </div>

      <p className="hint">{flipped ? 'лицевая сторона' : 'нажмите, чтобы перевернуть'}</p>
    </main>
  )
}

export default App
