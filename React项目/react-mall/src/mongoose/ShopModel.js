const mongoose=require("mongoose");
const {ShopSchema,UserSchema}=require("./ShopSchema");
const Shop=mongoose.model("ShopData",ShopSchema)
// const UserData=mongoose.model("UserData",ShopSchema)//括号内第一个参数决定数据库名称
const User=mongoose.model("UserData",UserSchema)

module.exports={Shop,User};