import React, { Component } from 'react';
import './index.less' ;
import IconFont from '../../../iconfont/font';
import Echart from './Echarts/Echarts'
import { relative, isAbsolute } from 'path';
export default class Temp extends Component {
  render() {
    return (
        <div className="app-main">
        <div className="app-container">
             <div className="total-layout">
                <div className="total-frame">
                    <div>
                        <IconFont type="mall-doc" style={{fontSize:"23px"}}/>
                        <p className="total-title">今日订单总数</p>
                        <p className="total-value">200</p>
                    </div>
                </div>
                <div className="total-frame">
                    <div>
                    <IconFont type="mall-sale" style={{fontSize:"20px"}}/>
                        <p className="total-title">今日销售总额</p>
                        <p className="total-value">￥5000.00</p>

                    </div>
                </div>
                <div className="total-frame">
                    <div>
                    <IconFont type="mall-money" style={{color:"red",fontSize:"25px"}}/>
                        <p className="total-title">昨日销售总额</p>
                        <p className="total-value">￥1000.00</p>

                    </div>
                </div>
                <div className="total-frame">
                    <div>
                    <IconFont type="mall-dollar" style={{fontSize:"25px"}}/>
                        <p className="total-title">近七天销售总额</p>
                        <p className="total-value">￥15000.00</p>

                    </div>
                </div>
            </div>
            <div className="un-handle-layout">
                <div className="layout-title">待处理事务</div>
                <ul className="un-handle-content">
                    <li className="el-row" 
                    style={{marginLeft: "-10px",marginLright: "-10px"}}>
                        <div className="un-handle-item-warpper">
                            <p className="un-handle-item">
                                <span className="item-content">待付款订单</span>
                                <span 
                                style={{float:"right" }}className="color-danger">(10)</span>
                            </p>
                        </div>
                        <div className="un-handle-item-warpper">
                            <p className="un-handle-item">
                                <span className="item-content">已完成订单</span>
                                <span 
                                style={{float:"right" }}
                                className="color-danger">(10)</span>
                            </p>
                        </div>
                        <div className="un-handle-item-warpper">
                            <p className="un-handle-item">
                                <span className="item-content">待确认收货订单</span>
                                <span 
                                 style={{float:"right" }}className="color-danger">(10)</span>

                            </p>
                        </div>
                    </li>
                    <li className="el-row" 
                      style={{marginLeft:"right",marginRight:"-10px" }}>
                        <div className="un-handle-item-warpper">
                            <p className="un-handle-item">
                                <span className="item-content">待发货订单</span>
                                <span 
                                style={{float:"right"}}className="color-danger">(10)</span>

                            </p>
                        </div>
                        <div className="un-handle-item-warpper">
                            <p className="un-handle-item">
                                <span className="item-content">新缺货登记</span>
                                <span 
                                style={{float:"right"}} className="color-danger">(10)</span>

                            </p>
                        </div>
                        <div className="un-handle-item-warpper">
                            <p className="un-handle-item">
                                <span className="item-content">待处理退款申请</span>
                                <span 
                                style={{float:"right"}} className="color-danger">(10)</span>

                            </p>
                        </div>
                    </li>
                    <li className="el-row" 
                    style={{marginLeft:"right",marginRight:"-10px"}}>
                        <div className="un-handle-item-warpper">
                            <p className="un-handle-item">
                                <span className="item-content">广告位即将到期</span>
                                <span 
                                style={{float:"right"}} className="color-danger">(10)</span>
                            </p>
                        </div>
                        <div className="un-handle-item-warpper">
                            <p className="un-handle-item">
                                <span className="item-content">待处理退货订单</span>
                                <span 
                                 style={{float:"right"}}  className="color-danger">(10)</span>

                            </p>
                        </div>
                        <div className="un-handle-item-warpper">
                            <p className="un-handle-item">
                                <span className="item-content">广告位即将到期</span>
                                <span 
                                 style={{float:"right"}}  className="color-danger">(10)</span>
                            </p>
                        </div>
                    </li>

                </ul>
            </div>
            <div className="overview-layout">
                <div className="overview-warpper">
                    <div data-v-0a30ac15="" className="layout-title">商品总览</div>
                    <div className="layout-content" style={{padding:" 40px"}}>
                        <ul className="el-row">
                            <li>100</li>
                            <li>400</li>
                            <li>50</li>
                            <li>500</li>
                        </ul>
                        <ul className="el-row black-color">
                            <li>已下架</li>
                            <li>已上架</li>
                            <li>库存紧张</li>
                            <li>全部商品
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="overview-warpper">
                        <div  className="layout-title">用户总览</div>
                        <div className="layout-content" style={{padding:" 40px"}}>
                            <ul className="el-row">
                                <li>100</li>
                                <li>200</li>
                                <li>1000</li>
                                <li>500</li>
                            </ul>
                            <ul className="el-row black-color">
                                <li>今日新增</li>
                                <li>昨日新增</li>
                                <li>本月新增</li>
                                <li>会员总数</li>
                            </ul>
                        </div>
                    </div>
            </div>
            <div className="statistics-layout">
               <div className="layout-title">订单统计</div>
               <div className="el-row">
               <div className="el-col" style={{width:"180px",borderRight:"1px solid #dcdfe6",padding:20}}>
                <ul className="order-sum">
                   <li className="order-item" style={{ marginTop:0}} >
                       <p>本月订单合计</p>
                       <p>3400</p>
                       <p>
                       <span>+10% </span>
                       <span>同比上月</span>
                       </p>
                   </li>
                   <li className="order-item" >
                       <p>本月订单合计</p>
                       <p>3400</p>
                       <p>
                       <span>+10% </span>
                       <span>同比上月</span>
                       </p>
                   </li>
                   <li className="order-item" >
                       <p>本月订单合计</p>
                       <p>3400</p>
                       <p>
                       <span>+10% </span>
                       <span>同比上月</span>
                       </p>
                   </li>
               </ul>
               </div> 
               <div className="el-col" style={{position:"relative"}}>
                 <Echart />
               </div>
               </div>
            </div>
        </div>
        
    </div>
    )
  }
}

 
 

