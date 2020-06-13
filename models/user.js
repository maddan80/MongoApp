const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type:String,
    required: true
  },
  email : {
    type: String,
    required : true
  },
  cart : {
    items:[
      {productId:{type: Schema.Types.ObjectId,ref:'Products',required:true},
      quantity:{type:Number,required:true}}
    ]
  }
});

userSchema.methods.addToCart = function(product){
const productIndex = this.cart.items.findIndex(cp=>{
 
  return cp.productId.toString() === product._id.toString();
});

let newQuanity = 1;
const updatedCartItems = [...this.cart.items];

if (productIndex >=0){
  updatedCartItems[productIndex].quantity = updatedCartItems[productIndex].quantity + 1

} else{
  updatedCartItems.push({
    productId : product._id,
    quantity: 1
  })
};

  const updatedCart = {
    items:updatedCartItems
  }
  this.cart = updatedCart;
  return this.save();

};

userSchema.methods.removeProdFromCart=function(productId){
const updatedCartItems = this.cart.items.filter(item=>{
  return item.productId.toString() !== productId.toString();
 });
  
 const updatedCart = {
  items:updatedCartItems
  }
this.cart = updatedCart;
return this.save();

};
userSchema.methods.removeCart=function(){
this.cart={items:[]};

return this.save();

};

module.exports = mongoose.model('Users',userSchema);