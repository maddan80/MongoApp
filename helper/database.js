const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
let _db;
const mongoConnect = callback=>{
    MongoClient
    .connect('mongodb+srv://admin:nodejs123@cluster0-b17qo.mongodb.net/test?retryWrites=true&w=majority',
     )
    .then(client=>{
        console.log("connected to DB");
        _db = client.db();
        callback();        
    })
    .catch(err=>{
        console.log(err);
        throw err;
    });
};

const getMongoDb =()=> {
 if (_db){
     return _db;
 }
    throw 'No database found';
}; 

exports.mongoConnect = mongoConnect;
exports.getMongoDb = getMongoDb;