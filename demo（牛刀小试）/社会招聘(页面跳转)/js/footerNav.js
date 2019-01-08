/* ---------------页码部分部分组件----------- */
let transfer = {
    props: ['exp', "data", "urlnum"],
    template: `
             <nav id="nav">
             {{urlnum}}
  					<a href="javascript:;"   @mousedown="moveMin"  :class="{active:colorL}">&lt;</a>
                    <a  href="javascript:;" 
                    v-for="(val,key) in pageClick()"
                    @click="changeC(val)" 
                    :class="{active:num===0?num==1:num==val}"  
                    @changepage:setPage
                    >{{val}}</a>
                    <a href="javascript:;"   @mousedown="moveAdd"  @mouseup="mouseup($event)" :class="{active:colorR}">&gt;</a>
				</nav>
    `,
    data() {
        return {
            page: 4, //每页存放内容数量;
            num: 1, //选项卡索引,两值相同出现结果;
            colorL: false, //colorLeft
            colorR: false, //colorRight
         }
    },
    methods: {
        changeC(C) {
            // 每次点击触发,轮播图原理点击变色(改变某值，在class处增加对数值的判断).
            this.num = C;
            window.location.hash = `#lx=${this.exp}&page=${C}`;
            this.setPage(C, this.page)
        },
        pageClick() {
            //返回值为一共有几页;
            return Math.ceil(this.data[this.exp].text.length / this.page)
        },
        moveMin(ev) {
            //点击触发向左,绑定在@mousedown上面
            this.num == 1 ? this.num = 1 : this.num--;
            this.colorL = true;
            this.changeC(this.num);
            this.mouseup(ev)
        },
        moveAdd(ev) {
            this.num == this.pageClick() ? this.num == this.pageClick() : this.num++;
            this.colorR = true;
            this.changeC(this.num)
            this.mouseup(ev)
            // this.$nextTick(function () {
            // DOM 现在更新了
            // `this` 绑定到当前实例
            // console.log(1111)
            // this.mouseup(ev)
            //   })
        },
        mouseup() {
             //绑定在@mouseup上面,鼠标抬起后按钮红色消失,变灰.
            // BUG：数据先渲染@mouseup绑定不上.
            setTimeout(() => {
                this.colorL = this.colorR = false;
            }, 100)
        },
        setPage(num, page) {
            //子集里面去传参给父级,执行父级函数
            //目的：把点击的页码传到父级上,父级在传到主列表组件中***显示与页码相联系的内容***
            this.$emit('changepage', num, page)
        }
    },
    watch: {
        urlnum:function () {
            // 监听的变量为：URL中输入的page,与页码组件建立联系
            this.num = this.urlnum;
            this.setPage(this.num, this.page)
        }
    },
};

Vue.component(
    "listnav", transfer
)


// 7%2==0?7/2:~~(7/2)+1;别再取模直接使用向上向下取整

// 对象代替switch使用，但是缺点需要手动写obj，因该去避免，自动添加对象
// let address = {
//     "#lx=sh&page=1": () => {
//         this.num = 1
//     },
//     "#lx=xy&page=1": () => {
//         this.num = 1
//     },
//     "#page1": () => {
//         this.num = 1
//     },
//     "#page2": () => {
//         this.num = 2
//     },
//     "#page3": () => {
//         this.num = 3
//     },
// };
