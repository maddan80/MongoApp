const Product = require('../models/product');
const Order = require('../models/order');

exports.getIndex = (req,res,next)=>{
    console.log(req.session.logUser);
    Product.find()
    .then(products=>{
        res.render('shop/index',
        {prods:products,
         pageTitle:'Shop',
         pagePath:'shop',
         hasProducts:products.length > 0,
         shopPage:true,
         productStyle:true,
         isAuth: req.session.logUser  
        });
    
    }).catch(err=>{
        console.log(err);
    });
};

    exports.getProducts = (req,res,next)=>{
        Product.find()
        .then(products=>{
            res.render('shop/product-list',
            {prods:products,
            pageTitle:'Shop',
            pagePath:'shop',
            hasProducts:products.length > 0,
            shopPage:true,
            productStyle:true,
            isAuth: req.session.logUser
        });
        }).catch(err=>{
            console.log(err);
        });
    }; 

    exports.getProduct = (req,res,next)=>{
        const prodid = req.params.productId;
          console.log(prodid);
        Product.findById(prodid)
        .then(product =>{
             res.render('shop/product-detail',
             {
                 prods: product,
                 pageTitle:'Products',
                 pagePath:'products',
                 isAuth: req.session.logUser
             });
         })
        .catch(err=>{
            console.log(err);
        }); 
    };

    exports.getCart = (req,res,next) =>{
      
        req.user.populate('cart.items.productId')
        .execPopulate()
        .then(user=>{
          console.log(user.cart.items);
          res.render('shop/cart',
          {   pageTitle:'cart',
              pagePath:'cart',
              cartPage:true,
              cartStyle:true,
              products:user.cart.items,
              isAuth: req.session.logUser
          });
       
        })
      .catch(err=>{
          console.log(err);
      });  
    }; 
     
    exports.postCart = (req, res, next) => {
      const prodId = req.body.productId;
      Product.findById(prodId)
      .then(product=>{
          return req.user.addToCart(product);
      }).then(result=>{         
          console.log('Product added to Cart');
          res.redirect('/cart');
      })
      .catch(err=>{
          console.log(err);
      });
         
    };
    
    exports.getOrders = (req,res,next) =>{
        console.log('inside route');
       Order.find()
        .then(orders=>{
            console.log(orders);
            res.render('shop/orders',
            {   pageTitle:'orders',
                pagePath:'orders',
                cartPage:true,
                cartStyle:true,
                orders:orders,
                isAuth: req.session.logUser
            });    
        })
        .catch(err=>{
            console.log(err);
        });
          
    }; 

    exports.postOrders = (req,res,next) =>{
        let total = 0;  
        req.user.populate('cart.items.productId')
        .execPopulate()
        .then(user=>{
            const products = user.cart.items.map(i=>{
                return {quantity: i.quantity, product: {...i.productId._doc}}
            });
             products.map(j=>{
                 return   total+= Number(j.quantity*j.product.price);
            });
            const order = new Order({
                products: products,
                user:{userId: req.user,username: req.user.name},
                total:total
            });
            return order.save();

         })
         .then(result=>{
            console.log('OrderCreated');
            console.log(req.user.cart);
            
            return req.user.removeCart();    
    
        }).then(cartResult=>{
            console.log('Cart removed successfully');
            res.redirect('/orders');
        }).
         catch(err=>{
            console.log(err);
        });
 
       
    }; 

    exports.postCartDeleteProduct = (req,res,next)=>{
      const prodId = req.body.productId;
         req.user.removeProdFromCart(prodId)
        .then(cart=>{

            res.redirect('/cart');
        }).then()
        .catch(err=>{
            console.log(err);
        });
            
     }; 