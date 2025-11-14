import { useState, useEffect } from 'react'
import { fetchReviews, createReview } from '../api'

export default function ReviewPage({ productId }) {
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [newReview, setNewReview] = useState({
        author: '',
        rating: 5,
        comment: ''
    })

    useEffect(() => {
        loadReviews()
    }, [productId])

    async function loadReviews() {
        setLoading(true)
        try {
            const data = await fetchReviews(productId)
            setReviews(data)
        } catch (err) {
            console.error(err)
            setError(err.message || 'Error loading reviews')
        } finally {
            setLoading(false)
        }
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const review = await createReview(productId, newReview)
            setReviews(prev=> [review, ...prev])
            setNewReview({ author: '', rating: 5, comment: '' })
        } catch (err) {
            console.error(err)
            setError(err.message || 'Error submitting review')
        }
    }

    if (loading) return <div>Loading reviews..</div>
    if (error) return <div style={{ color: 'crimson' }}>{error}</div>

    return (
        <div className='review-page'>
            <h2>Product Reviews</h2>
            <a href="#/">Back to products</a>

            <form onSubmit={handleSubmit} style= {{ marginTop: '1rem', marginBottom: '2rem' }}>
                <h3>Write a review</h3>
                <div>
                    <input 
                    placeholder="Your name"
                    value={newReview.author}
                    onChange={e => setNewReview(prev => ({...prev, author: e.target.value}))}
                    required
                    />
                </div>
                <div>
                    <select 
                    value={newReview.rating}
                    onChange={e => setNewReview(prev => ({ ...prev, rating: Number(e.target.value )}))}
                    >
                        {[5,4,3,2,1,0].map(n =>(
                            <option key={n} value={n}>{n} stars</option>
                        ))}
                    </select>
                </div>
                <div>
                    <textarea
                    placeholder="Your review"
                    value={newReview.comment}
                    onChange={e => setNewReview (prev => ({ ...prev, comment: e.target.value }))}
                    />
                </div>
                <button type="submit">Submit review</button>
            </form>

            <div>
                <h3>All Reviews</h3>
                {reviews.length === 0 ? (
                    <p>No reviews yet</p>
                ) : (
                    <ul>
                        {reviews.map(review => (
                            <li key={review.id} style={{ marginBottom: '1rem' }}>
                                <strong>{review.author}</strong> - {review.rating}/5 stars
                                <br />
                                <p>{review.comment}</p>
                                <small>{new Date(review.created_at).toLocaleDateString()}</small>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}