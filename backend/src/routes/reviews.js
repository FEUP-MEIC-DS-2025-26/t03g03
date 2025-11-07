const express = require ('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.get('/products/:id/reviews', reviewController.getReviewsByProduct);
router.post('/products/:id/reviews', express.json(), reviewController.createReview);

module.exports = router;
