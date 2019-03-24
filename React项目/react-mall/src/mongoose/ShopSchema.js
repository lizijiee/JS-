const mongoose=require("mongoose");
const ShopSchema=new mongoose.Schema({//Schema构造函数
    //定义文档的结构和属性
    resultcode:String,//返回状态码
    reason:String,//返回说明
    id:Number,//返回说明
    num:String,
    ClerkData:Array, //员工数据
    // UsersData:Array,   //员工数据
    result:Array,
    esultcode: String,
    pid:Number, //父级id
    tag:String, //类别id
    tag:String, //类别id
    categoryName:String,
    // categoryType :String,
    spuList :{type:  Array, default: []}
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
const OrderSchema = new mongoose.Schema({ //Schema构造函数
    //定义文档的结构和属性
    code: Number, //返回说明
    data: Array, //员工数据
    message: String
});

module.exports={ShopSchema,UserSchema,OrderSchema};
//module.exports需要new对象之后才可以调用
