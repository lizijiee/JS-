import React, { Component } from 'react'
import {
  Form, Select, InputNumber, Button, Input
} from 'antd';
import { Link, withRouter } from 'react-router-dom';
import './Edit.less';

const { Option } = Select;
const FormItem = Form.Item;
const ButtonGroup = Button.Group;
const title = ["姓名", "身份证号", "出生年月", "年龄", "入职时间", "职位"];

class Temp extends Component {
  handleReset(e) {
    //resetFields重置表单内容
    e.preventDefault();
    this.props.props.form.resetFields();
  };
  userExists(rule, value, callback) {
    //当做validator函数来用,用来作为判断条件
    if (!value) {
      callback();
    } else {
      setTimeout(() => {
        if (value === '宫爆鸡丁') {
          callback([new Error('抱歉，该菜名已被占用。')]);
        } else {
          callback();
        }
      }, 800);
    }
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }
  render() {
    let arr = Object.keys(this.props.location.state[0])
    let TempArr = arr.filter((currentValue, index) => currentValue != "num" && currentValue != "sex" && currentValue != "state")

    console.log(this.props.location.state[0])//数据
    
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
                  <Option value="在职">在职</Option>
                  <Option value="离职">离职</Option>
                </Select>
              )}
            </FormItem>

            <FormItem
              label="性别:"
              {...formItemLayout}
              required
            >
              {getFieldDecorator("sex", {
                initialValue: this.props.location.state[0].sex
              })(
                <Select
                >
                  <Option value="男">男</Option>
                  <Option value="女">女</Option>
                  <Option value="Other" disabled>你还想选啥,变态</Option>
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
                    rules: [
                      { required: true, min: 1, message: '输入内容至少为 1 个字符' },
                      { validator: this.userExists.bind(this) }
                    ]
                  })(
                    <Input />
                  )}
              </FormItem>
            )}
            <FormItem>
              <Button
                ghost="true"
                style={{ marginRight: 10, fontSize: 13, borderRadius: 5 }}
                type="primary">
                21321</Button>
            </FormItem>
            <FormItem> <Button type="primary">21321</Button> </FormItem>
          </Form >
        </div>
      </section>
    )
  }
}
const WrappedDemo = Form.create({ name: 'validate_other' })(Temp);

export default withRouter(WrappedDemo)
// export default Temp