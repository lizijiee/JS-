import React, { Component } from 'react'
import "./Step/Add.less";
import { Steps, Button, message } from 'antd';
import StepOne from './Step/Step';
  
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

export default class Temp extends Component {
    constructor() {
        super()
        this.state = {
            current: 0,
        };
    }
    next() {
        const current = this.state.current + 1;
        this.setState({ current });
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }
    selest(params) {
        switch (params) {
            case 0:
                return <StepOne/> ;
                break;
            case 1:
                // return <StepTwo/> ;
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
                    <Steps current={current} >
                        {steps.map(item => <Step key={item.title} title={item.title} />
                        )}
                    </Steps>
                    <div className="form-wrap">
                    {/* 分步组件 */}
                          {this.selest(current)}     
                    </div>
                    <div className="steps-action">
                        {
                            current < steps.length - 1
                            && <Button type="primary" onClick={() => this.next()}>下一步，填写商品信息</Button>
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
