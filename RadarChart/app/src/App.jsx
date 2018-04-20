/*
install libraries:
npm install --save libraryName

run app
npm start

study JavaScript ES6
*/
import React, { Component } from 'react';

import SimpleRadarChart from './RadarChart';
import SimpleBarChart from "./SimpleBarChart";
import BasicComponent from './BasicComponent';

import './App.css';


const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

let received = 0;

class App extends Component {

    constructor(props) {
        super(props);
        let sliders = [];

        for(var i=0; i<12; i++){
            sliders.push(0);
        }

        this.state = {
            received: 0,
            sliders:sliders,
            csv: []
        }
       
        ipcRenderer.on('udp', this.updateData.bind(this));
        ipcRenderer.on('csv', this.receivedCSV.bind(this));
    }

    updateData(event, data) {
        console.log('slider ', data);
        let received = Number(data);
        let slider = JSON.parse(data);

        let sliders = this.state.sliders;
        
        sliders[slider.id] = Number(slider.value);
        console.log(sliders);

        this.setState({
            sliders:sliders
        });
    }

    receivedCSV(event, csv){
        console.log("csv",csv);
        if(this.state.csv.length==0){
            this.setState({csv:csv});
        }
        console.log("csv 0", csv[0][0]);
    }

    render() {
        let {sliders,csv} = this.state;
        var Factor = [];
        console.log("csv factor", csv);
    /*change things here!! -------- */
        for(var i=0; i<csv.length;i++){
            let value =0;
            
            value+= sliders[2]*0.01*Number(csv[i]["Young Profesional"]);
            value+= sliders[3]*0.01*Number(csv[i]["Mid Carrer professional"]);
            value+= sliders[4]*0.01*Number(csv[i]["Executives"]);
            value+= sliders[5]*0.01*Number(csv[i]["Workforce"]);
            value+= sliders[6]*0.01*Number(csv[i]["Young Children"]);
            
            value+= sliders[7]*0.01*Number(csv[i]["High School"]);
            value+= sliders[8]*0.01*Number(csv[i]["College"]);
            value+= sliders[9]*0.01*Number(csv[i]["Homemakers"]);
            value+= sliders[10]*0.01*Number(csv[i]["Retirees"]);
            value+= sliders[11]*0.01*Number(csv[i]["Artis"]);

            Factor.push(value);
        }
       
        console.log('proposed',Factor);
        //load data here...
        let data = [
            { subject: 'Residential Density (住宅 密度)', A: Factor[0], B: 110, C: 82, D: 10},
            { subject: 'Employment Density (就业 密度)', A: Factor[1], B: 130, C: 60 },
            { subject: '3rd places (day) Density (非住宅/非办公场所(日间) 密度)', A: Factor[2], B: 130, C: 85 },
            { subject: '3rd places (Night) Density (非住宅/非办公场所(夜间) 密度)', A: Factor[3], B: 100, C: 78 },
            { subject: 'Cultural Density (文化 密度)', A: Factor[4], B: 90, C: 80 },
            { subject: 'Co-working Density (共用工作空间 密度)', A: Factor[5], B: 85, C: 65 },
            { subject: 'Educational Density (教育 密度)', A: Factor[6], B: 100, C: 72 },
            { subject: 'Residential Diversity (住宅 多样性)', A: Factor[15], B: 110, C: 86 },
            { subject: 'Employment Diversity (就业 多样性)', A: Factor[16], B: 130, C: 70 },
            { subject: 'Residential/Employment (Ratio) Diversity (住宅/就业 多样性)', A:Factor[9], B: 130, C: 79 },
            { subject: '3rd places Diversity (非住宅/非办公场所 多样性)', A: Factor[18], B: 100, C: 82 },
            { subject: 'Cultural Diversity (文化 多样性)', A: Factor[19], B: 90, C: 84 },
            { subject: 'Educational Diversity (教育 多样性)', A: Factor[20], B: 100, C: 69 },
            { subject: 'Access to Parks (公园)', A: Factor[8], B: 110, C: 40 },
            { subject: 'Access to public Transport (公共交通工具)', A: Factor[9], B: 130, C: 91 },
            { subject: 'Intersection Density (路口密集程度)', A: Factor[10], B: 130, C: 89 },
            { subject: 'Access to look-out (Police) (警察（安全))', A: Factor[11], B: 100, C: 55 },
            { subject: 'Access to Healthy food (健康食物)', A: Factor[17], B: 90, C: 65 },
            { subject: 'Access to Sports (Leisure and wellness) (健身设施)', A: Factor[18], B: 100, C: 60 },
            { subject: 'Access to Healthcare (医疗保健)', A: Factor[19], B: this.state.received, C: 70 },
        ];


        //<RadarChart/>
        return ( <div className = "App" >
            <BasicComponent name = 'Lucas test 1' />
            <SimpleRadarChart data = { data }/> 
            <SimpleBarChart className = 'barChart' />
            </div>
        );
    }
}

export default App;