import React, { Component } from 'react'
import {
  Form, Select, Modal, Button, Input, message
} from 'antd';
import { Link, withRouter } from 'react-router-dom';
import './Edit.less';

const { Option } = Select;
const confirm = Modal.confirm;
const FormItem = Form.Item;
const title = ["序号", "用户名", "密码","会员卡号","电话号码", "注册时间", "余额"];

const success = () => {
  message.success('The information is changed');
};

const error = () => {
  message.error('Operation fails');
};

class Temp extends Component {
  handlePageClick() {
    console.log(this.props.history.go(-1))
  }
  isObjectValueEqual(a, b) {
    //1.判断数据提交前后两对象value数值是否相等,
    //2.相等的话返回true,进行数据请求,不想等的话返回不相等的key和value新对象
    //3.取对象a和b的属性名
    let aProps = Object.keys(a);
    // let bProps = Object.keys(b);  a、b的key值相同
    //判断属性名的length是否一致
    //表单两次提交内容对比不需要对length进行判断

    //循环取出属性名，再判断属性值是否一致
    for (var i = 0; i < aProps.length; i++) {
      var propName = aProps[i];
      if (a[propName] + "" !== b[propName] + "") {
        //因为数据类型不一致所以转一下，不对数据类型进行判断
        return false;//如果进入这里下面return不会执行
      }
    }
    return true;
  }

  showConfirm() {
    confirm({
      wrapClassName: '提示',
      title: '提示:',
      content: '是否提交数据',
      okText: '确认',
      cancelText: '取消',
      icon: "info-circle",
      bodyStyle: {
        ".ant-modal-confirm-btns": { marginTop: 0 }
      },
      onOk: async () => { // 箭头函数解决this
        if (!this.isObjectValueEqual(this.props.form.getFieldsValue(), this.props.location.state[0])) {

          //表单内容修改后,进入判断。 
          //思路：把num=？ 传入后台在后台进行查找相应的内容  
          
          //post 请求发送body时请求头必须改为'Content-Type': 'application/json'
         
          // 请求默认为： Content-Type: application/x-www-form-urlencoded 
          // json中使用aplication请求头导致坑  { '{"state":"离职","jobTitle":"迎宾员"}': '' }
          await fetch(`http://localhost:2000/pers?act=editMember&&id=${this.props.location.state[0].num}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body:JSON.stringify(this.props.form.getFieldsValue())
          }
          )
            .then(res => res.json())
            .then(
              data => {
                // this.setState({ ...data })
                console.log(data)
              })
        } else { //进行修改直接跳转到列表页
          success();
        }
        this.props.history.push({  //退回到列表页
          pathname: "/pers/member",
        });
      },
    })
  }

  render() {
    //路由携带过来的数据

    //获取对象中的所有keys数值;
    let arr = Object.keys(this.props.location.state[0])
    //对所有keys数值进行过滤;
    let TempArr = arr.filter((currentValue, index) => currentValue != "state")
    
    const { getFieldProps, getFieldError, isFieldValidating, getFieldDecorator } = this.props.form;
    const formItemLayout = {//样式
      // span是整体左移 pull是label左移   
      labelCol: { span: 6, pull: 1 },//左侧 offset:3
      wrapperCol: { span: 10 },//input 长度控制
    };
    return (
      <section className="clerk-info">
        <div className="wrap">
          <Form >
            <FormItem
              label="状态:"
              {...formItemLayout}
              required
            >
              {getFieldDecorator("state", {
                initialValue: this.props.location.state[0].state
              })(
                <Select
                >
                  <Option value="正常">正常</Option>
                  <Option value="注销">注销</Option>
                </Select>
              )}
            </FormItem>

            {title.map((ele, index) =>
              <FormItem
                {...formItemLayout}
                key={index}
                label={ele}
                hasFeedback
                help={isFieldValidating(TempArr[index]) ? '校验中...' : (getFieldError(TempArr[index]) || []).join(', ')}
              >
                {getFieldDecorator(TempArr[index],
                  {
                    initialValue: this.props.location.state[0][TempArr[index]],
                    rules: [{
                      required: true,
                      min: 1,
                      message: '输入内容至少为 1 个字符',
                      pattern: new RegExp(/.+/g),
                      // { validator: this.userExists }
                    }]
                  })(
                    <Input />
                  )}
              </FormItem>
            )}
            <FormItem
              style={{
                display: "inline-block", marginRight: 10, marginTop: 10, marginLeft: 160
                , fontSize: 13, borderRadius: 5, textIndent: "100px"
              }}>
              <Button
                ghost="true"
                type="primary"
                onClick={this.handlePageClick.bind(this)}
              >
                返回</Button>
            </FormItem>
            <FormItem
              style={{ display: "inline-block", marginTop: 10 }}
            >
              <Button
                type="primary"
                htmlType="submit"
                style={{ display: "inline-block" }}
                onClick={this.showConfirm.bind(this)}
              >
                提交</Button>
            </FormItem>
          </Form >
        </div>
      </section>
    )
  }
}
const Demo = Form.create({ name: 'validate_other' })(Temp);

export default withRouter(Demo)
// export default Temp