const mongoose=require("mongoose");
const Shop=new mongoose.Schema({//Schema构造函数
    //定义文档的结构和属性
    resultcode:String,//返回状态码
    reason:String,//返回说明
    id:Number,//返回说明
    result:Array,
});
module.exports=Shop;