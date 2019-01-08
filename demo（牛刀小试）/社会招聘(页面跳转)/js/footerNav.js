let transfer = {
    props: ['exp', "data"],
    template: `
             <nav id="nav">
             {{exp}}
  					<a href="javascript:;"   @mousedown="moveMin"  :class="{active:colorL}">&lt;</a>
                    <a  href="javascript:;" 
                    v-for="(val,key) in pageClick()"
                    @click="changeC(val)" 
                    :class="{active:num===0?num=val=1:num==val}"  
                    @changepage:setPage(num,page)
                    >{{val}}</a>
                    <a href="javascript:;"   @mousedown="moveAdd"  @mouseup="mouseup($event)" :class="{active:colorR}">&gt;</a>
				</nav>
    `,
    data() {
        return {
            page: 4, //每页存放内容数量
            num: 0,
            hash: 0,
            colorL: false, //colorLeft
            colorR: false, //colorRight
            lxType:""
        }
    },
    methods: {
        changeC(C) {
            // 每次点击改变某个数值，在class处增加对数值的判断;
            this.num = C;
            window.location.hash = `#lx=${this.exp}&page=${C}`;
            // window.location.hash = "#page" + C;
            // this.hash = window.location.hash.match(/\d/)[0];
            this.setPage(this.num, this.page);
        },
        pageClick() {
            // 返回值为一共有几页;
            return Math.ceil(this.data[this.exp].text.length / this.page)
        },
        moveMin(ev) {
            this.num == 1 ? this.num = 1 : this.num--;
            this.colorL = true;
            this.changeC(this.num);
            this.mouseup(ev)
        },
        moveAdd(ev) {
            this.num == this.pageClick() ? this.num == this.pageClick() : this.num++;
            this.colorR = true;
            // this.$nextTick(function () {
            // DOM 现在更新了
            // `this` 绑定到当前实例
            // console.log(1111)
            // this.mouseup(ev)
            //   })
            this.changeC(this.num)

            this.mouseup(ev)

        },
        mouseup() {
            // 点击以后会跑给绑定到父级上面利用冒泡;
            setTimeout(() => {
                this.colorL = this.colorR = false;
            }, 100)
        },
        setPage(num, page) {
            //子集里面去传参给父级，执行父级函数
            this.$emit('changepage', num, page)
        }
    },
    // computed:{
    //     fu:function(){

    //     }
    // }
    // ,
    mounted: function () {
        // 监控hash
        window.onhashchange = () => {
            // 判断url中是否存在page如果存在就显示当前页码
            if (new RegExp("page").test(window.location.hash)) {
                let index = window.location.hash.match(/\d+/g)[0];
                index[0] > this.pageClick() ? this.num = this.pageClick() : this.num = index[0];
                this.setPage(this.num, this.page)
            } else {
                this.num = 1;
                // this.exp=window.location.hash
                console.log(this.exp);
                this.setPage(this.num, this.page)
            }
            
        }
    }
};

Vue.component(
    "listnav", transfer
)
// 7%2==0?7/2:~~(7/2)+1;
// {{data.sh.text.length}}
//   {{ v-for="(val,key) in data.sh.text"}}
// <a class="active" href="javascript:;">1</a>


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
// let index=window.location.hash.match(/\w+/g).join("")

// watch: {
//     window:function (val) {
//       this.fullName = val + ' ' + this.lastName
//     },
//     lastName: function (val) {
//       this.fullName = this.firstName + ' ' + val
//     }
//   }