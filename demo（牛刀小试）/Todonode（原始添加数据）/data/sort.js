/* 
    localhost/sort?select=age&ab=1
    http://localhost/sort?select=id&ab=2
    （从低到高） 2（从大到低）;

    select   age || id
    ab       1  从低到高
             2  从高到低   
    {code:0,data:[]}  把排序完的数据传给前端
*/
// 路由固定动作
const ex = require("express");
const route = ex.Router();
let obj = {
    code: 0,
    msg: '成功'
}
route.get("/", (req, res) => {
    // let data = req.sql //原数据被改变了，但是不应该被改变，如果有刷新功能，可以使用原来的数据
    // let data = req.sql.concat(); //不改变原来数组方法;
    // let data = req.sql.slice(0); //不改变原来数组方法;
    let data = [...req.sql];
    // [1,2,8,3,6].slice(1)   (4) [2, 8, 3, 6]
    // [1,2,8,3,6].slice(1,2)   [2]
    // [1,2,8,3,6].slice(-1)    [6]
    let {
        select,
        ab
    } = req.query;
     if (ab == "1") {
        data.sort((a, b) => a[select] - b[select]);
        obj.data=data;
     } else if (ab == "2") {
        data.sort((a, b) => b[select] - a[select]);
        obj.data=data;
    }else{
        obj.code = 3;
        obj.msg = '参数错误';
        res.status(400);
    }
    res.send(obj);
    //  res.send(data);
     // if (select == "id") { //对哪个类型选择
    //     if (ab == "1") { //ab=1是从低到高排序
    //         data.sort((a, b) => a.id - b.id)
    //     } else if (ab == "2") {
    //         data.sort((a, b) => b.id - a.id)
    //     } else {
    //         obj.code = 3;
    //         obj.msg = "参数错误";
    //         res.send(400, obj);
    //     }
    //     // 说明按照编号来排序
    // } else if (select == "age") {
    //     if (ab == "1") { //ab=1是从低到高排序
    //         data.sort((a, b) => a.age - b.age)
    //     } else if (ab == "2") {
    //         data.sort((a, b) => b.age - a.age)
    //     } else {
    //         obj.code = 3;
    //         obj.msg = "参数错误";
    //         res.send(400, obj);
    //     }
    // } else {
    //     obj.code = 3;
    //     obj.msg = "参数错误";
    //     res.send(400, obj);
    // }
})

module.exports = route;