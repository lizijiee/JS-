import React, { Component, Fragment } from 'react'
import { Button, Form, Select, Table, Modal, Input, InputNumber } from 'antd';
import IconFont from '../../../../iconfont/font'
import './List.less';
/*   -----------------     redux引入部分      ------------------- */
import { withRouter } from 'react-router-dom';
import * as actionCreators from '../../../../redux/actions/actions';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import axios from 'axios';
import qs from 'qs'

const Option = Select.Option;
const confirm = Modal.confirm;
const FormItem = Form.Item;

class Temp extends Component {
    constructor(){
        super()
        this.queryTag=null
    }
    state = {
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
        selecctValue: "批量操作", // 批量操作 
        colorBoolean: true,     // 控制select下拉框颜色
    };
    start = async () => {

        this.setState({ loading: true, });
        // ajax request after empty completing
        await setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
                selecctValue: "批量操作",  // 批量操作 
                colorBoolean: true,     // 控制select下拉框颜色
            });
        }, 1000);
        await axios.post('http://localhost:2000/orders?act=delOrder', qs.stringify({
            index: this.state.selectedRowKeys
        }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            }).then(res => {
                this.props.fetchOrderInfo(null, 1)
            }, err => {
                console.log(err)
            })
    }

    onSelectChange = (selectedRowKeys) => {
        // member_num
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }
    async  componentDidMount() {
        await this.props.fetchOrderInfo(null, 1)
    }
    pageChange = async (page) => {
         if(this.queryTag==null){
            await this.props.fetchOrderInfo(null, page.current)
        }
        // 当里面有数值的时候不去请求数据
    }

    /* ------------------    搜素查询部分(以下)   ------------------- */
    async handleSearchClick() {
        let booleanValue = Object.values(this.props.form.getFieldsValue()).every(ele => !!ele === false)
        if (booleanValue) {
            //   初次未设置任何筛选内容时点击搜索,不产生结果;
            return null
        } else {
            this.queryTag= this.props.form.getFieldsValue()

            // 过滤掉未设置的key值,删除掉
            Object.keys(this.queryTag).forEach(ele => {
                // console.log(ele)
                if (this.queryTag[ele] === undefined) { delete this.queryTag[ele] }
            })

            await this.props.QueryOrderInfo(this.queryTag)

            // this.setState({
            //     storeArr: [],
            //     checkAll: false,
            //     indeterminate: false,
            //     selecctValue: "批量操作",
            //     colorBoolean: true,
            //     booleanValue: true
            // })
            try {
                // await this.props.batchQuery(obj, this.props.data.data)
            } catch (error) {
                // await this.props.batchQuery(obj, this.initStoreData.data)
            }
        }
    }
    handleResetClick() {
        if ((this.props.data == null) || (this.props.data.code !== 0)) { //或者运算符有先后顺序
            //查找不到再重置拿回来以后为null
            this.props.fetchOrderInfo(null, 1)  //简单减少请求
        }
        this.props.form.resetFields()
    }
    /* ------------------    搜索查询部分(以上)   ------------------- */

    /* ------------------    订单删除部分(以下)   ------------------- */

    showDeleteConfirm = (record) => {
        confirm({
            title: 'Are you sure delete this task?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: async () => {
                await axios.post('http://localhost:2000/orders?act=delOrder', qs.stringify({
                    index: [record.key]
                }), {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                        }
                    }).then(res => {
                        this.props.fetchOrderInfo(null, 1)
                    }, err => {
                        console.log(err)
                    })
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    /* ------------------    订单删除部分(以上)   ------------------- */

    /* ------------------    列表渲染部分(以下)   ------------------- */

    columns = [{
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
                    onClick={() => this.showDeleteConfirm(record)}
                    style={{ marginRight: 10, fontSize: 12, height: 27, padding: "5px 20px", backgroundColor: "#f56c6c", border: "1px solid #f56c6c", color: "#fff", borderRadius: 2 }}>删除</Button>
            </Fragment>
        ),
    }];
    /* ------------------    列表渲染部分(以上)   ------------------- */

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
        const { getFieldProps, getFieldError, isFieldValidating, getFieldDecorator } = this.props.form;

        let data = [];
        if (this.props.data.length) {
            for (let ele of this.props.data) {
                data.push({
                    key: ele.order_id,
                    num: ele.user_id,
                    order_id: ele.order_id,
                    created_at: ele.created_at,
                    user: ele.user,
                    total_price: ele.total_price.toFixed(2),
                    state: status_code[ele.status_code * 1]
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
                                <button className="add"
                                    onClick={() => { this.handleSearchClick() }}
                                >查询结果</button>
                                <Button
                                    className="btn"
                                    style={{
                                        color: "#1890ff",
                                        float: "right",
                                        marginRight: 20,
                                    }}
                                    ghost
                                    onClick={this.handleResetClick.bind(this)}
                                >重置</Button>
                            </div>
                            <Form
                                layout="inline"
                                style={{
                                    marginTop: 25,
                                    marginBottom: 30,
                                    marginLeft: 60,
                                    fontSize: 12
                                }}
                            >
                                <FormItem
                                    label="输入检索"
                                >
                                    {getFieldDecorator("order_id", {
                                    })(
                                        <InputNumber
                                            placeholder="请输入订单编号"
                                            style={{
                                                width: 170, color: "#606266", fontSize: 12, marginRight: 20
                                            }}
                                        />
                                    )}
                                </FormItem>
                                <FormItem
                                    label="联系电话"
                                >
                                    {getFieldDecorator("phones", {
                                    })(
                                        <InputNumber
                                            placeholder="收货人手机号/联系人"
                                            style={{
                                                width: 170, color: "#606266", fontSize: 12, marginRight: 20
                                            }}
                                        />
                                    )}

                                </FormItem>
                                <FormItem
                                    label="订单状态"
                                >
                                    {getFieldDecorator("status_code", {
                                        // initialValue: this.props.location.state[0].state
                                    })(
                                        <Select
                                            placeholder="请选择类型"
                                            style={{ width: 170, color: "#606266", fontSize: 12, marginRight: 20 }}
                                        >
                                            {Object.keys(status_code).map(ele =>
                                                <Option key={ele}>{status_code[ele]}</Option>
                                            )}
                                        </Select>,
                                    )}
                                </FormItem>
                            </Form >
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
                            columns={this.columns}
                            pagination={{
                                total: this.props.total, //数据总数量
                                pageSize: 10,  //显示几条一页
                            }}
                            dataSource={data}
                            bordered
                            onChange={this.pageChange.bind(this)}
                            className="el-table" />
                        <Select
                            value={this.state.selecctValue ? this.state.selecctValue : "批量操作"} //不能改变颜色
                            style={{
                                position: "absolute", bottom: 55,
                                width: 150,
                                size: "large",
                                color: this.state.colorBoolean ? "rgba(0, 0, 0, 0.45)" : "rgba(0, 0, 0, 1)"
                                // 颜色控制方法: 初始一个颜色下拉选择后一个颜色,page改变后内容和文字颜色都恢复
                            }}
                            onSelect={value => {
                                this.selectValue = value
                                console.log(value)
                                this.setState({  //下拉后改变颜色tag--colorBoolean,把下拉表内容也弄回去;
                                    colorBoolean: false,
                                    selecctValue: value
                                })
                            }}
                        >
                            <Option key={"删除订单"} > 删除订单 </Option>
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
                            onClick={() => this.start()}
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

                </div>
            </section>
        )
    }
}

const Demo = Form.create({ name: 'title' })(Temp);

export default withRouter(connect(
    state => { return { data: state.orderData, total: state.total } },//将redux变量赋值到组件,成组件变量Data
    dispatch => bindActionCreators(actionCreators, dispatch))(Demo))
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