import React, { Component } from 'react'
import { Form, Input, Select, Upload, Icon, Modal, Switch, InputNumber, Row, Col } from 'antd';

import './Add.less';

const FormItem = Form.Item;
const Option = Select.Option;

export default class Temp extends Component {
  state = {
    previewVisible: false,//控制Modal是否显示（modal控制图片显示）
    fileList: [], //设置默认上传内容
  };
  handleCancel = () => this.setState({ previewVisible: false })
  componentDidMount() {
    console.log()
    const { spuId, spuName, bigImageUrl, littleImageUrl } = this.props.state.storeData
    this.setState({
      fileList: [{
        uid: "-" + spuId,
        name: spuName + '.png',
        status: 'done',
        url: littleImageUrl,
      }],
    }, () => {
      // console.log(this.state.fileList)
    })
  }

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({ fileList }) => this.setState({ fileList })


  render() {
    const { getFieldProps, getFieldError, isFieldValidating, getFieldDecorator } = this.props.props.form;
    const data = this.props.state.data;
    const storeData = this.props.state.storeData;
    const categoryTag = ["折扣", "热销", "推荐"]
    // const categoryFilter = Object.values(categoryName).filter((ele) => ele != "折扣" && ele != "热销" && ele != "推荐")

    const formItemLayout = {//样式
      labelCol: { span: 7 },
      wrapperCol: { span: 12 },
    };
    const buttonsLayout = {//样式
      labelCol: { span: 7 },
    };

    const countProps = getFieldProps('count', {//textarea 为ID
      initialValue: storeData.count, 
      rules: [{ pattern: new RegExp(/^\d(\.\d+)?$/, "g"), message: '请输入合理折扣数字' }]
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
        <Form.Item
          {...formItemLayout}
          layout="inline"
          label="推荐类型"
          style={{ fontSize: 15, color: "rgba(0, 0, 0, 0.9)" }}
        >
          {
            categoryTag.map((item, index) =>
              <Form.Item
                key={item}
                {...buttonsLayout}
                style={{
                  fontSize: 15, color: "rgba(0, 0, 0, 0.9)",
                  float: "left", overflow: "hiddden", width: 90, fontSize: 14,
                }}
              >
                {/* style={{display: (index===this.state.currentIndex) ? "block" : "none", color:"red"}}> */}
                <span style={{ marginLeft: (index === 0) ? 5 : null, marginRight: 8 }}>{item}</span>
                {getFieldDecorator('switch1', {
                  valuePropName: 'checked',
                  initialValue: storeData.categoryName===item
                })(
                  <Switch />
                )}
              </Form.Item>
            )
          }
        </Form.Item>

        <FormItem
          {...formItemLayout}
          label="菜品原价："
        >
          <InputNumber
            style={{ width: 320, fontSize: 13 }}
            placeholder="请输入菜品原价"
            {...countProps}
          />
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
          label="菜品库存："
          {...formItemLayout}
        >
          {/* require 代表前面的 * 符号 */}
          {getFieldDecorator('realStock', {
            initialValue: storeData.realStock,
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          label="当日库存："
          {...formItemLayout}
        >
          {/* require 代表前面的 * 符号 */}
          {getFieldDecorator('activityStock', {
            initialValue: storeData.activityStock,
          })(
            <Input />
          )}
        </FormItem>

        <FormItem
          label="菜品展示："
          style={{ marginBottom: -10 }}
          {...formItemLayout}
        >
          {getFieldDecorator('upload', {
            valuePropName: 'checked',
            initialValue: storeData.upload,
          })(
            <div className="clearfix">
              <Upload
                // action="//jsonplaceholder.typicode.com/posts/"
                listType="picture-card"
                fileList={fileList} //
                onPreview={this.handlePreview} //点击文件链接或预览图标时的回调
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

      </Form >
    )
  }

}

