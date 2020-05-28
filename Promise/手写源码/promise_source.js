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
    
*/
function Promise(fn){

}

console.log(Promise)


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