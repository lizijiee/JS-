import React, { Component } from 'react'
import "./Step/Add.less";
import { Steps, Button, message, Form } from 'antd';
import { withRouter } from 'react-router-dom';
import StepOne from './Step/StepOne';
import StepTwo from './Step/StepTwo';
import StepThree from './Step/StepThree';

const Step = Steps.Step;
const steps = [{
    title: '填写菜品信息',
    content: '填写商品信息',
}, {
    title: '填写菜品促销',
    content: 'Second-content',
}, {
    title: '填写商品属性',
    content: 'Last-content',
}];

class Temp extends Component {
    constructor() {
        super()
        
        this.state = {
            current: 0,
            storeData:null,
            categoryName:null,
            data: {
                comment: "",
                loading: "",
                name: "",
                price: "",
                promot: "",
                radioButton: "",
                select: "",
                switch1: false,
                switch2: false,
                textarea: "",
                upload: ""
            }
        };
    }
    next() {
        const current = this.state.current + 1;
        this.setState({ current })
        setTimeout(() => {
            // this.props.form.setFieldsValue(this.state.data)
        }, 2000);
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({ current })//回调函数

    }
   async  componentDidMount(){
      await  this.setState({
            storeData:this.props.location.state.ele,
            categoryName:this.props.location.state.categoryName
        })

 
      // this.props.form.setFieldsValue( this.state.data) 
     }

    handleSubmit(e) {
        // 表单内容提交组件,校验并获取一组输入域的值与 Error;
        // 获取编辑后内容判断是否有变化没有有变化发出请求;
        // 修改数据库,更新redux; (重新获取数据);

          this.props.form.validateFields((errors, values) => {
              if (!!errors) {
                message.error('验证失败!')
                return;
            }
            let storeData = Object.assign({}, this.state.storeData, this.props.form.getFieldsValue())
            console.log(this.props.form.getFieldsValue())
            this.setState({
                storeData
            },()=>{
                // console.log(this.state.storeData)
            })
            this.next()
        });
    };
 
    selest(params) {   //控制步骤条对应内容
         if(this.state.storeData){
            console.log(this.state.storeData)
            switch (params) {
                case 0:
                    return <StepOne props={this.props} handleSubmit={this.handleSubmit} state={this.state} />;
                    break;
                case 1:
                    return <StepTwo props={this.props} state={this.state} />;
                    break;
                case 2:
                    return <StepThree props={this.props} state={this.state} />;
                    break;
            }
        }
        
    }

    render() {
         const { current } = this.state;
       
        return (
            <main className="food-add">
                <div className="food-add-wrap">
                    <Steps current={current}   >
                        {steps.map(item => <Step key={item.title} title={item.title} />
                        )}
                    </Steps>
                    <div className="form-wrap">
                        {/* 分步组件 */}
                        {this.selest(current)}
                    </div>
                    <div className="steps-action" 
                    style={{  textAlign: "center" }}>
                       {
                            current > 0
                            && (
                                <Button 
                                style={{ 
                                  textAlign: "left",
                                  marginRight:30
                                }} 
                                onClick={() => this.prev()}>
                                   上一步，{steps[current].title}
                                </Button>
                            )
                        }
                        {
                            current === steps.length - 1
                            && <Button
                                style={{  }}
                                type="primary"
                                onClick={(e) => {
                                    message.success('Processing complete!')
                                    this.handleSubmit(e)
                                }
                                }>完成，提交菜品</Button>
                        }
                          {
                            current < steps.length - 1
                            && <Button
                                type="primary"
                                style={{
                                    margin:"0 auto",
                                    textAlign: "right",
                                    // position: "absolute",
                                    // right: -15,
                                    // top: -32
                                }}
                                onClick={(e) => {
                                    this.handleSubmit(e)
                                }}>下一步，{steps[current].title}</Button>
                            // 下一步，填写商品信息
                        }
                       
                    </div>
                </div>
            </main>
        )
    }
}

const createForm = Form.create;
Temp = createForm()(Temp);//将Form表单,通过props获取到各种方法
export default withRouter(Temp)