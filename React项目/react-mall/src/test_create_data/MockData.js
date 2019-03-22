var Mock = require('mockjs')
const Random = Mock.Random; // Mock.Random 是一个工具类，用于生成各种随机数据

let created_Data = []

function Loop_Data(i) {
     let mockData = Mock.mock({
        "code": 200,
        "data": [{
            //用户id见下面
            "user|+1": "@cname", // 会员名
            "phone_num|13701305063-15101001636": 1, // 注册手机号
            "member_num": Random.increment(1),
            "registerTime": /201[8]\-[1-10]\-[1-28]/, // 注册时间
            "member_state": "@pick(true,false,false,false,false,false,false,false,false)", //true为会员false不是会员
            "password": /[a-z]{3,5}[0-9]{3,5}/, // 密码随机
            "balance|1-1000.1-1": 1, //余额

            //以上为用户信息
            "tp_order_id": 1425223342, //必须
            "phones|13701305063-15101001636": 1, // 电话
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
            "consignee": "@cname", // 收餐人姓名：  姓名
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
            "user_id": 481769, // 用户id
            "user_name": "tester", // 用户名
            "delivery_geo": "31.2538,121.4185",
            "delivery_poi_address": "北京市昌平区金沙江路"
        }],
        "message": "ok",
    })
    
    created_Data.push(mockData)
}


module.exports = Loop_Data


/*
 var data = Mock.mock({  //人员信息;
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'ClerkData|1-30': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1,后面的1为类型限制
        'num|+1': 1,  //'id|+5': 1  从1开始每次自增5
        "name|+1":"@cname",//名字随机
        "sex":"@pick(男,女)",//性别随机
        "cardNum":"@id", //身份证号
        'birthday': '@date("yyyy-MM-dd")',//出生日期随机
        "age|18-38": 0, //年龄随机
        "hiredate":'@date("yyyy-MM-dd")',
        "jobTitle":"@pick(餐饮部经理,餐饮部副经理,餐饮部主管,餐饮部领班,服务员,传菜员领班,传菜员,迎宾员,迎宾员领班,厨师,厨师长)",
        "state":"@pick(在职,离职)"//状态随机
    }]
}) 
*/
/*
 var data = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    "array|1-10":1,   //后面的1为类型限制
    'orders|1-40': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1,后面的1为类型限制
        'Id|+1': 1, // id名
        "user|+1": "@cname",  
        "phoneNum|13701305063-15101001636":1,
        "vipNum|0-13651":1,
        "registerTime": /201[8]\-[2-3]\-[1-28]/,
        "state":"@pick(正常,注销)",
        "password": "12345678", //性别随机
        "balance|1-1000.1-1":1, //余额
        // "orders|1-5":[{
        //     "ordersId|+1":1,
        //     "dishes":[{
        //         "spuName" : "宫保鸡丁",
        //          "price":"20",
        //          "num":2,
        //          "cost":40,
        //          "orderTime":"@datetime"
        //     },
        //     {
        //         "spuName":"鱼香肉丝",
        //         "price":"18",
        //         "num":1,
        //         "orderTime":"@datetime"
        //     }],  
        // }]
    }]
})
console.log(JSON.stringify(data, null, 20)) 
*/

/*
订单状态
-5	STATUS_CODE_NOT_PAID（等待支付）
-4	STATUS_CODE_PAYMENT_FAIL（支付失败）
-1	STATUS_CODE_INVALID（订单已取消）
0	STATUS_CODE_UNPROCESSED（订单未处理）
2	STATUS_CODE_PROCESSED_AND_VALID（订单已处理）
11	STATUS_CODE_USER_CONFIRMED（用户确认订单）
 */

// 返回订单详情（show_detail=1）：

// -5	STATUS_CODE_NOT_PAID（等待支付）
// -4	STATUS_CODE_PAYMENT_FAIL（支付失败）
// -1	STATUS_CODE_INVALID（订单已取消）
// 0	STATUS_CODE_UNPROCESSED（订单未处理）
// 2	STATUS_CODE_PROCESSED_AND_VALID（订单已处理）
// 11	STATUS_CODE_USER_CONFIRMED（用户确认订单）


//用户名
//用户ID
//订单编号
//订单详情

//订单数据
//菜名
//份数合计
//菜价信息
//总价信息

// 不返回订单详情（show_detail=0）：
/*    {
       "code": 200,
       "data": [{
               "eleme_order_id": 12145048686494359,
               "error_code": 0,
               "on_time_info": {
                   "promise_delivery_time": 50, 
                   // 返回data 中error_code=0 为成功生成的订单, 失败的订单返回失败信息 参加准时达的平台会返回on_time_info 准时达信息
                   "platform_compensate": 1
               }
           },
           {
               "eleme_order_id": 12145048686494359,
               "error_code": 0,
               "on_time_info": {
                   "promise_delivery_time": 50,
                   "platform_compensate": 1
               }
           }
       ],
       "message": "ok",
       "request_id": "115bc4a55e3c4e9eaf3f1a111a3e7271"
   } */




/*  
 button_text(string): 按钮文字

button_url(string): 按钮 url

button_code	button_text
0	空
1	申请退单
2	退单进度
3	发起仲裁
4	仲裁进度
5	退单成功
6	退单失败
-1	电话退单
 
 {
    "code": 200,
    "data": {
      "show_button": 1,
      "button_code": 1,
      "button_text" : "申请退单",
      "button_url": "https:ordercs.ele.me?orderid=12045118446575012345"
    },
    "message": "ok",
    "request_id": "115bc4a55e3c4e9eaf3f1a111a3e7271"
  }  */

/* 
用户数据分为: 
id
用户名
密码
订单:{编号,订单时间,下单内容,}
注册时间 
*/
/* 
布尔值随机： "boolean|1-2": true
"object|2-4": { //内容随机
    "110000": "北京市",
    "120000": "天津市",
    "130000": "河北省",
    "140000": "山西省"
} 
*/

/* 

Random.extend({
    constellation: function(date) {
        var constellations = ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座']
        return this.pick(constellations)
    }
})
Random.constellation()
// => "水瓶座"
Mock.mock('@CONSTELLATION')
// => "天蝎座"
Mock.mock({
    constellation: '@CONSTELLATION'
})
// => { constellation: "射手座" }

*/
/* 
{
    "errcode": 0,
    "errmsg": "@string",
    "data": {
        "type":"@pick(1,2,3)",
        "list|1-10": [{
            "uid": "@id",
            "username": "@name"
        }]
    }
} 
{
  "errcode": 0,
  "errmsg": "^*!SF)R",
  "data": {
    "type": 2,
    "list": [
      {
        "uid": "370000200707276255",
        "username": "Ruth Clark"
      },
*/
/* 
var data = [
    {name: "王尼玛", sex:1, age: 30},
    {name: "王尼美", sex:0, age: 20},
    {name: "王大锤", sex:1, age: 30}
];
var str_json = JSON.stringify(data);
console.log(str_json);
VM102:7 [{"name":"王尼玛","sex":1,"age":30},{"name":"王尼美","sex":0,"age":20},{"name":"王大锤","sex":1,"age":30}] 
*/