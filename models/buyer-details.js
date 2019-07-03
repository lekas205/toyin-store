const mongoose = require(`mongoose`);
const Schema =mongoose.Schema
const transitSchema  = new Schema({
 user:{
        type:Schema.Types.ObjectId, 
        ref:"Customer",
        require:true
  },
  cart:{
         type:Object,
        require:true,  
  },
 phone:{
    type:Number,
    require:true,
    minlength:4,
    trim:true
},
   address:{
        type:String,
        require:true,
        minlength:4,
        trim:true
    },

    name:{
        type:String,
        require:true, 
        trim:true
    },
});
module.exports = mongoose.model(`orders`, transitSchema);