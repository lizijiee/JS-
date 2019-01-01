const ex=require("express");
const app=ex();

let sql=[
    {id:1,name:"小强",age:18},
    {id:3,name:"小明",age:32},
    {id:2,name:"小红",age:22},
    {id:4,name:"小绿",age:15},
    {id:5,name:"小紫",age:19}
]
 
app.use(ex.static("www"));

app.use((req,res,next)=>{//把app.js数据发送到add.js中,在路由的get里面
    //为什么呢原理是什么呢
    req.sql = sql;
    next();
})

app.use("/add",require("./data/add"));//只要碰到/add就用add.js去处理,转换路径
// 路由好去分发;这边转过去固定格式，add.js中见接收
app.use("/sort",require("./data/sort"));
app.use('/getdata',require('./data/getdata'));
app.use('/rm',require('./data/rm'));
app.use('/move',require('./data/move'));
app.use('/deletes',require('./data/deletes'));




// get请求,第一个为路径;
//app.get(路径，回调函数(req,res,next))
/* 
app.get("/",(req,res,next)=>{
   
    "/"根路径，相当于写了个localhost
    通过localhost才能访问app.js
    req.url找到客户端不但访问了服务器,还带了一些东西过来 
 
    //只要url中碰到add => 使用add.js文件去管理;require引入文件
    console.log(req.url) //结果为： "/"
}) 
*/

// app.get("/",(req,res,next)=>{
//     console.log(11111111)
// }) 

app.listen(80,()=>{
    console.log('启动成功!');
});
