const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema({ //Schema构造函数
    //定义文档的结构和属性
    code: Number, //返回说明
    data: Array, //员工数据
    message: String
});
const UserSchema=new mongoose.Schema({//Schema构造函数
    //定义文档的结构和属性
    resultcode:String,//返回状态码
    reason:String,//返回说明
    id:Number,//返回说明
    num:String,
    // ClerkData:Array, //员工数据
    UsersData:Array,   //员工数据
    // Data:Array,
});
module.exports = {
    OrderSchema,UserSchema
};
//module.exports需要new对象之后才可以调用