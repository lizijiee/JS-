/*
    面包屑
*/
// getParents(0);
// 检查插入是否成功;
class BreadCrumbs extends NewFolder{
    constructor(){
        super(); // 调用父类的constructor(x, y)
        this.checkall=document.getElementsByClassName("checkall")[0];
        this.breadNav=document.getElementsByClassName("bread-nav")[0];
    }
    Menurender(id){
        this.breadNav.innerHTML="";
        let arr=getParentS(id);
        // 思路：
            // 数据循环渲染生成DOM元素，对元素绑定事件，每次点击传入能自身的id来获取儿子;
        if(arr){
            arr.forEach((ele,i,all)=>{
                console.log(i)
                console.log(all);
            if(i!=all.length-1){  
                   // 生成DOM思路：
                    // 创建元素,存储起来;
                    // 设置创建元素属性、Class
                   let a=document.createElement("a"); 
                   a.href="javascript:;"
                   a.innerHTML=ele.title;
               //span不能点击，绑定在a元素上面
                   a.onclick=()=>{
                        
                    //  console.log(this.click)
                    //  this.click(this.fItem)
                    //  console.log(this.fItem)
                    // console.log(getChild(ele.id))
                   }
                   this.breadNav.appendChild(a);

                }else{
                    let span=document.createElement("span");
                    span.innerHTML=ele.title;
                    this.breadNav.appendChild(span);
                }


            })
        }

      }
      render(){
      }

}
let bread_crumbs= new BreadCrumbs;
bread_crumbs.Menurender(0)//输入最大的id