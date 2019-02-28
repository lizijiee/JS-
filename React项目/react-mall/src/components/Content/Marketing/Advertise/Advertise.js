import React, { Component } from 'react'
import { Button, Pagination, Switch, Checkbox, Select, message, Modal } from 'antd';
import IconFont from '../../../../iconfont/font'
import './List.less';
import jiding from './img/mall-food-list-gongbao.jpg'
import { inherits } from 'util';

const Option = Select.Option;
const confirm = Modal.confirm;

export default class Temp extends Component {
    state = {
        checkeds: [
            {
                id: 0,
                checked: false,
                title: '宫爆',
            },
            {
                id: 1,
                checked: false
            }
        ],
    }
    componentDidMount() {
        //请求数据
        this.setState({})
    }
    click = () => {
        this.setState({
            checked: false,
        });
        // message.success('This is a message of success');
        confirm({
            title: '是否要修改上线/下线状态?',
            keyboard: true,
            // afterClose() {
            //     console.log("1111111")
            // },
            // onOk() {
            //     this.setState({
            //      checked:!this.state.checked,
            //         });
            // }
        });
    }
    onCancel = (id) => {
        //     this.setState({
        //        checked: !this.state.checked,
        //    });
    }
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
                        </div>
                    </div>
                    <div className="el-title">
                        <div className="el-title-body">
                            <IconFont type="mall-doc-list" style={{ fontSize: 16, marginRight: 5 }} />
                            <span>数据列表</span>
                            <button className="add">添加轮播图</button>
                        </div>
                    </div>
                    <main className="table-container">
                        <table cellPadding="0" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th> < Checkbox /></th>
                                    <th>编号</th>
                                    <th>菜品图片</th>
                                    <th>菜品名称</th>
                                    <th>广告时间</th>
                                    <th>上线/下线</th>
                                    <th>点击次数</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>< Checkbox /></td>
                                    <td>1</td>
                                    <td><img src={jiding} alt="菜品" /></td>
                                    <td>宫保鸡丁</td>
                                    <td style={{ padding: "0 5px" }}>
                                        <p>开始时间：2018-11-01 00:00:00</p>
                                        <p>到期时间：2018-11-24 00:00:00</p>
                                    </td>
                                    <td><Switch size="default" onClick={this.click}
                                        checked={this.state.checked}
                                    /></td>
                                    <td>
                                        1000
                                    </td>
                                    <td>
                                        <Button
                                            size="small"
                                            type="primary"
                                            style={{ fontSize: 13, width: 60, height: 25, marginRight: 10 }}>编辑</Button>
                                        <Button
                                            size="small"
                                            type="primary"
                                            style={{
                                                fontSize: 13, width: 60, height: 25
                                            }}>删除</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>< Checkbox /></td>
                                    <td>1</td>
                                    <td><img src={jiding} alt="菜品" /></td>
                                    <td>宫保鸡丁</td>
                                    <td style={{ padding: "0 5px" }}>
                                        <p>开始时间：2018-11-01 00:00:00</p>
                                        <p>到期时间：2018-11-24 00:00:00</p>
                                    </td>
                                    <td><Switch size="default" /></td>
                                    <td>
                                        1000
                                    </td>
                                    <td>
                                        <Button
                                            size="small"
                                            type="primary"
                                            style={{ fontSize: 13, width: 60, height: 25, marginRight: 10 }}>编辑</Button>
                                        <Button
                                            size="small"
                                            type="primary"
                                            style={{
                                                fontSize: 13, width: 60, height: 25
                                            }}>删除</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>< Checkbox /></td>
                                    <td>1</td>
                                    <td><img src={jiding} alt="菜品" /></td>
                                    <td>宫保鸡丁</td>
                                    <td style={{ padding: "0 5px" }}>
                                        <p>开始时间：2018-11-01 00:00:00</p>
                                        <p>到期时间：2018-11-24 00:00:00</p>
                                    </td>
                                    <td><Switch size="default" /></td>
                                    <td>
                                        1000
                                    </td>
                                    <td>
                                        <Button
                                            size="small"
                                            type="primary"
                                            style={{ fontSize: 13, width: 60, height: 25, marginRight: 10 }}>编辑</Button>
                                        <Button
                                            size="small"
                                            type="primary"
                                            style={{
                                                fontSize: 13, width: 60, height: 25
                                            }}>删除</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>< Checkbox /></td>
                                    <td>1</td>
                                    <td><img src={jiding} alt="菜品" /></td>
                                    <td>宫保鸡丁</td>
                                    <td style={{ padding: "0 5px" }}>
                                        <p>开始时间：2018-11-01 00:00:00</p>
                                        <p>到期时间：2018-11-24 00:00:00</p>
                                    </td>
                                    <td><Switch size="default" /></td>
                                    <td>
                                        1000
                                    </td>
                                    <td>
                                        <Button
                                            size="small"
                                            type="primary"
                                            style={{ fontSize: 13, width: 60, height: 25, marginRight: 10 }}>编辑</Button>
                                        <Button
                                            size="small"
                                            type="primary"
                                            style={{
                                                fontSize: 13, width: 60, height: 25
                                            }}>删除</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>< Checkbox /></td>
                                    <td>1</td>
                                    <td><img src={jiding} alt="菜品" /></td>
                                    <td>宫保鸡丁</td>
                                    <td style={{ padding: "0 5px" }}>
                                        <p>开始时间：2018-11-01 00:00:00</p>
                                        <p>到期时间：2018-11-24 00:00:00</p>
                                    </td>
                                    <td><Switch size="default" /></td>
                                    <td>
                                        1000
                                    </td>
                                    <td>
                                        <Button
                                            size="small"
                                            type="primary"
                                            style={{ fontSize: 13, width: 60, height: 25, marginRight: 10 }}>编辑</Button>
                                        <Button
                                            size="small"
                                            type="primary"
                                            style={{
                                                fontSize: 13, width: 60, height: 25
                                            }}>删除</Button>
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
