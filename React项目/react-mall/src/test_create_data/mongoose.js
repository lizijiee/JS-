const Koa = require("koa");
const app = new Koa();
const router = require('koa-router')();
const static = require('koa-static');
const path = require('path');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const {
    Order
} = require("./OrderModel"); //导入Person类,new 一下  save一下搞定

let Mock = require('mockjs')
const Random = Mock.Random; // Mock.Random 是一个工具类，用于生成各种随机数据

// let Loop_Data = require("./MockData")
function Loop_Data(i) {
    let mockData = Mock.mock({
        "code": 200,
        "data": [{
            //用户id见下面
            "user|+1": "@cname", // 会员名
            "phone_num": Random.natural(13701305063, 15101001636), // 注册手机号
            "member_num": Random.increment(1),
            "registerTime": /201[8]\-[1-10]\-[1-28]/, // 注册时间
            "member_state": "@pick(true,false,false,false,false,false,false,false,false)", //true为会员false不是会员
            "password": /[a-z]{3,5}[0-9]{3,5}/, // 密码随机
            "balance|1-1000.1-1": 1, //余额

            //以上为用户信息
            "phones": Random.natural(13701305063, 15101001636), // 电话
            "error_code": 0,
            "address": "Smart Garden 5A",
            "status": -1,
            /* 
            用户在商家确认订单前可以取消订单：需要status=-1和type=1，reason可以不提供
            用户在确认订单后想要取消，需要联系第三方平台客服，客服取消订单：需要status=-1、tpye=2和reason
            第三方平台风控发现风险订单可以取消任何该平台的订单：需要status=-1和type=3，reason可以不提供 
            */
            // 修改订单状态， 主要支持 2 种：
            // 取消订单(- 1)
            // 用户确认（11） 

            "consignee": function () {return this.user}, // 收餐人姓名：  姓名
            "created_at": Random.datetime(), // 下单时间 "2013-09-24 12:31:24" 把时间改成2018年
            "deliver_fee": Random.natural(3, 35), // 快递费
            "deliver_time": Random.natural(10, 60), // 预计到达时间(10~60min到达,和上面进行拼接)
            "description": "", // 备注： 辣一点，不要葱	
            "detail": {
                "group": [
                    [{
                            "category_id": 1, //cart_id	购物车id 如果有需要购物车再搞一条数据
                            "name": "狗不理",
                            "price": 100,
                            "garnish": [], // garnish附加菜品
                            "id": 1541311,
                            "quantity": 1,
                            "sale_mode": 0,
                            "specs": []
                        },
                        {
                            "sale_mode": 0,
                            "specs": [],
                            "category_id": 1,
                            "name": "牛肉盖浇饭",
                            "price": 100,
                            "garnish": [{
                                "category_id": 1,
                                "name": "荷包蛋",
                                "price": 2,
                                "id": 1541313,
                                "quantity": 1
                            }],
                            "id": 1541312, // 购物车id
                            "quantity": 1 // 数量
                        }
                    ]
                ],
                "extra": [{
                    "description": "",
                    "price": 20,
                    "name": "配送费",
                    "category_id": 2,
                    "id": -10,
                    "quantity": 1
                }],
                "abandoned_extra": null,
                "excluded_activities": []
            },
            "invoice": "",
            "is_book": 0,
            "is_online_paid": 0,
            "order_id": /[0-9][0-9][0-9][0-9][0-9]/, //把日期加上再和随机数字放在一起
            "phone_list": [
                "15216709049"
            ],
            "restaurant_id": 59,
            "restaurant_name": "无忧小馆",
            "status_code": "@pick(-5,-4,-1,0,2,11)", //订单状态
            "total_price": 120, // 总价格
            "original_price": 120, // 最初价格
            // "member_num": Random.increment(1),
            "user_id|1-10000": 1, // 用户id
            "user_name": "tester", // 用户名
            "delivery_geo": "31.2538,121.4185",
            "delivery_poi_address": "北京市昌平区金沙江路"
        }],
        "message": "ok",
    })
    return mockData
}

mongoose.connect("mongodb://localhost:27017")

var db = mongoose.connection; //获取connection实例
//使用Connetion监听连接状态



// Math.floor(Math.random()*50)
/* 
    1.将订单数据先插入进入（随机两到3个数字）
*/

db.on('connected', function (err) {
    if (err) {
        console.log('连接数据库失败：' + err);
    } else {
        console.log('连接数据库成功！');

        for (let i = 0; i < 10; i++) {
            const Orders = new Order({
                _id: new mongoose.Types.ObjectId(),
                ...Loop_Data()
            });
            console.log(Loop_Data())
            console.log(i)
            Orders.save();
        }
    }
});



app.listen(2000, () => {
    console.log('app started at port 2000...');
})



app.use(async (ctx, next) => {

    //指定服务器端允许进行跨域资源访问的来源域。可以用通配符*表示允许任何域的JavaScript访问资源，但是在响应一个携带身份信息(Credential)的HTTP请求时，必需指定具体的域，不能用通配符
    ctx.set("Access-Control-Allow-Origin", "*");

    //可选。它的值是一个布尔值，表示是否允许客户端跨域请求时携带身份信息(Cookie或者HTTP认证信息)。默认情况下，Cookie不包括在CORS请求之中。当设置成允许请求携带cookie时，需要保证"Access-Control-Allow-Origin"是服务器有的域名，而不能是"*";如果没有设置这个值，浏览器会忽略此次响应。
    ctx.set("Access-Control-Allow-Credentials", true);

    //指定服务器允许进行跨域资源访问的请求方法列表，一般用在响应预检请求上
    ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");

    //必需。指定服务器允许进行跨域资源访问的请求头列表，一般用在响应预检请求上
    ctx.set("Access-Control-Allow-Headers", "x-requested-with, accept, origin, content-type");
    // ctx.set("X-Powered-By", ' 3.2.1');

    //告诉客户端返回数据的MIME的类型，这只是一个标识信息,并不是真正的数据文件的一部分
    ctx.set("Content-Type", "application/json;charset=utf-8");

    //如果不设置mode，直接设置content-type为application/json，则fetch会默认这是跨域模式（mode:'cors'），在跨域POST之前，客户端会先发一条OPTIONS请求来”探探路”，如果服务器允许，再继续POST数据。对于这种OPTIONS请求，需要在服务器配置允许接受OPTIONS请求，这样写就是直接允许了所有的OPTIONS请求，也可以按照需求来判断OPTIONS请求中更详细的信息
    if (ctx.request.method == "OPTIONS") {
        ctx.response.status = 200
    }
    await next();
});

/* 
// 删除旧数据
await Shop.update({
    "id": 1,
}, {
    $pull: {
        ClerkData: {
            "name": 21321321,
            "n2321321me": 21321321,
            "nghfghgfdhe": 21321321,
        }
    }
});
// 添加新数据
await Shop.update({
    "id": "1"
}, {
    $push: {
        ClerkData: {
            num: 1
        }
    }
});
// 修改数据
await Shop.update({
    "id": 1,
    "ClerkData.num": 1
}, {
    $set: {
        "ClerkData.$.sex": "女",
    }
});
await Shop.update({
    "id": 1
}, {
    $set: {
        ClerkData: {
            // 会覆盖原有ClerkDate数值,
            // 可以用做在第一层添加新属性,
            // 注意Schema中
            "ClerkData.$.name": 00000,
            "ClerkData.$.n2321321me": 11111,
            "ClerkData.$.nghfghgfdhe": 22222,
  