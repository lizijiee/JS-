# Promise入坑指南

## 1. Promise 介绍



为什么我们要使用，promise，promise解决了那些痛点问题，请举有力证据说明，回调地狱，

Promise
Promises/A+
promises的核心思想是，promise表示异步操作的结果。一个承诺处于以下三种不同状态之一：

- pending - The initial state of a promise.
- fulfilled - The state of a promise representing a successful operation.
- rejected - The state of a promise representing a failed operation.

Once a promise is fulfilled or rejected, it is immutable (i.e. it can never change again).


A promise must be in one of three states: pending, fulfilled[fʊlˈfɪld], or rejected美[rɪˈdʒektɪd].

1. When pending, a promise:

   1. may transition to either the fulfilled or rejected state.中间状态，可能会转换为已实现或已拒绝状态。

2. When fulfilled, a promise:

   1. must not transition to any other state.不得过渡到任何其他状态。
   2. must have a value, which must not change.必须具有一个值，该值不能更改。

3. When rejected, a promise:

   1. must not transition to any other state.不得过渡到任何其他状态。
   2. must have a reason, which must not change.必须有一个理由，不能改变。

   Promises/A+
   为什么会有这两种状态，避免回调地狱中参数报错，导致下 面代码无法执行，具体实例；
   promise决议结果两种，完成或者拒绝，决议结果为不变值（immutabe value）不可改变

   为什么new Promise()会立即执行，而.then却进入微任务队列。
   为什么两个promise的微任务交替执行，原理是什么，插入同一个数组嘛？

<img src="C:\Users\李子杰\AppData\Roaming\Typora\typora-user-images\image-20200527230505044.png" alt="image-20200527230505044" style="zoom:50%;" />
配合相关习题
项目中应用

## 2.Promise应用





### 2.1.Promise在vue中使用



> [vue中promise的使用:按顺序发请求](https://www.cnblogs.com/zhuzhenwei918/p/6915451.html)

async await  原理？什么时候使用？
promise为什么能无限回调
理解，追踪，维护

## 4. Promise源码

手把手教你读Promise源码：
`yarn add promise `

下载完成，文件夹内多了node_modules文件，看到文件夹你可能会很熟悉，但是打开promise文件一定会一脸懵，说好的promise源码呢，这一堆是什么鬼？
下面我们进行npm文件结构分析，以便先找到我们的promise源码。



Polyfill 


```javascript
let date=new Date();
let date1=new Date();

console.log(date) //Wed May 27 2020 20:51:50 GMT+0800 (中国标准时间)
// 定时器时间并不准确，需要等其它任务完成
setTimeout(()=>{
    console.log(date=new Date() - date) //4748
},2000)
for(let i=0;i<100000;i++){
        console.log(i)
       date1=new Date()
};
console.log(date,date1-date); //Wed May 27 2020 20:51:50 GMT+0800 (中国标准时间) 4746
```



<img src="C:\Users\李子杰\AppData\Roaming\Typora\typora-user-images\image-20200527205305270.png" alt="image-20200527205305270" style="zoom: 50%;" />

<img src="C:\Users\李子杰\AppData\Roaming\Typora\typora-user-images\image-20200527205437581.png" alt="image-20200527205437581" style="zoom:50%;" />



> [promise官网](https://www.promisejs.org/)
> [promise源码](https://www.promisejs.org/polyfills/promise-6.1.0.js)
> [promise](https://www.jianshu.com/p/1b63a13c2701)
> [Promise之你看得懂的Promise](https://juejin.im/post/5b32f552f265da59991155f0)
> [你能手写一个Promise吗？Yes I promise。](https://juejin.im/post/5c41297cf265da613356d4ec)
> [[JS基础] 6 - 执行机制, 同步异步, Event Loop, 宏任务, 微任务](https://zhuanlan.zhihu.com/p/137802406)
> [图解 Promise 实现原理（一）—— 基础实现](https://zhuanlan.zhihu.com/p/58428287)
>
> 





```javascript
/* 
    new了以后做了什么：
    第一步创建，是一个新对象； 
    第二步赋值，将该对象内置的原型对象设置为构造函数prototype引用的那个原型对象； 
    第三步初始化，就是将该对象作为this参数调用构造函数，完成成员设置等初始化工作。
    this 关键字指向当前创建的实例this 关键字指向当前创建的实例

    JavaScript 中并没有真正的类，但JavaScript 中有构造函数和new 运算符。构造函数用来给实例对象初始化属性和值。任何JavaScript 函数都可以用做构造函数，构造函数必须使用new 运算符作为前缀来创建新的实例。
    new 运算符改变了函数的执行上下文，同时改变了return 语句的行为。实际上，使用new和构造函数很类似于传统的实现了类的语言:

    function Base(){
        this.id=33333;
    };
    var obj = new Base();
    var obj  = {};
    obj.__proto__ = Base.prototype;
    Base.prototype.toString = function() {
        // this指向实例化对象obj;
        return this.id;
    }
    Base.call(obj);
*/
```



```javascript
function Promise(fn) {
    if (typeof this !== 'object') {
        throw new TypeError("Promise 必须采用new方式调用")
    }
    if (typeof fn !== 'function') {
        throw new TypeError("Promise 参数不是一个函数")
    }
    this.state = “pending”; //存state值
    if (fn === function () {}) return;
    doResolve(fn, this) //调用States状态切换函数
}

// Promise状态改变封装完成;
function doResolve(fn, promise) {
    let done = false;
    /* 
        0: pending
        1: fulfilled
        2: rejected
        3: adopted the states of another promise;
        先不采用数字，直接采用字符串看起来更加直观。
    */
    try {
        fn(function (val) {
            if (done) return;
            done = true;
            promise.state = “fulfilled”
            // resolve(promise, val)
        }, function (reason) {
            if (done) return;
            done = true;
            promise.state = “rejected”
            // reject(promise, val)
        })
    } catch (err) {
        if (done) return;
        done = true;
		promise.state = “rejected”
       // reject(err)
    }
}
```

