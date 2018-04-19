import React, { Component } from 'react';
import { Surface, Radar, RadarChart, PolarGrid, Legend, Tooltip,
  PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  LabelList, Label } from 'recharts';

  import sizeMe from 'react-sizeme';

class RadarChart2 extends Component {

  static displayName = 'RadarChartDemo';

  constructor() {
    super();

    this.handleChangeData = this.handleChangeData.bind(this);
  }

  handleChangeData() {
    this.setState(() => _.mapValues(initialState, changeNumberOfData));
  }

  handleMouseEnter(props) {
    console.log(props);
  }
  /*
 static defaultProps = {
    type: 'category',
    angleAxisId: 0,
    scale: 'auto',
    cx: 0,
    cy: 0,
    domain: [0, 'auto'],
    orientation: 'outer',
    axisLine: true,
    tickLine: true,
    tick: true,
    hide: false,
};

  */


  render() {
    //const { data } = this.state;
    const {data} = this.props;
    let size = this.props.size;
    return (
      <div>
        <RadarChart  cy={250} outerRadius={200} width={size.width} height={550} data={data} >
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <Radar
            name="Urban proposal (城市建议)"
            dataKey="B"
            stroke="rgb(7,81,133)"
            thickness= "10pt"
            fill="rgb(36,98,161)"
            fillOpacity={0.5}
            onMouseEnter={this.handleMouseEnter}
           
          />
          <Radar name="Urban Starting point (城市起点)" dataKey="A" stroke="rgb(71,110,221)" fill="rgb(107,160,197)" fillOpacity={0.75} />
          />
          <Radar name="Barcelona (巴塞罗那)" dataKey="C" stroke="rgb(102,168,53)" fill="rgb(102,168,53)" fillOpacity={0.1} />
        <Legend />
        
        </RadarChart>
      </div>
    );
  }
}

export default sizeMe()(RadarChart2);