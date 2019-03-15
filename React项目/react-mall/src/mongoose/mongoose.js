const Koa = require("koa");
const app = new Koa();
const router = require('koa-router')();
const static = require('koa-static');
const path = require('path');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const {
    Shop,
    User
} = require("./ShopModel"); //导入Person类,new 一下  save一下搞定


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
                "UsersData": [{
                        "Id": 1,
                        "user": "金芳",
                        "phoneNum": 14493285722,
                        "vipNum": 4953,
                        "registerTime": "2018-3-8",
                        "state": "注销",
                        "password": "12345678",
                        "balance": 664.8
                    },
                    {
                        "Id": 2,
                        "user": "傅勇",
                        "phoneNum": 14584461519,
                        "vipNum": 11711,
                        "registerTime": "2018-2-1",
                        "state": "注销",
                        "password": "12345678",
                        "balance": 263.3
                    },
                    {
                        "Id": 3,
                        "user": "朱芳",
                        "phoneNum": 14738320089,
                        "vipNum": 13144,
                        "registerTime": "2018-2-1",
                        "state": "正常",
                        "password": "12345678",
                        "balance": 909.6
                    },
                    {
                        "Id": 4,
                        "user": "高艳",
                        "phoneNum": 14928991841,
                        "vipNum": 241,
                        "registerTime": "2018-2-1",
                        "state": "注销",
                        "password": "12345678",
                        "balance": 252.2
                    },
                    {
                        "Id": 5,
                        "user": "史秀英",
                        "phoneNum": 13738290349,
                        "vipNum": 3980,
                        "registerTime": "2018-2-8",
                        "state": "正常",
                        "password": "12345678",
                        "balance": 482.2
                    },
                    {
                        "Id": 6,
                        "user": "万敏",
                        "phoneNum": 14406927717,
                        "vipNum": 8144,
                        "registerTime": "2018-3-2",
                        "state": "正常",
                        "password": "12345678",
                        "balance": 290.2
                    },
                    {
                        "Id": 7,
                        "user": "黄静",
                        "phoneNum": 14555242307,
                        "vipNum": 994,
                        "registerTime": "2018-2-2",
                        "state": "正常",
                        "password": "12345678",
                        "balance": 459.3
                    },
                    {
                        "Id": 8,
                        "user": "龙秀兰",
                        "phoneNum": 13807753825,
                        "vipNum": 3824,
                        "registerTime": "2018-3-8",
                        "state": "注销",
                        "password": "12345678",
                        "balance": 980.3
                    },
                    {
                        "Id": 9,
                        "user": "沈勇",
                        "phoneNum": 14491368424,
                        "vipNum": 13527,
                        "registerTime": "2018-3-2",
                        "state": "正常",
                        "password": "12345678",
                        "balance": 727.7
                    },
                    {
                        "Id": 10,
                        "user": "黄芳",
                        "phoneNum": 14118944018,
                        "vipNum": 5552,
                        "registerTime": "2018-3-2",
                        "state": "正常",
                        "password": "12345678",
                        "balance": 141.2
                    },
                    {
                        "Id": 11,
                        "user": "阎平",
                        "phoneNum": 13827958496,
                        "vipNum": 416,
                        "registerTime": "2018-2-2",
                        "state": "注销",
                        "password": "12345678",
                        "balance": 692.1
                    },
                    {
                        "Id": 12,
                        "user": "顾霞",
                        "phoneNum": 14408163895,
                        "vipNum": 9937,
                        "registerTime": "2018-3-8",
                        "state": "正常",
                        "password": "12345678",
                        "balance": 873.6
                    },
                    {
                        "Id": 13,
                        "user": "沈强",
                        "phoneNum": 14115131596,
                        "vipNum": 10432,
                        "registerTime": "2018-2-1",
                        "state": "正常",
                        "password": "12345678",
                        "balance": 865.8
                    },
                    {
                        "Id": 14,
                        "user": "孙洋",
                        "phoneNum": 15013489087,
                        "vipNum": 2913,
                        "registerTime": "2018-3-2",
                        "state": "注销",
                        "password": "12345678",
                        "balance": 966.3
                    },
                    {
                        "Id": 15,
                        "user": "傅艳",
                        "phoneNum": 14476756448,
                        "vipNum": 4021,
                        "registerTime": "2018-3-8",
                        "state": "注销",
                        "password": "12345678",
                        "balance": 628.2
                    },
                    {
                        "Id": 16,
                        "user": "周伟",
                        "phoneNum": 14919070943,
                        "vipNum": 7616,
                        "registerTime": "2018-3-1",
                        "state": "正常",
                        "password": "12345678",
                        "balance": 970.2
                    },
                    {
                        "Id": 17,
                        "user": "何秀英",
                        "phoneNum": 14681014075,
                        "vipNum": 8369,
                        "registerTime": "2018-2-2",
                        "state": "正常",
                        "password": "12345678",
                        "balance": 936.3
                    },
                    {
                        "Id": 18,
                        "user": "林洋",
                        "phoneNum": 14599398338,
                        "vipNum": 3018,
                        "registerTime": "2018-2-1",
                        "state": "正常",
                        "password": "12345678",
                        "balance": 857.6
                    },
                    {
                        "Id": 19,
                        "user": "宋杰",
                        "phoneNum": 14134536679,
                        "vipNum": 150,
                        "registerTime": "2018-3-2",
                        "state": "正常",
                        "password": "12345678",
                        "balance": 178.6
                    },
                    {
                        "Id": 20,
                        "user": "叶超",
                        "phoneNum": 13933320017,
                        "vipNum": 5510,
                        "registerTime": "2018-2-1",
                        "state": "注销",
                        "password": "12345678",
                        "balance": 567.7
                    },
                    {
                        "Id": 21,
                        "user": "杨磊",
                        "phoneNum": 14537556359,
                        "vipNum": 1113,
                        "registerTime": "2018-3-8",
                        "state": "正常",
                        "password": "12345678",
                        "balance": 695.8
                    },
                    {
                        "Id": 22,
                        "user": "宋洋",
                        "phoneNum": 14018848629,
                        "vipNum": 4259,
                        "registerTime": "2018-2-8",
                        "state": "注销",
                        "password": "12345678",
                        "balance": 981.3
                    },
                    {
                        "Id": 23,
                        "user": "叶丽",
                        "phoneNum": 13891949695,
                        "vipNum": 11592,
                        "registerTime": "2018-3-8",
                        "state": "注销",
                        "password": "12345678",
                        "balance": 679.2
                    },
                    {
                        "Id": 24,
                        "user": "毛磊",
                        "phoneNum": 14475698138,
                        "vipNum": 4915,
                        "registerTime": "2018-2-1",
                        "state": "注销",
                        "password": "12345678",
                        "balance": 281.1
                    },
                    {
                        "Id": 25,
                        "user": "陆涛",
                        "phoneNum": 14231345729,
                        "vipNum": 6940,
                        "registerTime": "2018-3-2",
                        "state": "正常",
                        "password": "12345678",
                        "balance": 609.8
                    },
                    {
                        "Id": 26,
                        "user": "邱敏",
                        "phoneNum": 13917655599,
                        "vipNum": 11305,
                        "registerTime": "2018-3-8",
                        "state": "注销",
                        "password": "12345678",
                        "balance": 416.4
                    },
                    {
                        "Id": 27,
                        "user": "康秀兰",
                        "phoneNum": 14587784942,
                        "vipNum": 4355,
                        "registerTime": "2018-2-1",
                        "state": "正常",
                        "password": "12345678",
                        "balance": 282.4
                    },
                    {
                        "Id": 28,
                        "user": "马杰",
                        "phoneNum": 13755918702,
                        "vipNum": 5483,
                        "registerTime": "2018-3-2",
                        "state": "注销",
                        "password": "12345678",
                        "balance": 708.4
                    },
                    {
                        "Id": 29,
                        "user": "朱勇",
                        "phoneNum": 14226281544,
                        "vipNum": 12306,
                        "registerTime": "2018-2-1",
                        "state": "正常",
                        "password": "12345678",
                        "balance": 676.6
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

//   ------------------       人员管理部分后台接口     -------------------

/* 
 find方法总结： 
    没有设置则匹配所有数据
*/
router.get('/pers/:act', async (ctx) => { //用于查找,首次渲染的接口
    let req = ctx.request.query; //对象
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
                let arr = await User.find({
                    "id": 3
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
            /*  
              //第一层: 用户层面(UsersData)删除操作
              await User.update({
                   "id": 3,
               }, {
                   $pull: {
                       UsersData: {
                           // 删除时候需要对num类型进行判断
                           Id: parseInt(1)
                       }
                   }
               }); 
               */
            break;
    }
});

router.get('/food/:act', async (ctx) => { //food组件接口
    let req = ctx.request.query; //对象
    let params = ctx.params
    switch (params.act) {
        case "list":
            try {
                let arr = await Shop.find({ //没有设置则匹配所有数据
                    pid: 3
                })
                ctx.body = {
                    data: arr,
                    code: 0,
                    msg: "查找成功"
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
app.use(bodyParser())
router.post('/food', async (ctx) => { //food组件接口
    let req = ctx.request.query; //对象
    switch (req.act) {
        case "editFood":
            try {
                let obj = ctx.request.body
                obj.spuId = parseInt(req.spuId)
                
                // 2.删除原来数据  
                await Shop.update({
                    tag: obj.tag,
                }, {
                    $pull: {
                        spuList: {
                            // 删除时候需要对num类型进行判断
                            spuId: obj.spuId
                        }
                    }
                });
                // 3.将对象添加到数据库中,添加修改后数据。
                console.log(obj)
                await Shop.update({
                    tag: obj.tag
                }, {
                    $push: {
                        spuList: obj
                    }
                });
                /* ------------------------------------------- */
                let arr = await Shop.find({
                    tag: obj.tag,
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
//Fetch中 POST传送过来数据格式转换,再router.get之前

router.post('/pers', async (ctx) => { //用于写编辑的接口
    let req = ctx.request.query; //对象
    switch (req.act) {
        /* --------------------------  店员信息操作    --------------------- */
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
            //---------------------    添加     ----------------------- 
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
            //---------------------    删除     ----------------------- 
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
            /* -----------------------------  会员信息操作    ----------------------- */
        case "editMember":
            try {
                console.log(ctx.request.body)
                let obj = ctx.request.body
                obj.Id = parseInt(obj.Id)
                await User.update({ // 2.删除原来数据  
                    "id": 3,
                }, {
                    $pull: {
                        UsersData: {
                            // 删除时候需要对num类型进行判断
                            Id: obj.Id
                        }
                    }
                });
                await User.update({ // 3.添加。
                    "id": 3,
                }, {
                    $push: {
                        UsersData: obj
                    }
                });
                let arr = await User.find({
                    id: 3
                })
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
            /* -----------------------------  删除操作    ----------------------- */
        case "deleteMember":
            try {
                let obj = ctx.request.body;
                await User.update({
                    "id": 3
                }, {
                    $pull: {
                        UsersData: {
                            Id: parseInt(obj.Id)
                        }
                    }
                });
                let realArr = await User.find({
                    id: 3
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