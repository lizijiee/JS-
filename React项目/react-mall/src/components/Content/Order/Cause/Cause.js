import React, { Component } from 'react'
import { Button, Pagination, Switch, Checkbox, Select } from 'antd';
import IconFont from '../../../../iconfont/font'
import './List.less';

const Option = Select.Option;

export default class Temp extends Component {
    render() {
        return (
            <section className="order-cause">
                {/*   员工信息组件  */}
                <div className="app-container">
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
                                    <th>取消原因类型</th>
                                    <th>是否可用</th>
                                    <th>添加时间</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>< Checkbox /></td>
                                    <td>3</td>
                                    <td>价格问题</td>
                                    <td><Switch/></td>
                                    <td>2017-10-16  10:34:57</td>
                                    <td>
                                        <Button type="primary" size="small" style={{ marginRight: 10, fontSize: 13, height: 25, borderRadius: 5 }}>编辑</Button>
                                        <Button type="primary" size="small" style={{ fontSize: 13, width: 60, height: 25, borderRadius: 5 }}>删除</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>< Checkbox /></td>
                                    <td>3</td>
                                    <td>价格问题</td>
                                    <td><Switch/></td>
                                    <td>2017-10-16  10:34:57</td>
                                    <td>
                                        <Button type="primary" size="small" style={{ marginRight: 10, fontSize: 13, height: 25, borderRadius: 5 }}>编辑</Button>
                                        <Button type="primary" size="small" style={{ fontSize: 13, width: 60, height: 25, borderRadius: 5 }}>删除</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>< Checkbox /></td>
                                    <td>3</td>
                                    <td>价格问题</td>
                                    <td><Switch/></td>
                                    <td>2017-10-16  10:34:57</td>
                                    <td>
                                        <Button type="primary" size="small" style={{ marginRight: 10, fontSize: 13, height: 25, borderRadius: 5 }}>编辑</Button>
                                        <Button type="primary" size="small" style={{ fontSize: 13, width: 60, height: 25, borderRadius: 5 }}>删除</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>< Checkbox /></td>
                                    <td>3</td>
                                    <td>价格问题</td>
                                    <td><Switch/></td>
                                    <td>2017-10-16  10:34:57</td>
                                    <td>
                                        <Button type="primary" size="small" style={{ marginRight: 10, fontSize: 13, height: 25, borderRadius: 5 }}>编辑</Button>
                                        <Button type="primary" size="small" style={{ fontSize: 13, width: 60, height: 25, borderRadius: 5 }}>删除</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>< Checkbox /></td>
                                    <td>3</td>
                                    <td>价格问题</td>
                                    <td><Switch/></td>
                                    <td>2017-10-16  10:34:57</td>
                                    <td>
                                        <Button type="primary" size="small" style={{ marginRight: 10, fontSize: 13, height: 25, borderRadius: 5 }}>编辑</Button>
                                        <Button type="primary" size="small" style={{ fontSize: 13, width: 60, height: 25, borderRadius: 5 }}>删除</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>< Checkbox /></td>
                                    <td>3</td>
                                    <td>价格问题</td>
                                    <td><Switch/></td>
                                    <td>2017-10-16  10:34:57</td>
                                    <td>
                                        <Button type="primary" size="small" style={{ marginRight: 10, fontSize: 13, height: 25, borderRadius: 5 }}>编辑</Button>
                                        <Button type="primary" size="small" style={{ fontSize: 13, width: 60, height: 25, borderRadius: 5 }}>删除</Button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </main>
                    <Pagination defaultCurrent={1} total={500} style={{
                        marginRight: 30, marginTop: 45, float: "right"
                    }} />,
        </div>
            </section>
        )
    }
}
