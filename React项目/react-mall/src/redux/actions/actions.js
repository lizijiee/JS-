import * as types from '../constants/actionTypes'; //注释在此文件中
export function onDecrement(decrement) {
    return {
        type: types.DECREMENT,
        decrement
    }
}
export function onIncrement(increment) {
    return {
        type: types.INCREMENT,
        increment
    }
}