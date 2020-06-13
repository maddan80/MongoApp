const Product = require('../models/product');

exports.getAddProduct = (req,res,next)=>{
    //res.sendFile(path.join(projectPath,'views','add-product.html')); //getting or sending an html file     
    //Rendering the data to the style engine views
    res.render('admin/edit-product',
    {   pageTitle:'Add Product',
        pagePath:'product',
        productPage:true,
        productStyle:true,
        formStyle:true,
        editing:false,
        isAuth: req.session.logUser
    });
    };

 exports.getEditProduct = (req,res,next)=>{
        //res.sendFile(path.join(projectPath,'views','add-product.html')); //getting or sending an html file     
        //Rendering the data to the style engine views
        const prodId = req.params.productId;
        Product.findById(prodId)
        .then(product=>{
            res.render('admin/edit-product',
            {   pageTitle:'Edit Product',
                pagePath:'edit product',
                productPage:true,
                productStyle:true,
                formStyle:true,
                editing:true,
                prod:product,
                isAuth: req.session.logUser           
            }) ;
        })
       .catch(err=>{
            console.log(err);
        }); 
    };
   
    exports.postAddProduct = (req,res,next)=>{
        const title = req.body.title;
        const price = req.body.price;
        const description = req.body.desc;
        
        const product = new Product({
            title:title,
            desc:description,
            price:price,
            userId:req.user});
        product.save()
        .then(result => {
            // console.log(result);
            console.log('Created Product');
            res.status(302).redirect('/admin/products');

    })
    .catch(err => {
      console.log(err);
    });
};



    exports.postEditProduct = (req,res,next)=>{
            const prodId =  req.body.id;

            const producttitle = req.body.title;
            const productdesc = req.body.desc;
            const productprice = req.body.price;
             
            Product.updateOne({_id:prodId},
                {title:producttitle,
                 desc:productdesc,
                price:productprice})    
    
        .then(result =>{
            console.log("Table updated successfully");
            res.status(302).redirect('/admin/products');     
        })
        .catch(err=>{
            console.log(err);
        });
      
    };
    
    exports.postRemoveProduct = (req,res,next)=>{
        const productid  = req.body.prodId;
        console.log(productid);
        Product.findByIdAndRemove(productid)
        .then(result=>{
            console.log("Product Deleted successfully");
              res.status(302).redirect('/admin/products');
        })
        .catch(err=>{
            console.log(err);
        }); 
    }; 

    exports.getAdminProducts = (req,res,next) =>{
         
        Product.find()
        .then(products=>{
            res.render('admin/products',
             {prods:products,
              pageTitle:'Admin Products',
              pagePath:'adminproducts',
              hasProducts:products.length > 0,
              shopPage:true,
              productStyle:true,
              isAuth: req.session.logUser
             });
        }).catch(err=>{
            console.log(err);
        });
    };