const mongoose = require('mongoose');
    const productSchema =  mongoose.Schema({
        name: { 
            type: String, 
            required: true ,
            minLength:[3,"name is less than 3 characters"],
            maxLength:25,
            },

        description:
         { 
            type: String,
             required: true,
             minLength:[10,"description is less than 10 characters"],
            maxLength:200,
         },
        photo: 
        { 
            type: String
         },
        sellerId: {
             type: mongoose.Schema.Types.ObjectId,
              ref: 'User', 
             required: true
            
            },

        createdAt:
         { 
            type: Date, 
            default: Date.now 
        }

    })

    // Create a model 
    let productmodel = mongoose.model('Products',productSchema )
    
    // Export the model

    module.exports= productmodel;