import React, { Component } from 'react';
import echarts from 'echarts';

// 国内数据
import provinceNewConfirmed from '../data/China (Provincial-level)/New_confirmed.json';

//国际数据
import countryNewConfirmed from '../data/Global/New_confirmed.json';

let provinceNewConfirmedData = provinceNewConfirmed.arrayList;
let countryNewConfirmedData = countryNewConfirmed.arrayList;

function getJson(key, jsonObj) {
    var arr = [];
    for (var index in jsonObj) {
        for (var k in jsonObj[index]) {
            if (k === key) {
                arr.push(jsonObj[index][key]);
            } else if (jsonObj[index][k] instanceof Array) {
                getJson(key, jsonObj[index][k]);
            }
        }
    }
    return arr;
}

function getRiverArr(jsonObj, province) {
    var arr = [];
    for (var index in jsonObj) {
        if (province !== '中国（含港澳台）' && jsonObj[index]['Region_CN'] !== province) continue;
        for (var k in jsonObj[index]) {
            if (k === 'Region_CN' || k === 'Region_EN') continue;
            arr.push([k, parseInt(jsonObj[index][k]), jsonObj[index]['Region_CN']]);
        }
    }
    return arr;
}

export class MainEChartsRiver extends Component {

    constructor(props) {
        super(props);
        this.state = {
            level1: this.props.level1,
            level2: this.props.level2
        };
        this.draw = this.draw.bind(this);
    }

    componentDidMount() {
        this.draw();
    }
    componentDidUpdate() {
        this.draw();
    }

    draw = () => {

        var provinces = [];
        var riverArr = [];

        if (this.props.level2 === '中国（含港澳台）') {
            provinces = getJson('Region_CN', provinceNewConfirmedData);
            riverArr = getRiverArr(provinceNewConfirmedData, this.props.level2);
        } else if (this.props.level1 === 'china') {
            provinces = [this.props.level2];
            riverArr = getRiverArr(provinceNewConfirmedData, this.props.level2);
        } else if (this.props.level1 === 'global') {
            provinces = [this.props.level2];//getJson('Region_CN', provinceNewConfirmedData);
            riverArr = getRiverArr(countryNewConfirmedData, this.props.level2);
        }

        let mycharts = echarts.init(document.getElementById('mycharts'));

        mycharts.setOption({
            title: {
                // text: this.props.level2
            },

            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'line',
                    lineStyle: {
                        color: 'rgba(0,0,0,0.2)',
                        width: 1,
                        type: 'solid'
                    }
                }
            },

            legend: {
                data: provinces
            },

            singleAxis: {
                top: 50,
                bottom: 50,
                axisTick: {},
                axisLabel: {},
                type: 'time',
                axisPointer: {
                    animation: true,
                    label: {
                        show: true
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        type: 'dashed',
                        opacity: 0.2
                    }
                }
            },

            dataZoom: [
                {
                    type: 'slider',
                    show: true,
                    singleAxis: [0],
                    start: this.props.beginTime,
                    end: this.props.endTime
                },
                {
                    type: 'inside',
                    show: true,
                    singleAxis: [0],
                    start: this.props.beginTime,
                    end: this.props.endTime
                }
            ],

            series: [
                {
                    type: 'themeRiver',
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 20,
                            shadowColor: 'rgba(0, 0, 0, 0.8)'
                        }
                    },
                    data: riverArr
                }
            ]
        });
    }
    render() {
        return (
            <div>
                <div id='mycharts' style={{ width: '100%', height: window.innerHeight * 0.5 }}>
                </div>
            </div>
        );
    }
}