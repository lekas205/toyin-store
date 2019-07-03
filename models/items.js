const mongoose = require(`mongoose`)
const items = mongoose.model(`Item`,{
    name:{
        type:String,
        require:true,
        minlength:4,
        trim:true
    },
    file:{
        type:String,
    },
  
    categories:{
        type:String, 
    },
    price:{
        type:String,
        require:true,
        minlength:4,
        trim:true
    }


});
module.exports = items