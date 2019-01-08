/* ---------------社会、校园招聘部分组件----------- */
let objL = {
    props: ['exp', "data"],
    template: `
    <ul id="leftList">
            <li v-for="(val,key) in data.list" 
            :class="{active:num==key}"  
            @click="changeC(key,val)" 
            @change:changeFn(val.name,$event)
             ><span>{{val.text}}</span>{{val.eng}}</li>
            <span v-show=false>{{fn}}</span>
	</ul>
    `,
    // <li class="active"><span>社会招聘</span>society</li>
    // <li><span>校园招聘</span>campus</li>
    data() {
        return {
            num: 0,//选项卡索引,绑定class
        }
    },
    methods: {
        changeC(C, D) { // C=key D=val
        //改变招聘类型栏颜色
            this.num = C,
            this.changeFn(D) //D:某招聘类型所有数据
        },
        changeFn(val) {
            //这里只是负责向父级函数传参，父级去执行
            //子组件中事件名任意,但是$emit传送中名称与父级自定义名相同
             this.$emit('changetype', val);
        }
    },
    computed: {
        // 将this.exp绑定当其变化赋值给num.
        // 目的:通过url输入的招聘类型,改变招聘类型栏颜色.
        fn() {
            let obj = {
                sh: 0,
                xy: 1,
            }
            this.num = obj[this.exp]//返回对应的value数值
            return this.exp //computed在model中是否变化对比两次return结果
        }
    }
}
Vue.component(
    "listleft", objL
)