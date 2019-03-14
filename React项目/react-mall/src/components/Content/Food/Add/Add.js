import React, { Component } from 'react'
import "./Step/Add.less";
import { Steps, Button, message, Form, Modal } from 'antd';
import { withRouter } from 'react-router-dom';
import StepOne from './Step/StepOne';
import StepTwo from './Step/StepTwo';
import StepThree from './Step/StepThree';

const confirm = Modal.confirm;
const Step = Steps.Step;
const success = () => {
    message.success('The information is changed');
};
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
    constructor(props) {
        super(props)
        this.state = {
            current: 0,
            categoryName: null,
            storeData: {
                activityTag: "",
                categoryName: "主食",
                currentPrice: 13,
                spuName: "酱油炒饭",
                unit: "份",

                activityStock: 0,
                originPrice: 13,
                realStock: 999,
                saleVolume: 40,
                url: undefined,
                折扣: false,
                推荐: false,
                热销: false,

                count: 0,
                praiseNum: 0,
                saleVolume: 40,
                spuDesc: "",
            }
        };
    }
    next() {//下一页
        const current = this.state.current + 1;
        this.setState({ current })
    }
    prev() {//上一页
        const current = this.state.current - 1;
        this.setState({ current })//回调函数
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
            this.setState({
                storeData
            })
            this.next()
        });
    };
    

    showConfirm() { //最后验证，前端验证后发给后端，进行请求
        // 先获取修改后的数值,在判断是否修改数据库
        // let storeData = Object.assign({}, this.state.storeData, this.props.form.getFieldsValue())
        // this.setState({
        //     storeData
        // })
        confirm({
            wrapClassName: '提示',
            title: '提示:',
            content: '是否提交数据',
            okText: '确认',
            cancelText: '取消',
            icon: "info-circle",
            bodyStyle: {
                ".ant-modal-confirm-btns": { marginTop: 0 }
            },
            onOk: async () => { // 箭头函数解决this
              
                    // await fetch(`http://localhost:2000/pers?act=editFood&&num=${this.state.storeData.spuId}`,
                    //     {
                    //         method: 'POST',
                    //         // mode: 'cors',
                    //         // credentials: 'include', // cookie
                    //         headers: {
                    //             'Content-Type': 'application/json'
                    //         },
                    //         body: JSON.stringify(this.state.storeData)
                    //     }
                    // )
                    //     .then(res => res.json())
                    //     .then(
                    //         data => {
                    //             success()
                    //         })
               
                // this.props.history.push({  //退回到列表页
                //     pathname: "/food/list",
                // });
            },
             
        })
    }
    selest(params) {   //控制步骤条对应内容
        if (this.state.storeData) {
            // console.log(this.state.storeData)
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
                        style={{ textAlign: "center",marginTop:10 }}>
                        {
                            current > 0
                            && (
                                <Button
                                    style={{
                                        textAlign: "left",
                                        marginRight: 30
                                    }}
                                    onClick={() => this.prev()}>
                                    上一步，{steps[current-1].title}
                                </Button>
                            )
                        }
                        {
                            current === steps.length - 1
                            && <Button
                                style={{}}
                                type="primary"
                                onClick={this.showConfirm.bind(this)}
                            >完成，提交菜品</Button>
                        }
                        {
                            current < steps.length - 1
                            && <Button
                                type="primary"
                                style={{
                                    margin: "0 auto",
                                    textAlign: "right",
                                }}
                                onClick={(e) => {
                                    this.handleSubmit(e)
                                }}>下一步，{steps[current+1].title}</Button>// 下一步，填写商品信息
                        }

                    </div>
                </div>
            </main>
        )
    }
}

const createForm = Form.create;
export default withRouter(createForm()(Temp))//将Form表单,通过props获取到各种方法