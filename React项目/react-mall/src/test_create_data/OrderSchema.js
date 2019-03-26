const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema({ //Schema构造函数
    //定义文档的结构和属性
    code: Number, //返回说明
    data: Array, //员工数据
    message: String,
    user: String,
    phone_num:String,
    address:String,
    member_num:String,
    status:Number,
    created_at:String,
    deliver_time:String,
    deliver_fee:Number,
    member_num:String,
    description:String,
    detail:Object,
    order_id:String,
    status_code:String,
    total_price:Number,
    original_price:String,
    user_id:Number,
    user_name:String,
    phones:String,
    consignee:String,
});
/* 
{ user: '邱磊',
  total_price: 290.3,
  original_price: 290.3,
  user_id: 1295,
  user_name: 'tester',
  delivery_poi_address: '北京市昌平区金沙江路',
  phones: '13370467752',
  consignee: '邱磊' } */
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