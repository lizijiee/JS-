import React, { Component } from 'react'
import { Button, Pagination, Switch, Checkbox, Select } from 'antd';
import IconFont from '../../../../iconfont/font'
import './List.less';
import { withRouter } from 'react-router-dom';
import jiding from './img/mall-food-list-gongbao.jpg'

//  -----------------     redux      ----------
import * as actionCreators from '../../../../redux/actions/actions';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import { reject, all } from 'q';

const Option = Select.Option;

class Temp extends Component {
    constructor() {
        super()
        this.Page = null;  //用于包装Pagination组件;
        this.itemsArr = [];
        this.state = {
            current: 1,
            indeterminate: false, // 全选按钮 中间状态控制
            checkAll: false,      // 全部选中
            storeArr: [],         // 状态切换存储数据
            storeData: [],        // 菜品数据
            categoryName: {}      // 菜品类名 
        }
    }
    async componentDidMount() { // 重复工作尽量用生命周期
        await this.props.fetchFoodInfo()  //!!!!!!! 终点请求数据异步,拿不到
        let temp = []
        let categoryName = {}//类名
        for (let ele of this.props.data.data) {
            categoryName[ele.categoryName] = ele.categoryName//存储类名
            for (let item of ele.spuList) {//对拿回来数据处理
                item.categoryName = ele.categoryName //类名
                temp.push(item)
            }
        }
        this.setState({
            storeData: temp,
            categoryName
        })
    }
    /* ------------------  信息内容列表部分渲染;   ------------------- */
    renderItems = (ele, index) => {
        if (this.itemsArr.length < 5) {
            this.itemsArr.push(false)
        }
        return (
            <tr key={ele.spuId} id={ele.spuId}>
                <td>
                    < Checkbox
                        onChange={(ev) => { this.checkedChange(index, ev) }}//传参小难点
                        // id={`num${index}`}
                        // indeterminate={this.state.storeArr[index]}
                        checked={this.state.storeArr[index]}
                    />
                </td>
                <td>{ele.spuId}</td>
                <td><img src={ele.littleImageUrl} alt={ele.spuName} /></td>
                <td>{ele.spuName}</td>
                <td > {ele.categoryName} </td>
                <td>{ele.saleVolume}</td>
                <td>￥{ele.currentPrice}</td>
                <td>
                    <p>
                        <span style={{ paddingRight: 15 }}>热销:</span>
                        <Switch size="default" />
                    </p>
                    <p>
                        <span style={{ paddingRight: 15 }}>推荐:</span>
                        <Switch size="default" />
                    </p>
                    <p>
                        <span style={{ paddingRight: 15 }}>折扣:</span>
                        <Switch size="default" />
                    </p>
                </td>
                <td>
                    <Button
                        type="primary"
                        size="small"
                        ghost="true"
                        // onClick={() => { this.EditClick(ele.Id) }}//当前点击tr的索引
                        style={{ marginRight: 10, fontSize: 13, width: 60, height: 25, borderRadius: 5 }}
                    >
                        <span>编辑</span>
                    </Button>
                    <Button
                        type="primary"
                        size="small"
                        // onClick={() => { this.deleteInfo(ele) }}
                        style={{ fontSize: 13, width: 60, height: 25, borderRadius: 5 }}
                    >删除</Button>
                </td>
            </tr>)
    }
    checkedChange = (index, ev) => { //单个点击事件 index 为传入索引
        ev.stopPropagation()
        this.itemsArr[index] = ev.target.checked
        if (this.itemsArr.every(ele => ele === true)) {
            //多选框全为 => true,全选按钮为true,indeterminate为false(indeterminate中间状态)
            this.setState({
                storeArr: this.itemsArr,  //为了render
                checkAll: true,         
                indeterminate: false
            })
        } else {
            this.setState({ //存在多选框为 false
                storeArr: this.itemsArr,
                checkAll: false,
                indeterminate: true
            })
        }
        if (!this.itemsArr.some(ele => ele === true)) {
             //多选框全为 => false,indeterminate为false
            this.setState({
                storeArr: this.itemsArr,
                 indeterminate: false
            })
        }
    }
    onCheckAllChange = (e) => {
        if (e.target.checked) {
            this.itemsArr.forEach((ele, index) => {
                this.itemsArr[index] = e.target.checked
            });
        }
        else {
            this.itemsArr.forEach((ele, index) => {
                this.itemsArr[index] = e.target.checked
            });
        }
        this.setState({
            checkAll: e.target.checked,
            storeArr: this.itemsArr,
            indeterminate: false
        })

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
    renderPage() { //page第二步骤;
        if (this.state.storeData.length) {
            let length = this.state.storeData.length;
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

    render() {
        // console.log(this.state.storeArr)
        let Items = null;
        /*        **************   渲染主要列表    ***********      */
        if (this.state.storeData.length) { //注释:  见用户：Member组件
            let { storeData: data } = this.state;
            if (data.length === 1) {
                Items = data.map(this.renderItems)
            } else {
                Items = data.filter((e, index) =>
                    index >= 5 * (this.state.current - 1) &&
                    index < 5 * this.state.current
                ).map(this.renderItems)
                if (!Items.length) {
                    let temp = this.state.current * 1
                    this.setState({ current: temp - 1 })
                    return this.state
                }
            }
            // this.itemsArr=Items
        }
        return (
            <section className="food-info-list">
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
                                <span>菜品类型:</span>
                                <Select
                                    showSearch
                                    placeholder="菜品类型"
                                    style={{ width: 170, color: "#606266", fontSize: 12 }}
                                >
                                    <Option value="特色汤面">特色汤面</Option>
                                    <Option value="酒水饮料">酒水饮料</Option>
                                    <Option value="烧烤系列">烧烤系列</Option>
                                    <Option value="美味盖饭">美味盖饭</Option>
                                    <Option value="小吃，肉夹馍">小吃，肉夹馍</Option>
                                </Select>,
                            </div>
                            <div className="el-form-item">
                                <span>上架状态:</span>
                                <Select
                                    showSearch
                                    placeholder="上架状态"
                                    style={{ width: 170, color: "#606266", fontSize: 12, marginRight: "0!imoprtant" }}>
                                    <Option value="热销">热销</Option>
                                    <Option value="买过">买过</Option>
                                    <Option value="优惠">优惠</Option>
                                    <Option value="为您优选">为您优选</Option>
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
                                    <th>
                                        < Checkbox
                                            onChange={this.onCheckAllChange.bind(this)}
                                            indeterminate={this.state.indeterminate}
                                            checked={this.state.checkAll}
                                        />
                                    </th>
                                    <th>编号</th>
                                    <th>菜品图片</th>
                                    <th>菜品名称</th>
                                    <th>菜品类型</th>
                                    <th>销量</th>
                                    <th>价格</th>
                                    <th>标签</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody id="ItemWrap">{Items}</tbody>
                        </table>
                    </main>
                    {this.renderPage()}
                </div>
            </section>
        )
    }
}
export default withRouter(connect(
    state => { return { data: state.foodData } },//将redux变量赋值到组件,成组件变量Data
    dispatch => bindActionCreators(actionCreators, dispatch))(Temp))