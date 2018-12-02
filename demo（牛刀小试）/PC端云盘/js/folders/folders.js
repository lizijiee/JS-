class NewFolder {
    constructor() {
        this.folders = document.getElementsByClassName("folders")[0]; //获取的是类数组，不能用innerHTML
        this.fItem = document.getElementsByClassName("file-item");  
        this.fImg= this.folders.getElementsByTagName("img");
        this.fEmpty = document.getElementsByClassName("f-empty")[0];
        this.ev="";
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
            <i></i></div>  
            `
                this.folders.innerHTML = temp;
            })
        }
    }
    enterFolder() {
        this.click(this.fItem) //this.click.bind(this)
    }
    click(arr) {
        Array.from(arr).forEach(ele => {
            ele.ondblclick = ev => {
                if (ev.target.parentNode.nodeName === "DIV" && !ev.target.nodeName != "DIV" && ev.target.parentNode.id) {
                    for (let i = this.fItem.length - 1; i >= 0; i--) {
                        this.folders.removeChild(this.fItem[i])//倒着删除
                    }
                    //虽然是目标数据但是，因为是映射机制生成，只能看不能用，必须等生成后在获取，才能使用;  
                    // temp=document.getElementsByClassName("file-item");
                    // Array.from与for in都不能拿到;
                }
                ev.target.nodeName === "DIV"?this.render(ev.target.id):this.render(ev.target.parentNode.id); //生成数据
                this.click(this.fItem)
                return false
            }
        });

    }
   
}
let newFolder = new NewFolder;
newFolder.render(0);
newFolder.enterFolder();