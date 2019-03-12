import React, { Component } from 'react'
import { Button, Pagination, Form, Modal, Input, message } from 'antd';
import IconFont from '../../../../iconfont/font';
import { Link, withRouter } from 'react-router-dom';
import './Clerk.less';

const FormItem = Form.Item;

class Temp extends Component {
  constructor() { //构造函数
    super();
    this.listItems = ""; //  人员信息列表数据;
    this.filterData = "";  // 过滤后的数据;
    this.itemsName = " ";
    // From 表单渲染时候的英文;
    this.state = {
      data: '',
      storeData: "",
      current: 1,
      refresh: true,
      visible: false,
    }
  }
  getData() { //请求数据函数
    fetch(`http://localhost:2000/pers/clerks`, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(
        data => {
          this.setState({
            data: data.data,
            storeData: data.data
          })
        })
  }
  componentDidMount() {
    //挂载前,请求数据函数
    this.getData();
  }
   EditClick(index, link) {
    // e.preventDefault();
    console.log(index);
    // pathname:'/pers/clerksDetails?num='+index,
    // state:this.state.data[0].ClerkData.filter(e=>e.num==index)
    // let vcode =[{aa:1}]
     this.props.history.push({//将此条完整人员信息藏在state中
      pathname: "/pers/clerksDetails",
      state: this.state.data[0].ClerkData.filter(e => e.num == index),
      search: '?num=' + index
    });
    // this.props.history.push('/pers/clerksDetails?num='+index);
    // this.props.history.push('/pers/clerksDetails?num='+index);
    // this.props.location.state=1111
    // console.log(this.props)
  }
  renderFunc = (ele) => { //人员信息列表部分渲染;
    return (
      <tr key={ele.num} id={ele.num}>
        <td>{ele.num}</td>
        <td>{ele.name}</td>
        <td>{ele.sex}</td>
        <td>{ele.cardNum}</td>
        <td>{ele.birthday}</td>
        <td>{ele.age}</td>
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
            onClick={()=>{this.deleteInfo(ele.num)}}
            style={{ fontSize: 13, width: 60, height: 25, borderRadius: 5 }}
          >删除</Button>
        </td>
      </tr>)
  }
  ClerksInfo(data) {
    if (data) {
      // 过滤例子： [32, 33, 16, 40].filter((a)=> a<40&a>20) 
      // 根据页码渲染当前页
      // 对返回
      // 把数据length传入底部页码组件,一共几页根据组件内设置每页items数量,自动生成
      if (data[0].ClerkData.length === 1) {
        this.listItems = data[0].ClerkData.map(this.renderFunc)
      } else {
        // 如果为完整数据对数据进行筛选后显示;
        // 根据页码判断后结果,显示内容;
        this.listItems = data[0].ClerkData.filter((e,index) =>
        index >= 5 * (this.state.current - 1) && index < 5 * this.state.current
        ).map(this.renderFunc)
        if(!this.listItems.length){
          let temp= this.state.current*1
          this.setState({ current:temp-1 })
        }
      }
      return (<tbody >{this.listItems}</tbody>)
    }
  }
  ChangePage(page) {//<Pagination/>组件自带回调函数
    this.setState({ current: page })// 使用setState的 "回调函数" 解决异步问题

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
         0. 操作数据之前将数据存为两份一份进行操作(渲染组件),一份完整数据预留查找使用;
         1. 获取input内的value数值;  let value=document.getElementById("indexName").value;
         2. 使用filter把不符合条件的过滤掉,剩下符合条件内容;   this.state.data[0].ClerkData.filter((ele)=>ele.name==="李旭");
         3. 让母数据的ClerkData直接等于筛选后的子数据,解决渲染方法没法操作问题;
    */
    let value = document.getElementById("indexName").value.trim();
    let result = this.state.storeData[0].ClerkData.filter((ele) => ele.name === value)

    if (result.length) {
      let temp = JSON.parse(JSON.stringify(this.state.data));
      temp[0].ClerkData = result;
      this.setState({ data: temp }, () => {
        this.ClerksInfo(this.state.data)
        // console.log(this.state.data)
      })
    } else {
      this.error()
      this.getData()//如果结果不存在重新请求数据,也可以提前把数据存在
    }
    //筛选完成后的数据
  }
  // --------------------   添加人员信息部分组件    ---------------------------
  addInfo(e) {
    e.preventDefault();
    this.setState({//控制modal
      visible: true,
    });
  }
  deleteInfo(num) {
    let obj = { num };
    // console.log(JSON.stringify(obj))
    fetch(`http://localhost:2000/pers?act=deleteClerks`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
      }
    )
      .then(res => res.json())
      .then(data => {
        // 后台返回数据后页面是否渲染???
        this.setState({
          data: data.data,
          storeData: data.data
        })
      })

  }
  handleOk = (e) => {
    // 通过回调函数将前端表单内容发送到后台;
    //加上提交验证,组件自带方法
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {// 出现报错时判断函数
        message.error('Error!')
      } else {
        //验证成功,向后台发送数据;
        //向后台发送数据;
        fetch(`http://localhost:2000/pers?act=addClerks`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.props.form.getFieldsValue())
          }
        )
          .then(res => res.json())
          .then(data => {
            // 后台返回数据后页面是否渲染???
             this.setState({
              data: data.data,
              storeData: data.data
            })
          })
        // console.log(this.state)
        message.success('Successfully!')
        this.setState({
          visible: false,
        });

      }
    });

  }
  handleCancel = (e) => {
    e.preventDefault();
    this.setState({
      visible: false,
    });
  }
  error = () => {
    message.error("It doesn't exist !");
  };
  handleResetClick() {
    document.getElementById("indexName").value = ""
    this.setState({ current: 1 })
    
    this.getData()//如果结果不存在重新请求数据,也可以提前把数据存在
  }

  render() {
    let Page = null;
    let { data } = this.state;
    const {resetFields, getFieldDecorator } = this.props.form;
    //  --------------------    表单部分    ---------------
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
      //  底部页码组件
      Page = <Pagination
        defaultCurrent={1}
        pageSize={5}
        total={data[0].ClerkData.length}
        onChange={this.ChangePage.bind(this)}
        style={{
          marginRight: 30, marginTop: 25, float: "right"
        }} />

      //  目的给Form.Item 规范命名让其和数据key值相同
      //  获取所有key值,num渲染时候不需要num,使用时候给删除掉
    }
    const FormElement = function () {
      if (this.state.data) {
        let titleProps = { num: "工号", name: "姓名", sex: "性别", cardNum: "身份证号", birthday: "出生年月", age: "年龄", hiredate: "入职时间", jobTitle: "职位", state: "状态" }
        this.itemsName = Object.keys(titleProps).filter(e => e !== "num");
        return (
          <Form>
            {
              this.itemsName.map((ele, index) =>
                <FormItem
                  {...formItemLayout}
                  key={index}
                  label={titleProps[this.itemsName[index]]}
                  hasFeedback
                >
                  {getFieldDecorator(this.itemsName[index],
                    {
                      rules: [{
                        required: true,
                        min: 1,
                        message: '输入内容至少为 1 个字符',
                        pattern: new RegExp(/.+/g),
                      }]
                    })(
                      <Input placeholder={"......"} />
                    )}
                </FormItem>
              )
            }
          </Form>
        )
      }
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
                  <Button 
                  className="btn" 
                  onClick={()=>{this.handleSearchClick()}}
                  >查询结果</Button>
                  <Button
                    className="btn"
                    style={{ color: "#1890ff", marginRight: 20 }}
                    ghost
                    onClick={this.handleResetClick.bind(this)}
                  >重置</Button>
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
                afterClose={ () => resetFields()}
                title="店员信息添加"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
              >
               {/* 添加人员信息表单组件*/}
               {FormElement.bind(this)()}
              </Modal>
            </div>
          </div>
          <main className="table-container">
            <table cellPadding="0" cellSpacing="0" style={{width:"100%"}}>
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