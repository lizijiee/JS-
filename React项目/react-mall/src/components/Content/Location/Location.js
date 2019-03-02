import React, { Component } from 'react'
import './Location.less';
import ImgUrl from './pic.jpg';
// const anim = require('css-animation');
// anim(el,animationName,function(){});
import "animate.css"
export default class componentName extends Component {
    render() {
        // console.log(anim)
        return (
            <section className="location">
                {/*   员工信息组件  */}
                <div className="wrap">
                     <span  className="flash"><a href="https://github.com/lizijiee/JS-/tree/master/%E4%BD%9C%E5%93%81/mall" target=
                     "_blank"> 项目地址</a></span>
                    <p >
                        <img src={ImgUrl}  />
                    </p>
                    <p>项目为第一个React后台管理项目，后期有时间会</p>
                    <p>陆续将自己学习路上的demo放置上去以供参考，欢迎来到我的github逛逛。</p>
                    <p>谢谢观看~</p>
                </div>
            </section>
        )
    }
}
