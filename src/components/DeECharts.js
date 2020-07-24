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

function getVirtulData() {
    var date = +echarts.number.parseDate('2019-12-31');
    var end = +echarts.number.parseDate('2020-05-27');
    var dayTime = 3600 * 24 * 1000;
    var data = [];
    for (var time = date; time < end; time += dayTime) {
        data.push([
            echarts.format.formatTime('yyyy-MM-dd', time),
            Math.floor(Math.random() * 10000)
        ]);
    }
    return data;
}

// function 

function getPieSeriesUpdate(scatterData, chart) {
    return echarts.util.map(scatterData, function (item, index) {
        var center = chart.convertToPixel('calendar', item);
        return {
            id: index + 'pie',
            center: center
        };
    });
}

var cellSize = [50, 40];
var pieRadius = 12;
var level1 = '';
var level2 = '';

export class DeECharts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            level1: this.props.level1,
            level2: this.props.level2
        };
        this.draw = this.draw.bind(this);
        this.getPieSeries = this.getPieSeries.bind(this);
        // level1 = this.props.level1;
        // level2 = this.props.level2;
    }

    componentDidMount() {
        this.draw();
    }
    componentDidUpdate() {
        this.draw();
    }

    getPieSeries(scatterData, chart) {
        var i = 0;
        var arrList = [];
        if (this.props.level1 === 'china') {
            arrList = provinceDataList;
        } else if (this.props.level1 === 'global') {
            arrList = countryDataList;
        }
        for (var v in arrList[0]) {
            if (arrList[0][v]['Region_CN'] !== this.props.level2) continue;
            i = v;
            break;
        }
        return echarts.util.map(scatterData, function (item, index) {
            var center = chart.convertToPixel('calendar', item);
            return {
                id: index + 'pie',
                type: 'pie',
                center: center,
                // roseType: 'radius',
                label: {
                    // normal: {
                    //     formatter: '{c}',
                    //     position: 'inside'
                    // }
                    show: false
                },
                radius: pieRadius,
                data: [
                    { name: '新增', value: arrList[0][i][item[0]] },
                    { name: '死亡', value: arrList[1][i][item[0]] },
                    { name: '痊愈', value: arrList[2][i][item[0]] }
                ]
            };
        });
    }

    draw = () => {

        var scatterData = getVirtulData();


        let myChart = echarts.init(document.getElementById('decharts'));

        myChart.setOption({
            // title: {
            //     text: this.props.DeEChartsM,
            // },
            tooltip: {},
            legend: {
                data: ['新增', '死亡', '痊愈'],
                bottom: 20
            },
            calendar: {
                top: 'middle',
                left: 'center',
                orient: 'vertical',
                cellSize: cellSize,
                yearLabel: {
                    show: false,
                    textStyle: {
                        fontSize: 30
                    }
                },
                dayLabel: {
                    margin: 20,
                    firstDay: 1,
                    nameMap: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
                },
                monthLabel: {
                    show: true
                },
                range: this.props.DeEChartsM
            },
            series: [{
                id: 'label',
                type: 'scatter',
                coordinateSystem: 'calendar',
                symbolSize: 1,
                label: {
                    normal: {
                        show: true,
                        formatter: function (params) {
                            return echarts.format.formatTime('dd', params.value[0]);
                        },
                        offset: [-cellSize[0] / 2 + 10, -cellSize[1] / 2 + 10],
                        textStyle: {
                            color: '#000',
                            fontSize: 14
                        }
                    }
                },
                data: scatterData
            }]
        })

        var pieInitialized;
        setTimeout(() => {
            pieInitialized = true;
            myChart.setOption({
                series: this.getPieSeries(scatterData, myChart)
            });
        }, 10);

        this.onresize = function () {
            if (pieInitialized) {
                myChart.setOption({
                    series: getPieSeriesUpdate(scatterData, myChart)
                });
            }
        };
    }
    render() {
        return (
            <div>
                <div id='decharts' style={{ width: '100%', height: window.innerHeight * 0.5 }}>
                </div>
            </div>
        );
    }
}