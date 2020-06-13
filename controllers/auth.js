exports.getLogin=(req,res,next)=>{
     res.render('auth/login',
            {   pageTitle:'auth',
                pagePath:'auth',
                isAuth: req.session.logUser
                 
            }); 

};

exports.getSignUp=(req,res,next)=>{
    res.render('auth/signup',
           {   pageTitle:'auth',
               pagePath:'sign',
               isAuth: req.session.logUser
                
           }); 

};
exports.postSignUp=(req,res,next)=>{
      

};


exports.postLogin=(req,res,next)=>{
    req.session.logUser=req.user._id;
   // req.session.isAuth = true;  
    req.session.save(err=>{
        console.log(err);
        res.redirect('/');
    }) ; 
    

};

exports.postLogout=(req,res,next)=>{
    req.session.destroy(err=>{
        console.log(err);
        res.redirect('/');       
    });
}