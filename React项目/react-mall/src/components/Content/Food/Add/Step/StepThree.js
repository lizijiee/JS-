import React, { Component } from 'react'
import { Form, Input, Select, Upload, Icon, Modal, Switch, Radio } from 'antd';
import './Add.less';
const FormItem = Form.Item;


export default class Temp extends Component {
  render() {
    const { getFieldProps, getFieldError, isFieldValidating, getFieldDecorator } = this.props.props.form;
    const formItemLayout = {//样式
      labelCol: { span: 7 },
      wrapperCol: { span: 12 },
    };
    const data = this.props.state.data;
    return (
      <Form >
        <Form.Item
          style={{ marginBottom: 30 }}
          {...formItemLayout}
          label="菜品推荐："
        >
          {getFieldDecorator('radioButton',{initialValue: data.radioButton})(
            <Radio.Group>
              <Radio.Button value="热销推荐">热销推荐</Radio.Button>
              <Radio.Button value="优惠推荐">优惠推荐</Radio.Button>
              <Radio.Button value="套餐推荐">套餐推荐</Radio.Button>
            </Radio.Group>
          )}
        </Form.Item>
        <FormItem
          id="control-textarea"
          label="菜品备注："
          style={{ marginBottom: 50 }}
          {...formItemLayout}
        >
         {getFieldDecorator('comment',{
           initialValue: data.comment}
         )(
          <textarea id="control-textarea" style={{
            borderRadius: 6, textAlign: "left", verticalAlign: "top", border: "1px solid #d9d9d9", fontSize: 14, lineHeight: "20px", textIndent: "1em"
          }}
            // {...priceProps}
            placeholder="Please enter..."
            cols="45"
            rows="4" />
            )}
        </FormItem>
      </Form >
    )
  }
}

