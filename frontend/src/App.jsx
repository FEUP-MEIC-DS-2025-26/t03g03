import './App.css'
import { useState, useEffect } from 'react'
import ProductList from './components/ProductList'
import Leaderboard from './components/Leaderboard'
import ReviewPage from './components/ReviewPage'

// Very small hash-based router to avoid adding react-router-dom
function App() {
  const [route, setRoute] = useState(() => window.location.hash || '#/')

  useEffect(() => {
    function onHash() {
      setRoute(window.location.hash || '#/')
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  // parse product ID from review routes
  const reviewMatch = route.match(/#\/products\/(\d+)\/reviews/)
  const productId = reviewMatch ? Number (reviewMatch[1]) : null

  return (
    <div className="app">
      <header style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <a href="#/">Home</a>
        <a href="#/leaderboard">Leaderboard</a>
      </header>

      <main style={{ paddingTop: 12 }}>
        {route === '#/leaderboard' ? (<Leaderboard />
      ) : productId ? (
        <ReviewPage productId ={productId} />
      ) : (
      <ProductList />
      )}
      </main>
    </div>
  )
}

export default App