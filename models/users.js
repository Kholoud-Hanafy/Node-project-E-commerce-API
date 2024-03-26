const mongoose = require('mongoose');
 const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role : {
        type : String,
        enum : ['User', 'Seller'],
        default : 'User'
     
       }

});

// Hash the password before saving it to the database

userSchema.pre('save', async function(next){

    let salt = await bcrypt.genSalt(10)
    let hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword 
 next() 
})






const User = mongoose.model('User', userSchema);

module.exports = User;
