/* ---------------招聘信息展示部分组件----------- */
let obj = {
    props: ['exp', 'listed', "data"],
    template: `
    <ul id="rightList"> 
     <li v-for="(val,key) in data[exp].text"  v-if="listed-4<=key&&key<listed">    
             <span class="num">{{key+1}}</span>
                <div class="list">
                    <a href=""><span class="job">
                       {{val.zw}}</span><span>需求人数：{{val.rs}}名</span><time>
                                {{val.sj.join("-")}}
                            </time></a>
                    <p><span class="text">{{val.info[0].l.join("")}}</span><a @click="setId(key,$event)">查看详情>>
                    </a>      
                    </p>
                </div>
        </li>
    </ul>	
    `,
    methods: {
        setId(key) {//点击跳转为本地某招聘明细
            this.id = key;
            window.location.href = `./content.html?lx=${this.exp}&id=${this.id}`
        }
    },
}
Vue.component(
    "list", obj
)




// computed: {
//需要调用才可以,，计算得到的属性只有在相关依赖（return值）改变的时候才会重新取值，这就意味着只要message没有发生改变的时候，多次访问ComputedMessage都不会再重新执行计算的这个属性。computed是带缓存的，只有其引用的响应式属性发生改变时才会重新计算，
//VUE.JS-浅谈vue的computed属性和methods区别   https://zhuanlan.zhihu.com/p/33778594
// get中fn使用方法 console.log(this.fn=10) return没有用,结果为等号后面值//返回  "10100"
// fn: {
//     get: function () {
//         return this.c * 10
//     },
//     set: function (v) {
//         // 下面去设置
//         console.log(v + "100")
//         return v * 10
//     }
// },
// },



/* 	
            **********列表结构部分************
            		<ul id="rightList">
					<li>
						<span class="num">01</span>
						<div class="list">
							<a href=""><span class="job">职位需求：前端开发工程师</span><span>需求人数：2名</span><time>2014-04-10</time></a>
							<p><span class="text">岗位要求：布拉布拉布拉一大段话布拉布拉布拉一大段话布拉布拉布拉一大段话</span><a href="javascript:;">查看详情>></a></p>
						</div>
					</li>
            </ul> 
*/