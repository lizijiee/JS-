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
import { reject } from 'q';

const Option = Select.Option;

class Temp extends Component {
    constructor() {
        super()
        this.Page = null  //用于包装Pagination组件;
        this.state = {
            current: 1,
            storeData: [],
        }
    }
    async componentDidMount() {//重复工作尽量用生命周期
        await this.props.fetchFoodInfo()  //!!!!!!! 终点请求数据异步,拿不到
        // console.log(this.props.data.data)
        let temp = []
        let categoryName=[]
         for(let ele of this.props.data.data){
            // console.log(ele.categoryName)//存下类名称
                console.log(ele.spuList)
                for(let item of ele.spuList ){
                        item.categoryName=ele.categoryName
                        temp.push(item)
                        // console.log(temp.concat(temp))
                        // console.log(item)
                }
    }
        console.log(temp)
    
         //     this.setState({
        //         storeData:this.props.data
        //    })    
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
                                    <th> < Checkbox /></th>
                                    <th>编号</th>
                                    <th>菜品图片</th>
                                    <th>菜品名称</th>
                                    <th>菜品介绍</th>
                                    <th>价格</th>
                                    <th>标签</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>< Checkbox /></td>
                                    <td>1</td>
                                    <td><img src={jiding} alt="菜品" /></td>
                                    <td>宫保鸡丁</td>
                                    <td style={{ padding: "0 5px", textAlign: "left", textIndent: '1em' }}> 宫保鸡丁（Kung Pao Chicken），是一道闻名中外的特色传统名菜。鲁菜、川菜、贵州菜中都有收录，原料、做法有差别。</td>
                                    <td>￥50</td>
                                    <td>
                                        <p><span style={{ paddingRight: 15 }}>热销:</span> <Switch size="default" /></p>
                                        <p><span style={{ paddingRight: 15 }}>新品:</span><Switch size="default" /></p>
                                        <p><span style={{ paddingRight: 15 }}>优惠:</span><Switch size="default" /></p>
                                    </td>
                                    <td>
                                        <Button type="primary" size="small" style={{ marginRight: 10, fontSize: 13, width: 60, height: 25, borderRadius: 5 }}>编辑</Button>
                                        <Button type="primary" size="small" style={{ fontSize: 13, width: 60, height: 25, borderRadius: 5 }}>删除</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>< Checkbox /></td>
                                    <td>1</td>
                                    <td><img src={jiding} alt="菜品" /></td>
                                    <td>宫保鸡丁</td>
                                    <td style={{ padding: "0 5px", textAlign: "left", textIndent: '1em' }}> 宫保鸡丁（Kung Pao Chicken），是一道闻名中外的特色传统名菜。鲁菜、川菜、贵州菜中都有收录，原料、做法有差别。</td>
                                    <td>￥50</td>
                                    <td>
                                        <p><span style={{ paddingRight: 15 }}>热销:</span> <Switch size="default" /></p>
                                        <p><span style={{ paddingRight: 15 }}>新品:</span><Switch size="default" /></p>
                                        <p><span style={{ paddingRight: 15 }}>优惠:</span><Switch size="default" /></p>
                                    </td>
                                    <td>
                                        <Button type="primary" size="small" style={{ marginRight: 10, fontSize: 13, width: 60, height: 25, borderRadius: 5 }}>编辑</Button>
                                        <Button type="primary" size="small" style={{ fontSize: 13, width: 60, height: 25, borderRadius: 5 }}>删除</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>< Checkbox /></td>
                                    <td>1</td>
                                    <td><img src={jiding} alt="菜品" /></td>
                                    <td>宫保鸡丁</td>
                                    <td style={{ padding: "0 5px", textAlign: "left", textIndent: '1em' }}> 宫保鸡丁（Kung Pao Chicken），是一道闻名中外的特色传统名菜。鲁菜、川菜、贵州菜中都有收录，原料、做法有差别。</td>
                                    <td>￥50</td>
                                    <td>
                                        <p><span style={{ paddingRight: 15 }}>热销:</span> <Switch size="default" /></p>
                                        <p><span style={{ paddingRight: 15 }}>新品:</span><Switch size="default" /></p>
                                        <p><span style={{ paddingRight: 15 }}>优惠:</span><Switch size="default" /></p>
                                    </td>
                                    <td>
                                        <Button type="primary" size="small" style={{ marginRight: 10, fontSize: 13, width: 60, height: 25, borderRadius: 5 }}>编辑</Button>
                                        <Button type="primary" size="small" style={{ fontSize: 13, width: 60, height: 25, borderRadius: 5 }}>删除</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>< Checkbox /></td>
                                    <td>1</td>
                                    <td><img src={jiding} alt="菜品" /></td>
                                    <td>宫保鸡丁</td>
                                    <td style={{ padding: "0 5px", textAlign: "left", textIndent: '1em' }}> 宫保鸡丁（Kung Pao Chicken），是一道闻名中外的特色传统名菜。鲁菜、川菜、贵州菜中都有收录，原料、做法有差别。</td>
                                    <td>￥50</td>
                                    <td>
                                        <p><span style={{ paddingRight: 15 }}>热销:</span> <Switch size="default" /></p>
                                        <p><span style={{ paddingRight: 15 }}>新品:</span><Switch size="default" /></p>
                                        <p><span style={{ paddingRight: 15 }}>优惠:</span><Switch size="default" /></p>
                                    </td>
                                    <td>
                                        <Button type="primary" size="small" style={{ marginRight: 10, fontSize: 13, width: 60, height: 25, borderRadius: 5 }}>编辑</Button>
                                        <Button type="primary" size="small" style={{ fontSize: 13, width: 60, height: 25, borderRadius: 5 }}>删除</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>< Checkbox /></td>
                                    <td>1</td>
                                    <td><img src={jiding} alt="菜品" /></td>
                                    <td>宫保鸡丁</td>
                                    <td style={{ padding: "0 5px", textAlign: "left", textIndent: '1em' }}> 宫保鸡丁（Kung Pao Chicken），是一道闻名中外的特色传统名菜。鲁菜、川菜、贵州菜中都有收录，原料、做法有差别。</td>
                                    <td>￥50</td>
                                    <td>
                                        <p><span style={{ paddingRight: 15 }}>热销:</span> <Switch size="default" /></p>
                                        <p><span style={{ paddingRight: 15 }}>新品:</span><Switch size="default" /></p>
                                        <p><span style={{ paddingRight: 15 }}>优惠:</span><Switch size="default" /></p>
                                    </td>
                                    <td>
                                        <Button type="primary" size="small" style={{ marginRight: 10, fontSize: 13, width: 60, height: 25, borderRadius: 5 }}>编辑</Button>
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
export default withRouter(connect(
    state => { return { data: state.foodData } },//将redux变量赋值到组件,成组件变量Data
    dispatch => bindActionCreators(actionCreators, dispatch))(Temp))