/* 
    localhost/rm?id=num 

    删除对应ID数据;
*/
const ex=require("express");
const route=ex.Router();
//使用过滤也可以用作删除;
route.get("/",(req,res)=>{
    let {id}=req.query;
    // filter影响下面的结果findIndex;
    // req.sql=req.sql.filter(e=>e.id!=id);//把一个新地址赋给它,后面是条件把不等于ID的都剩下，返回新数组
    // 可以直接在数据总查找;
   let index=req.sql.findIndex(e=>e.id==id);
     // arr.findIndex(e=>e.id)    
    // let arr2=[{id:0},{id:1}]    arr2.findIndex(e=>e.id)   1   操作原来数据;
    if(index !=-1){
         req.sql.splice(index,1);
        res.send({code:0,msg:"删除成功",data:req.sql});
    }else{
        // res一般是数值  req一般是方法
        res.status(400);
        res.send({code:1,msg:"删除的内容不存在"});
    } 
})

module.exports=route;