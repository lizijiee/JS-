import React, { Component, Fragment } from 'react'
import { Button, Pagination, Switch, Checkbox, Select, Table } from 'antd';
import IconFont from '../../../../iconfont/font'
import './List.less';
/*   -----------------     redux引入部分      ------------------- */
import { withRouter } from 'react-router-dom';
import * as actionCreators from '../../../../redux/actions/actions';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import axios from 'axios';


const Option = Select.Option;
const columns = [{
    title: '序号',
    dataIndex: 'num',
}, {
    title: '订单编号',
    dataIndex: 'order_id',
}, {
    title: '下单时间',
    dataIndex: 'created_at',
}, {
    title: '用户账号',
    dataIndex: 'user',
}, {
    title: '订单金额',
    dataIndex: 'total_price',
}, {
    title: '订单状态',
    dataIndex: 'state',
}, {
    title: '操作',
    dataIndex: 'constrol',
    render: (text, record) => (
        <Fragment key={record}>
            <Button type="primary" size="small" ghost
                style={{ marginRight: 20, fontSize: 12, height: 28, padding: "5px 13px", background: " #fff", border: " 1px solid #dcdfe6", color: " #606266", borderRadius: 2 }}>查看详情</Button>
            <Button size="small"
                style={{ marginRight: 10, fontSize: 12, height: 27, padding: "5px 20px", backgroundColor: "#f56c6c", border: "1px solid #f56c6c", color: "#fff", borderRadius: 2 }}>删除</Button>
        </Fragment>
    ),
}];





class Temp extends Component {
    state = {
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
    };
    start = () => {
        this.setState({ loading: true });
        // ajax request after empty completing
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
        }, 1000);
    }

    onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }
    async  componentDidMount() {
        await this.props.fetchOrderInfo(null, 1)
        console.log(this.props)
    }
    pageChange = async (page) => {
        console.log("2dkfljdslfjsd")

        this.setState({
            current: page.current,
            // this.setState({selecctValue: value})
        }
        )
        await this.props.fetchOrderInfo(null, page.current)
        // console.log(this.props)
    }
    render() {
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        const status_code = {
            "-5": "等待支付",
            "-4": "支付失败",
            "-1": "订单取消",
            "0": "订单未处理",
            "2": "订单已处理",
            "11": "用户确认订单",
        }

        let data = [];
        if ( this.props.data.length ) {
            console.log(this.props.data)
            for (let ele of this.props.data) {
                // console.log(ele.data[0])
                data.push({
                    key: ele.data[0].member_num,
                    num: ele.data[0].user_id,
                    order_id: ele.data[0].order_id,
                    created_at: ele.data[0].created_at,
                    user: ele.data[0].user,
                    total_price: ele.data[0].total_price.toFixed(2),
                    state: status_code[ele.data[0].status_code * 1]
                });
            }
        }

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
                                <Button
                                    className="btn"
                                    style={{
                                        color: "#1890ff",
                                        float: "right",
                                        marginRight: 20,
                                    }}
                                    ghost
                                // onClick={this.handleResetClick.bind(this)}
                                >重置</Button>
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
                    <Fragment>
                        <Table
                            rowSelection={rowSelection}
                            columns={columns}
                            pagination={{
                                total: this.props.total, //数据总数量
                                pageSize: 10,  //显示几条一页
                            }}
                            onRow={(record) => {
                                return {
                                    //   onClick: (event) => {console.log(1111)},   // 点击行
                                    //   onDoubleClick: (event) => {},
                                    //   onContextMenu: (event) => {},
                                    //   onMouseEnter: (event) => {console.log(1111)},  // 鼠标移入行
                                    //   onMouseLeave: (event) => {}
                                };
                            }}
                            dataSource={data}
                            bordered
                            onChange={this.pageChange.bind(this)}
                            className="el-table" />
                        <Select
                            // defaultValue= {this.state.defalutSelecctValue} //不能改变颜色
                            placeholder="批量操作" //默认值
                            style={{
                                position: "absolute", bottom: 55,
                                width: 150,
                                size: "large",
                                color: this.state.colorBoolean ? "rgba(0, 0, 0, 0.45)" : "rgba(0, 0, 0, 1)"
                                // 颜色控制方法: 初始一个颜色下拉选择后一个颜色,page改变后内容和文字颜色都恢复
                            }}
                        >
                            <Option key={1} > 删除订单 </Option>
                            <Option key={2} > 其它 </Option>
                        </Select>
                        <span style={{ marginLeft: 8, marginLeft: 16, bottom: 60, color: "grey" }}>
                            {hasSelected ? `已选中 ${selectedRowKeys.length} 条` : ''}
                        </span>
                        <Button
                            type="primary"
                            style={{
                                position: "absolute", fontSize: 13, left: 200, bottom: 55,
                                height: 30, size: "large"
                            }}
                            onClick={this.start}
                            disabled={!hasSelected}
                            loading={loading}
                        >确定</Button>

                    </Fragment>
                    {/* 
                    <Table
                        columns={self.tableColumns} //th菜单项
                        rowKey={record => record.registered}
                        dataSource={this.state.dataSource.data} //数据
                        pagination={{  //分页
                            total: this.state.dataSource.count, //数据总数量
                            pageSize: this.state.queryInfo.pageSize,  //显示几条一页
                            defaultPageSize: this.state.queryInfo.pageSize, //默认显示几条一页
                            showSizeChanger: true,  //是否显示可以设置几条一页的选项
                            onShowSizeChange(current, pageSize) {  //当几条一页的值改变后调用函数，current：改变显示条数时当前数据所在页；pageSize:改变后的一页显示条数
                                self.toSelectchange(current, pageSize); //这边已经设置了self = this
                            },
                            onChange(current) {  //点击改变页数的选项时调用函数，current:将要跳转的页数
                                self.gotoThispage(current, self.state.queryInfo.pageSize);
                            },
                            showTotal: function () {  //设置显示一共几条数据
                                return '共 ' + this.state.dataSource.count + ' 条数据';
                            }
                        }}
                        loading={this.state.loading}  //设置loading属性
                    /> */}
                    {/* <main className="table-container">
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
                    }}
                        className="pageChange"
                    /> */}
                </div>
            </section>
        )
    }
}
export default withRouter(connect(
    state => { return { data: state.orderData,total:state.total } },//将redux变量赋值到组件,成组件变量Data
    dispatch => bindActionCreators(actionCreators, dispatch))(Temp))