const mongoose = require('mongoose');
const Schema = mongoose.Schema; //constructor function

const userSchema = new Schema({  
    user_id: {
        type: String,
        required: true,
    },
    data: {
        balance: { type: Number },
        product_ids: { type: Array }
    }
}, { timestamps: true }); //gera timestamps automaticos

const User = mongoose.model('User', userSchema);
module.exports = User;