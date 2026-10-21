import { useState, useEffect } from 'react'

const MOVIES = [
  { id: 1, title: 'Stellar Odyssey', genre: 'Sci-Fi', rating: 8.7, emoji: '🚀' },
  { id: 2, title: 'The Last Laugh', genre: 'Comedy', rating: 7.9, emoji: '😂' },
  { id: 3, title: 'Midnight Heist', genre: 'Thriller', rating: 8.3, emoji: '🕵️' },
  { id: 4, title: 'Heartstrings', genre: 'Romance', rating: 8.1, emoji: '💖' },
  { id: 5, title: 'Dragon Quest', genre: 'Fantasy', rating: 8.9, emoji: '🐉' },
  { id: 6, title: 'Ocean Deep', genre: 'Documentary', rating: 9.0, emoji: '🌊' },
]

const MUSIC = [
  { id: 1, title: 'Echoes Tonight', artist: 'Aurora Lane', emoji: '🎵' },
  { id: 2, title: 'Midnight Drive', artist: 'Neon Pulse', emoji: '🎶' },
  { id: 3, title: 'Sunrise', artist: 'Calm Horizon', emoji: '🌅' },
  { id: 4, title: 'Electric Dreams', artist: 'Synthwave Co.', emoji: '⚡' },
]

const THEME_KEY = 'hungama-theme'

function loadTheme() {
  return localStorage.getItem(THEME_KEY) === 'light'
}

export default function App() {
  const [tab, setTab] = useState('movies')
  const [light, setLight] = useState(loadTheme)

  useEffect(() => {
    document.body.classList.toggle('light', light)
    localStorage.setItem(THEME_KEY, light ? 'light' : 'dark')
  }, [light])

  return (
    <div className="app">
      <header className="navbar">
        <h1>🎬 Hungama</h1>
        <div className="navbar-right">
          <button
            className="theme-toggle"
            onClick={() => setLight((v) => !v)}
            aria-label="Toggle theme"
          >
            {light ? '🌙' : '☀️'}
          </button>
          <nav>
            <button
              className={tab === 'movies' ? 'active' : ''}
              onClick={() => setTab('movies')}
            >
              Movies
            </button>
            <button
              className={tab === 'music' ? 'active' : ''}
              onClick={() => setTab('music')}
            >
              Music
            </button>
          </nav>
        </div>
      </header>

      <section className="hero">
        <h2>Endless Entertainment</h2>
        <p>Stream movies, music, and more — anytime, anywhere.</p>
      </section>

      <section className="section">
        {tab === 'movies' ? (
          <>
            <h3>Trending Movies</h3>
            <div className="grid">
              {MOVIES.map((m) => (
                <div key={m.id} className="card">
                  <div className="card-image">{m.emoji}</div>
                  <div className="card-body">
                    <h4>{m.title}</h4>
                    <p>{m.genre}</p>
                    <span className="badge">⭐ {m.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <h3>Top Tracks</h3>
            <div className="grid">
              {MUSIC.map((t) => (
                <div key={t.id} className="card">
                  <div className="card-image">{t.emoji}</div>
                  <div className="card-body">
                    <h4>{t.title}</h4>
                    <p>{t.artist}</p>
                    <span className="badge">▶ Play</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>

      <footer className="footer">© 2025 Hungama Entertainment</footer>
    </div>
  )
}
