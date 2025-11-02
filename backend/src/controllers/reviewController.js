const pool = require('../db');

exports.getReviewsByProduct = async (req, res)=> {
    const productId = Number(req.params.productId);
    if(!Number.isInteger(productId)) return res.status(400).json({ message: "Invalid product ID" });

    try {
        const { rows } = await pool.query(
            'SELECT id, product_id, author, rating, comment, created_at FROM reviews WHERE product_id = $1 ORDER BY created_at DESC',
            [productId]
        );
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching reviews" });
    }
};

exports.createReview = async (req, res) => {
    const productId = Number(req.params.productId);
    const { author, rating, comment } = req.body;

    if (!Number.isInteger(productId)) return res.status(400).json({message: "Invalid product ID"});
    if (!author || typeof author !== 'string' || author.trim().length === 0 || author.length > 100) {
        return res.status(400).json({messsage: "Invalid author"});
    }
    const r = Number(rating);
    if (!Number.isFinite(r) || r < 0 || r > 5) return res.status(400).json({ message: "Invalid rating" });

    try {
        const { rows } = await pool.query(
            'INSERT INTO reviews (product_id, author, rating, comment) VALUES ($1, $2, $3, $4) RETURNING id, product_id, author, rating, comment, created_at',
            [productId, author.trim(), r, comment || null]
        );
        res.status(201).json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error creating review" });
    }
}