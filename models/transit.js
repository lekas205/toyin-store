const mongoose = require(`mongoose`);
const Schema =mongoose.Schema
const transitSchema  = new Schema({
  cart:{
         type:Object,
        require:true,  
  },
  qty:{
    type:Number,
    require:true,
    minlength:4,
    trim:true
},
    size:{
        type:Number,
        require:true,
        minlength:4,
        trim:true
    },

    color:{
        type:String,
        require:true, 
        trim:true
    },
});
module.exports = mongoose.model(`transit`, transitSchema);