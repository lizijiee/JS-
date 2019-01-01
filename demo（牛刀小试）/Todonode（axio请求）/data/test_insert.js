const re=require("express");
let router=re.Router();
router.get("/",(res,req)=>{
    console.log(123456)

    console.log('多层路由嵌套测试成功');
})

module.exports=router