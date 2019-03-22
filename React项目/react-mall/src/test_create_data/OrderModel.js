const mongoose=require("mongoose");
const {OrderSchema,UserSchema}=require("./OrderSchema");
const Order=mongoose.model("Order",OrderSchema)
const User=mongoose.model("UserData",UserSchema)

module.exports={Order,User};