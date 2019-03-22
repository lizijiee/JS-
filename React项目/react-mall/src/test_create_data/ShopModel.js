const mongoose=require("mongoose");
const {OrderSchema}=require("./OrderSchema");
const Orders=mongoose.model("ShopData",OrderSchema)


module.exports={Orders};