const {model} = require( "mongoose");
const {pridicationSchema}= require( "../Schema/pridication");

const pridicationModel = new model("pridication",pridicationSchema);

module.exports= {pridicationModel};