import React, { Component } from 'react'
import { Button, Pagination, Switch, Checkbox, Select, Popconfirm, message, Form, Input } from 'antd';
import IconFont from '../../../../iconfont/font'
import './List.less';
import { withRouter } from 'react-router-dom';

/*   -----------------     redux引入部分      ------------------- */
import * as actionCreators from '../../../../redux/actions/actions';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"

const Option = Select.Option;
const text = 'Are you sure to delete this task?';
const FormItem = Form.Item;

class Temp extends Component {
    constructor(props) {
        super(props)
        this.Page = null;  //用于包装Pagination组件;
        this.itemsArr = []; //初始化数组,page切换,清空
        this.renderArr = ["热销", "推荐", "折扣"];
        this.renderData = null;        // 渲染的数据
        this.selectOption = ["设为推荐", "设为热销", "设为折扣", "批量删除"]
        this.selectValue = null //选择内容
        this.categoryName = {} //菜品类名
        this.initStoreData = null; //将redux传过来数据存一下作为搜索使用,redux已经改变（因为渲染）,所以将此数据再传过去
        this.switchChecked = null
        this.state = {
            current: 1,
            storeData: [],        // 菜品数据
            categoryName: {},      // 菜品类名 
            indeterminate: false, // 全选按钮 中间状态控制
            checkAll: false,      // 全部选中
            storeArr: [],         // 状态切换存储数据
            booleanValue: true,   // 确认按钮disable 控制属性  
            selecctValue: "批量操作", // 批量操作 
            colorBoolean: true,     // 控制select下拉框颜色
            switchChecked: null
        }
    }
    async componentDidMount() {
        // 提前计划放入redux中的数据和方法
        // console.log(this)
        await this.props.fetchFoodInfo()
        this.initStoreData = this.props.data
        /*  
       问题：
           点请求数据异步,拿不到;
 
       在使用过成中将redux和state用导致变量无法更新,禁止混用;  
        */
    }

    /* ------------------    信息内容列表部分渲染(以下)   ------------------- */
    async handleSearchClick() {
        let booleanValue = Object.values(this.props.form.getFieldsValue()).every(ele => !!ele === false)
        if (booleanValue) {
            //   初次未设置任何筛选内容时点击搜索,不产生结果;
            return null
        } else {
            try {
                await this.props.batchQuery(this.props.form.getFieldsValue(), this.props.data.data)
            } catch (error) {
                // console.log( this.initStoreData ) // {data: Array(11), code: 0, msg: "查找成功"}
                await this.props.batchQuery(this.props.form.getFieldsValue(), this.initStoreData.data)
            }
        }
        // booleanValue? null :
        // 调用redux操作数据,传入表单内设置值,并将操作前数据传过去
    }
    handleResetClick() {
        if ((this.props.data == null) || (this.props.data.code !== 0)) { //或者运算符有先后顺序
            //查找不到再重置拿回来以后为null
            this.props.fetchFoodInfo()  //简单减少请求
        }
        this.props.form.resetFields()
    }

    /* ------------------    信息内容列表部分渲染(以下)   ------------------- */

    /* ------------------    信息内容列表部分渲染(以下)   ------------------- */
    switchChange = async (valid, item, ele) => {

        let screenData = this.props.data.data.filter((i) => {
            return i.categoryName === item
        })  //筛选后的数据
        let confirm = screenData[0].spuList.filter(n => n.spuName === ele.spuName)

        if (confirm.length) {
            /*  this.setState({
                 switchChecked:false
             }) 
            */
           /* 
             *******   可以设置成禁止点击,最好还是分类存放不要存放到一次    *******
             一条数据两用的不要存放到一起！！！！！！！！
           */
            const success = () => {
                message.success(`${ele.spuName} 存在 【${ele.categoryName}】 推荐中 请重新选择~ `);
            };
            success()
        } else {

            await this.props.transRecommend(valid, item, ele);
            /*   this.setState({
                switchChecked:true
             }) 
            */
        }
        /* 
            思路整理：
               0.判断是否存在
               1.如果存在就提示
               2.如果不存在true不了,设置为false
        */
    }
    shouldComponentUpdate() {
        return this.props.state === this.props.state
    }
    renderItems = (ele, index) => {
        if (ele == null) {
            return <tr key="1"
                style={{
                    height: 40, textAlign: "center", fontSize: 20, width: "100%", margin: "0 auto",
                    color: "grey"
                }}>
                {/* <td style={{ width: 200,borderRight:"none" }}></td> */}
                <td style={{ width: 200, borderLeft: "none" }}></td>
                <td style={{ width: 200, borderLeft: "none" }}></td>
                <td style={{ width: 200, borderLeft: "none" }}></td>
                <td style={{ width: 200, borderLeft: "none" }}></td>
                <td style={{ color: "grey", width: 500, borderLeft: "none", textAlign: "right" }}>结果不存在，</td>
                <td style={{ color: "grey", width: 500, borderLeft: "none", textAlign: "left" }}>请重新查找。</td>
            </tr>
        } else {
            return (
                <tr key={ele.spuId} id={ele.spuId}  >
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
                        {this.renderArr.map((item) =>
                            <p key={item}>
                                <span style={{ paddingRight: 15 }}>{item}</span>
                                <Switch
                                    size="default"
                                    defaultChecked={ele.categoryName === item}
                                    // disabled={ele.categoryName === item}
                                    checked={ele.categoryName === item}
                                    onClick={(valid) => {
                                        this.switchChange(valid, item, ele)
                                    }}
                                />
                            </p>
                        )}
                    </td>
                    <td>
                        <Button
                            type="primary"
                            size="small"
                            ghost="true"
                            onClick={(ev) => {
                                this.props.editClick(this.props, ele, ev)
                            }}//传参为tr索引
                            style={{ marginRight: 10, fontSize: 13, width: 60, height: 25, borderRadius: 5 }}
                        >
                            <span>编辑</span>
                        </Button>
                        <Popconfirm
                            placement="topRight"
                            title={text}
                            onConfirm={this.confirm}
                            okText="Yes"
                            onConfirm={() =>
                                this.props.transRecommend(false, ele.categoryName, ele)
                            }
                            cancelText="No">
                            <Button
                                type="primary"
                                size="small"
                                style={{ fontSize: 13, width: 60, height: 25, borderRadius: 5 }}
                            >删除</Button>
                        </Popconfirm>
                    </td>
                </tr>)
        }
    }
    checkedChange = (index, ev) => {
        // 单个点击事件 index 为传入索引
        ev.stopPropagation()
        this.itemsArr[index] = ev.target.checked  //改变操作复选框的数组        
        if (this.itemsArr.every(ele => ele === true)) {
            // 多选框全为 => true,全选按钮为true,indeterminate为false(indeterminate中间状态)
            this.setState({
                storeArr: this.itemsArr,  // 为了render
                checkAll: true,
                indeterminate: false
            })
        } else {
            // console.log(this.selectValue)
            (this.selectValue) ? this.setState({
                storeArr: this.itemsArr,
                checkAll: false,
                indeterminate: true, booleanValue: false
            }) : this.setState({ // 存在多选框为 false
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
        //  全选 功能 
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
    confirm = () => {
        // 气泡确认框内容
        message.info('Clicked on Yes.');
    }
    /* ------------------    信息内容列表部分渲染(以上)   ------------------- */

    /* -------------------------- 批量操作部分(以下) -------------------- */
    bulkOperation = () => {
        /* 思路： 
            1.首先判断选中内容是哪些？(先看一下数组准不准,state 还是外面的准一些);
            2.确定选中内容后,判断select中内容;(附加条件select数值有效)
            3.点击确定发送请求,将选中数据发送到后台进行修改;
            4.后台接收到的是一个数组,怎样处理进行数组解构;
            5.后台进行判断,如果是一个数组一条一条增加处理？？
        */
        let tempArr = [] // 创建数组 
        this.state.storeArr.forEach((ele, index) => { if (ele) { tempArr.push(this.renderData[index]) } })
        // 拿到索引,将点了对勾的数据push到新数组;
        // 拿到选择内容再进行请求;
        // console.log(tempArr)  拿到数据以后传送给后台进行修改;
        // console.log(this.selectValue)  当下选框数组,不能为空字符串
        // console.log(this.selectOption)  ["设为推荐", "设为热销", "设为折扣", "批量删除"]
        if (this.selectValue && tempArr.length) {//select不能为空,复选框不能为空,进入判断;
            let OperString = this.selectValue.substring(2, 4) //操作方式： 热销 推荐 折扣 删除  

            let collateData = () => { //查看是否存在
                let tempData = [];
                let data = [...this.props.data.data]
                for (let ele of data) {
                    for (let item of ele.spuList) {//  将拿回来spuList数组,数据处理
                        item.categoryName = ele.categoryName // 类名
                        item.checked = false  //拿到数据可以加小tag方便自己操作
                        tempData.push(item)
                    }
                }
                tempData = tempData.filter((ele) => ele.categoryName == "折扣" || ele.categoryName == "热销" || ele.categoryName == "推荐"
                )
                return tempData
                /* 
                  思路整理: 
                     拿到每个获取的信息;(操作方式用传入方式,删除就直接操作就可以了)
                     将信息进行匹配筛选,先按照categoryName查找再根据id查找
                     查找结果放在一个数组中,如果数组没找到添加进去,找到就禁止添加已存在 
                */
            }

            if (OperString === "删除" && tempArr.length) {
                // 批量操作选中删除,并且有数据被checked进入判断
                // 循环调用删除,正常逻辑应该是一次请求结束,不能多次请求;
                tempArr.forEach((ele) => this.props.transRecommend(false, ele.categoryName, ele))
            } else {
                // 三种推荐操作
                let testExist = function* () {
                    for (let ele of tempArr) {
                        yield collateData().filter((item) => {
                            return ele.spuId === item.spuId && ele.categoryName === OperString
                        })
                    }
                };
                let num = 0;//手动给循环加个索引,因为知道总数组,不知道循环的是谁
                for (let ele of testExist()) { //循环原理
                    //没有就添加,有的话警告：已经存在
                    ++num
                    if (ele.length) {
                        // 提示已经存在了
                        const success = () => {
                            message.success(`${ele[0].spuName} 存在 【${ele[0].categoryName}】 推荐中 请重新选择~ `);
                        };
                        success()
                    } else {
                        // 如果0,不存在就进行添加,不存在是谁
                        tempArr[num - 1].categoryName = OperString
                        this.props.transRecommend(true, tempArr[num - 1].categoryName, tempArr[num - 1])
                        //  console.log("推荐中不存在进行添加,添加到推荐中")
                    }
                }
            }
            this.props.batchUpdate(tempArr, OperString) //(数据,操作方式)
        }
        tempArr = []
    }
    /* --------------------------  批量操作部分(以下) -------------------- */

    /* ------------------------  底部页码组件部分(以下) -------------------- */
    /* 
      组件声明变量:
           this.Page 和 this.state.current:1
    
      复用注意：首先判断数据格式     
    */
    async ChangePage(page) {
        //  *** 改变页码 ***
        // 使用<Pagination/>组件自带回调函数来设置页码对应渲染内容
        // this.checkedChange()
        this.itemsArr = []
        this.setState({
            current: page,
            storeArr: [],
            checkAll: false,
            indeterminate: false,
            selecctValue: "批量操作",
            colorBoolean: true,
            booleanValue: true
            // this.setState({selecctValue: value})
        })
        // 注意setState为异步,回调函数问题
    }
    renderPage(tempData) {
        //  *** 渲染底部page ***
        //page第二步骤;
        if (tempData.length) {
            let length = tempData.length;
            this.Page = <Pagination  //  底部页码组件
                defaultCurrent={1}
                pageSize={5}
                total={length}
                onChange={this.ChangePage.bind(this)}
                style={{
                    marginRight: 25, marginTop: 30, float: "right"
                }} />
            return this.Page
        }
    }
    /* ------------------------  底部页码组件部分(以上) -------------------- */
    render() {
        console.log(this.switchChecked)

        let Items = null;
        let tempData = [];
        let data = { ...this.props.data }
        const { getFieldProps, getFieldError, isFieldValidating, getFieldDecorator } = this.props.form;
        // 初始为 {} 空对象
        if (data.data) {
            // 数据格式化处理,放在一个数组内,便于渲染
            // Object.keys()  获取对象中keys值
            // JSON.stringify(data) == "{}" //空对象判断方法
            for (let ele of data.data) {
                this.categoryName[ele.categoryName] = ele.categoryName// 存储类名
                for (let item of ele.spuList) {//  将拿回来spuList数组,数据处理
                    item.categoryName = ele.categoryName // 类名
                    item.checked = false  // 拿到数据可以加小tag方便自己操作
                    tempData.push(item)
                }
            }
        }

        if (JSON.stringify(this.props.data) !== "{}" && !data.data) {
            if (Array.isArray(this.props.data)) { //如果搜索回来结果是一个数组
                tempData = this.props.data  //把数组直接丢进去进行渲染,渲染数组弄成最深层目录一个格式,最省事了,不用再考虑格式问题,直接丢数据就可以修改.
            } else {
                tempData.push(this.props.data)
            }

            //弄成统一格式进行渲染,比如都放在一个数组里面,总是需要改格式,有深层嵌套很麻烦。
        }
        /* ------------------------         渲染主要列表       -------------------- */

        if (tempData.length) { // 注释:  见用户：Member组件
            let data = tempData;
            if (data.length < 5) {
                Items = data.map(this.renderItems)
            } else {
                this.renderData = data.filter((e, index) =>
                    index >= 5 * (this.state.current - 1) &&
                    index < 5 * this.state.current
                )
                Items = (this.renderData).map(this.renderItems)
                if (!Items.length) {
                    let temp = this.state.current * 1
                    this.setState({ current: temp - 1 })
                    return this.state
                }
            }
            if (!this.itemsArr.length) { //itemsArr为空初始化，非空不进判断，避免重复render
                this.itemsArr = Array(Items.length).fill(false)
            }
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
                                action=""
                                style={{
                                    marginTop: 15,
                                    marginBottom: 20,
                                    marginLeft: 60
                                }}
                            >
                                <FormItem
                                    label="输入检索"
                                >
                                    {getFieldDecorator("spuName", {
                                        // initialValue: this.props.location.state[0].state
                                    })(
                                        <Input
                                            placeholder="请输入菜名"
                                            style={{
                                                width: 170, color: "#606266", fontSize: 12, marginRight: 20
                                            }}
                                        />
                                    )}
                                </FormItem>
                                <FormItem
                                    label="菜品类型"
                                // {...formItemLayout}
                                >
                                    {getFieldDecorator("categoryName", {
                                        // initialValue: this.props.location.state[0].state
                                    })(
                                        <Select
                                            placeholder="请选择类型"
                                            style={{ width: 170, color: "#606266", fontSize: 12, marginRight: 20 }}
                                        >
                                            {Object.keys(this.categoryName).filter(ele => ele !== "折扣" && ele !== "推荐" && ele !== "热销").map(ele =>
                                                <Option value={ele} key={ele}>{ele}</Option>
                                            )}
                                        </Select>,
                                    )}
                                </FormItem>
                                <FormItem
                                    label="推荐状态"
                                >
                                    {getFieldDecorator("recommendState", {
                                        // initialValue: this.props.location.state[0].state
                                    })(
                                        <Select
                                            placeholder="推荐状态"
                                            style={{ width: 170, color: "#606266", fontSize: 12, marginRight: "0!imoprtant" }}
                                        >
                                            {this.renderArr.map(ele =>
                                                <Option value={ele} key={ele}>{ele}</Option>
                                            )}
                                        </Select>
                                    )}

                                </FormItem>

                            </Form >
                        </div>
                    </div>
                    <div className="el-title">
                        <div className="el-title-body">
                            <IconFont type="mall-doc-list" style={{ fontSize: 16, marginRight: 5 }} />
                            <span>数据列表</span>
                            {/* <button className="add">添加菜0品</button> */}
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
                    <Select
                        // defaultValue= {this.state.defalutSelecctValue} //不能改变颜色
                        placeholder="批量操作" //默认值
                        style={{
                            marginRight: 20, marginTop: 30,
                            float: "left", width: 150,
                            size: "large",
                            color: this.state.colorBoolean ? "rgba(0, 0, 0, 0.45)" : "rgba(0, 0, 0, 1)"
                            // 颜色控制方法: 初始一个颜色下拉选择后一个颜色,page改变后内容和文字颜色都恢复
                        }}
                        value={this.state.selecctValue}
                        onSelect={value => {
                            this.selectValue = value
                            this.setState({  //下拉后改变颜色tag--colorBoolean,把下拉表内容也弄回去;
                                colorBoolean: false,
                                selecctValue: value
                            })
                            if (this.itemsArr.some(ele => ele === true)) {
                                this.setState({
                                    booleanValue: false
                                })
                            }
                        }}
                    >
                        {this.selectOption.map(item =>
                            <Option value={item} key={item} >{item}</Option>
                        )}
                    </Select>
                    <Button
                        type="primary"
                        style={{
                            marginTop: 30, fontSize: 13,
                            height: 30, size: "large"
                        }}
                        disabled={this.state.booleanValue}
                        onClick={
                            () => this.bulkOperation()}
                    >确定</Button>
                    {this.renderPage(tempData)}
                </div>
            </section>
        )
    }
}
const Demo = Form.create({ name: 'title' })(Temp);

export default withRouter(connect(
    state => { return { data: state.foodData } },//将redux变量赋值到组件,成组件变量Data
    dispatch => bindActionCreators(actionCreators, dispatch))(Demo))

// export default withRouter(Demo)
