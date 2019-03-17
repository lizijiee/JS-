//说明： 哪里使用那里引入此文件;
import * as types from '../constants/actionTypes'; //注释在此文件中

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
  return  fetch(`http://localhost:2000/${url}`, {
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
export const editClick=(target,ele, ev) => dispatch =>{
        // ev.preventDefault();
        target.history.push({//将此条完整菜品信息藏在state中
            pathname: "/food/listDetails",
            state: { ele, categoryName: ele.categoryName },
            search: '?num=' + ele.spuId
        });
}

//----------------------    批量操作   ----------------------
//----------------------    按钮切换    -----------------
export const  batchUpdate = (data,way) => dispatch => { //请求会员信息数据
//  前端把操作方式和操作数据发送给后端,先进行判断如果已经存在就不要发送后端了,redux里面也有数据,判断下
  console.log(data,way)
  console.log(this)


  // let url = ""
  // if (valid) {
  //   url = `food?act=batchUpdate&&categoryName=${targetName}`
  // } else {
  //   url = `food?act=delMarket&&categoryName=${targetName}`
  // }
  // return  fetch(`http://localhost:2000/${url}`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(body)
  //   })
  //   .then(res => res.json())
  //   .then(
  //     (data) => dispatch(bulkOperation(data)))
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