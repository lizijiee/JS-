import React, { Component } from 'react'
import {Form,Input} from 'antd';

import  './Add.less';

const FormItem = Form.Item;

export default class Temp extends Component {
 

  render() {
    const { getFieldProps, getFieldError, isFieldValidating,getFieldDecorator} = this.props.props.form; 

    const formItemLayout = {//样式
      labelCol: { span: 7 },
      wrapperCol: { span: 12 },
    }; 

    return (
      <Form >
      <FormItem
        {...formItemLayout}
        label="菜品名称："
        hasFeedback
        help={isFieldValidating('loading') ? '校验中...' : (getFieldError('loading') || []).join(', ')}
      >
         
        {/* 给input设置名字和规则方法    之  其二 */}
       {getFieldDecorator('loading', {
          rules: [{ required: true, message: 'Please input your note!' }],
        })(
          <Input />
        )}
      </FormItem>
      </Form >
    )
  }
}

