import { useEffect, useState } from 'react'
import { fetchProducts } from '../api'

export default function Leaderboard() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    async function load() {
      setLoading(true)
      setError(null)
      try {
        const data = await fetchProducts()
        if (!mounted) return
        // Sort by rank ascending (1 = top)
        data.sort((a, b) => (a.rank ?? Number.MAX_SAFE_INTEGER) - (b.rank ?? Number.MAX_SAFE_INTEGER))
        setProducts(data)
      } catch (err) {
        console.error(err)
        if (!mounted) return
        setError(err.message || 'Error')
      } finally {
        if (mounted) setLoading(false)
      }
    }

    load()
    return () => {
      mounted = false
    }
  }, [])

  return (
    <section>
      <h2>Product Leaderboard</h2>

      {loading && <div>Loading…</div>}
      {error && <div style={{ color: 'crimson' }}>{error}</div>}

      <ol id="leaderboard">
        {products.length === 0 && !loading && <li>No products</li>}
        {products.map(p => (
          <li key={p.id} style={{ padding: '8px 0' }}>
            <strong>#{p.rank ?? '-'}</strong> — {p.name} <span style={{ color: '#666' }}>€{p.price}</span>
          </li>
        ))}
      </ol>
    </section>
  )
}
