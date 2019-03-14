import React, { Component } from 'react'
import { Form, Input, Select, Upload, Icon, Modal, Switch, Radio, Rate } from 'antd';
import './Add.less';
const FormItem = Form.Item;
const TextArea = Input.TextArea;


export default class Temp extends Component {
  render() {
    const { getFieldProps, getFieldError, isFieldValidating, getFieldDecorator } = this.props.props.form;
    const formItemLayout = {//样式
      labelCol: { span: 7 },
      wrapperCol: { span: 12 },
    };
    const storeData = this.props.state.storeData;
    const textareaProps = getFieldProps('spuDesc', {//textarea 为ID
      initialValue: storeData.spuDesc,
    });
    return (
      <Form style={{ height: "315px" }}>
        <FormItem
          {...formItemLayout}
          label="菜品评价："
          style={{ lineHeight: "55px" }}
          className="rate"
        >
          {getFieldDecorator('count', {
            initialValue: storeData.count,
          })(
            <Rate disabled style={{ marginLeft: 20 }} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="菜品销售量："
        >
          {getFieldDecorator('saleVolume', {
            initialValue: storeData.saleVolume,
          })(
            <Input disabled />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="菜品赞数统计："
        >
          {getFieldDecorator('praiseNum', {
            initialValue: storeData.praiseNum,
          })(
            <Input disabled />
          )}
        </FormItem>

        <FormItem
          id="control-textarea"
          label="菜品备注："
          {...formItemLayout}
        >
          <TextArea
            {...textareaProps}
            placeholder="Please enter..."
            cols={45}
            rows={4}
          />
        </FormItem>
      </Form >
    )
  }
}

