import React, { Component } from 'react'
import { Button, Pagination, Form, Modal, Input } from 'antd';
import IconFont from '../../../../iconfont/font';
import { Link, withRouter } from 'react-router-dom';
import './Clerk.less';

const FormItem = Form.Item;

class Temp extends Component {
  constructor() { //构造函数
    super();
    this.listItems = "";
    this.filterData = "";
    this.state = {
      data: '',
      listItems: '',
      current: 1,
      refresh: true,
      visible: false
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
  async EditClick(index, link) {
    // e.preventDefault();
    console.log(index);
    // pathname:'/pers/clerksDetails?num='+index,
    // state:this.state.data[0].ClerkData.filter(e=>e.num==index)
    // let vcode =[{aa:1}]
    await this.props.history.push({
      pathname: "/pers/clerksDetails",
      state: this.state.data[0].ClerkData.filter(e => e.num == index),
      search: '?num=' + index
    });
    // this.props.history.push('/pers/clerksDetails?num='+index);
    // this.props.history.push('/pers/clerksDetails?num='+index);
    // this.props.location.state=1111
    // console.log(this.props)
  }
  ClerksInfo(data) {
    if (data) {
      // 过滤例子： [32, 33, 16, 40].filter((a)=> a<40&a>20) 

      // 根据页码渲染当前页
      // 把数据length传入底部页码组件,一共几页根据组件内设置每页items数量,自动生成
      try {
        this.listItems = data[0].ClerkData.filter((e) =>
          e.num >= 1 + 5 * (this.state.current - 1) && e.num <= 5 * this.state.current
        ).map((ele) =>
          <tr key={ele.num} id={ele.num}>
            <td>{ele.num}</td>
            <td>{ele.name}</td>
            <td>{ele.sex}</td>
            <td>{ele.cardNum}</td>
            <td>{ele.age}</td>
            <td>{ele.birthday}</td>
            <td>{ele.hiredate}</td>
            <td>{ele.jobTitle}</td>
            <td>{ele.state}</td>
            <td>
              <Button
                type="primary"
                size="small"
                // href={`/pers/clerksDetails?num=${ele.num}`}
                ghost="true"
                onClick={this.EditClick.bind(this, ele.num)}
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
        return (<tbody>{this.listItems}</tbody>)
      } catch (error) {
        console.log(111111)
        this.listItems = data.map((ele) =>
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
                onClick={this.EditClick.bind(this, ele.num)}
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
        console.log(this.listItems)
        return (<tbody>{this.listItems}</tbody>)
      }

    }
  }
  componentWillMount() {
    //挂载前,请求数据函数
    this.getData();
  }
  ChangePage(page) {//<Pagination/>组件自带回调函数
    this.setState({ current: page }, () => { // 使用setState的 "回调函数" 解决异步问题
    })
    // setState为异步  上面console以后 => setState为异步 => 先执行下面console 

    // 解决this.setState可能会引发不必要的渲染(renders) 
    // https://www.cnblogs.com/lgp142332/p/7270047.html
  }
  /* 
     问题：首次render也符合return中的判断,导致不渲染了;

  shouldComponentUpdate(nextProps, nextState){ 
     解决this.setState可能引发不必要的渲染;
     导致初始render也不渲染了;

     return this.state.page !== nextState.page;
  } 
  */
  handleSearchClick(e) {
    /* 
      步骤：
         1. 获取input内的value数值;  let value=document.getElementById("indexName").value
         2. 使用filter把不符合条件的过滤掉,剩下符合条件内容;   this.state.data[0].ClerkData.filter((ele)=>ele.name==="李旭")
    */
    let value = document.getElementById("indexName").value
    this.filterData = this.state.data[0].ClerkData.filter((ele) => ele.name === value)
    // this.setState({data:filterData })
    this.ClerksInfo(this.filterData)
    console.log(this.filterData)//筛选完成后的数据
  }
  // --------------------   添加人员信息部分组件    ---------------------------
  addInfo(e) {
    e.preventDefault();
    this.setState({//控制modal
      visible: true,
    });

  }

  handleOk = (e) => {
    this.setState({
      visible: false,
    });
    console.log("使用回调函数向后台发送数据")
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  render() {
    let Page = null;
    let { data } = this.state;
    //表单部分
    const { getFieldProps, getFieldError, isFieldValidating, getFieldDecorator } = this.props.form;
    const title = ["姓名", "性别", "身份证号", "出生年月", "年龄", "入职时间", "职位", "状态"];
    const formItemLayout = {//样式
      // span是整体左移 pull是label左移   
      labelCol: {
        xs: { span: 24 },
        offset: 2,
        sm: { span: 6 }
      },//左侧 offset:3
      wrapperCol: { span: 10 },//input 长度控制
    };

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
              <Form>
                <div>
                  <IconFont type="mall-doc-glass" style={{ fontSize: 16, marginRight: 5 }} />
                  <span>筛选检索</span>
                  <Button className="btn" onClick={this.handleSearchClick.bind(this)}>查询结果</Button>
                </div>
                <div className="el-form-item">
                  <span>输入检索:</span>
                  <input type="text" placeholder="请输入姓名" id="indexName">
                  </input>
                </div>
              </Form>
            </div>
          </div>
          <div className="el-title">
            <div className="el-title-body">
              <IconFont type="mall-doc-list" style={{ fontSize: 16, marginRight: 5 }} />
              <span>数据列表</span>
              <button className="add" onClick={this.addInfo.bind(this)}>添加人员信息</button>
              <Modal
                title="店员信息添加"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
              ><Form>
                  {
                    title.map((ele, index) =>
                      <FormItem
                        {...formItemLayout}
                        key={index}
                        label={ele}
                        hasFeedback
                      >
                        {getFieldDecorator(title[index],
                          {
                            
                            rules: [{
                              required: true,
                              min: 1,
                              message: '输入内容至少为 1 个字符',
                              pattern: new RegExp(/.+/g),
                            }]
                          })(
                            <Input  placeholder={"请填写"+title[index]}/>
                          )}
                      </FormItem>
                    )
                  }</Form>

              </Modal>
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
              {this.ClerksInfo(this.state.data)}
            </table>
          </main>
          {Page}
        </div>
      </section>
    )
  }
}
const WrappedDemo = Form.create({ name: 'validate_other' })(Temp);

export default withRouter(WrappedDemo)
// export default Temp