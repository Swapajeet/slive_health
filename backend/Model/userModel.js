const {model} = require( "mongoose");
const {userSchema}= require( "../Schema/userSchema");

const userModel = new model("user",userSchema);

module.exports = {userModel};
