import React, { Component } from 'react'
import { Button, Pagination, Checkbox } from 'antd';
import IconFont from '../../../../iconfont/font'
import './Member.less';

export default class componentName extends Component {
    render() {
        return (
            <section className="clerk-info">
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
                                <input type="text" placeholder="请输入姓名">
                                </input>
                            </div>
                        </div>
                    </div>
                    <div className="el-title">
                        <div className="el-title-body">
                            <IconFont type="mall-doc-list" style={{ fontSize: 16, marginRight: 5 }} />
                            <span>数据列表</span>
                            <button className="add">添加人员信息</button>
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
                        marginTop: 20, marginRight: 30, marginTop: 25, float: "right"
                    }} />,
                </div>
            </section>
        )
    }
}
