import React, { Component } from 'react'
import { Button, Pagination, Checkbox } from 'antd';
import IconFont from '../../../../iconfont/font'
import './Member.less';

import * as actionCreators from '../../../../redux/actions/actions';
import PropTypes from 'prop-types';//不用npm i
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
class ClerksMember extends Component {
    constructor() { 
        super()
        this.Page = null
     this.state = {
            current: 1,
          }
 }
    componentDidMount() {//重复工作尽量用生命周期
        let {data,fetchPosts}=this.props//数组解构
        fetchPosts()
        // getMemberInfo()
    }
    //-------------------------- 底部页码组件部分(以下) --------------------
    ChangePage(page) {//<Pagination/>组件自带回调函数
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

   renderItems = (ele) => { //人员信息列表部分渲染;
    console.log("进入===>人员信息列表部分渲染;")
            return (
              <tr key={ele.Id} id={ele.Id}>
              <td><Checkbox /></td>
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
                    // href={`/pers/clerksDetails?num=${ele.num}`}
                    ghost="true"
                    // onClick={this.EditClick.bind(this, ele.num)}
                    style={{ marginRight: 10, fontSize: 13, width: 60, height: 25, borderRadius: 5 }}
                  >
                    <span>编辑</span>
                  </Button>
                  <Button
                    type="primary"
                    size="small"
                    // onClick={this.deleteInfo.bind(this, ele.num)}
                    style={{ fontSize: 13, width: 60, height: 25, borderRadius: 5 }}
                  >删除</Button>
                </td>
              </tr>)
   }
   ClerksInfo(data) {
            if (Object.keys(data).length) {
               let tempData=data
               let Items=""
              // 过滤例子： [32, 33, 16, 40].filter((a)=> a<40&a>20) 
              // 根据页码渲染当前页
              // 对返回
              // 把数据length传入底部页码组件,一共几页根据组件内设置每页items数量,自动生成    
            //   console.log(this.renderFunc(tempData.data[0].UsersData))
            //   Items= this.renderFunc(tempData)        
            if (tempData.data[0].UsersData.length === 1) {//只有一条数据
                Items= tempData.data[0].UsersData.map(this.renderItems)
              } else {
              // 如果为完整数据对数据进行筛选后显示;
               // 根据页码判断后结果,显示内容;
               console.log(tempData.data[0].UsersData)
                Items =tempData.data[0].UsersData.filter((e) =>
                  e.Id >= 1 + 5 * (this.state.current - 1) && e.Id <= 5 * this.state.current
                ).map(this.renderItems)
              }
              return (<tbody>{Items}</tbody>) 
            }
  }
      
    render() {
        let {data}=this.props;
       ; //底部页码第一步;
        if(Object.keys(data).length){
        
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
                                // onClick={()=>{onIncrement(111)}}
                                >查询结果</button>
                            </div>
                            <div className="el-form-item">
                                <span>输入检索:</span>
                                <input type="text" placeholder="请输入姓名">
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
                                    <th>
                                        <Checkbox />
                                    </th>
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
                            {this.ClerksInfo(data)}
                             </table>
                    </main>
                    {this.renderPage(data)}
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
    export default connect(
    state => { return { data: state.memberData } },//将redux变量赋值到组件,成组件变量Data
    dispatch => bindActionCreators(actionCreators,dispatch))(ClerksMember)

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