const express = require('express');
const productData = require('./admin');
const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/',shopController.getIndex);
router.get('/products/:productId',shopController.getProduct);

router.get('/cart',shopController.getCart);
router.post('/cart',shopController.postCart);
router.get('/products',shopController.getProducts);
router.post('/cart-delete-item', shopController.postCartDeleteProduct);
router.post('/create-order',shopController.postOrders);
router.get('/orders',shopController.getOrders);
   

module.exports = router;