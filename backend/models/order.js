const mongoose = require('mongoose');
const Schema = mongoose.Schema; //constructor function
const AutoIncrement = require('mongoose-sequence')(mongoose);

const orderSchema = new Schema({  
   order_id: {
     type: Number
   },
    items: { type: Array },
    total: { type: Number },
    user_id: { type: String}
}, { timestamps: true }); //gera timestamps automaticos

// const orderSchema = new Schema({  
//     _id: mongoose.Schema.Types.ObjectId,
//    order_id: {
//      type: Number
//    },
//     data: {
//         items: { type: Array },
//         total: { type: Number }
//     }
// }, { timestamps: true }); //gera timestamps automaticos

orderSchema.plugin(AutoIncrement, {inc_field: 'order_id'});
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;