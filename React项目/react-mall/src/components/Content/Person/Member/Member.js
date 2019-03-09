import React, { Component } from 'react'
import { Button, Pagination, Checkbox } from 'antd';
import IconFont from '../../../../iconfont/font'
import './Member.less';

import * as actionCreators from '../../../../redux/actions/actions';
import PropTypes from 'prop-types';//不用npm i
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
class ClerksMember extends Component {
    render() {
        console.log(this.props)
        let {num,onDecrement,onIncrement}=this.props//数组解构
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
                                onClick={()=>{onIncrement(111)}}
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
                            <tbody>
                                <tr>
                                    <td>
                                        <Checkbox />
                                    </td>
                                    <td>飞翔的小猪</td>
                                    <td>13703286655</td>
                                    <td>201805102134</td>
                                    <td>1989/03/12</td>
                                    <td>正常</td>
                                    <td>12345678</td>
                                    <td>￥50</td>
                                    <td>
                                        <Button
                                            type="primary"
                                            size="small"
                                            ghost="true"
                                            style={{ marginRight: 10, fontSize: 13, width: 60, height: 25, borderRadius: 5 }}>编辑</Button>
                                        <Button type="primary" size="small" style={{ fontSize: 13, width: 60, height: 25, borderRadius: 5 }}>删除</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Checkbox />
                                    </td>
                                    <td>飞翔的小猪</td>
                                    <td>13703286655</td>
                                    <td>201805102134</td>
                                    <td>1989/03/12</td>
                                    <td>正常</td>
                                    <td>12345678</td>
                                    <td>￥50</td>
                                    <td>
                                        <Button type="primary" size="small" style={{ marginRight: 10, fontSize: 13, width: 60, height: 25, borderRadius: 5 }}>编辑</Button>
                                        <Button type="primary" size="small" style={{ fontSize: 13, width: 60, height: 25, borderRadius: 5 }}>删除</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Checkbox />
                                    </td>
                                    <td>飞翔的小猪</td>
                                    <td>13703286655</td>
                                    <td>201805102134</td>
                                    <td>1989/03/12</td>
                                    <td>正常</td>
                                    <td>12345678</td>
                                    <td>￥50</td>
                                    <td>
                                        <Button type="primary" size="small" style={{ marginRight: 10, fontSize: 13, width: 60, height: 25, borderRadius: 5 }}>编辑</Button>
                                        <Button type="primary" size="small" style={{ fontSize: 13, width: 60, height: 25, borderRadius: 5 }}>删除</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Checkbox />
                                    </td>
                                    <td>飞翔的小猪</td>
                                    <td>13703286655</td>
                                    <td>201805102134</td>
                                    <td>1989/03/12</td>
                                    <td>正常</td>
                                    <td>12345678</td>
                                    <td>￥50</td>
                                    <td>
                                        <Button type="primary" size="small" style={{ marginRight: 10, fontSize: 13, width: 60, height: 25, borderRadius: 5 }}>编辑</Button>
                                        <Button type="primary" size="small" style={{ fontSize: 13, width: 60, height: 25, borderRadius: 5 }}>删除</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Checkbox />
                                    </td>
                                    <td>飞翔的小猪</td>
                                    <td>13703286655</td>
                                    <td>201805102134</td>
                                    <td>1989/03/12</td>
                                    <td>正常</td>
                                    <td>12345678</td>
                                    <td>￥50</td>
                                    <td>
                                        <Button type="primary" size="small" style={{ marginRight: 10, fontSize: 13, width: 60, height: 25, borderRadius: 5 }}>编辑</Button>
                                        <Button type="primary" size="small" style={{ fontSize: 13, width: 60, height: 25, borderRadius: 5 }}>删除</Button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </main>
                    <Pagination defaultCurrent={1} total={500} style={{
                        marginTop: 20, marginRight: 30, float: "right"
                    }} />,
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
    state => { return { num: state.num } },
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