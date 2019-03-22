const mongoose=require("mongoose");
const {OrderSchema}=require("./OrderSchema");
const Order=mongoose.model("Order",OrderSchema)

module.exports={Order};