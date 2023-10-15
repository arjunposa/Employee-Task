const {Schema} = require('mongoose')

const employSchema = Schema({
    id:String,
    name:String,
    email:String,
    number:String,
    designation:String,
    gender:String,
    course:String,
    img:String,
    date:Number
})

module.exports = employSchema