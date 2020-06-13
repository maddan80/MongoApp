const mongoose = require('mongoose');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDbStore = require('connect-mongodb-session')(session);

const adminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');
const authRouter = require('./routes/auth');

const errRouter = require('./routes/error');
//const mongoConnect = require('./helper/database').mongoConnect;
const MONGO_CONNECT = 'mongodb+srv://admin:nodejs123@cluster0-b17qo.mongodb.net/test?retryWrites=true&w=majority'
const User = require('./models/user');
const AppServer =  express();
const sessionStore = new MongoDbStore({
uri: MONGO_CONNECT,
collection: 'sessions' 
});



 
AppServer.use(bodyParser.urlencoded({ extended: false }));


AppServer.set('view engine', 'ejs');
AppServer.set('views', 'views');
AppServer.use(express.static(path.join(__dirname, 'public')));

AppServer.use(session({
   secret:'my secret',
   resave : false,
   saveUninitialized: false,
   store: sessionStore 
}));

AppServer.use((req,res,next)=>{
   /* if (req.session.logUser){
        return next();
    }; */
    User.findOne()
    .then(user=>{
        console.log('user exists'); 
        req.user = user;
        next();
    })
    .catch(err=>{
        console.log(err);
    }); 

});

AppServer.use('/admin',adminRouter);
AppServer.use(shopRouter);
AppServer.use(authRouter);
AppServer.use(errRouter);

 
mongoose.connect(MONGO_CONNECT)
.then(result=>{
   return User.findOne();})
   .then(user=>{
       if (!user){
           const user = new User(
           {   name: 'Madan',
               email: 'maddan80@gmail.com',
               cart: {items:[]}
           })
           user.save();
       };
   })
   .then (result=>{
       console.log('Db Connected');
   AppServer.listen(3000);
    })     
    .catch(err=>{
        console.log(err);
    });