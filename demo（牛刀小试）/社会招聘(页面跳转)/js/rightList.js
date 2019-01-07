let obj = {
    props: ['exp', 'listed'],
    template: `
    <ul id="rightList" > 
    <li v-for="(val,key) in right_data[exp].text"  v-if="listed-4<=key&&key<listed">
                <span class="num">{{key+1}}</span>
                <div class="list">
                    <a href=""><span class="job">
                        职位需求：前端开发工程师</span><span>需求人数：{{val.rs}}名</span><time>
                                {{val.sj.join("-")}}
                            </time></a>
                    <p><span class="text">{{val.info[0].l.join("")}}</span><a href="javascript:;">查看详情>></a></p>
                </div>
             
        </li>
    </ul>	
    `,
    data() {
        return {
            right_data: data,
            // sj_Conversion:,
            num: 0,
            c: "",
        }
    },
    mounted() {
    	console.log(this.fn=20)
    },
    computed: {
        //需要调用才可以,，计算得到的属性只有在相关依赖（return值）改变的时候才会重新取值，这就意味着只要message没有发生改变的时候，多次访问ComputedMessage都不会再重新执行计算的这个属性。computed是带缓存的，只有其引用的响应式属性发生改变时才会重新计算，
        // https://zhuanlan.zhihu.com/p/33778594
        // get中fn使用方法 console.log(this.fn=10) return没有用,结果为等号后面值//返回  "10100"
        fn: {
            get: function () {
                // 获取
                // console.log(this.c)
                // console.log(this.num)
                return this.c*10
            },
            set: function (v) {
                // 下面去设置
                console.log(v+"100")
                return v*10
            }
        },
    },


    // watch: {
    //     listed: function () {
    //         // console.log("listed数值改变啦")
    //     }
    // },
    // created: function () {
    //     this.fn
    // },
    // mounted: function () {
    //     console.log(this.computed)
    // },
}
Vue.component(
    "list", obj
)