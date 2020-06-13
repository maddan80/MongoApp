const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
products:[
    {product:{type: Object,required:true},
    quantity:{type:Number,required:true}}
  ],
user: {
    userId:{type: Schema.Types.ObjectId,ref:'Users',required:true},
    username:{type: String,required:true}},

total : {
    type: Number
}
});
module.exports = mongoose.model('Orders',orderSchema);