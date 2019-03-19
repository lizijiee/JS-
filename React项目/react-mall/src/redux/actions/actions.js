//说明： 哪里使用那里引入此文件;
import * as types from '../constants/actionTypes'; //注释在此文件中
import {
  finished
} from 'stream';

export const setMemberInfo = data => ({
  type: types.SET_DATA_MEMBER,
  data
})
export const getFoodInfo = data => ({
  type: types.GET_DATA_FOOD,
  data
})
export const switchChange = data => ({
  type: types.SWITCH_CHANGE,
  data
})
// export const deleteFood = data => ({
//   type: types.REMOVE_MENU_ITEMS,
//   data
// })
export const bulkOperation = data => ({ //批量操作
  type: types.BULK_OPERATION,
  data
})
export const combinedQuery = data => ({ //多重查找
  type: types.BULK_SEARCH,
  data
})




export const fetchMemmberInfo = subreddit => dispatch => { //请求会员信息数据
  return fetch(`http://localhost:2000/pers/member`, {
      method: 'GET',
    })
    .then(res => res.json())
    .then(data => dispatch(setMemberInfo(data)))
}
export const fetchFoodInfo = () => dispatch => { //请求会员信息数据
  return fetch(`http://localhost:2000/food/list`, {
      method: 'GET',
    })
    .then(res => res.json())
    .then(data => dispatch(getFoodInfo(data)))
}

//----------------------    按钮切换    -----------------
export const transRecommend = (valid, targetName, body) => dispatch => { //请求会员信息数据
  // valid: 切换后的状态   false 删除数据   true 增加数据
  // targetName  目标类名
  // body整条信息

  let url = ""
  if (valid) {
    url = `food?act=addMarket&&categoryName=${targetName}`
  } else {
    url = `food?act=delMarket&&categoryName=${targetName}`
  }
  return fetch(`http://localhost:2000/${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(
      (data) => dispatch(fetchFoodInfo(data)))
}

//----------------------    菜品编辑    -----------------
export const editClick = (target, ele, ev) => dispatch => {
  // ev.preventDefault();
  target.history.push({ //将此条完整菜品信息藏在state中
    pathname: "/food/listDetails",
    state: {
      ele,
      categoryName: ele.categoryName
    },
    search: '?num=' + ele.spuId
  });
}

//----------------------    批量查找   ----------------------
export const batchQuery = (require, data) => dispatch => { // 请求会员信息数据
  // 前端把操作方式和操作数据发送给后端,先进行判断如果已经存在就不要发送后端了,redux里面也有数据,判断下
  // 三个变量就去state里面找;
  // 两个变量,侧重推荐,选后两个的(例如：菜品类型,中进入推荐状态的)
  // 一个变量,就不聊了
  let result = null;
  if (require.spuName) {
    require.spuName = require.spuName.replace(/\s+/g, "") //不改变原数组
  }
  if (Object.values(require).every(ele => (!!ele) == true) && require.spuName !== "") {
    // 当三个输入框都有内容,第一个input如果输入过以后,再获取会导致拿到空字符串,需要筛选出去;   
    // every 为true;
    let tempData = null;
    let recommendData = data.find(i => i.categoryName === require.recommendState) //找出选中推荐状态对应数据
    for (let ele of data) { // 找出菜品类型选中状态,对应数据进行查找,看里面有没有输入框中输入的数据
      if (ele.categoryName === require.categoryName) {
        tempData = ele
        let firstData = ele.spuList.filter((items) => {
          return items.spuName === require.spuName.replace(/\s+/g, "")
        })
        if (JSON.stringify(firstData) !== "[]") {
          // 验证菜品类型中存在后，检验在推荐状态对应数据中是否存在
          result = recommendData.spuList.filter((ele) => ele.spuName === require.spuName.replace(/\s+/g, ""))[0]
        } else {
          result = null
        }
      }
    }
  } else {
    /* 
      思路整理：  
         1.首先判断到底是谁存在,用filter过滤出来然后去查找,查找要求为两个都符合要求;
         2.如果只有一个true那很好弄,直接查找, 还是要用switch;
         3.如果是两个为true,也是直接查找把如果主食和热销在一起情况特殊点，不考虑了.
         因为数据结构本来写的也不好
    */
    //把有输入内容的key数值搞出来，形成一个数组,对数组进行循环
    let queryReal = Object.keys(require).filter((item) => !!require[item] === true)
    // 真实查找要求,经过筛选以后的key值  ["spuName"]
    let arr = []
    let storeMethod = null
    let recommendList = null
    for (let items of data) {
      storeMethod = {
        // 存放方法
        categoryName: () => {
          // 菜品/推荐  类型存在
          if (items.spuList.find(i => i.spuName === require.spuName)) {
            result = items.spuList.find(i => i.spuName === require.spuName)
          }
          if (!require.spuName) {
            // 菜名输入框没有内容
            result = items.spuList
          }
        },
        spuName: (item, list) => {
          for (let item of list) {
            // 排除推荐类型和菜品类型以后,只剩下输入搜索
            if (item.spuName == require.spuName) {
              // 深层循环
              arr.push(item)
              result = arr
            }
          }
        }
      }
      // 菜名存在分两种另外两个是否存在,两个二选一存在用或者,
      if (items.categoryName === require.categoryName && require.recommendState) {
        //第二项存在并且第三项不为空
        storeMethod.categoryName()
      } else if (items.categoryName === require.recommendState) {
        storeMethod.categoryName() // 推荐类型存在
        if (require.recommendState) {
          //  菜品类型和推荐状态都存在
          // 1.拿到菜品类型的tag,
          // 2.选中推荐状态的spuList从总数据中拿到
          // 3.查看spuList是否有需要的tag,生成新数组
          // 0.操作数据时,类名对应tag,只修改文字value数值,tag当推荐类型中索引
          let tag = data.find(i => i.categoryName === require.categoryName).tag //1 get √
          recommendList = data.filter(ele => ele.categoryName === require.recommendState)[0].spuList //2 get √
          // 循环生成新数组
           //菜品类型的tag
          let list = recommendList.filter(info => {
            return info.tag === tag //3 get √
          })
           result = list
          if (!list) {
            result = null
          }
        }
      } else {
        storeMethod.spuName(items, items.spuList)
      }
    }
  }
  return dispatch(combinedQuery(result)) //新数据丢进去
}


























/*  fetch(`http://localhost:2000/pers?act=deleteClerks`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  }
)
  .then(res => res.json())
  .then(data => {
    // 后台返回数据后页面是否渲染???
    this.setState({
      data: data.data,
      storeData: data.data
    })
  }) */

/* 
export const getList=()=>{
    //action可以是一个函数，有dispatch参数
 return (dispatch)=>{
     axios.get('/api/headerList.json').then((res)=>{
         const data=res.data;
         dispatch(listInitAction(data.data))
     }).catch(()=>{
         console.log('error');
     });
 }    
};
 */