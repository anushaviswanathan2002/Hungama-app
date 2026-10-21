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
  const [query, setQuery] = useState('')

  useEffect(() => {
    document.body.classList.toggle('light', light)
    localStorage.setItem(THEME_KEY, light ? 'light' : 'dark')
  }, [light])

  useEffect(() => {
    setQuery('')
  }, [tab])

  const filterItems = (items) => {
    const q = query.trim().toLowerCase()
    if (!q) return items
    return items.filter((i) => i.title.toLowerCase().includes(q))
  }

  const filteredMovies = filterItems(MOVIES)
  const filteredMusic = filterItems(MUSIC)

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
          </>
        ) : (
          <>
            <h3>Top Tracks</h3>
          </>
        )}
        <div className="search-row">
          <input
            type="search"
            className="search-input"
            placeholder={
              tab === 'movies' ? 'Search movies...' : 'Search tracks...'
            }
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search"
          />
        </div>
        <div className="grid">
          {(tab === 'movies' ? filteredMovies : filteredMusic).map((item) => (
            <div key={item.id} className="card">
              <div className="card-image">{item.emoji}</div>
              <div className="card-body">
                <h4>{item.title}</h4>
                <p>{tab === 'movies' ? item.genre : item.artist}</p>
                <span className="badge">
                  {tab === 'movies' ? `⭐ ${item.rating}` : '▶ Play'}
                </span>
              </div>
            </div>
          ))}
        </div>
        {tab === 'movies' && filteredMovies.length === 0 && (
          <p className="empty-state">No movies match "{query}".</p>
        )}
        {tab === 'music' && filteredMusic.length === 0 && (
          <p className="empty-state">No tracks match "{query}".</p>
        )}
      </section>

      <footer className="footer">© 2025 Hungama Entertainment</footer>
    </div>
  )
}
