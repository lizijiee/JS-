//export default 只导出一个
// const tiger=0;
function couter (state,action){
        switch(action.type){
            case "INCREMENT":
            return state +1
            case "DECREMENT":
            return  state -1
            default:
            return state
        }
    }
export {couter}

/* 测试 */