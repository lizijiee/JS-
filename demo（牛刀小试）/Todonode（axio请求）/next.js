let app = {};

// 中间件;
const express = require('express');
const app = express();
let arr=[]
app.middleware=[];

app.use = function(cb){
    this.middleware.push(cb);
}
app.use((req,res,next)=>{
    console.log(1);
    next();
})

app.use((req,res,next)=>{
    console.log(2);
});

console.log(app.middleware);

let index=0;
function next(){
    app.middleware[index++]('','',next);
}
next();

console.log(arr)