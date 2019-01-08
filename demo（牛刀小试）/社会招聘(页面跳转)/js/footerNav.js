
let transfer = {
    props: ['exp',"data"],
    template: `
             <nav id="nav">
                    {{colorL}}
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
        }
    },
    methods: {
        changeC(C) {
            // 每次点击改变某个数值，在class处增加对数值的判断;
                this.num = C;
                window.location.hash = "#page" + C;
                this.hash = window.location.hash.match(/\d/)[0];
                this.setPage(this.num,this.page);
        },
        pageClick() {
            // 返回值为一共有几页;
            return Math.ceil(this.data[this.exp].text.length/this.page)
            //  return this.data[this.exp].text.length % this.page == 0 ? this.data[this.exp].text.length / this.page : ~~(this.data[this.exp].text.length / this.page) + 1
        },
        moveMin(ev) {
             this.num == 1 ? this.num = 1 : this.num--;
            this.colorL=true;
            // this.color=true;
            this.changeC(this.num);
            setTimeout(()=>{this.mouseup(ev)},300)
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
            setTimeout(()=>{this.mouseup(ev)},300)
        },
        mouseup() {
            // 点击以后会跑给绑定到父级上面利用冒泡;
                this.colorL = this.colorR = false;
        },
        setPage(num,page){
            // 子集里面去传参给父级，执行父级函数
            this.$emit('changepage',num,page)
        }
    },
    mounted: function () {
        // window.onhashchange是不是应该放在这里
        window.onhashchange = () => {
            let address = {
                "#sh": () => {
                    this.num = 1
                },
                "#xy": () => {
                    this.num = 1
                },
                "#page1": () => {
                    this.num = 1
                },
                "#page2": () => {
                    this.num = 2
                },
                "#page3": () => {
                    this.num = 3
                },
            };
            // console.log(window.location.hash);
            address[window.location.hash]();
            this.pageClick();
        }
    },

    // beforeUpdate: function () {
    //     console.log("beforeUpdata")
    // },
    // updated: function () {
    //     console.log("已经updated")
    // }



    // watch: {
    //     window:function (val) {
    //       this.fullName = val + ' ' + this.lastName
    //     },
    //     lastName: function (val) {
    //       this.fullName = this.firstName + ' ' + val
    //     }
    //   }
};

Vue.component(
    "listnav", transfer
)
// 7%2==0?7/2:~~(7/2)+1;
// {{data.sh.text.length}}
//   {{ v-for="(val,key) in data.sh.text"}}
// <a class="active" href="javascript:;">1</a>