import React, { Component } from 'react'
import { Form, Input, Select } from 'antd';

import './Add.less';

const FormItem = Form.Item;
const Option = Select.Option;

export default class Temp extends Component {


  render() {
    const { getFieldProps, getFieldError, isFieldValidating, getFieldDecorator } = this.props.props.form;

    const formItemLayout = {//样式
      labelCol: { span: 7 },
      wrapperCol: { span: 12 },
    };
    const selectProps = getFieldProps('promot');
    return (
      <Form >
        <FormItem
          {...formItemLayout}
          label="菜品名称："
        >
          {/* 给input设置名字和规则方法    之  其二 */}
          {getFieldDecorator('loading')(
            <Input />
          )}
        </FormItem>

        <FormItem
          label="菜品类型："
          {...formItemLayout}
          required
        >
          <Select style={{ width: 200 }}
            {...selectProps}
          >
            <Option value="新品">新品</Option>
            <Option value="热销">热销</Option>
            <Option value="买过">买过</Option>
            <Option value="优惠">优惠</Option>
            <Option value="套餐">套餐</Option>
            <Option value="为您优选">为您优选</Option>
          </Select>
        </FormItem>

      </Form >
    )
  }
}

