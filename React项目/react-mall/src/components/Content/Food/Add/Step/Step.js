import React, { Component } from 'react';
import { Button, Form, Input, Select, InputNumber } from 'antd';
import './Add.less';


const FormItem = Form.Item;
const Option = Select.Option;
const ButtonGroup = Button.Group;

 
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
  constructor() {//传入的props需要在constructor接收一下
    super()
  }
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

  componentDidMount(){
     // this.props.onRef(this)
  }
  // componentWillReceiveProps() {
  // console.log(this.props.form.getFieldError("name"))
  //返回值     ["输入1时显示报错"]
  //          ["菜品名至少为 1个字符"]  message 
  // };
  render() {
      const { getFieldProps, getFieldError, isFieldValidating } = this.props.props.form; 
    //--------------------------------需要-----------------------
    const nameProps = getFieldProps('name', { //第一个参数为ID,第二个为options
      /* 
      getFieldProps options 
      */
      rules: [
        { required: true, min: 1, message: '菜品名至少为 1 个字符' },
        { validator: this.userExists.bind(this) },
        ,
        //  {
        //    -------添加另外限制条件------------
        //   validator(rule, value, callback, source, options) {
        //     var errors = [];
        //     console.log(value, "Xx") 
        //     if (value == 1) {
        //       callback("输入1时显示报错");
        //     } else {
        //       callback();
        //       //  成功后显示在页面上的值
        //       //  ["菜品名至少为 1 个字符", 22222]
        //     }
        //   }
        // }
      ]
    });

    
   const selectProps = getFieldProps('select', {
      rules: [
        { required: true, message: '请选择菜品类型' },
      ],
    }); 
   


    const textareaProps = getFieldProps('textarea', {//textarea 为ID
      // rules: [//判断条件
      //   {  message: '输入内容不能为空' },
      // ],
    });
    const priceProps = getFieldProps('price', {//textarea 为ID
      // rules: [//判断条件
      //   {  message: '输入内容不能为空' },
      // ],
    });
    
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
          help={isFieldValidating('name') ? '校验中...' : (getFieldError('name') || []).join(', ')}
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
            <Option value="特色汤面">特色汤面</Option>
            <Option value="酒水饮料">酒水饮料</Option>
            <Option value="烧烤系列">烧烤系列</Option>
            <Option value="美味盖饭">美味盖饭</Option>
            <Option value="小吃，肉夹馍">小吃，肉夹馍</Option>
            <Option value="海鲜" disabled>海鲜</Option>
          </Select>
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="菜品价格："
        >
         {/*
          给input设置名字和规则方法    之  其二
         {getFieldDecorator('note', {
            rules: [{ required: true, message: 'Please input your note!' }],
          })(
            <Input />
          )} */}
          <InputNumber
            style={{ width: 320 }}
            type="textarea"
            // placeholder="菜品名称"
            id="price"
            name="price"
            {...textareaProps}
          />
        </FormItem>

        <FormItem
          id="control-textarea"
          label="菜品介绍："
          {...formItemLayout}
        >
            <textarea id="control-textarea" style={{
            borderRadius: 6, textAlign: "left", verticalAlign: "top", border: "1px solid #d9d9d9", fontSize: 14, lineHeight: "20px", textIndent: "1em"
          }} 
          {...priceProps}
          placeholder="Please enter..." 
          cols="45" 
          rows="4"/>
         </FormItem>

        <ButtonGroup style={{ borderRadius: 15,marginTop: 30}}>
          <Button 
          onClick={this.handleReset.bind(this)} 
          style={{ marginLeft: 400 }}>Reset</Button>
        </ButtonGroup>
      </Form>

    );
  }
}

export default StepOne