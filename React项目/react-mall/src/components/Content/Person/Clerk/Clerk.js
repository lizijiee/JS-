import React, { Component } from 'react'
import { Button, Pagination } from 'antd';
import IconFont from '../../../../iconfont/font';
import { Link,withRouter} from 'react-router-dom';
import './Clerk.less';
import createHistory from "history/createBrowserHistory"
const history = createHistory()

 class Temp extends Component {
  constructor() { //构造函数
    super();
    this.state = {
      data: '',
      listItems: '',
      current: 1,
      // date:""
    }
  }
  getData() { //请求数据函数
    fetch(`http://localhost:2000/pers/clerks`, {
      method: 'GET'
    })
      .then(res => res.json()).then(
        data => {
          this.setState({ ...data })
        })
  }
async EditClick(index,link){
      // e.preventDefault();
      console.log(index);
         // pathname:'/pers/clerksDetails?num='+index,
        // state:this.state.data[0].ClerkData.filter(e=>e.num==index)
        // let vcode =[{aa:1}]
     await this.props.history.push({ 
          pathname: "/pers/clerksDetails", 
          state: this.state.data[0].ClerkData.filter(e=>e.num==index),
          search:'?num='+index
         });
      // this.props.history.push('/pers/clerksDetails?num='+index);
      // this.props.history.push('/pers/clerksDetails?num='+index);
      // this.props.location.state=1111
      // console.log(this.props)
  }
  ClerksInfo() {
    if (this.state.data) {
      console.log(this.state.data)
      // console.log(this.state.data[0].ClerkData.filter((e) =>
      //   e.num >= 1 + 5 * (this.state.current - 1) && e.num <= 5 * this.state.current
      // ))

      // [32, 33, 16, 40].filter((a)=> a<40&a>20)

      // this.setState({page:this.state.data[0].ClerkData.length})
      // this.setState({page:20});
      // console.log(this.state.page)
      this.state.listItems = this.state.data[0].ClerkData.filter((e) =>
        e.num >= 1 + 5 * (this.state.current - 1) && e.num <= 5 * this.state.current
      ).map((ele) =>
        <tr key={ele.num} id={ele.num}>
          <td>{ele.num}</td>
          <td>{ele.name}</td>
          <td>{ele.sex}</td>
          <td>{ele.cardNum}</td>
          <td>{ele.age}</td>
          <td>{ele.birthday}</td>
          <td>{ele.state}</td>
          <td>{ele.jobTitle}</td>
          <td>{ele.hiredate}</td>
          <td>
            <Button 
            type="primary" 
            size="small" 
            // href={`/pers/clerksDetails?num=${ele.num}`}
            ghost="true"
            onClick={this.EditClick.bind(this,ele.num)}
            style={{ marginRight: 10, fontSize: 13, width: 60, height: 25, borderRadius: 5 }}
            >
                 <span>编辑</span>
            </Button>
            <Button 
            type="primary" 
            size="small" 
            style={{ fontSize: 13, width: 60, height: 25, borderRadius: 5 }}
            >删除</Button>
          </td>
        </tr>)
      return (<tbody>{this.state.listItems}</tbody>)
    }
  }
  componentWillMount() {
    //挂载前,请求数据函数
    this.getData();
  }
  ChangePage(page) {//<Pagination/>组件自带回调函数
    this.setState({ current: page }, () => {
      // 使用setState的 "回调函数" 解决异步问题
     })
     // setState为异步  上面console以后 => setState为异步 => 先执行下面console 

    // 解决this.setState可能会引发不必要的渲染(renders) 
    // https://www.cnblogs.com/lgp142332/p/7270047.html
  }
  /* 
  //问题：首次render也符合return中的判断,导致不渲染了;
  shouldComponentUpdate(nextProps, nextState){ 
     //解决this.setState可能引发不必要的渲染;
     //导致初始render也不渲染了
     return this.state.page !== nextState.page;
  } 
  */
  render() {
     //分页组件提取出来，先进行一步数据是否获得到的判断，因为render渲染多次，前几次没有数据
    let Page = null;
    let { data } = this.state;
    if (data) {
        Page = <Pagination
        defaultCurrent={1}
        pageSize={5}
        total={data[0].ClerkData.length}
        onChange={this.ChangePage.bind(this)}
        style={{
          marginRight: 30, marginTop: 25, float: "right"
        }} />
    }
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
              {this.ClerksInfo()}
            </table>
          </main>
          {Page}
        </div>
      </section>
    )
  }
}
export default withRouter(Temp)
// export default Temp