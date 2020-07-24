import React, { Component } from 'react';
import echarts from 'echarts';

// 国内数据
import provinceTotelConfirmed from '../data/China (Provincial-level)/Totel_confirmed.json';
import provinceNewDeath from '../data/China (Provincial-level)/New_death.json';
import provinceNewRecvered from '../data/China (Provincial-level)/New_recovered.json';

//国际数据
import countryNewConfirmed from '../data/Global/New_confirmed.json';
import countryNewDeath from '../data/Global/New_death.json';
import countryNewRecvered from '../data/Global/New_recovered.json';

//分省人均GDP与分省人口
import gdpData from '../data/others/gdp.json';
import peopleData from '../data/others/people.json';
import hospitalData from '../data/others/hospital.json';

let provinceTotelConfirmedData = provinceTotelConfirmed.arrayList;
let provinceNewDeathData = provinceNewDeath.arrayList;
let provinceNewDeathdData = provinceNewRecvered.arrayList;
let provinceDataList = [provinceTotelConfirmedData, provinceNewDeathData, provinceNewDeathdData, gdpData['arrayList'], peopleData['arrayList'], hospitalData['arrayList']]

let countryNewConfirmedData = countryNewConfirmed.arrayList;
let countryNewDeathData = countryNewDeath.arrayList;
let countryNewDeathdData = countryNewRecvered.arrayList;
let countryDataList = [countryNewConfirmedData, countryNewDeathData, countryNewDeathdData]

export class MoreECharts extends Component {

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
        var data = [
            [],
            []
        ];

        var dataList = [];

        if (this.props.level1 === 'china') {
            dataList = provinceDataList;
        }

        var i = 1;
        for (var arr in dataList[3]) {
            if (dataList[3][arr]['地区'] === this.props.level2) {
                i = 0;
            }
            for (var v in dataList[0]) {
                if (dataList[0][v]['Region_CN'] !== dataList[3][arr]['地区']) continue;
                var k = v;
                break;
            }
            var province = dataList[3][arr]['地区'];
            var gdp = dataList[3][arr]['2019年'];
            var people = dataList[4][arr]['2019年'];
            var hospital = dataList[5][arr]['2018年'];
            var confirmed = dataList[0][k]['2020-05-27'];
            data[i].push([gdp, hospital / people, confirmed / people * 100, province, people, hospital, confirmed]);
            i = 1;
        }

        let mycharts = echarts.init(document.getElementById('mcharts'));

        mycharts.setOption({
            legend: {
                right: 10,
                data: [this.props.level2, this.props.level1]
            },
            xAxis: {
                splitLine: {
                    lineStyle: {
                        type: 'dashed'
                    }
                },
                name: '人均GDP',
            },
            yAxis: {
                splitLine: {
                    lineStyle: {
                        type: 'dashed'
                    }
                },
                scale: true,
                name: '人均综合医院数*10000',
            },
            dataZoom: [
                {
                    show: true,
                    start: 0,
                    end: 100
                },
                {
                    start: 0,
                    end: 100
                },
                {
                    type: 'inside',
                    show: true,
                    yAxisIndex: 0,
                    filterMode: 'empty',
                    width: 30,
                    height: '80%',
                    showDataShadow: false,
                    left: '93%'
                }
            ],
            series: [{
                name: this.props.level2,
                data: data[0],
                type: 'scatter',
                symbolSize: function (data) {
                    return Math.sqrt(data[2], 4) * 4;
                },
                emphasis: {
                    label: {
                        show: true,
                        formatter: function (param) {
                            return ['{a|' + param.data[3] + '}\n{b|GDP:}{c|' + param.data[0] + '}{b|元/人\n人口:}{c|' + param.data[4] + '}{b|万人\n医院:}{c|' + param.data[5] + '}{b|个\n确诊:}{c|' + param.data[6] + '}{b|人}'];
                        },
                        position: 'top',
                        backgroundColor: 'rgb(255,255,255,200)',
                        // borderColor: '#333',
                        borderColor: '#48B2BA',
                        borderWidth: 2,
                        borderRadius: 5,
                        padding: 10,
                        color: '#000',
                        fontSize: 14,
                        shadowBlur: 3,
                        shadowColor: '#888',
                        shadowOffsetX: 0,
                        shadowOffsetY: 3,
                        lineHeight: 18,
                        rich: {
                            a: {
                                textBorderColor: '#000',
                                textBorderWidth: 1
                            },
                            b: {
                                color: '#000'
                            },
                            c: {
                                color: '#48B2BA',
                                textShadowBlur: 1,
                                textShadowColor: '#888',
                            }
                        }
                    }
                },
            }, {
                name: this.props.level1,
                data: data[1],
                type: 'scatter',
                symbolSize: function (data) {
                    return Math.sqrt(data[2], 4) * 4;
                },
                emphasis: {
                    label: {
                        show: true,
                        formatter: function (param) {
                            return ['{a|' + param.data[3] + '}\n{b|GDP:}{c|' + param.data[0] + '}{b|元/人\n人口:}{c|' + param.data[4] + '}{b|万人\n医院:}{c|' + param.data[5] + '}{b|个\n确诊:}{c|' + param.data[6] + '}{b|人}'];
                        },
                        position: 'top',
                        backgroundColor: 'rgb(255,255,255,200)',
                        // borderColor: '#333',
                        borderColor: '#48B2BA',
                        borderWidth: 2,
                        borderRadius: 5,
                        padding: 10,
                        color: '#000',
                        fontSize: 14,
                        shadowBlur: 3,
                        shadowColor: '#888',
                        shadowOffsetX: 0,
                        shadowOffsetY: 3,
                        lineHeight: 18,
                        rich: {
                            a: {
                                textBorderColor: '#000',
                                textBorderWidth: 1
                            },
                            b: {
                                color: '#000'
                            },
                            c: {
                                color: '#48B2BA',
                                textShadowBlur: 1,
                                textShadowColor: '#888',
                            }
                        }
                    }
                },
            }],
        })
    }
    render() {
        return (
            <div>
                <div id='mcharts' style={{ width: '100%', height: window.innerHeight * 0.5 }}>
                </div>
            </div>
        );
    }
}