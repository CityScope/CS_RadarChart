/*
install libraries:
npm install --save libraryName

run app
npm start

study JavaScript ES6
*/
import React, { Component } from 'react';

import box from './box.svg';
import reactLogo from './logo.svg';
import pipeline from "./assets/pipeline.svg";


import RadarChart from './RadarChart';
import RadarChart2 from './RadarChart2';

import SimpleBarChart from "./SimpleBarChart";

import BasicComponent from './BasicComponent';

import './App.css';

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;


let received = 0;

class App extends Component {

  constructor(props){
    super(props);
    this.state={
      received:0
    }

    
    ipcRenderer.on('udp',this.updateData.bind(this));
      
  }

  updateData(event, data){
    console.log('data '+data);
    let received = Number(data);
     
    this.setState({
       received:received
     });
  }

  render() {
  
    //load data here...
    let data = [
      { subject: 'Residential Density (住宅 密度)', A: 70, B: 110, C: 82 },
      { subject: 'Employment Density (就业 密度)', A: 60, B: 130, C: 60 },
      { subject: '3rd places (day) Density (非住宅/非办公场所(日间) 密度)', A: 40, B: 130, C: 85 },
      { subject: '3rd places (Night) Density (非住宅/非办公场所(夜间) 密度)', A: 20, B: 100, C: 78 },
      { subject: 'Cultural Density (文化 密度)', A: 55, B: 90, C: 80 },
      { subject: 'Co-working Density (共用工作空间 密度)', A: 60, B: 85, C: 65 },
      { subject: 'Educational Density (教育 密度)', A: 70, B: 100, C: 72 },
      { subject: 'Residentia Diversity (住宅 多样性)', A: 60, B: 110, C: 86 },
      { subject: 'Employment Diversity (就业 多样性)', A: 65, B: 130, C: 70 },
      { subject: 'Residential/Employment (Ratio) Diversity (住宅/就业 多样性)', A: 55, B: 130, C: 79 },
      { subject: '3rd places Diversity (非住宅/非办公场所 多样性)', A: 63, B: 100, C: 82 },
      { subject: 'Cultural Diversity (文化 多样性)', A: 60, B: 90, C: 84 },
      { subject: 'Educational Diversity (教育 多样性)', A: 65, B: 100, C: 69 },
      { subject: 'Access to Parks (公园)', A: 70, B: 110, C: 40 },
      { subject: 'Access to public Transport (公共交通工具)', A: 65, B: 130, C: 91 },
      { subject: 'Intersection Density (路口密集程度)', A: 40, B: 130, C: 89 },
      { subject: 'Access to look-out (Police) (警察（安全))', A: 50, B: 100, C: 55 },
      { subject: 'Access to Healthy food (健康食物)', A: 35, B: 90, C: 65 },
      { subject: 'Access to Sports (Leisure and wellness) (健身设施)', A: 54, B: 100, C: 60 },
      { subject: 'Access to Healthcare (医疗保健)', A: 54, B: this.state.received, C: 70 },
    ];
  
    
    //<RadarChart/>
    return (
      <div className="App">
        <BasicComponent name='Lucas test 1'/>
        <RadarChart2 data={data}/>
        <SimpleBarChart className='barChart'/>
      </div>
    );
  }
}

export default App;
