import React, { Component } from 'react'
import { Button, Pagination } from 'antd';
import IconFont from '../../../../iconfont/font'
import './Clerk.less'

export default class Temp extends Component {
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
                  <th>工号</th>
                  <th>姓名</th>
                  <th>性别</th>
                  <th>身份证号</th>
                  <th>出生年月</th>
                  <th>年龄</th>
                  <th>入职时间</th>
                  <th>职位</th>
                  <th>状态</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>王树奎</td>
                  <td>男</td>
                  <td>370883197708183034</td>
                  <td>1989/03/12</td>
                  <td>43</td>
                  <td>2000/05/12</td>
                  <td>厨师</td>
                  <td>在职</td>
                  <td>
                    <Button type="primary" size="small" style={{ marginRight: 10, fontSize: 13, width: 60, height: 25, borderRadius: 5 }}>编辑</Button>
                    <Button type="primary" size="small" style={{ fontSize: 13, width: 60, height: 25, borderRadius: 5 }}>删除</Button>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>王树奎</td>
                  <td>男</td>
                  <td>370883197708183034</td>
                  <td>1989/03/12</td>
                  <td>43</td>
                  <td>2000/05/12</td>
                  <td>厨师</td>
                  <td>在职</td>
                  <td>
                    <Button type="primary" size="small" style={{ marginRight: 10, fontSize: 13, width: 60, height: 25, borderRadius: 5 }}>编辑</Button>
                    <Button type="primary" size="small" style={{ fontSize: 13, width: 60, height: 25, borderRadius: 5 }}>删除</Button>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>王树奎</td>
                  <td>男</td>
                  <td>370883197708183034</td>
                  <td>1989/03/12</td>
                  <td>43</td>
                  <td>2000/05/12</td>
                  <td>厨师</td>
                  <td>在职</td>
                  <td>
                    <Button type="primary" size="small" style={{ marginRight: 10, fontSize: 13, width: 60, height: 25, borderRadius: 5 }}>编辑</Button>
                    <Button type="primary" size="small" style={{ fontSize: 13, width: 60, height: 25, borderRadius: 5 }}>删除</Button>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>王树奎</td>
                  <td>男</td>
                  <td>370883197708183034</td>
                  <td>1989/03/12</td>
                  <td>43</td>
                  <td>2000/05/12</td>
                  <td>厨师</td>
                  <td>在职</td>
                  <td>
                    <Button type="primary" size="small" style={{ marginRight: 10, fontSize: 13, width: 60, height: 25, borderRadius: 5 }}>编辑</Button>
                    <Button type="primary" size="small" style={{ fontSize: 13, width: 60, height: 25, borderRadius: 5 }}>删除</Button>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>王树奎</td>
                  <td>男</td>
                  <td>370883197708183034</td>
                  <td>1989/03/12</td>
                  <td>43</td>
                  <td>2000/05/12</td>
                  <td>厨师</td>
                  <td>在职</td>
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
