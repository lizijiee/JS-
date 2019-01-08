let objL = {
    props: ['exp', "data"],
    template: `
    <ul id="leftList">
   
             <li v-for="(val,key) in data.list" 
            :class="{active:num===0?num==key:num==key}"  
            @click="changeC(key,val)" 
            @change:changeFn(val.name,$event)
            ><span>{{val.text}}</span>{{val.eng}} </li>
	</ul>
    `,
    // <li class="active"><span>社会招聘</span>society</li>
    // <li><span>校园招聘</span>campus</li>
    data() {
        return {
            num: 0,
            ss: ""
        }
    },
    methods: {
        changeC(C, D) {
            // C=key D=val
                this.num = C,
                this.changeFn(D),
                window.location.hash = this.exp
        },
        changeFn(val) {
            //  这里只是负责向父级函数传参，父级去执行
            this.$emit('changetype', val);
        }
    },
    created: function () {
        window.onhashchange = () => {
            
         }
    },
    computed: {
        fn() {
            let obj = {
                sh: 0,
                xy: 1,
            }
            return this.num=obj[this.exp]
        }
    }
}
Vue.component(
    "listleft", objL
)