import React, { Component } from 'react';
import {connect}  from 'react-redux'
import PropTypes from 'prop-types'


class App extends Component {
constructor(props){
  super(props)//props挂在this上面, 用在构造函数中，必须在使用this之前调用
  // console.log(this.props)
  this.incrementAsync = this.incrementAsync.bind(this);
  this.incrementIfOdd=this.incrementIfOdd.bind(this);
}
incrementIfOdd(){
    if(this.props.value%2!==0){
        //不可以直接赋值，需要调用原来的dispatch
       this.props.onIncrement()
    }
 }
 incrementAsync(){
  setTimeout(this.props.onIncrement, 1000)
  }
  render() {
    const {value,onIncrement,onDecrement}=this.props
      return (
      <div className="App">
        Clicked:{value} times        
        {' '}
        <button onClick={onIncrement}>
          +
        </button>
        {' '}
        <button onClick={onDecrement}>
        -
        </button>
        {' '}
        <button onClick={this.incrementIfOdd} >
          偶数进位
        </button>
        {' '}
        <button onClick={this.incrementAsync} >
          异步增加
        </button>
      </div>
    );
  }
}
App.propTypes={
  value:PropTypes.number.isRequired,
  onDecrement:PropTypes.func.isRequired,
  onIncrement:PropTypes.func.isRequired
}
//使用connect
function mapStateToProps(state) { // tiger
  return {
      value: state // tiger
  }
}
//需要触发什么行为
function mapDispatchToProps(dispatch) {
  return {
      onIncrement:() => dispatch({ type: 'INCREMENT' }),
      onDecrement:() => dispatch({ type: 'DECREMENT' })
  }
}
//连接组件
App= connect(mapStateToProps, mapDispatchToProps)(App)

export default App;
