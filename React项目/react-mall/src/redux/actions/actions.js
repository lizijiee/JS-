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

export const transRecommend = () => dispatch => { //请求会员信息数据
     // false 删除数据
     // true 增加数据

    // let url = ""
    // if (valid) {
    //     url = `food?act=addMarket&&categoryName=${targetName}`
    // } else {
    //     url = `food?act=delMarket&&categoryName=${targetName}`
    // }
    // await this.fetchPackage(url, ele)
    console.log(this.state.storeData)
  return  11111111111111111
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