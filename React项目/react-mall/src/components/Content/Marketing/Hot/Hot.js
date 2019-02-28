import React, { Component } from 'react'
import { Button, Pagination, Switch, Checkbox, Select } from 'antd';
import IconFont from '../../../../iconfont/font'
import './List.less';
 
const Option = Select.Option;

export default class Temp extends Component {
    render() {
        return (
            <section className="food-info">
                {/*   员工信息组件  */}
                <div className="app-container">
                    <div className="el-serch-wrap">
                        <div className="el-title-body">
                            <div>
                                <IconFont type="mall-doc-glass" style={{ fontSize: 16, marginRight: 5 }} />
                                <span>筛选检索</span>
                                <button className="add">查询结果</button>
                            </div>
                            <div className="el-form-item">
                                <span>输入检索:</span>
                                <input type="text" placeholder="请输入菜名">
                                </input>
                                
                            </div>
                            <div className="el-form-item">
                            <span>推荐状态:</span>
                            <Select
                                    showSearch
                                    placeholder="请选择"
                                    style={{ width: 170,color:"#606266",fontSize:12 }}
                                >
                                    <Option value="特色汤面">为推荐</Option>
                                    <Option value="酒水饮料">推荐中</Option>
                                </Select>,
                            </div>
                        </div>
                    </div>
                    <div className="el-title">
                        <div className="el-title-body">
                            <IconFont type="mall-doc-list" style={{ fontSize: 16, marginRight: 5 }} />
                            <span>数据列表</span>
                            <button className="add">添加菜品</button>
                        </div>
                    </div>
                    <main className="table-container">
                        <table cellPadding="0" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th> < Checkbox /></th>
                                    <th>编号</th>
                                     <th>菜品名称</th>
                                    <th>是否推荐</th>
                                    <th>当前状态</th>
                                    <th>排序</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>< Checkbox /></td>
                                    <td>1</td>
                                     <td>宫保鸡丁</td>
                                     <td> <Switch size="default" /></td>
                                    <td>
                                        推荐中
                                    </td>
                                    <td>40</td>
                                    <td>
                                        <Button type="primary" size="small" style={{ marginRight: 10, fontSize: 13, width: 60, height: 25, borderRadius: 5 }}>编辑</Button>
                                        <Button type="primary" size="small" style={{ fontSize: 13, width: 60, height: 25, borderRadius: 5 }}>删除</Button>
                                    </td>
                                </tr>                     
                            </tbody>
                        </table>
                    </main>
                    <Pagination defaultCurrent={1} total={500} style={{
                          marginRight: 30, marginTop: 40, float: "right"
                    }} />,
        </div>
            </section>
        )
    }
}
