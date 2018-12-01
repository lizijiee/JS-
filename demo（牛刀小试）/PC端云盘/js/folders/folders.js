class NewFolder {
    constructor() {
        this.folders = document.getElementsByClassName("folders")[0]; //获取的是类数组，不能用innerHTML
        this.fItem = document.getElementsByClassName("file-item");
        this.fEmpty = document.getElementsByClassName("f-empty")[0];
    }
    /*                        
        <div class="file-item">
        <img src="img/folder-b.png" alt="" />
        <span class="folder-name">JS基础课程</span>
        <input type="text" class="editor"/>
        <i class="checked"></i></div>  
    */
    render(pid_Max) { //最大的pid
        //从最低等级往上面找爹
        let arr = getChild(pid_Max);
        let temp = "";
        if (!getChild(pid_Max)) {
            this.fEmpty.style.display = "block";
        } else {

            arr.forEach(ele => {
                temp += `
            <div class="file-item" id="${ele.id}" pid="${ele.pid}">
            <img src="img/folder-b.png" alt="" />
            <span class="folder-name">${ele.title}</span>
            <input type="text" class="editor"/>
            <i class="checked"></i></div>  
            `
                this.folders.innerHTML = temp;
            })
        }

    }

    enterFolder() {
        // 思路：
        // 点击一下以后父级数据全部删除.子集数据生成，父级数据生成是通过;
        /* Array.from(this.fItem).forEach((ele) => {
            ele.ondblclick = ev => {
                if (ev.target.parentNode.nodeName === "DIV" && ev.target.parentNode.id) {
                    for (let i = 0; i < this.fItem.length; i++) {
                        this.fItem[i].parentNode.removeChild(this.fItem[i])
                   // this.fItem[i].style.display = "none";
                    }
                    // console.log(this.fItem)//虽然是目标数据但是，因为是映射机制生成，只能看不能用，必须等生成后在获取，才能使用;
                    // temp=document.getElementsByClassName("file-item");
                    // Array.from与for in都不能拿到;
                }
                this.render(ev.target.parentNode.id)
                // console.log(Array.from(this.fItem));              
            }
        }) */
        this.click(this.fItem, this.click.bind(function B(){
            console.log(11)
        }))
    }
    click(arr, cccc) { //(this.fItem,cccc)
        console.log(this)
        // console.log(this.fItem)
        Array.from(arr).forEach(ele => {
       
            ele.ondblclick = ev => {
                if (ev.target.parentNode.nodeName === "DIV" && ev.target.parentNode.id) {
                   
                    for (let i = this.fItem.length-1; i>=0; i--) {
                        this.folders.removeChild(this.fItem[i])
                    }
                }
                this.render(ev.target.parentNode.id); //生成数据


                
                // this.click();
                 cccc(this.fItem)

                // console.log(this.click(this.fEmpty))
                // function ss(){
                //      cccc()
                // }
                // console.log(ss())

                // return false
            }
        }
            
        )

    }

}
let newFolder = new NewFolder;
newFolder.render(0);
newFolder.enterFolder();




/*      this.fItem[0].onclick = (ev) => {
         if (ev.target.parentNode.nodeName === "DIV") {
             // console.log(ev.target.parentNode.setAttribute("display", "none"))
             // console.log(ev.target.parentNode.getAttribute("class"))            
             this.render(1)
   
             // console.log(ev.target.parentNode.style.display= "none")
         };

         ev.target.parentNode.style.display= "none";
             
         console.log(ev.target);

         // 父级消失;
         // ev.target.parentNode.className=" "
         // console.log(ev.target.parentNode.style.display = "none")
         // ev.target.parentNode.setAttribute("display","none")
         // this.parentNode.style.display = 'none';
         // this.parentNode.setAttribute("display","none");


         // console.log(ev.target.parentNode.style.display)

         Array.from(this.fItem).forEach(ele => {
             // console.log(getChild(ele.id * 1)) //这里格式有要求必须是number;
             // console.log(ele.id)
         })
     } */