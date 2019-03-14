import React, { Component } from 'react';
import { Button, Form, Input, Select, InputNumber } from 'antd';
import './Add.less';


const FormItem = Form.Item;
const Option = Select.Option;
const ButtonGroup = Button.Group;
const TextArea = Input.TextArea;

/* 
    antd 表单使用
    resetFields() 重置表单内数据

    getFieldsValue(["name"],).name  校验并获取一组输入域的值与 Error(用于提交之前)
    name为ID也为Key值，函数返回值为对象
    前两个参数都为数组， [fieldNames: string[]], [options: object] 

     validateFieldsAndScroll(["name"])//直接调用就可以	  参考 validateFields
     如果校验不通过的菜单域不在可见范围内，则自动滚动进可见范围（建议用在Submit）

     isFieldValidating	判断一个输入控件是否在校验状态（可以扔到help里面）
     两种报错方法 validateFields和rule中的min判断条件
     min默认为 name is require 使用message进行修改
*/
class StepOne extends Component {
  /*  constructor(props) {//传入的props需要在constructor接收一下
     super()
   } */
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

  
  render() {

    // 子组件不能修改，但是还需要数值改变！！！！怎样处理，直接在对象里面搞个数值太low了
    const { getFieldProps, getFieldError, isFieldValidating } = this.props.props.form;
    //--------------------------------需要-----------------------
    const nameProps = getFieldProps('spuName', { //第一个参数为ID,第二个为options
      rules: [
        { required: true, min: 1, message: '请输入菜品名称' },
        { validator: this.userExists.bind(this) }
      ]
    });

    const selectProps = getFieldProps('categoryName', {//菜品类型
      rules: [{ required: true, message: '请选择菜品类型' }]
    });

    const priceProps = getFieldProps('currentPrice', {//textarea 为ID
      rules: [{ required: true, message: '请输入菜品销售价格' }]
    });
    const unitProps = getFieldProps('unit', {//textarea 为ID
      rules: [{ required: true, message: '请输入菜品单位' }]
    });

    const tagProps = getFieldProps('activityTag', {//textarea 为ID
    });
    const formItemLayout = {//样式
      labelCol: { span: 7 },
      wrapperCol: { span: 12 },
    };
    const categoryName=["热销","推荐","折扣"]
    return (
      <Form >
        <FormItem
          {...formItemLayout}
          label="菜品名称："
          hasFeedback
          help={isFieldValidating('spuName') ? '校验中...' : (getFieldError('spuName') || []).join(', ')}
        >
          <Input {...nameProps} placeholder=" 输入 宫爆鸡丁 看看"
          />
        </FormItem>

        <FormItem
          label="菜品类型："
          {...formItemLayout}
          required
        >
          <Select style={{ width: 200 }}
            {...selectProps}
          >
            {
              categoryName.map((item, index) => {
                return <Option value={item} key={item}>{item}</Option>
              })
            }
          </Select>
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="菜品销售价："
        >
          <InputNumber
            style={{ width: 320, fontSize: 13 }}
            placeholder="请输入菜品销售价格"
            {...priceProps}
          />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="菜品单位："
        >
          <Input
            style={{ width: 320, fontSize: 13 }}
            placeholder="请输入折扣"
            {...unitProps}
          />
        </FormItem>

        <FormItem
          id="control-textarea"
          label="菜品介绍："
          {...formItemLayout}
        >
          <TextArea
            {...tagProps}
            placeholder="Please enter..."
            // style={{marginBottom:50}}
            cols={45}
            rows={4}
          />
        </FormItem>

      </Form >

    );
  }
}

export default StepOne