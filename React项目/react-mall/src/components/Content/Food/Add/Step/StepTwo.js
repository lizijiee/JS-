import React, { Component } from 'react'
import { Form, Input, Select, Upload, Icon, Modal, Switch, Radio } from 'antd';

import './Add.less';

const FormItem = Form.Item;
const Option = Select.Option;

export default class Temp extends Component {
  state = {
    previewVisible: false,//控制Modal是否显示（modal控制图片显示）
    fileList: [], //设置默认上传内容
  };
  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({ fileList }) => this.setState({ fileList })


  render() {
    const { getFieldProps, getFieldError, isFieldValidating, getFieldDecorator } = this.props.props.form;
    const formItemLayout = {//样式
      labelCol: { span: 7 },
      wrapperCol: { span: 12 },
    };
    const data = this.props.state.data;

    const selectProps = getFieldProps('promot', {
      initialValue: data.promot,
    });
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (//添加 控制 按钮
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <Form style={{ marginBottom: 40 }}>

        <FormItem
          {...formItemLayout}
          label="菜品名称："
        >
          {/* 给input设置名字和规则方法    之  其二 */}
          {getFieldDecorator('loading', {
            initialValue: data.loading,
          })(
            <Input />
          )}
        </FormItem>

        <FormItem
          label="菜品类型："
          {...formItemLayout}
        >
          {/* require 代表前面的 * 符号 */}
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

        <FormItem
          label="菜品展示："
          style={{ marginBottom: -10 }}
          {...formItemLayout}
        >
          {getFieldDecorator('upload', {
            valuePropName: 'checked',
            initialValue: data.upload,
          })(
            <div className="clearfix">
              <Upload
                action="//jsonplaceholder.typicode.com/posts/"
                listType="picture-card"
                fileList={fileList} //
                onPreview={this.handlePreview}//点击文件链接或预览图标时的回调
                onChange={this.handleChange}
              >
                {fileList.length >= 1 ? null : uploadButton}
              </Upload>
              <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
              </Modal>
            </div>
          )}
        </FormItem>

        <Form.Item
          {...formItemLayout}
          label="推荐类型："
          style={{ fontSize: 15, color: "rgba(0, 0, 0, 0.9)" }}
        >
          新品：
           {getFieldDecorator('switch1', { valuePropName: 'checked', initialValue: data.switch1 })(
            <Switch style={{ marginRight: 10 }} />
          )}
           热销：
        </Form.Item>

        <Form.Item
          style={{ fontSize: 15, color: "rgba(0, 0, 0, 0.9)", position: "relative" }}
        >
       
          {getFieldDecorator('switch2', { valuePropName: 'checked', initialValue: data.switch2 })(
            <Switch style={{ position: "absolute", left:320, bottom: 30 }} />
          )}
        </Form.Item>
      </Form >
    )
  }

}

