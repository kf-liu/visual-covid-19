import React, { Component } from 'react';
import echarts from 'echarts';

// 国内数据
import provinceNewConfirmed from '../data/China (Provincial-level)/New_confirmed.json';
import provinceNewDeath from '../data/China (Provincial-level)/New_death.json';
import provinceNewRecvered from '../data/China (Provincial-level)/New_recovered.json';

//国际数据
import countryNewConfirmed from '../data/Global/New_confirmed.json';
import countryNewDeath from '../data/Global/New_death.json';
import countryNewRecvered from '../data/Global/New_recovered.json';

let provinceNewConfirmedData = provinceNewConfirmed.arrayList;
let provinceNewDeathData = provinceNewDeath.arrayList;
let provinceNewDeathdData = provinceNewRecvered.arrayList;
let provinceDataList = [provinceNewConfirmedData, provinceNewDeathData, provinceNewDeathdData]

let countryNewConfirmedData = countryNewConfirmed.arrayList;
let countryNewDeathData = countryNewDeath.arrayList;
let countryNewDeathdData = countryNewRecvered.arrayList;
let countryDataList = [countryNewConfirmedData, countryNewDeathData, countryNewDeathdData]

function getDate() {
    var arr = [];
    for (var index in countryNewConfirmedData[0]) {
        if (index == 'Region_CN' || index == 'Region_EN') continue;
        arr.push(index);
    }
    return arr;
}

export class MainEChartsBar extends Component {

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

        var date = [];
        var dataList = [];
        var NewConfirmed = [];
        var NewDeath = [];
        var NewRecovered = [];

        date = getDate();

        // if (this.props.level2 == '中国（含港澳台）') {
        //     provinces = getJson('Region_CN', provinceNewConfirmedData);
        //     riverArr = getRiverArr(provinceNewConfirmedData, this.props.level2);
        // } else 
        if (this.props.level1 == 'china') {
            dataList = provinceDataList;
        } else if (this.props.level1 == 'global') {
            dataList = countryDataList;
        }

        for (var list in dataList) {
            var arr = [];
            for (var k in dataList[list]) {
                if (this.props.level2 != dataList[list][k]['Region_CN']) {
                    continue;
                } else {
                    for (var d in dataList[list][k]) {
                        if (d != 'Region_CN' && d != 'Region_EN') {
                            arr.push(dataList[list][k][d]);
                        }
                    }
                }
                break;
            }
            if (list == 0) {
                NewConfirmed = arr;
            } else if (list == 1) {
                NewDeath = arr;
            } else if (list == 2) {
                NewRecovered = arr;
            }
        }

        let mycharts = echarts.init(document.getElementById('mycharts'));

        mycharts.setOption({
            legend: {
                data: ['新增', '死亡', '痊愈']
            },
            toolbox: {
                // y: 'bottom',
                feature: {
                    magicType: {
                        type: ['stack', 'tiled']
                    },
                    dataView: {},
                    saveAsImage: {
                        pixelRatio: 2
                    }
                }
            },
            tooltip: {},
            xAxis: {
                data: date,
                splitLine: {
                    show: false
                }
            },
            yAxis: {
            },
            series: [
                {
                    name: '新增',
                    type: this.props.MainEChartsType,
                    data: NewConfirmed,
                    animationDelay: function (idx) {
                        return idx * 10;
                    }
                },
                {
                    name: '死亡',
                    type: this.props.MainEChartsType,
                    data: NewDeath,
                    animationDelay: function (idx) {
                        return idx * 10 + 100;
                    }
                },
                {
                    name: '痊愈',
                    type: this.props.MainEChartsType,
                    data: NewRecovered,
                    animationDelay: function (idx) {
                        return idx * 10 + 100;
                    }
                }
            ],
            animationEasing: 'elasticOut',
            animationDelayUpdate: function (idx) {
                return idx * 5;
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