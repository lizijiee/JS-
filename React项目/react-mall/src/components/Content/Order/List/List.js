import React, { Component } from 'react'
import { Button, Pagination, Switch, Checkbox, Select } from 'antd';
import IconFont from '../../../../iconfont/font'
import './List.less';

const Option = Select.Option;

export default class Temp extends Component {
    render() {
        return (
            <section className="order-info">
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
                                <input type="text" placeholder="请输入订单编号">
                                </input>
                            </div>
                            <div className="el-form-item">
                                <span>收货人:</span>
                                <input type="text" placeholder="收货人手机号/联系人">
                                </input>
                            </div>
                            <div className="el-form-item">
                                <span>订单状态:</span>
                                <Select
                                    showSearch
                                    placeholder="菜品类型"
                                    style={{ width: 170, color: "#606266", fontSize: 12 }}
                                >
                                    <Option value="待付款">待付款</Option>
                                    <Option value="待发货">待发货</Option>
                                    <Option value="已发货">已发货</Option>
                                    <Option value="已完成">已完成</Option>
                                    <Option value="已关闭">已关闭</Option>
                                </Select>,
                            </div>
                        </div>
                    </div>
                    <div className="el-title">
                        <div className="el-title-body">
                            <IconFont type="mall-doc-list" style={{ fontSize: 16, marginRight: 5 }} />
                            <span>数据列表</span>
                        </div>
                    </div>
                    <main className="table-container">
                        <table cellPadding="0" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th> < Checkbox /></th>
                                    <th>编号</th>
                                    <th>订单编号</th>
                                    <th>提交时间</th>
                                    <th>用户账号</th>
                                    <th>订单金额</th>
                                    <th>订单状态</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>< Checkbox /></td>
                                    <td>1</td>
                                    <td>201809150101000001</td>
                                    <td>2017-09-15 12:24:27</td>
                                    <td> T_T </td>
                                    <td>￥150</td>
                                    <td>已关闭</td>
                                    <td>
                                        <Button type="primary" size="small" style={{ marginRight: 10, fontSize: 13, height: 25, borderRadius: 5 }}>查看详情</Button>
                                        <Button type="primary" size="small" style={{ fontSize: 13, width: 60, height: 25, borderRadius: 5 }}>删除</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>< Checkbox /></td>
                                    <td>1</td>
                                    <td>201809150101000001</td>
                                    <td>2017-09-15 12:24:27</td>
                                    <td> T_T </td>
                                    <td>￥150</td>
                                    <td>已关闭</td>
                                    <td>
                                        <Button type="primary" size="small" style={{ marginRight: 10, fontSize: 13, height: 25, borderRadius: 5 }}>查看详情</Button>
                                        <Button type="primary" size="small" style={{ fontSize: 13, width: 60, height: 25, borderRadius: 5 }}>删除</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>< Checkbox /></td>
                                    <td>1</td>
                                    <td>201809150101000001</td>
                                    <td>2017-09-15 12:24:27</td>
                                    <td> T_T </td>
                                    <td>￥150</td>
                                    <td>已关闭</td>
                                    <td>
                                        <Button type="primary" size="small" style={{ marginRight: 10, fontSize: 13, height: 25, borderRadius: 5 }}>查看详情</Button>
                                        <Button type="primary" size="small" style={{ fontSize: 13, width: 60, height: 25, borderRadius: 5 }}>删除</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>< Checkbox /></td>
                                    <td>1</td>
                                    <td>201809150101000001</td>
                                    <td>2017-09-15 12:24:27</td>
                                    <td> T_T </td>
                                    <td>￥150</td>
                                    <td>已关闭</td>
                                    <td>
                                        <Button type="primary" size="small" style={{ marginRight: 10, fontSize: 13, height: 25, borderRadius: 5 }}>查看详情</Button>
                                        <Button type="primary" size="small" style={{ fontSize: 13, width: 60, height: 25, borderRadius: 5 }}>删除</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>< Checkbox /></td>
                                    <td>1</td>
                                    <td>201809150101000001</td>
                                    <td>2017-09-15 12:24:27</td>
                                    <td> T_T </td>
                                    <td>￥150</td>
                                    <td>已关闭</td>
                                    <td>
                                        <Button type="primary" size="small" style={{ marginRight: 10, fontSize: 13, height: 25, borderRadius: 5 }}>查看详情</Button>
                                        <Button type="primary" size="small" style={{ fontSize: 13, width: 60, height: 25, borderRadius: 5 }}>删除</Button>
                                    </td>
                                </tr>

     <tr>
                                    <td>< Checkbox /></td>
                                    <td>1</td>
                                    <td>201809150101000001</td>
                                    <td>2017-09-15 12:24:27</td>
                                    <td> T_T </td>
                                    <td>￥150</td>
                                    <td>已关闭</td>
                                    <td>
                                        <Button type="primary" size="small" style={{ marginRight: 10, fontSize: 13, height: 25, borderRadius: 5 }}>查看详情</Button>
                                        <Button type="primary" size="small" style={{ fontSize: 13, width: 60, height: 25, borderRadius: 5 }}>删除</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>< Checkbox /></td>
                                    <td>1</td>
                                    <td>201809150101000001</td>
                                    <td>2017-09-15 12:24:27</td>
                                    <td> T_T </td>
                                    <td>￥150</td>
                                    <td>已关闭</td>
                                    <td>
                                        <Button type="primary" size="small" style={{ marginRight: 10, fontSize: 13, height: 25, borderRadius: 5 }}>查看详情</Button>
                                        <Button type="primary" size="small" style={{ fontSize: 13, width: 60, height: 25, borderRadius: 5 }}>删除</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>< Checkbox /></td>
                                    <td>1</td>
                                    <td>201809150101000001</td>
                                    <td>2017-09-15 12:24:27</td>
                                    <td> T_T </td>
                                    <td>￥150</td>
                                    <td>已关闭</td>
                                    <td>
                                        <Button type="primary" size="small" style={{ marginRight: 10, fontSize: 13, height: 25, borderRadius: 5 }}>查看详情</Button>
                                        <Button type="primary" size="small" style={{ fontSize: 13, width: 60, height: 25, borderRadius: 5 }}>删除</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>< Checkbox /></td>
                                    <td>1</td>
                                    <td>201809150101000001</td>
                                    <td>2017-09-15 12:24:27</td>
                                    <td> T_T </td>
                                    <td>￥150</td>
                                    <td>已关闭</td>
                                    <td>
                                        <Button type="primary" size="small" style={{ marginRight: 10, fontSize: 13, height: 25, borderRadius: 5 }}>查看详情</Button>
                                        <Button type="primary" size="small" style={{ fontSize: 13, width: 60, height: 25, borderRadius: 5 }}>删除</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>< Checkbox /></td>
                                    <td>1</td>
                                    <td>201809150101000001</td>
                                    <td>2017-09-15 12:24:27</td>
                                    <td> T_T </td>
                                    <td>￥150</td>
                                    <td>已关闭</td>
                                    <td>
                                        <Button type="primary" size="small" style={{ marginRight: 10, fontSize: 13, height: 25, borderRadius: 5 }}>查看详情</Button>
                                        <Button type="primary" size="small" style={{ fontSize: 13, width: 60, height: 25, borderRadius: 5 }}>删除</Button>
                                    </td>
                                </tr>
            



                            </tbody>
                        </table>
                    </main>
                    <Pagination defaultCurrent={1} total={500} style={{
                        marginRight: 30, marginTop: 25, float: "right"
                    }} />,
        </div>
            </section>
        )
    }
}
