import React, { PureComponent } from 'react';
import {
  AreaChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,Area
} from 'recharts';
import './Echart.less'

const data = [
  {
    date: '2018-02-21', '销售额': 2000, '订单': 70, 
  },
  {
    date: '2018-02-22', '销售额': 1700, '订单': 58, 
  },
  {
    date: '2018-02-23', '销售额': 1680, '订单': 80,
  },
  {
    date: '2018-02-24', '销售额': 2780, '订单': 98, 
  },
  {
    date: '2018-02-25', '销售额': 1790, '订单': 138, 
  },
  {
    date: '2018-02-26', '销售额': 2490, '订单': 99, 
  },
  {
    date: '2018-02-27', '销售额': 1870, '订单': 80, 
  }
];
 

export default class Example extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/zjb47e83/';

  render() {
    return (                               
      <AreaChart width={630} height={350} data={data}
        margin={{ top: 70, right: 10, left: 0, bottom: 30 }}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <XAxis dataKey="date" />
        {/* <YAxis yAxisId="left" scale={scale}/> */}
        <YAxis  yAxisId="left" dataKey="销售额" />
        <YAxis yAxisId="right" orientation="right" dataKey="订单"/>
        {/* <YAxis yAxisId="right" orientation="right" scale={scale}/> */}
        <CartesianGrid strokeDasharray="3 3"   />
        <Tooltip />
        <Legend style={{fontSize:20}}/>
        <Area  yAxisId="left"  type="monotone" dataKey="销售额" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" type="monotone"  activeDot={{ r: 5 }}/>
        <Area yAxisId="right" type="monotone" dataKey="订单" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" type="monotone" activeDot={{ r: 5 }} />
      </AreaChart>
    );
  }
}


