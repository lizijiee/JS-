/* 
    手写之前需要先搞清楚Promise 执行顺序：
    new Promise 返回三种状态,提供给.then使用两个形参回调控制状态改变：
    PromiseStatus
    PromiseValue
    返回值：
    1. pending
    2. resolved
    3. rejected
    States
    pending->fulfilled，pending->rejected。

*/
/* 
    1.先写Promise接收函数内部逻辑
    2.先写Promise接收函数内部逻辑
*/
/* 
    Promise接收值为必须为一个函数
*/
// 画个fn对应Promise内部参数及函数关系图;
function Promise(fn) {
    // 2点限制： 形参限制，调用限制;
    // new 创建一个对象，构造函数this，指向创建对象。
    console.log(typeof this, this)

    if (!(this instanceof Promise)) {
        // if (typeof this !== 'object') {
        throw new TypeError("Promise 必须采用new方式调用")
    }
    if (typeof fn !== 'function') {
        throw new TypeError("Promise 参数不是一个函数")
    }
    this.state = 0; //存state值,pending
    this.value = null; // 存promise值
    this.callbacks = []; // 存放回调then方法中队列————数组

    // 完成两点限制以后，promise怎样拿到传入函数参数，来对接下来States进行修改;
    /* 
        想到根据传入函数参数，考虑状态是否有改变，
        Promise States:  
        pending, fulfilled, or rejected.

    */
    // 函数作为一等公民
    if (fn === function () {}) return;
    doResolve(fn, this)
}

function resolve(self, val) {
    // 传入参数promise及promise实参
    self.state = 1;
    self.value = val;
    // 把收集.then中异步数组执行
    // 只有promise后第一个then函数接收val
    setTimeout(() => {
        //若同步执行resolve 执行时，callbacks 还是空数组，后续.then无法执行
        self.callbacks.forEach(fn => {
            console.log(fn);
            fn(val);
        });
    }, 0)
    // promise 实例化对象,val为Promise函数中调用reslove的参数reslove(val)
    // 状态改变以后怎样向下执行
}
Promise.prototype.then = function (onFulfilled, onRejected) {
    if (this.state === 1) {
        this.callbacks.push(onFulfilled)
        return this //去Promise下找.then方法
    }
}

// 封装state状态转换函数,回调函数封装;
function doResolve(fn, promise) {
    let done = false;
    // false:pending,true:fulfilled,true:rejected
    /* 
        0: pending
        1: fulfilled
        2: rejected
        3: adopted the states of another promise;
    */
    // new Promise((re)=>{re(11)},(re)=>{re(11)}).then((a)=>{console.log(a)})
    // 我虽然不知道fn实参传入什么，但是传入函数，检查fn内部是否对形参函数进行调用,如果内部调用形参则状态变为对应state!!!!
    // 未调用reslove和reject怎样处理？？
    try {
        fn(function (val) {
            if (done) return;
            done = true;
            // _this.state = 1 
            // 发现并不能直接修改,直接修改和this调用位置相关使用不方便
            // 只是完成了状态的改变，reslove参数怎么拿到，继续往下传;————拿参数直接在传入函数形参中获取实参reslove中参数.reslove(3)=function(val){}()
            // promise.state = 1 // fulfilled
            resolve(promise, val)
        }, function (reason) {
            if (done) return;
            done = true;
            promise.state = 2 // rejected
            // reject(promise, val)
        })
    } catch (err) {
        if (done) return;
        done = true;
        // reject(err)
        console.log("promise运行错误:", err)
    }
}



let p = new Promise(resolve => {
    console.log('同步执行');
    resolve('同步执行');
}).then(tip => {
    console.log('then1', tip);
}).then(tip => {
    console.log('then2', tip);
});

setTimeout(() => {
    p.then(tip => {
        console.log('then3', tip);
    })
});

// promise.then(function (value) {
//     // success
//     console.log(true, value)
// }, function (value) {
//     // failure
//     console.log(false, value)
// });