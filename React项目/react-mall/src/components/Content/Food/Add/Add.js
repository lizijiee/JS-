import React, { Component } from 'react'
import "./Step/Add.less";
import { Steps, Button, message, Form } from 'antd';
import StepOne from './Step/Step';
import StepTwo from './Step/StepTwo';

const Step = Steps.Step;
const steps = [{
    title: '填写菜品信息',
    content: '填写商品信息',
}, {
    title: '填写菜品促销',
    content: 'Second-content',
}, {
    title: 'Finish',
    content: 'Last-content',
}];

class Temp extends Component {
    constructor() {
        super()
        this.state = {
            current: 0,
            data: {}
        };
    }
    next() {
        const current = this.state.current + 1;
        this.setState({ current });
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({current},function(){
            // 上述代码的第二个参数是一个回调函数，在setState() 的异步操作结束并且组件已经重新渲染的时候执行。
            this.props.form.setFieldsValue( this.state.data) 
        })
      }
    //  componentWillUnmounting(){
    //     console.log(11111111111111)
    //   // this.props.form.setFieldsValue( this.state.data) 
    //  }

    handleSubmit(e) {
        //表单内容提交组件,校验并获取一组输入域的值与 Error	
        // e.preventDefault();
        // console.log(this.props.form.getFieldError("name"))
        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                message.error('验证失败!')
                // console.log(this.state)
                return;
            }           
            //   let data = Object.assign({}, this.state.data, this.props.form.getFieldsValue())
            // this.setState(data)
            this.setState({
                 data:this.props.form.getFieldsValue()
            })
            console.log(this.state)
            this.next()
        });
    };
    // componentWillReceiveProps() {
    //     console.log(this.props.form.getFieldsValue())
    // }
    selest(params) {
        switch (params) {
            case 0:
                return <StepOne props={this.props} handleSubmit={this.handleSubmit} />;
                break;
            case 1:
                return <StepTwo props={this.props}/> ;
                break;
            case 2:
                // return <StepThree/> ;
                break;
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
                    <div className="steps-action" style={{ position: "relative" }}>
                        {
                            current < steps.length - 1
                            && <Button
                                type="primary"
                                style={{
                                    position: "absolute",
                                    right: -15,
                                    top: -32
                                }}
                                onClick={(e) => {
                                    this.handleSubmit(e)
                                }}>下一步，填写商品信息</Button>
                        }
                        {
                            current === steps.length - 1
                            && <Button type="primary" onClick={() => message.success('Processing complete!')}>Done</Button>
                        }
                        {
                            current > 0
                            && (
                                <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                                    Previous
                                </Button>
                            )
                        }
                    </div>
                </div>
            </main>
        )
    }
}

const createForm = Form.create;
Temp = createForm()(Temp);//将Form表单,通过props获取到各种方法
export default Temp