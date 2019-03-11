//说明： 哪里使用那里引入此文件;
import * as types from '../constants/actionTypes'; //注释在此文件中

export const setMemberInfo = data => ({
    type: types.SET_DATA_MEMBER,
    data
})

// export const requestPosts = subreddit => ({
//     type: types.REQUEST_POSTS,
//     subreddit
// })

export const fetchPosts = subreddit => dispatch => {
    // dispatch(getMemberInfo(subreddit))
    return fetch(`http://localhost:2000/pers/member`, {
            method: 'GET',
        })
        .then(res => res.json())
        .then(data => dispatch(setMemberInfo(data)))//dispatch(receivePosts(subreddit, json))
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