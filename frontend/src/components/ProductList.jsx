import { useState } from 'react'
import { fetchProducts } from '../api'

export default function ProductList() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function loadProducts() {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchProducts()
      setProducts(data)
    } catch (err) {
      console.error(err)
      setError(err.message || 'Error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section>
      <h1>🇵🇹 Made in Portugal Store</h1>
      <p style={{ marginTop: 0 }}>
        Quick links: <a href="#/leaderboard">Leaderboard</a>
      </p>
      <p>Welcome! Your Node.js + PostgreSQL + React setup is working!</p>

      <button onClick={loadProducts} disabled={loading}>
        {loading ? 'Loading…' : 'Show Products'}
      </button>

      {error && <div style={{ color: 'crimson' }}>{error}</div>}

      <ul id="products">
        {products.length === 0 && !loading && <li>No products loaded</li>}
        {products.map(p => (
          <li key={p.id}>
            {p.name} — €{p.price} | Rank: {p.rank}
            <div style={{ marginTop: '0.5rem' }}>
            <a href={`#/products/${p.id}/reviews`}>Read reviews</a>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
