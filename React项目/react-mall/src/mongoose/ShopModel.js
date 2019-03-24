const mongoose=require("mongoose");
const {ShopSchema,UserSchema,OrderSchema}=require("./ShopSchema");
const Shop=mongoose.model("ShopData",ShopSchema)
// const UserData=mongoose.model("UserData",ShopSchema)//括号内第一个参数决定数据库名称
const User=mongoose.model("UserData",UserSchema)
const Order=mongoose.model("Order",OrderSchema)

module.exports={Shop,User,Order};