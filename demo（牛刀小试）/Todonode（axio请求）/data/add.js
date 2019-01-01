 let ex = require("express");
 let app = ex();
 let router = ex.Router();
 const bodyParser = require('body-parser'); //npm install body-parser
 const bp = bodyParser.urlencoded({
     extended: false
 });
 const querystring = require('querystring');

 // ---bodyParser.json()--解析JSON格式
 // ---bodyParser.raw()--解析二进制格式
 // ---bodyParser.text()--解析文本格式
 // ---bodyParser.urlencoded()--解析文本格式
 
 /* 
     localhost/add进入add.js
 */
 http: //localhost/add?name=xyz&age=xyz  添加数据方法
     router.get("/", (req, res) => {
         console.log(req.body)
         console.log("进来")
         //  console.log(req.query) //自动转化{ name: 'ff', age: '11' }
         let {
             name,
             age
         } = req.query;
         //  age=age*1
         if (name && age) {
             req.sql.push({
                 name,
                 age,
                 id: Date.now()
             })
             console.log(req.sql)
             res.send({
                 code: 0,
                 data: req.sql
             }); //发送给前端
         }
     })

 //  router.post("/",bp,(req,res)=>{
 //     console.log(req.body)
 //  })
 router.post("/", (req, res) => {
     let temp_data = '';
     //此步骤为接收数据
     req.on('data', function (chunk) {
         temp_data += chunk;
     });
     //开始解析
     req.on('end', function () {
        let {
            name,
            age
        } = querystring.parse(temp_data);//字符串转化为对象，再将对象进行变量赋值;
          if (name && age) {
            //  console.log(temp_data)
            //  console.log("待处理")
            //  console.log(querystring.parse(temp_data));
            console.log(name,age)
            //  age=age*1
                req.sql.push({
                    id: Date.now(),
                    name,
                    age,
                })
                res.send({
                    code: 0,
                    data: req.sql
                }); //发送给前端
            } 
         //  if (req.headers['content-type'].indexOf('application/json') !== -1) {
         //     //  JSON.parse(body);
         //  } else if (req.headers['content-type'].indexOf('application/octet-stream') !== -1) {
         //      //Rwa格式请求体解析
         //  } else if (req.headers['content-type'].indexOf('text/plain') !== -1) {
         //      //text文本格式请求体解析
         //  } else if (req.headers['content-type'].indexOf('application/x-www-form-urlencoded') !== -1) {
         //      //url-encoded格式请求体解析
         //  } else {
         //      //其他格式解析
         //  }
     })
 })




 // route.uws("/oo",require("./addoo"));//再增加下一层
 module.exports = router;