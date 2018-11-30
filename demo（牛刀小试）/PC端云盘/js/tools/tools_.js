let data_Arrary = Object.values(data) //数据改成全局变量;
//  let arr1=Array.from(data)//需要length，不变原对象
// let values = []
// for(let property in data){
//   values.push(data[property])//不能用点
// }
// console.log(values);

let myTools = (function () {
    /*
        通过父级的id获取所有子级
    */
    function getChild (id)  {
        let arr = [];
        for (let attr in data) { //可以循环对象
            if (data[attr].pid === id) arr.push(data[attr])
        }
        return arr.length ? arr : null;
    }

    /* 
        通过id找到他爹数据
    */
    function getParent(id){  
       //两种情况：
       //    1.是错误的;(undefined)
       //    2.本身为最大父级即没有爹;(data[id].pid==-1没有爹)
       if(!data[id]||data[id].pid==-1)return null; 
       return data[data[id].pid] 
    }

    return {
        getChild,getParent
    } //这里必须用对象包一下
})()
const {getChild,getParent} = myTools;

//返回的就是一个对象

console.log(getParent(100))