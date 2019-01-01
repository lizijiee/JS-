/* 
    localhost/move?type=down|up&id=9
*/
// 路由固定步骤
const ex = require("express");
const router = ex.Router();
router.get("/", (req, res) => {
    let obj = {
        code: 0,
        msg: '移动成功'
    }
    let {
        type,
        id
    } = req.query;
    // let data = req.sql.slice(0); //不改变原来数据，concat也可以，变量赋值也行
    let data = req.sql; 
    let index = data.findIndex(e => e.id == id);
    switch (type) {
        case "down":
            //  下一个
            let index2 = index + 1;
            // console.log(data[index2])
            // if (index == data.length - 1) {
            if (data[index2]) { //到底可以通过有没有来判断
                let temp = req.sql[index];
                req.sql[index] = req.sql[index2];
                req.sql[index2] = temp;
                obj.data=data;
            } else {
                obj.code = 5;
                obj.msg = '已经到底了，无法再移动了!!!!';
            }
            break;
        case "up":
        let index3 = index - 1;
         //有上一个
        if(data[index3]){
            let t = data[index];
            data[index] = data[index3];
            data[index3] = t;
            obj.data=data;
        }else{
            obj.code = 5;
            obj.msg = '已经到顶了，不能再移动了!!!';
            console.log('大王');
        }
            break;
    }
    res.send(obj);
})

module.exports = router