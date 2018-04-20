import React, {Component} from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import sizeMe from 'react-sizeme';

const data = [
    {name: 'Building Energy (建筑能源)', "Impact (指标影响)": 24,},
    {name: 'Mobility Energy (移动能源)', "Impact (指标影响)": 13,},
    {name: 'Innovation Potential (创新潜力)', "Impact (指标影响)": 98,},
    {name: 'Safety & Security (安全和保障)', "Impact (指标影响)": 39,},
    {name: 'Social Wellbeing (社会福利)', "Impact (指标影响)": 48,},
    {name: 'Developer Profit (开发商利润)', "Impact (指标影响)": 38,},
];

class SimpleBarChart extends Component {

    render(){

    let size = this.props.size;
       return (
        <BarChart width={size.width} height={300} data={data}
                margin={{top: 0, right: 0, left: 0, bottom: 5}}>
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="name"/>
        <YAxis/>
        <Tooltip/>
        <Legend />
        <Bar dataKey="Impact (指标影响)" stackId="a" fill="rgba(7, 81, 133, 0.849)" />
        </BarChart>
        );
    }
}

export default sizeMe()(SimpleBarChart);
