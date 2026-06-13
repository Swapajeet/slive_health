const {Schema} = require("mongoose")
const {userModel} = require("../Model/userModel")


const pridicationSchema  = new Schema({
     conductivity:Number,
        oxygen:Number,
        methane:Number,
        ammonia:Number,
        disease:String,
        percentage:Number,
        owner: {
         type: Schema.Types.ObjectId,
        ref: "user"
  },

});


module.exports = {pridicationSchema};