const orderModel = require('../models/order')



//create order
const creatOrder = async(req, res, next)=>{
    try{ 
     
     let order = req.body;
     order.userId =req.id
     let insertedOrder = await  orderModel.create(order)
     res.status(201).json({massege:`order created succsesfuly`, data : insertedOrder})
    }catch(err){
     next(err)
 
    }
 
 }
 
 //getallorders
 const getAllorders =async(req,res)=>{
   try{
     let allOrders = await orderModel.find().populate('products').populate('userId');
     res.status(200).json({massege: "succes", data : allOrders})
 
   }catch(err){
    res.status(500).json({massege: err})
   }
 
 
 }
 
 //getorderbyid
 const getOrderbyid =async(req,res)=>{
    let {id} = req.params
     try{
      let Order =await orderModel.findById(id ).populate('products').populate('userId').exec();
     
      if(Order){
         res.status(200).json({masseg: "success", data: Order})
      }else{
       res.status(400).json({"masseg" : `order does't exasit`})}
 
    }catch(err){
     res.status(500).json({"masseg" : `try again later`})
    }
 
 
 }
 
 
 //updateorder
 const updateOrder= async (req,res)=>{
    let {id} = req.params
    let {products} = req.body
    try{
 
    let updatedorder = await orderModel.findByIdAndUpdate(id, {products}, { new: true})
    res.status(200).json({"masseg" : `order was update sucsesfuly` , data : updatedorder})
    }catch(err){
     res.status(422).json({"masseg" : err.masseg}) 
    }
 
 }
 
 //deletorder
 
 const deleteorder = async(req,res)=>{
 let {id} = req.params
 try {
     const deletedorder = await orderModel.findByIdAndDelete(id);
 
     if (deleteorder) {
       res.status(200).json({ "message": `order deleted successfully` });
     } else {
       
       res.status(404).json({ "message": `order not found with ID: ${id}` });
     }
   }catch(error) {
     res.status(422).json({ "message": error.message });
   }
 
 
 
 }
 
 
 
 module.exports ={ deleteorder,updateOrder,getOrderbyid,getAllorders,creatOrder}