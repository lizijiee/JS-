import React, { Component } from 'react'
import "./Step/Add.less";
import { Steps, Button, message, Form } from 'antd';
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
            data: {comment: "",
            loading: "",
            name: "",
            price: "",
            promot: "",
            radioButton: "",
            select: "",
            switch1: false,
            switch2: false,
            textarea:  "",
            upload:""
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
        this.setState({ current }, 
            // function () {
            // 上述代码的第二个参数是一个回调函数，在setState() 的异步操作结束并且组件已经重新渲染的时候执行。
        // }
        )

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
            // console.log(values)
            //values 参数为当前表单所有Items内数值
            if (!!errors) {
                message.error('验证失败!')
                // console.log(this.state)
                return;
            }
            let data = Object.assign({}, this.state.data, this.props.form.getFieldsValue())
            console.log(data)
            this.setState({
                data: data
            })

            this.next()
        });
    };
    // componentWillReceiveProps() {
    //     console.log(this.props.form.getFieldsValue())
    // }
    selest(params) {
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
                                }}>下一步，{steps[current].title}</Button>
                            // 下一步，填写商品信息
                        }
                        {
                            current === steps.length - 1
                            && <Button
                                style={{ marginLeft: 450 }}
                                type="primary"
                                onClick={(e) => {
                                    message.success('Processing complete!')
                                    this.handleSubmit(e)
                                }
                                }>完成，提交菜品</Button>
                        }
                        {
                            current > 0
                            && (
                                <Button style={{ marginLeft: 8, position: "absolute", bottom: 0, left: 0 }} onClick={() => this.prev()}>
                                    Previous
                                </Button>
                            )
                        }
                    </div>
                </div>
            </main>
        )
    }

    componentWillUpdate() {
        console.log(this.state)
    }
    componentDidUpdate() {
        console.log(this.state)
    }
}

const createForm = Form.create;
Temp = createForm()(Temp);//将Form表单,通过props获取到各种方法
export default Temp