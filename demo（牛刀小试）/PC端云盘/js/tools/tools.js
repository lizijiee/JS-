let data_Arrary = Object.values(data) //数据改成全局变量;
//  let arr1=Array.from(data)//需要length，不变原对象
// let values = []
// for(let property in data){
//   values.push(data[property])//不能用点
// }
// console.log(values);



class NewFolder {
    constructor() {
        this.add = document.getElementById("create");
        this.folders = document.getElementsByClassName("folders")[0];
        this.level_1st=document.getElementsByClassName("level_1st")
        this.level_2st=document.getElementsByClassName("level_2st")
        this.level_3st=document.getElementsByClassName("level_3st")
    }

    catalogues_Middle() {
        data_Arrary.forEach((e, i) => {
            this.folders.innerHTML += `
            <div class="file-item" data-id="${e.id}" data-pid="${e.pid}">
            <img src="img/folder-b.png" alt="" />
							<span class="folder-name">${e.title}</span>
							<input type="text" class="editor"/>
							<i class="checked"></i>
            </div>         
            `
        });
    }

    catalogues_Left() {
        let tree_Menu = document.querySelector(".tree-menu");
        data_Arrary.forEach((e, i) => {
            switch (e.pid) {
                //一级目录
                case -1:
                    tree_Menu.innerHTML += `
        <ul>
                <li>
                    <div class="tree-title tree-ico close level_1st"  
                    style="margin-left:0px"
                    >
                        <span><i></i>${e.title}</span>
                    </div>
                 </li>
        </ul> 
        `
                    break;

                    // 二级目录
                case 0:                
                    this.level_1st[0].innerHTML += `
         <ul>
                 <li>
                     <div class="tree-title tree-ico close  level_2st" style="margin-left:28px">
                         <span><i></i>${e.title}</span>
                     </div>
                  </li>
         </ul> 
         `
                    break;
                    //我的文档：三级目录
                case 1:
            this.level_2st[0].innerHTML += `
                       <ul>
                               <li>
                                   <div class="tree-title tree-ico close level_3st" style="margin-left:28px">
                                       <span><i></i>${e.title}</span>
                                   </div>
                                </li>
                       </ul> 
                       `
                    break;
                    // 我的音乐:三级目录
                case 2:
                this.level_2st[1].innerHTML += `
                       <ul>
                               <li>
                                   <div class="tree-title tree-ico close level_3st" style="margin-left:28px">
                                       <span><i></i>${e.title}</span>
                                   </div>
                                </li>
                       </ul> 
                       `
                    break;
              
                    // 周杰伦音乐:四级目录
                case 3:
                // DOM加循环操作会出现，首次循环获取不到的情况
  let zhou_Jielun=document.querySelectorAll(".level_2st")[1].getElementsByClassName("level_3st")[0]
                    zhou_Jielun.innerHTML += `
                       <ul>
                               <li>
                                   <div class="tree-title tree-ico close level_4st" style="margin-left:28px">
                                       <span><i></i>${e.title}</span>
                                   </div>
                                </li>
                       </ul> 
                       `
                    break;

            }
        });

    }

    createFolder() {
        // let num = 0;
        // let _this = this;
        this.add.onclick = function () {
            //碰到事件this被改掉了，要注意

            /* 
                        ++num;  
                        console.log(_this.folders);
                        _this.folders.innerHTML += `
                        <div class="file-item">
                        <img src="img/folder-b.png" alt="" />
                        <span class="folder-name">新建文件夹${num}</span>
                        <input type="text" class="editor"/>
                        <i class="checked"></i>
                        </div>
                        `
             */


        }
    }

}

let new_folder = new NewFolder();
new_folder.createFolder();
new_folder.catalogues_Middle();
new_folder.catalogues_Left();