const express = require('express');

    let router = express.Router();
    const { creatNewproduct, deleteproduct, updateproduct, getproductbyname, getAllproducts,getproductbysellerId,getSellerproducts} = require('../controllers/product');
   
     
   const {auth,restrictTo} = require('../middelware/auth');
 
 
    router.route('/').get(getAllproducts).post(auth,restrictTo('Seller') ,creatNewproduct)
    router.route('/:id').patch(auth,restrictTo('Seller'),updateproduct).delete(auth,restrictTo('Seller'),deleteproduct)
    router.route('/search/:name').get(auth,restrictTo('User'),getproductbyname)
    router.route('/seller/:id').get(auth,restrictTo('Seller', 'User'),getproductbysellerId)
    
     router.get('/search',auth,getSellerproducts)
     
 module.exports = router