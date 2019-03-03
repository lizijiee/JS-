const mongoose=require("mongoose");
const ShopSchema=require("./ShopSchema");
const ShopData=mongoose.model("ShopData",ShopSchema)
module.exports=ShopData;