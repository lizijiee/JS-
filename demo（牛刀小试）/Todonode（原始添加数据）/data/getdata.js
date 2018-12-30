// 接收路由,固定格式
const ex=require("express");
const app=ex();



app.use("./test",require("./test_insert"));
let router=ex.Router();
 
router.get("/",(req,res,)=>{
    console.log(req.sql)
    res.send({code:0,data:req.sql})
});




module.exports = router;

/* 
// 一个简单的中间件
function middleware(req, res, next){
    // req 参数可以接受一些请求的参数(req.query/req.body) 和 请求头信息
    // res 用于响应信息
    // 调用next()方法则进入下一个中间件
}
// 几种常见的调用方式
app.use(middleware);
app.use('/user',middleware); // 匹配部分路径
app.get('/login',middleware); 
*/