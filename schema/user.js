let mongoose = require('mongoose');
let {Schema} = require('mongoose');

let userSchema = new Schema({

name:{
    type:String,
    required: true,
    maxLength:25,
},

email:{
    type:String,
    required: true,
},

password:{
    type:String,
    required: true,
},
image:{
    type:String,
}

})

let userModel = mongoose.model('superFanUser',userSchema)
module.exports ={
    userModel
}


