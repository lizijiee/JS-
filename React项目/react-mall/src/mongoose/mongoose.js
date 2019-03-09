const Koa = require("koa");
const app = new Koa();
const router = require('koa-router')();
const static = require('koa-static');
const path = require('path');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const {Shop,User} = require("./Shop"); //导入Person类,new 一下  save一下搞定


// 第一步:   创建Schema;
// 第二步：  定义mongoose.model
// 第三步：  获取connection实例,使用Connetion监听连接状态,new下导入的Shop类
// 第四步：  调用save方法将数据存入数据库，再次使用不需要要在保存
// 网 文：   mongoose常用api文档   https://www.jianshu.com/p/fc11fd1c26f9
/* 
    mongod 创造数据;
    1.mongod 文件夹里面运行 .\mongod.exe --db path 生成数据位置;
    
    const mongoose=require('mongoose');
    mongoose.connect("mongodb://localhost:27017")
    var db = mongoose.connection;//获取connection实例
    2.连接成功后开搞schema和Model
    var Animal=mongoose.model("Animal",animalSchema);//第一个是名字第二个是模(.Schema)

    .\mongod.exe --dbpath C:\Users\lizijie\Desktop\Courseware\MyCourseware\2019-02-28\db --port=27017
*/
mongoose.connect("mongodb://localhost:27017")

//解决跨域问题；
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
接口文档 ：
    /data?act=search&[class|id]  这个是查询详情页的信息
    /data?act=all  这个是查询所有数据库的信息；
    /data?act=banner 轮播图目录，滑过的时候获取的数据；
    /data?act=banner
*/
var db = mongoose.connection; //获取connection实例
//使用Connetion监听连接状态
db.on('connected', function (err) {
    if (err) {
        console.log('连接数据库失败：' + err);
    } else {
        console.log('连接数据库成功！');
        const Users = new User( //new 一下导入的Shop类
            {
                "id": 3,
                "resultcode": "200", //返回码
                "reason": "查询成功", //返回说明
                "UsersData": [
                    {
                              "Id": 1,
                              "user": "吕芳",
                              "phoneNum": 13759850761,
                              "vipNum": 6527,
                              "registerTime": "2018-3-8",
                              "state": "注销",
                              "password": "12345678",
                              "balance": 550.3,
                              "orders": [
                                        {
                                                  "ordersId": 1,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "1976-12-21 17:55:58"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "1981-10-22 07:54:50"
                                                            }
                                                  ]
                                        },
                                        {
                                                  "ordersId": 2,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "2002-08-04 20:48:08"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "1994-06-03 01:56:53"
                                                            }
                                                  ]
                                        }
                              ]
                    },
                    {
                              "Id": 2,
                              "user": "万刚",
                              "phoneNum": 14472152531,
                              "vipNum": 5274,
                              "registerTime": "2018-3-1",
                              "state": "注销",
                              "password": "12345678",
                              "balance": 479.7,
                              "orders": [
                                        {
                                                  "ordersId": 3,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "1996-12-30 04:53:12"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "2009-08-29 05:45:26"
                                                            }
                                                  ]
                                        },
                                        {
                                                  "ordersId": 4,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "1994-10-01 15:06:47"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "1994-08-12 23:18:28"
                                                            }
                                                  ]
                                        },
                                        {
                                                  "ordersId": 5,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "1987-09-02 06:30:41"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "2001-12-17 23:29:48"
                                                            }
                                                  ]
                                        },
                                        {
                                                  "ordersId": 6,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "1983-12-02 02:11:30"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "1971-09-09 03:46:03"
                                                            }
                                                  ]
                                        }
                              ]
                    },
                    {
                              "Id": 3,
                              "user": "任霞",
                              "phoneNum": 14026427048,
                              "vipNum": 5917,
                              "registerTime": "2018-3-8",
                              "state": "正常",
                              "password": "12345678",
                              "balance": 46.9,
                              "orders": [
                                        {
                                                  "ordersId": 7,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "1987-01-30 23:22:13"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "1977-01-04 22:37:33"
                                                            }
                                                  ]
                                        },
                                        {
                                                  "ordersId": 8,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "2005-08-28 06:01:10"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "2014-05-03 17:52:07"
                                                            }
                                                  ]
                                        },
                                        {
                                                  "ordersId": 9,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "1974-11-28 02:10:44"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "1981-05-01 02:39:27"
                                                            }
                                                  ]
                                        },
                                        {
                                                  "ordersId": 10,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "2002-04-02 02:09:36"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "2007-09-07 01:36:39"
                                                            }
                                                  ]
                                        }
                              ]
                    },
                    {
                              "Id": 4,
                              "user": "杜杰",
                              "phoneNum": 14252912847,
                              "vipNum": 561,
                              "registerTime": "2018-3-8",
                              "state": "注销",
                              "password": "12345678",
                              "balance": 887.3,
                              "orders": [
                                        {
                                                  "ordersId": 11,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "1976-11-06 19:48:01"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "2004-06-27 21:17:23"
                                                            }
                                                  ]
                                        }
                              ]
                    },
                    {
                              "Id": 5,
                              "user": "赵涛",
                              "phoneNum": 14648370764,
                              "vipNum": 8950,
                              "registerTime": "2018-2-8",
                              "state": "正常",
                              "password": "12345678",
                              "balance": 982.2,
                              "orders": [
                                        {
                                                  "ordersId": 12,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "1998-04-16 10:58:49"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "1992-04-17 13:08:19"
                                                            }
                                                  ]
                                        },
                                        {
                                                  "ordersId": 13,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "2008-12-16 19:14:44"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "1977-11-15 19:00:35"
                                                            }
                                                  ]
                                        },
                                        {
                                                  "ordersId": 14,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "2005-02-11 15:10:22"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "2000-02-01 11:07:34"
                                                            }
                                                  ]
                                        },
                                        {
                                                  "ordersId": 15,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "2015-06-25 15:19:27"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "1976-03-12 03:23:49"
                                                            }
                                                  ]
                                        },
                                        {
                                                  "ordersId": 16,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "2004-07-25 22:18:28"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "2002-08-06 08:53:16"
                                                            }
                                                  ]
                                        }
                              ]
                    },
                    {
                              "Id": 6,
                              "user": "陈伟",
                              "phoneNum": 14513570199,
                              "vipNum": 5931,
                              "registerTime": "2018-3-8",
                              "state": "注销",
                              "password": "12345678",
                              "balance": 182.7,
                              "orders": [
                                        {
                                                  "ordersId": 17,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "2008-12-09 23:00:34"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "2005-08-13 10:16:40"
                                                            }
                                                  ]
                                        },
                                        {
                                                  "ordersId": 18,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "1975-11-06 04:06:07"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "1991-08-05 08:11:07"
                                                            }
                                                  ]
                                        },
                                        {
                                                  "ordersId": 19,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "2014-06-24 10:58:47"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "1981-10-06 02:17:02"
                                                            }
                                                  ]
                                        }
                              ]
                    },
                    {
                              "Id": 7,
                              "user": "卢洋",
                              "phoneNum": 14764249078,
                              "vipNum": 4823,
                              "registerTime": "2018-2-2",
                              "state": "正常",
                              "password": "12345678",
                              "balance": 726.4,
                              "orders": [
                                        {
                                                  "ordersId": 20,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "1997-04-08 11:22:44"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "1976-10-29 22:08:11"
                                                            }
                                                  ]
                                        },
                                        {
                                                  "ordersId": 21,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "1990-12-31 01:34:56"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "2017-06-09 10:07:38"
                                                            }
                                                  ]
                                        },
                                        {
                                                  "ordersId": 22,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "2007-03-25 04:05:19"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "1989-08-17 20:28:35"
                                                            }
                                                  ]
                                        },
                                        {
                                                  "ordersId": 23,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "2013-01-05 09:25:05"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "1971-09-01 12:14:37"
                                                            }
                                                  ]
                                        },
                                        {
                                                  "ordersId": 24,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "1983-08-20 12:49:00"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "1986-09-06 14:03:47"
                                                            }
                                                  ]
                                        }
                              ]
                    },
                    {
                              "Id": 8,
                              "user": "吕平",
                              "phoneNum": 14802968424,
                              "vipNum": 11481,
                              "registerTime": "2018-2-1",
                              "state": "正常",
                              "password": "12345678",
                              "balance": 190.8,
                              "orders": [
                                        {
                                                  "ordersId": 25,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "2013-08-21 08:40:33"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "1975-10-26 01:38:32"
                                                            }
                                                  ]
                                        },
                                        {
                                                  "ordersId": 26,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "2014-05-27 04:56:51"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "1998-04-25 01:33:17"
                                                            }
                                                  ]
                                        },
                                        {
                                                  "ordersId": 27,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "1983-03-10 07:27:00"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "1972-09-11 23:18:47"
                                                            }
                                                  ]
                                        },
                                        {
                                                  "ordersId": 28,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "2016-07-04 15:08:21"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "1994-01-30 01:14:39"
                                                            }
                                                  ]
                                        }
                              ]
                    },
                    {
                              "Id": 9,
                              "user": "沈丽",
                              "phoneNum": 14752329560,
                              "vipNum": 6688,
                              "registerTime": "2018-3-8",
                              "state": "注销",
                              "password": "12345678",
                              "balance": 869.7,
                              "orders": [
                                        {
                                                  "ordersId": 29,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "2004-11-22 09:48:27"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "2011-08-21 10:12:56"
                                                            }
                                                  ]
                                        },
                                        {
                                                  "ordersId": 30,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "2000-10-07 06:35:32"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "1996-12-10 12:41:37"
                                                            }
                                                  ]
                                        }
                              ]
                    },
                    {
                              "Id": 10,
                              "user": "冯涛",
                              "phoneNum": 14771256727,
                              "vipNum": 7184,
                              "registerTime": "2018-3-8",
                              "state": "正常",
                              "password": "12345678",
                              "balance": 419.4,
                              "orders": [
                                        {
                                                  "ordersId": 31,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "2013-12-02 01:05:50"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "2008-09-10 21:24:48"
                                                            }
                                                  ]
                                        },
                                        {
                                                  "ordersId": 32,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "1983-03-31 20:17:32"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "1983-12-08 05:01:04"
                                                            }
                                                  ]
                                        },
                                        {
                                                  "ordersId": 33,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "1976-08-09 02:25:13"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "1975-05-01 21:19:23"
                                                            }
                                                  ]
                                        },
                                        {
                                                  "ordersId": 34,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "1986-04-07 07:36:46"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "1988-11-28 18:00:04"
                                                            }
                                                  ]
                                        }
                              ]
                    },
                    {
                              "Id": 11,
                              "user": "马明",
                              "phoneNum": 14290543349,
                              "vipNum": 2063,
                              "registerTime": "2018-3-1",
                              "state": "正常",
                              "password": "12345678",
                              "balance": 319.9,
                              "orders": [
                                        {
                                                  "ordersId": 35,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "1990-03-19 10:47:35"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "1977-10-31 00:44:45"
                                                            }
                                                  ]
                                        }
                              ]
                    },
                    {
                              "Id": 12,
                              "user": "曾强",
                              "phoneNum": 13949324943,
                              "vipNum": 11377,
                              "registerTime": "2018-2-2",
                              "state": "注销",
                              "password": "12345678",
                              "balance": 645.3,
                              "orders": [
                                        {
                                                  "ordersId": 36,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "2003-08-07 22:04:00"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "2008-05-21 02:26:15"
                                                            }
                                                  ]
                                        }
                              ]
                    },
                    {
                              "Id": 13,
                              "user": "邵强",
                              "phoneNum": 14909388648,
                              "vipNum": 4281,
                              "registerTime": "2018-3-8",
                              "state": "正常",
                              "password": "12345678",
                              "balance": 664.9,
                              "orders": [
                                        {
                                                  "ordersId": 37,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "1999-06-11 16:56:33"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "2011-09-08 08:25:41"
                                                            }
                                                  ]
                                        },
                                        {
                                                  "ordersId": 38,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "1986-02-04 21:31:23"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "1978-02-25 04:29:37"
                                                            }
                                                  ]
                                        },
                                        {
                                                  "ordersId": 39,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "1978-04-01 13:47:49"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "2013-09-04 19:30:03"
                                                            }
                                                  ]
                                        },
                                        {
                                                  "ordersId": 40,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "1978-03-04 16:17:19"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "2004-03-20 21:31:01"
                                                            }
                                                  ]
                                        }
                              ]
                    },
                    {
                              "Id": 14,
                              "user": "卢娜",
                              "phoneNum": 13841574496,
                              "vipNum": 10368,
                              "registerTime": "2018-2-8",
                              "state": "注销",
                              "password": "12345678",
                              "balance": 796.3,
                              "orders": [
                                        {
                                                  "ordersId": 41,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "2001-02-16 10:44:22"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "2006-04-08 20:14:59"
                                                            }
                                                  ]
                                        },
                                        {
                                                  "ordersId": 42,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "1972-10-08 11:48:49"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "2013-07-01 20:29:17"
                                                            }
                                                  ]
                                        },
                                        {
                                                  "ordersId": 43,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "1970-08-08 12:40:22"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "2006-09-19 09:02:24"
                                                            }
                                                  ]
                                        }
                              ]
                    },
                    {
                              "Id": 15,
                              "user": "许军",
                              "phoneNum": 14500281743,
                              "vipNum": 10725,
                              "registerTime": "2018-2-2",
                              "state": "正常",
                              "password": "12345678",
                              "balance": 864.8,
                              "orders": [
                                        {
                                                  "ordersId": 44,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "1985-12-01 11:59:14"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "1983-05-02 07:39:17"
                                                            }
                                                  ]
                                        },
                                        {
                                                  "ordersId": 45,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "1978-06-28 05:57:55"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "2000-03-11 19:07:34"
                                                            }
                                                  ]
                                        },
                                        {
                                                  "ordersId": 46,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "1975-09-20 03:55:55"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "1992-10-19 12:34:07"
                                                            }
                                                  ]
                                        },
                                        {
                                                  "ordersId": 47,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "1984-10-04 23:23:21"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "2011-11-26 08:48:38"
                                                            }
                                                  ]
                                        }
                              ]
                    },
                    {
                              "Id": 16,
                              "user": "阎磊",
                              "phoneNum": 14410677813,
                              "vipNum": 12556,
                              "registerTime": "2018-2-8",
                              "state": "正常",
                              "password": "12345678",
                              "balance": 15.2,
                              "orders": [
                                        {
                                                  "ordersId": 48,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "1971-07-21 06:49:47"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "1970-06-01 04:13:52"
                                                            }
                                                  ]
                                        },
                                        {
                                                  "ordersId": 49,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "2011-10-09 08:42:24"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "2009-11-28 12:27:23"
                                                            }
                                                  ]
                                        }
                              ]
                    },
                    {
                              "Id": 17,
                              "user": "林勇",
                              "phoneNum": 14871953836,
                              "vipNum": 4723,
                              "registerTime": "2018-3-8",
                              "state": "正常",
                              "password": "12345678",
                              "balance": 71.8,
                              "orders": [
                                        {
                                                  "ordersId": 50,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "1979-10-04 14:01:13"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "2001-04-16 07:37:18"
                                                            }
                                                  ]
                                        },
                                        {
                                                  "ordersId": 51,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "2015-12-21 04:54:42"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "1973-08-16 18:20:48"
                                                            }
                                                  ]
                                        },
                                        {
                                                  "ordersId": 52,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "1981-11-25 13:24:53"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "1975-03-03 04:12:08"
                                                            }
                                                  ]
                                        },
                                        {
                                                  "ordersId": 53,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "1981-08-31 00:13:04"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "1976-01-09 09:44:57"
                                                            }
                                                  ]
                                        }
                              ]
                    },
                    {
                              "Id": 18,
                              "user": "贾秀英",
                              "phoneNum": 13806822054,
                              "vipNum": 920,
                              "registerTime": "2018-2-1",
                              "state": "注销",
                              "password": "12345678",
                              "balance": 303.7,
                              "orders": [
                                        {
                                                  "ordersId": 54,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "1996-11-10 08:15:32"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "2011-12-29 06:23:39"
                                                            }
                                                  ]
                                        },
                                        {
                                                  "ordersId": 55,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "2010-07-16 06:13:42"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "1982-06-13 20:43:46"
                                                            }
                                                  ]
                                        }
                              ]
                    },
                    {
                              "Id": 19,
                              "user": "沈娟",
                              "phoneNum": 14133754922,
                              "vipNum": 8764,
                              "registerTime": "2018-2-1",
                              "state": "注销",
                              "password": "12345678",
                              "balance": 997.6,
                              "orders": [
                                        {
                                                  "ordersId": 56,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "2004-12-06 22:49:09"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "1984-05-11 07:42:01"
                                                            }
                                                  ]
                                        }
                              ]
                    },
                    {
                              "Id": 20,
                              "user": "胡丽",
                              "phoneNum": 14054465451,
                              "vipNum": 12451,
                              "registerTime": "2018-3-1",
                              "state": "注销",
                              "password": "12345678",
                              "balance": 74.9,
                              "orders": [
                                        {
                                                  "ordersId": 57,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "1983-11-12 07:34:46"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "1989-06-10 10:45:49"
                                                            }
                                                  ]
                                        },
                                        {
                                                  "ordersId": 58,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "2002-03-20 10:51:35"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "1992-07-31 11:20:43"
                                                            }
                                                  ]
                                        }
                              ]
                    },
                    {
                              "Id": 21,
                              "user": "阎秀兰",
                              "phoneNum": 14180667729,
                              "vipNum": 9030,
                              "registerTime": "2018-2-8",
                              "state": "注销",
                              "password": "12345678",
                              "balance": 889.4,
                              "orders": [
                                        {
                                                  "ordersId": 59,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "2007-10-17 16:33:37"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "1992-06-10 16:11:40"
                                                            }
                                                  ]
                                        },
                                        {
                                                  "ordersId": 60,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "1979-04-02 11:29:38"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "1999-09-23 18:04:50"
                                                            }
                                                  ]
                                        },
                                        {
                                                  "ordersId": 61,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "1979-05-14 21:30:33"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "1983-09-13 10:51:54"
                                                            }
                                                  ]
                                        }
                              ]
                    },
                    {
                              "Id": 22,
                              "user": "贾军",
                              "phoneNum": 14280776210,
                              "vipNum": 5680,
                              "registerTime": "2018-3-8",
                              "state": "注销",
                              "password": "12345678",
                              "balance": 897.1,
                              "orders": [
                                        {
                                                  "ordersId": 62,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "2013-10-04 09:00:43"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "2018-03-08 07:21:59"
                                                            }
                                                  ]
                                        },
                                        {
                                                  "ordersId": 63,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "2004-04-28 01:31:47"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "2014-06-01 08:35:21"
                                                            }
                                                  ]
                                        }
                              ]
                    },
                    {
                              "Id": 23,
                              "user": "徐娜",
                              "phoneNum": 14680219941,
                              "vipNum": 2609,
                              "registerTime": "2018-2-8",
                              "state": "注销",
                              "password": "12345678",
                              "balance": 854.4,
                              "orders": [
                                        {
                                                  "ordersId": 64,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "1996-03-06 08:39:09"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "1975-03-05 20:04:59"
                                                            }
                                                  ]
                                        },
                                        {
                                                  "ordersId": 65,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "1999-12-05 13:14:43"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "1981-06-27 02:04:23"
                                                            }
                                                  ]
                                        },
                                        {
                                                  "ordersId": 66,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "1993-05-29 10:06:10"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "2018-04-24 22:05:03"
                                                            }
                                                  ]
                                        },
                                        {
                                                  "ordersId": 67,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "2006-08-19 14:07:12"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "2015-07-16 22:04:46"
                                                            }
                                                  ]
                                        }
                              ]
                    },
                    {
                              "Id": 24,
                              "user": "魏超",
                              "phoneNum": 13707648255,
                              "vipNum": 12300,
                              "registerTime": "2018-2-8",
                              "state": "注销",
                              "password": "12345678",
                              "balance": 149.3,
                              "orders": [
                                        {
                                                  "ordersId": 68,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "1983-09-09 13:21:01"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "1975-04-08 05:39:00"
                                                            }
                                                  ]
                                        },
                                        {
                                                  "ordersId": 69,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "1985-11-20 08:00:43"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "1996-11-13 13:10:53"
                                                            }
                                                  ]
                                        }
                              ]
                    },
                    {
                              "Id": 25,
                              "user": "贺丽",
                              "phoneNum": 14540802877,
                              "vipNum": 5854,
                              "registerTime": "2018-2-8",
                              "state": "注销",
                              "password": "12345678",
                              "balance": 623.6,
                              "orders": [
                                        {
                                                  "ordersId": 70,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "1977-06-22 05:20:58"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "1981-06-23 00:09:18"
                                                            }
                                                  ]
                                        },
                                        {
                                                  "ordersId": 71,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "1992-02-10 12:42:52"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "1988-01-06 16:22:00"
                                                            }
                                                  ]
                                        },
                                        {
                                                  "ordersId": 72,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "1990-10-30 12:27:15"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "1993-11-08 04:07:33"
                                                            }
                                                  ]
                                        },
                                        {
                                                  "ordersId": 73,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "2018-11-03 10:57:06"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "1988-11-25 06:13:09"
                                                            }
                                                  ]
                                        }
                              ]
                    },
                    {
                              "Id": 26,
                              "user": "龙芳",
                              "phoneNum": 14087715953,
                              "vipNum": 10951,
                              "registerTime": "2018-3-8",
                              "state": "注销",
                              "password": "12345678",
                              "balance": 555.6,
                              "orders": [
                                        {
                                                  "ordersId": 74,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "1997-06-29 14:40:44"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "1979-04-08 17:44:31"
                                                            }
                                                  ]
                                        }
                              ]
                    },
                    {
                              "Id": 27,
                              "user": "丁娟",
                              "phoneNum": 14642002394,
                              "vipNum": 9233,
                              "registerTime": "2018-2-1",
                              "state": "正常",
                              "password": "12345678",
                              "balance": 744.3,
                              "orders": [
                                        {
                                                  "ordersId": 75,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "2014-06-13 22:31:12"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "1984-02-18 15:08:31"
                                                            }
                                                  ]
                                        },
                                        {
                                                  "ordersId": 76,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "1977-06-29 22:43:13"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "1991-09-18 02:57:05"
                                                            }
                                                  ]
                                        },
                                        {
                                                  "ordersId": 77,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "1976-05-30 19:39:59"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "1992-01-27 16:10:02"
                                                            }
                                                  ]
                                        },
                                        {
                                                  "ordersId": 78,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "1974-05-25 03:28:01"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "1997-01-26 19:00:13"
                                                            }
                                                  ]
                                        }
                              ]
                    },
                    {
                              "Id": 28,
                              "user": "孟勇",
                              "phoneNum": 13960668243,
                              "vipNum": 7642,
                              "registerTime": "2018-2-8",
                              "state": "正常",
                              "password": "12345678",
                              "balance": 499.3,
                              "orders": [
                                        {
                                                  "ordersId": 79,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "1991-11-21 08:02:35"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "2005-10-25 00:41:57"
                                                            }
                                                  ]
                                        },
                                        {
                                                  "ordersId": 80,
                                                  "dishes": [
                                                            {
                                                                      "spuName": "宫保鸡丁",
                                                                      "price": "20",
                                                                      "num": 2,
                                                                      "cost": 40,
                                                                      "orderTime": "1997-09-07 14:44:11"
                                                            },
                                                            {
                                                                      "spuName": "鱼香肉丝",
                                                                      "price": "18",
                                                                      "num": 1,
                                                                      "orderTime": "2015-07-23 21:00:09"
                                                            }
                                                  ]
                                        }
                              ]
                    }
          ]
            }, {
                //不将版本号存入数据库
                versionKey: false
            }
        );
        // Users.save();
    }
});
/*
const staticPath = './www'
app.use(static(
    path.join(__dirname, staticPath)
))
app.use(bodyParser()); //POST传送过来数据格式转换,再router.get之前
 */
/* 
    ------------------       人员管理部分后台接口     -------------------
*/
// router.get('clerks', async (ctx) => {
//     let arr = await Shop.find({id: 1})
//     ctx.body = {
//         code: 0,
//         data: arr,
//         msg: "成功"
// }})

/* 
 find方法总结： 
    没有设置则匹配所有数据
*/
router.get('/pers/:act', async (ctx) => {
    let req = ctx.request.query; //对象
    // console.log(ctx.request.path) //pers/131232
    // console.log(ctx.params); //{ act:'22132'}
    let params = ctx.params
    switch (params.act) {
        case "clerks":
            try {
                let arr = await Shop.find({ //没有设置则匹配所有数据
                    id: 1
                }) 
                // let arr=  Shop.find().then(function (result) {
                // console.log(result); 
                //     });
                // let data1=await Data.find((e)=>{e==="banner"});
                //  Shop.find({'content.label': value}, function (err, comment) {
                //     console.log(comment)
                // })
                ctx.body = {
                    code: 0,
                    data: arr,
                    msg: "成功"
                }
            } catch (error) {
                ctx.body = {
                    code: 1,
                    msg: "找不到"
                }
            }
            break;
        case "member":    
            try {
                let arr = await User.find({ id: 3}).populate({UsersData:0}) 
                console.log(arr)
                ctx.body = {
                    code: 0,
                    data: arr,
                    msg: "成功"
                }
            } catch (error) {
                ctx.body = {
                    code: 1,
                    msg: "找不到"
                }
            }
            break;
    }
});

/* 
         思路整理：
         1.前端修改后发到后端;
         2.后端将所有内容获取到以后：
         3.pull模糊匹配到后,删除原来的;
         4.再根据前端发过来的新生成一条;(num唯一不变)
*/
/* 
         操作数据:
                  1. 删除原来数据 
                  2. 添加新数据 
         坑汇总：
                1. 修改数据时候注意修改Schema中类
                2. async 数据更新前(Shop.updatem)必须加  await  
*/
app.use(bodyParser()) //Fetch中 POST传送过来数据格式转换,再router.get之前

router.post('/pers', async (ctx) => {
    let req = ctx.request.query; //对象
    switch (req.act) {
        case "editClerks":
            try {
                /*  
                  步骤:
                      1.拿到num,添加到对象中; //req.num
                      2.删除数据库中原数据;
                      3.将新数据添加进去;
                */
                // 1.操作要加入数据库的对象
                let obj = ctx.request.body
                obj.num = parseInt(req.num)
                // 2.删除原来数据  
                await Shop.update({
                    "id": 1,
                }, {
                    $pull: {
                        ClerkData: {
                            // 删除时候需要对num类型进行判断
                            num: parseInt(req.num)
                        }
                    }
                });
                // 3.将对象添加到数据库中,添加修改后数据。
                await Shop.update({
                    "id": "1"
                }, {
                    $push: {
                        ClerkData: obj
                    }
                });
                /* ------------------------------------------- */
                let arr = await Shop.find({
                    id: 1
                })
                ctx.body = {
                    code: 0,
                    data: arr,
                    msg: "成功"
                }
            } catch (error) {
                ctx.body = {
                    code: 1,
                    msg: "找不到"
                }
            }
            break;
            //---------------------    添加数据     ----------------------- 
        case "addClerks":
            try {
                // 1.操作要加入数据库的对象
                let obj = ctx.request.body; //存储前端对象
                console.log(obj)
                let arr = await Shop.find({ //查找所有数据
                    id: 1
                })
                arr[0].ClerkData.sort((a, b) => a.num - b.num) // 改变原数组,将数组按照num数值排序,方便num+1
                obj.num = parseInt(arr[0].ClerkData[arr[0].ClerkData.length - 1].num + 1)

                await Shop.update({
                    "id": "1"
                }, {
                    $push: {
                        ClerkData: obj
                    }
                });
                let realArr = await Shop.find({
                    id: 1
                })
                ctx.body = {
                    code: 0,
                    data: realArr,
                    msg: "成功"
                }
            } catch (error) {
                ctx.body = {
                    code: 1,
                    msg: "找不到"
                }
            }
            break;
        case "deleteClerks":
            try {
                let obj = ctx.request.body; //存储前端对象
                await Shop.update({
                    "id": "1"
                }, {
                    $pull: {
                        ClerkData: {
                            num: parseInt(obj.num)
                        }
                    }
                });
                let realArr = await Shop.find({
                    id: 1
                })
                ctx.body = {
                    code: 0,
                    data: realArr,
                    msg: "成功"
                }
            } catch (error) {
                ctx.body = {
                    code: 1,
                    msg: "找不到"
                }
            }
            break;
    }
});

app.use(router.routes());
app.listen(2000, () => {
    console.log('app started at port 2000...');
})
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
        }
    }
});
 */