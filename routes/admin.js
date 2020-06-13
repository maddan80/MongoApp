
const express = require('express');

const adminController = require('../controllers/admin');


const router = express.Router();

router.get('/products',adminController.getAdminProducts);
 
router.get('/add-product',adminController.getAddProduct);
   
router.post('/add-product',adminController.postAddProduct); 
router.get('/modify-product/:productId',adminController.getEditProduct);
router.post('/modify-product',adminController.postEditProduct);
router.post('/remove-product',adminController.postRemoveProduct);

   
module.exports = router;
 

 