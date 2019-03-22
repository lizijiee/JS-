const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema({ //Schema构造函数
    //定义文档的结构和属性
    code: Number, //返回说明
    data: Array, //员工数据
    message: String
});
module.exports = {
    OrderSchema
};
//module.exports需要new对象之后才可以调用