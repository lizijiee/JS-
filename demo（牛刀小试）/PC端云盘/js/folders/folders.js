class NewFolder {
    constructor() {
        this.folders = document.getElementsByClassName("folders")[0]; //获取的是类数组，不能用innerHTML
        this.fItem = document.getElementsByClassName("file-item");
        this.fImg = this.folders.getElementsByTagName("img");
        this.fEmpty = document.getElementsByClassName("f-empty")[0];

        // 面包屑~~~
        this.checkall = document.getElementsByClassName("checkall")[0];
        this.breadNav = document.getElementsByClassName("bread-nav")[0];
        // 点击属性
        this.checkall = document.getElementById("checkedAll");
        this.checkI = this.folders.getElementsByTagName("i");
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
            this.fEmpty.style.display = "none";
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
        this.check()
        this.click(this.fItem) //this.click.bind(this)
    }
    click(arr) {
        let tempId = null;
        Array.from(arr).forEach(ele => {
            ele.ondblclick = ev => {
                if (ev.target.parentNode.nodeName === "DIV" && !ev.target.nodeName != "DIV" && ev.target.parentNode.id) {
                    for (let i = this.fItem.length - 1; i >= 0; i--) {
                        this.folders.removeChild(this.fItem[i]) //倒着删除
                    }
                    //虽然是目标数据但是，因为是映射机制生成，只能看不能用，必须等生成后在获取，才能使用;  
                    // temp=document.getElementsByClassName("file-item");
                    // Array.from与for in都不能拿到;
                }
                if (ev.target.nodeName === "DIV") { //生成数据
                    tempId = ev.target.id;
                    this.checkall.className = ""
                    // this.render(ev.target.id)
                    // this.Menurender(ev.target.id)
                    this.check();
                } else {
                    tempId = ev.target.parentNode.id;
                    this.checkall.className = ""
                    // this.render(ev.target.parentNode.id);
                    // this.Menurender(ev.target.parentNode.id);
                    this.check();
                }
                this.render(tempId)
                

              this.Menurender(tempId);
                this.click(this.fItem)
                return false
            }
        });
    }
    // ~~~~~~~~~~~~~~~~~~面包屑~~~~~~~~~~~~~~~~~`
    Menurender(id) {
        this.breadNav.innerHTML = "";
        let arr = getParentS(id);
        // 思路：
        // 数据循环渲染生成DOM元素，对元素绑定事件，每次点击传入能自身的id来获取儿子;
        if (arr) {
            arr.forEach((ele, i, all) => {
                if (i != all.length - 1) {
                    // 生成DOM思路：
                    // 创建元素,存储起来;
                    // 设置创建元素属性、Class
                    let a = document.createElement("a");
                    a.href = "javascript:;"
                    a.innerHTML = ele.title;
                    //span不能点击，绑定在a元素上面
                    a.onclick = (ev) => {
                        // let arr=[1,3,4,5,6,] arr.slice(2,3)  [4] 
                        // arr.slice(-1)  [6]   arr.slice(-2)  (2) [5, 6]
                        // 根据点击菜单关面包屑
                        this.Menurender(ele.id);
                        this.render(ele.id)
                        this.click(this.fItem)
                    }
                    this.breadNav.appendChild(a);
                } else {
                    let span = document.createElement("span");
                    span.innerHTML = ele.title;
                    this.breadNav.appendChild(span);
                }
                this.check();//调用勾选事件
            })
        }
    }
    check() {
        let arr = []
        Array.from(this.checkI).forEach(ele => {
            ele.onclick = (ev) => {
                console.log(1111111111111);

                if(ev.target.className){
                    ev.target.className="";
                    ev.path[1].className="file-item "
                }else{
                     ev.target.className="checked"; 
                     ev.path[1].className="file-item active"
                }
                for (let i = 0; i < this.checkI.length; i++) {
                    arr.push(this.checkI[i].className)
                }
                arr.every(ele => ele) ? this.checkall.className = "checked" : this.checkall.className = "";
                arr = [];
            }
        })
        // 全选点击后需要再次调用单机点击文件加事件
        this.selectAll()
    }
    selectAll() {
        this.checkall.onclick = ev => {
            // arr.every(ele => ele) ? onoff=true :onoff=true;//return不用写，查类型
            if (!ev.target.className) {
                ev.target.className = "checked";
                for (let i = 0; i < this.checkI.length; i++) {
                    this.checkI[i].className = "checked";
                    this.checkI[i].parentNode.className="file-item active"
                }

            } else {
                ev.target.className = "";
                for (let i = 0; i < this.checkI.length; i++) {
                    this.checkI[i].className = "";
                    this.checkI[i].parentNode.className="file-item"
                }
            }
            this.check()
        }
    }
    // judgeResult(){
    //     if(){
    //     }
    // }
    treeNav(){//treeNavigation
            console.log(22)
    }
}
let newFolder = new NewFolder;
newFolder.render(0);
newFolder.enterFolder();
newFolder.Menurender(0);
newFolder.treeNav();
