const mongoose = require('mongoose');
const Schema = mongoose.Schema; //constructor function

const productSchema = new Schema({  
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    }
}, { timestamps: true }); //gera timestamps automaticos

const Product = mongoose.model('Product', productSchema);
module.exports = Product;