import axios from 'axios'

/* 
    yarn -y init
*/
let url = 'http://t.weather.sojson.com/api/weather/city/101010100'
// 为给定 ID 的 user 创建请求
axios.get(url)
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });


/* 

console.log('宏任务: 同步队列 = 1')

new Promise(resolve => {
    resolve('666')
    console.log('promise 任务先执行, then才是微任务处理22222')
}).then(data => {
    console.log('promise.then 微任务执行555', data)
}).then(data => {
    console.log('promise.then 微任务执行6666', data)
})

new Promise(resolve => {
    resolve('666')
    console.log('promise 任务先执行, then才是微任务处理333333')
}).then(data => {
    console.log('promise.then 微任务执行7777', data)
}).then(data => {
    console.log('promise.then 微任务执行888', data);
}).then(data => {
    console.log('promise.then 微任务执行9999', data);
})

console.log('宏任务: 同步队列 = 4444')
    
    */

// 打印结果
// 异步队列微任务，依次按照异步队列顺序和嵌套层级执行
/* 
    宏任务: 同步队列 = 1
    promise 任务先执行, then才是微任务处理22222
    promise 任务先执行, then才是微任务处理333333
    宏任务: 同步队列 = 4444
    promise.then 微任务执行555 666
    promise.then 微任务执行7777 666
    promise.then 微任务执行6666 undefined
    promise.then 微任务执行888 undefined
    promise.then 微任务执行9999 undefined
    undefined
    setTimeout 宏任务: 异步队列
*/

/* 
    new Promise(function(resolve, reject) {
  setTimeout(() => resolve(1), 1000);// 宏任务
}).then(function(result) {
  alert(result); // 1
  return new Promise((resolve, reject) => { // (*)
    setTimeout(() => resolve(result * 2), 1000);
  });
}).then(function(result) { // (**)
  alert(result); // 2
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(result * 2), 1000);
  });
}).then(function(result) {
  alert(result); // 4
});
*/

/* 
    setTimeout(() => {
    console.log('setTimeout 宏任务: 异步队列')
})

console.log('宏任务: 同步队列 = 1')

new Promise(resolve => {
    resolve('555')
    console.log('promise 任务先执行, then才是微任务处理22222')
    setTimeout(() => {
    console.log('setTimeout 宏任务: 异步队列22222')
},3000)
}).then(data => {
    console.log('promise.then 微任务执行555', data)
    setTimeout(() => {
    console.log('setTimeout 宏任务: 异步队列',data)
})
    return 7777
}).then(data => {
    console.log('promise.then 微任务执行777', data)
    setTimeout(() => {
        console.log('setTimeout 宏任务: 异步队列',data)
    })
})

new Promise(resolve => {
    resolve('666')
    console.log('promise 任务先执行, then才是微任务处理333333')
    setTimeout(() => {
    console.log('setTimeout 宏任务: 异步队列',3333333)
})
}).then(data => {
    console.log('promise.then 微任务执行6666', data)
    setTimeout(() => {
    console.log('setTimeout 宏任务: 异步队列',data)
},3000)
    return 8888
}).then(data => {
    console.log('promise.then 微任务执行888', data);
    setTimeout(() => {
    console.log('setTimeout 宏任务: 异步队列',data)
},3000)
    return 999999
}).then(data => {
    console.log('promise.then 微任务执行9999', data);
    setTimeout(() => {
    console.log('setTimeout 宏任务: 异步队列',data)
})
})
console.log('宏任务: 同步队列 = 4444')
*/