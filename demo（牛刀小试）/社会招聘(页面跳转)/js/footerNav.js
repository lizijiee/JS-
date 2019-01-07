
let transfer = {
    props: ['exp'],
    template: `
             <nav id="nav">
             
  					<a href="javascript:;"   @mousedown="moveMin" @mouseup="mouseup" :class="{active:colorL}">&lt;</a>
                    <a  href="javascript:;" 
                    v-for="(val,key) in pageClick()"
                    @click="changeC(val)" 
                    :class="{active:num===0?num=val=1:num==val}"  
                    @changepage:setPage(num,page)
                    >{{val}}</a>
                    <a href="javascript:;"   @mousedown="moveAdd"  @mouseup="mouseup" :class="{active:colorR}">&gt;</a>
                    {{hash}}
				</nav>
    `,
    data() {
        return {
            footer_data: data, //从全局继承过来的数据变量
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
                this.num = C,
                window.location.hash = "#page" + C,
                this.hash = window.location.hash.match(/\d/)[0],
                this.setPage(this.num,this.page)
        },
        pageClick() {
            // 返回值为一共有几页;
             return this.footer_data[this.exp].text.length % this.page == 0 ? this.footer_data[this.exp].text.length / this.page : ~~(this.footer_data[this.exp].text.length / this.page) + 1
        },
        moveMin() {
            this.num == 1 ? this.num = 1 : this.num--;
            this.colorL = true;
            // this.color=true;
            this.changeC(this.num)
        },
        mouseup() {
            this.colorL = this.colorR = false;
        },
        moveAdd() {
            this.num == this.pageClick() ? this.num == this.pageClick() : this.num++;
            this.colorR = true;
            this.changeC(this.num)
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
// {{footer_data.sh.text.length}}
//   {{ v-for="(val,key) in footer_data.sh.text"}}
// <a class="active" href="javascript:;">1</a>