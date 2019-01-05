let obj = {
    props: ['exp'],
    template: `
    <ul id="rightList" > 
         <li v-for="(val,key) in right_data.sh.text"  v-if="key<4">
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
            c: ""
        }
    },
    // mounted() {
    // 	console.log("页面加载完成")
    // },
    methods: {
        formatDate(date) {
            // {{formatDate(val.sj)}}调用函数方法
            let string = date.join("-")
            return string
        }
    }
}
Vue.component(
    "list", obj
)