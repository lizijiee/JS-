import React, { Component } from 'react';
import { Button, Form, Input } from 'antd';
import './Add.less';

const createForm = Form.create;
const FormItem = Form.Item;
function noop() {
  return false;
}
/* 
    antd 表单使用
    resetFields() 重置表单内数据

    getFieldsValue(["name"],).name  校验并获取一组输入域的值与 Error(用于提交之前)
    name为ID也为Key值，函数返回值为对象
    前两个参数都为数组， [fieldNames: string[]], [options: object] 

     validateFieldsAndScroll(["name"])//直接调用就可以	  参考 validateFields
     如果校验不通过的菜单域不在可见范围内，则自动滚动进可见范围（建议用在Submit）

     isFieldValidating	判断一个输入控件是否在校验状态（可以扔到help里面）
*/
class StepOne extends Component {
  constructor() {
    super()
  }
  handleReset(e) {
    //resetFields重置表单内容
    e.preventDefault();
    this.props.form.resetFields();
  };
  handleSubmit(e) {
    //表单内容提交组件,校验并获取一组输入域的值与 Error	
    e.preventDefault();
    console.log( this.props.form.getFieldError("name"))

    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!');
        return;
      }
      console.log('Submit!!!');
    });
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

  checkPass(rule, value, callback) {
    const { validateFields } = this.props.form;
    if (value) {
      validateFields(['rePasswd'], { force: true });
    }
    callback();
  };


  componentWillReceiveProps(){
    console.log(this.props.form.getFieldError())
  };
  render() {
    const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
    const nameProps = getFieldProps('name', { //第一个参数为ID,第二个为options
      /* 
      getFieldProps options 
      */
      rules: [
        { required: true, min: 1, message: '菜品名至少为 1 个字符', trigger: 'onblur' },
        { validator: this.userExists.bind(this) },
      ]
    });
    const textareaProps = getFieldProps('textarea', {
      rules: [
        { required: true,min: 1, message: '输入内容不能为空' },
      ],
    });
    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 12 },
    };
   

    return (
      <Form >
        <FormItem
          {...formItemLayout}
          label="菜品名称："
          hasFeedback
          help={isFieldValidating('name') ? '校验中...' : (getFieldError('name') || []).join(', ')}
        >
          <Input {...nameProps} placeholder=" 输入 宫爆鸡丁 看看" 
/>
        </FormItem>

        <FormItem
          {...formItemLayout}
           label="菜品类型："
        >
          <Input {...textareaProps} type="textarea" placeholder="菜品名称" id="textarea" name="textarea" />
        </FormItem>
        <Button onClick={this.handleReset.bind(this)} > Reset</Button >
        <Button onClick={this.handleSubmit.bind(this)}> Submit</Button >
      </Form>

    );


  }
}
StepOne = createForm()(StepOne);//将Form表单,通过props获取到各种方法


export default StepOne









// class StepTwo extends Component {
//   render() {
//     return (
//       <div className="stepTwo">
//         11111111111111111
//        </div>
//     )
//   }
// }
// class StepThree extends Component {
//   render() {
//     return (
//       <div className="stepThree">
//         22222222222222
//       </div>
//     )
//   }
// }
