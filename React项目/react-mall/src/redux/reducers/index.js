import * as types from '../constants/actionTypes'; //注释在此文件中

const initState = {
  memberData:{},  // 店内会员信息;
  foodData:{},    // 所有菜品数据;   
}
/* 
  state 初始值分别为简单类型和复合类型;
    1.为复合类型:
      需要对state进行深克隆下,以保证为纯函数(使用条件)
    2.为简单类型:
      真是项目可能小
      见Github练习: https://github.com/lizijiee/JS-/tree/master/react-redux%E8%AE%A1%E6%95%B0%E5%99%A8  
*/
const reducer= (state=initState,action)=>{ 
       state = JSON.parse(JSON.stringify(state));//initState为复合类型需要深克隆一下;
        switch(action.type){
             case types.SET_DATA_MEMBER://请求数据后对redux进行赋值,可以写语句
                state.memberData=action.data;
             break;
             case types.GET_DATA_FOOD:
                // console.log(action.data)
                state.foodData=action.data;
             break;
             case types.SWITCH_CHANGE:
                // console.log(action.data)
                state.foodData=action.data;
             break;
        }
        return state;
    }
  export  {reducer}
/* 测试 */

/* 
const initialState = {
  addedIds: [],
  quantityById: {}
}

const addedIds = (state = initialState.addedIds, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      if (state.indexOf(action.productId) !== -1) {
        return state
      }
      return [ ...state, action.productId ]
    default:
      return state
  }
}
const quantityById = (state = initialState.quantityById, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const { productId } = action
      return { ...state,
        [productId]: (state[productId] || 0) + 1
      }
    default:
      return state
  }
}

export const getQuantity = (state, productId) =>
  state.quantityById[productId] || 0

export const getAddedIds = state => state.addedIds

const cart = (state = initialState, action) => {
  switch (action.type) {
    case CHECKOUT_REQUEST:
      return initialState
    case CHECKOUT_FAILURE:
      return action.cart
    default:
      return {
        addedIds: addedIds(state.addedIds, action),
        quantityById: quantityById(state.quantityById, action)
      }
  }
}

export default cart
 */