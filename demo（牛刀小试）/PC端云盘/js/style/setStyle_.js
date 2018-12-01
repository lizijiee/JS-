//这里主要是因为高度都是继承来的所以给外面section设置一个高度,让滚动条可以一直在，内容显示完全;
const section = document.getElementById('section');
const head = document.getElementById('head');
let wH=window.innerHeight;//windowHeight;
let hH=head.offsetHeight;//headHeight;

section.style.height = wH - hH + 'px';//高度是继承来的,让高度根据内容自适应;
//页面缩放的时候计算section的高度
window.onresize = function(){
    // 如果高度是固定死得会导致内容现实不全;
    wH = window.innerHeight;
    section.style.height = wH - hH + 'px';
}