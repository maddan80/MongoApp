 
exports.getError = (req,res,next)=>{
    res.render('error',
    {pageTitle:'error',
    pagePath:'error',
    errorid :'404',
    isAuth: req.isAuth
});
};

