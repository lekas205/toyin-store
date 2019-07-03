const mongoose = require(`mongoose`);
const Schema =mongoose.Schema
const customerSchema  = new Schema({
    name:{
        type:String,
        require:true,
        minlength:4,
        trim:true
    },
    email:{
        type:String,
        require:true,
        minlength:4,
        trim:true
    },
    phone:{
        type:Number,
        minlength:9
    },
  
    address:{
        type:String,
        require:true, 
        trim:true
    },
    password:{
        type:String,
        require:true,
        minlength:4,
        trim:true
    }

});

customerSchema.methods.testMethod=function(){
    console.log(`using schema method`);
    
}
module.exports = mongoose.model(`customer`, customerSchema);