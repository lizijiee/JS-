import React, { Component } from 'react'
import { Button, Pagination, message } from 'antd';
import IconFont from '../../../../iconfont/font'
import './Member.less';
import { withRouter } from 'react-router-dom';

//  -----------------     redux      ----------
import * as actionCreators from '../../../../redux/actions/actions';
import PropTypes from 'prop-types';//不用npm i
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
class ClerksMember extends Component {
    constructor() { 
        super()
        this.Page = null  //用于包装Pagination组件;
        this.state = { // 当前页码
          current: 1,
          storeData: [],
        }
 }
async componentDidMount() {//重复工作尽量用生命周期
    await  this.props.fetchMemmberInfo()  //!!!!!!! 终点请求数据异步,拿不到
          //请求会员信息数据
        console.log( "componentDidMount")  
        this.setState({
            storeData:this.props.data
       })    
 }
//-------------------------- 点击 查询 事件  --------------------
async handleSearchClick() {
  let value = document.getElementById("indexName").value.trim();//获取输入值
  let {storeData} = this.state;
  let  transData = storeData.data[0].UsersData.filter((ele)=>ele.user===value)
  console.log(storeData.data[0].UsersData.filter((ele)=>ele.user===value))
 
  if(!transData.length){
    const  error = () => {
      message.error("It doesn't exist !");
    };
    error()
  await  this.props.fetchMemmberInfo()
  this.setState({
    storeData:this.props.data
})
  }else{
  ;//筛选出结果
     storeData.data[0].UsersData=transData
     this.setState({
      storeData
    })
  }
}

 //-------------------------- 底部页码组件部分(以下) --------------------
    /* 
      组件声明变量:
           this.Page 和 this.state.current:1

      复用注意：首先判断数据格式     
    */
  ChangePage(page) {
      // 使用<Pagination/>组件自带回调函数来设置页码对应渲染内容
       this.setState({ current: page })// 注意setState为异步,回调函数问题
  }
  renderPage(data){ //page第二步骤;
    if (Object.keys(data).length) {
       let length=data.data[0].UsersData.length;
       this.Page = <Pagination  //  底部页码组件
          defaultCurrent={1}
          pageSize={5}
          total={length}
          onChange={this.ChangePage.bind(this)}
          style={{
            marginRight: 30, marginTop: 25, float: "right"
          }} />
         return this.Page
      }
  }
  //-------------------------- 底部页码组件部分(以上) --------------------

  //-------------------------- 列表内容组件部分(以下) --------------------
  EditClick(index){  
    //点击编辑 => 事件 => 需要使用withRouter包一下 => 得到history
    let {data}=this.state.storeData;
    // console.log(this.state.storeData)
    this.props.history.push({
      pathname: "/pers/memberDetails",
      state: data[0].UsersData.filter(e => e.Id == index),
      search: '?num=' + index
    });
  }

  deleteInfo(obj) {//obj => 删除对象信息 
   fetch(`http://localhost:2000/pers?act=deleteMember`,
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
        this.props.fetchMemmberInfo(data)//调用redux方法:请求数据
        this.setState({
          storeData:data
        })  
      })

  }
  renderItems = (ele) => {  //信息内容列表部分渲染;
             return (
              <tr key={ele.Id} id={ele.Id}>
              <td>{ele.Id}</td>
                <td>{ele.user}</td>
                <td>{ele.phoneNum}</td>
                <td>{ele.vipNum}</td>
                <td>{ele.registerTime}</td>
                <td>{ele.state}</td>
                <td>{ele.password}</td>
                <td>{ele.balance}</td>
                <td>
                  <Button
                    type="primary"
                    size="small"
                    ghost="true"
                    onClick={()=>{this.EditClick(ele.Id)}}//当前点击tr的索引
                    style={{ marginRight: 10, fontSize: 13, width: 60, height: 25, borderRadius: 5 }}
                  >
                    <span>编辑</span>
                  </Button>
                  <Button
                    type="primary"
                    size="small"
                    onClick={()=>{this.deleteInfo(ele)}}
                    style={{ fontSize: 13, width: 60, height: 25, borderRadius: 5 }}
                  >删除</Button>
                </td>
              </tr>)
  }
  
    //-------------------------- 列表内容组件部分(以上) --------------------
  
    render() {
        let Items=null;
        // console.log(this.state.storeData)
        // console.log(this.props.data)
        console.log( )
     if (!Array.isArray(this.state.storeData)) {//拿到数据
            // Object.prototype.toString.call(value)
      let {storeData:data} = this.state;//解构赋值
          console.log(data)

        if (data.data[0].UsersData.length === 1) {
          //只有一条数据,渲染条件,数据格式也在这里进行修改;
          //******** 查询后渲染结果不合格  bug重点！！！！！*******
         Items=data.data[0].UsersData.map(this.renderItems)   
         console.log(Items)                 
       } else {  //完整数据,通过对页码判断 得到需要渲染数据
         //按照数组类数据index进行筛选,按照id筛选导致删除后页面筛选有空
         Items = data.data[0].UsersData.filter((e,index) =>
         index >= 5 * (this.state.current - 1) && index < 5 * this.state.current
         ).map(this.renderItems)
          if(!Items.length){
            let temp= this.state.current*1
            this.setState({ current:temp-1 })
            return this.state
          }
        }
     }       
         return (
            <section className="clerk-list">
                {/*   员工信息组件  */}
                <div className="app-container">
                    <div className="el-serch-wrap">
                        <div className="el-title-body">
                            <div>
                                <IconFont type="mall-doc-glass" style={{ fontSize: 16, marginRight: 5 }} />
                                <span>筛选检索</span>
                                <button className="add"
                                onClick={()=>{this.handleSearchClick()}}
                                >查询结果</button>
                            </div>
                            <div className="el-form-item">
                                <span>输入检索:</span>
                                <input type="text" placeholder="请输入姓名" id="indexName">
                                </input>
                            </div>
                        </div>
                    </div>
                    <div className="el-title">
                        <div className="el-title-body">
                            <IconFont type="mall-doc-list" style={{ fontSize: 16, marginRight: 5 }} />
                            <span>数据列表</span>
                            {/* <button className="add">添加人员信息</button> */}
                        </div>
                    </div>
                    <main className="table-container">
                        <table cellPadding="0" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>序号</th>
                                    <th>会员姓名</th>
                                    <th>联系电话</th>
                                    <th>会员卡号</th>
                                    <th>开卡时间</th>
                                    <th>会员状态</th>
                                    <th>初始密码</th>
                                    <th>余额</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>{ Items }</tbody>
                             </table>
                    </main>
                    {this.renderPage(this.props.data)}
                </div>
            </section>
        
         
        )
    }
}
/*
//类型检查
 ClerksMember.propTypes={
    num:PropTypes.number.isRequired,
    onDecrement:PropTypes.func.isRequired,
    onIncrement:PropTypes.func.isRequired
}
*/


//使用connect

//需要触发什么行为

//连接组件
    export default withRouter(  connect(
    state => { return { data: state.memberData } },//将redux变量赋值到组件,成组件变量Data
    dispatch => bindActionCreators(actionCreators,dispatch))(ClerksMember))

  /*   
     export function addTodo(text) {
        return {
          type: 'ADD_TODO',
          text
        }
      }
      
      export function removeTodo(id) {
        return {
          type: 'REMOVE_TODO',
          id
        }
      }
      {
        addTodo : text => 
         { 
           type: 'ADD_TODO',
           text
         },
        removeTodo : id => {
           type: 'REMOVE_TODO',
           id
         }
     }
     {
        addTodo : text => dispatch(addTodo('text'));
        removeTodo : id => dispatch(removeTodo('id'));
     } */