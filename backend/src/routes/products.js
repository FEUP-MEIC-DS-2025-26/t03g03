const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const reviewController = require('../controllers/reviewController')

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.get('/:id/reviews', reviewController.getReviewsByProduct);
router.post('/:id/reviews', express.json(), reviewController.createReview);

module.exports = router;
