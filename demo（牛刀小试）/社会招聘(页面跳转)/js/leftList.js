let objL = {
    props: ['exp',],
    template: `
    <ul id="leftList">
            <li v-for="(val,key) in left_data.list" 
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
            left_data: data,
            num: 0,
        }
    },
    methods: {
        changeC(C,D) {
                // C=key D=val
                this.num = C,
                this.changeFn(D),
                // console.log(this.exp)
                window.location.hash =this.exp
         },
         changeFn(val){
            //  这里只是负责向父级函数传参，父级去执行
            this.$emit('changetype',val);
            // console.log(lx)
            // this.type="val.name"
         }
    },
}
Vue.component(
    "listleft", objL
)