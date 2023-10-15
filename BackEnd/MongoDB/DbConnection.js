const mongoose = require('mongoose')

async function ConnectDb (){
try{
   await mongoose.connect('mongodb://127.0.0.1:27017/CsInfoTech')
   console.log('mongodb connection successfull')
}catch (err){
   console.log('error at connecting mongoDb')
}
}

module.exports = ConnectDb