let transfer = {
    template: `
             <nav id="nav" >
 					<a href="javascript:;">&lt;</a>
					<a class="active" href="javascript:;" v-for="(val,key) in this.do()  "@click="doThis(val,key)" > {{key+1}}</a>
					<a href="javascript:;">&gt;</a>
				</nav>
    `,
    data() {
        return {
            footer_data: data, //从全局继承过来的数据变量
            num: 4 //每页存放内容数量
        }
    },
    methods: {
        doThis(a,b) {

            alert(a);console.log(b)
        },
        do() {
            // 判断一共有几页;
            return this.footer_data.sh.text.length % this.num == 0 ? this.footer_data.sh.text.length / this.num : ~~(this.footer_data.sh.text.length / this.num) + 1
        }
    }
};

Vue.component(
    "listnav", transfer
)
// 7%2==0?7/2:~~(7/2)+1;
// {{footer_data.sh.text.length}}
//   {{ v-for="(val,key) in footer_data.sh.text"}}
// <a class="active" href="javascript:;">1</a>