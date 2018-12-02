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

    function getChild(id) {
        let arr = [];
        id = id * 1;
        for (let attr in data) { //可以循环对象
            if (data[attr].pid === id) arr.push(data[attr])
        }
        return arr.length ? arr : null;
    }
    /* 
        通过id找到他爹数据
    */
    function getParent(id) {//找爹
        //两种情况：
        //    1.是错误的;(undefined)
        //    2.本身为最大父级即没有爹;(data[id].pid==-1没有爹)
        if (!data[id] || data[id].pid == -1) return null;
        return data[data[id].pid]
    }
    /* 
        通过id找到他爹的爹
    */
    //逻辑很重要,一层一层查找可以用while循环，没有限制;    
    function getParentS(id) {//包含自身以上所有等级
        //找爹把每次pid作为下一次的id，循环到底
        let parentArr = [];
        let aa = data[id];
        while (aa) { //如果aa是true进入
            parentArr.unshift(aa); //把爹往前放
            // parentArr.push(aa);
            aa = getParent(aa.id); //找到爹，让爹等于儿子，再查找;
        }
        return  parentArr
    }

    function addAttr(attr, value) {
        //当attr在data中存在，将data该属性都改为一样的值，不存在的时候，都添加一个attr并且对应的值为value 
        // {id: 4, pid: 3, title: "发如雪", checked: false, pss: 3000}
        for (let k in data) {
            data[k][attr] = value;
        }
    }
    return {
        getChild,
        getParent,
        getParentS,
        addAttr
    } //这里必须用对象包一下
})()
const {
    getChild,
    getParent,
    getParentS,
    addAttr
} = myTools; //myTools返回值就是一个对象;

