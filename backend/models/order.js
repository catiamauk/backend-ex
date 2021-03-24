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

orderSchema.plugin(AutoIncrement, {inc_field: 'order_id'});
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
