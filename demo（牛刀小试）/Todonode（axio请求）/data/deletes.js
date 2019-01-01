// 批量删除
const ex = require("express");
const router = ex.Router();
const bodyParser = require("body-parser");
const bp = bodyParser.urlencoded({
    extended: false
});

//还有一种原生写法,为on

router.post("/", bp, (req, res) => { //post不能从地址输入栏调试代码吗？
    let {
        arr
    } = req.body;
    let {
        sql: data
    } = req;

    //拿到data，拿到req.body，对data修改再吐回去
    //转换后结果：body: "arr="+JSON.stringify(arr)
    //["3","2"]={ arr: '["3","2"]' };
    // arr=["3","2"]
    try {
    // 检查两个是不是一样如果一样就删除掉;

    // console.log(arr[1])//结果为："

    //!!!!!!!arr = JSON.parse(arr) //前面进行JSON.stringify(arr)传过来，后面JSON.parse(arr)转回去，不然选第几位时候是字符串
    // 常用的循环嵌套是二重循环，外层训话称为外循环，内层循环称为内循环
  for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            if (arr[j] == data[i].id) {
                // data.splice(i,1);
                data.splice(i, 1);
                i = i - 1;
                break; //外循环内循环一对一匹配，匹配上了就别再继续检查内循环外面的了.
                // break;//只进来一次内循环不再循环
                // return;//终止整个循环，外循环进内循环，就结束了;
                // continue;//跳出当前的循环，下面代码不再执行，j++继续执行;
            }
        }
    }; 
    } catch (error) {
        res.status(400);
        res.send({code:6,msg:'批量删除失败!'});
    }
    // let data=req.sql;另一种赋值方法;
    res.send({
        code: 0,
        msg: '批量删除成功!',
        data
    });
});
module.exports = router;