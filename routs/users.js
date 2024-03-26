const express = require('express');
   
    let router = express.Router();
    const {deleteUser,updateusre, getallUsers, creatUser,getuserbyid , login} = require('../controllers/user');
   
     const {auth,restrictTo} = require('../middelware/auth');
 
 
 
    router.route('/').get(auth,getallUsers)
    router.route('/:id').patch(auth,updateusre).delete(deleteUser).get(getuserbyid)
    router.post('/signup',creatUser )
    router.post('/login', login)
     
 module.exports = router