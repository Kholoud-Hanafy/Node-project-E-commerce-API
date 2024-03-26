const express = require('express');

    let router = express.Router();
    const{ deleteorder,updateOrder,getOrderbyid,getAllorders,creatOrder} = require('../controllers/order');
   
     
   const {auth,restrictTo} = require('../middelware/auth');
 
 
    router.route('/').get(getAllorders).post(auth,restrictTo('User'),creatOrder)
    router.route('/:id').patch(auth,updateOrder).delete(auth, deleteorder).get(getOrderbyid)
    
   
   
   
     
 module.exports = router