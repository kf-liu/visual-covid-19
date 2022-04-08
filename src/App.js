import React, { Component } from 'react';
import { MainEChartsRiver } from './components/MainEChartsRiver.js';
import { MainEChartsBar } from './components/MainEChartsBar.js';
import { DeECharts } from './components/DeECharts.js';
import { MoreECharts } from './components/MoreECharts.js';
import { MainNav } from './components/MainNav.js';
import { SubNav } from './components/SubNav.js';
import './js/index.js';
import './css/body.css';

// Provider是react-redux两个核心工具之一，作用：将store传递到每个项目中的组件中
// 第二个工具是connect，稍后会作介绍
// import { Provider } from 'react-redux'
// 引入创建好的store实例
// import store from './store/index.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      level1: 'china',
      level2: '湖北省',
      timeValue: [10, 50],
      timeValueText: 37,
      MainEChartsType: 'themeRiver',
      DeEChartsM: ['2020-02']
    };
    this.setArea = this.setArea.bind(this);
  }
  setArea = (level1, level2) => {
    this.setState({
      level1: level1,
      level2: level2
    })
  }
  setTime = ([begin, end]) => {
    this.setState({
      timeValue: [begin, end],
    })
  }
  setMainEChartsType = (i) => {
    this.setState({
      MainEChartsType: i
    })
  }
  setDeEChartsM = (i) => {
    this.setState({
      DeEChartsM: i
    })
  }
  render() {
    let MainECharts = null;
    if (this.state.MainEChartsType === "themeRiver") {
      MainECharts =
        <MainEChartsRiver
          level1={this.state.level1}
          level2={this.state.level2}
          beginTime={this.state.timeValue[0]}
          endTime={this.state.timeValue[1]}
        />;
    } else {
      MainECharts =
        <MainEChartsBar
          level1={this.state.level1}
          level2={this.state.level2}
          beginTime={this.state.timeValue[0]}
          endTime={this.state.timeValue[1]}
          MainEChartsType={this.state.MainEChartsType}
        />;
    }
    return (
      <div className="App">
        <div className="head">
          Hello
        </div>
        <div className="lPart">
          <div className="card">
            <MainNav
              setArea={this.setArea}
              level2={this.state.level2} />
          </div>
          <div className="card">
            <SubNav
              timeValue={this.state.timeValue}
              timeValueText={this.state.timeValueText}
              setTime={this.setTime}
              setMainEChartsType={this.setMainEChartsType}
              setDeEChartsM={this.setDeEChartsM}
              DeEChartsM={this.state.DeEChartsM}
            />
          </div>
        </div>
        <div className="rPart">
          <div className="card">
            {MainECharts}
          </div>
          <div className="lPart-bottom-left">
            <div className="card">
              <DeECharts
                level1={this.state.level1}
                level2={this.state.level2}
                DeEChartsM={this.state.DeEChartsM}
              />
            </div>
          </div>
          <div className="lPart-bottom-right">
            <div className="card">
              <MoreECharts
                level1={this.state.level1}
                level2={this.state.level2}
              />
            </div>
          </div>
        </div>
        <div
          style={{
            textAlign: 'center',
            width: '100%',
            color: 'grey',
          }}
        >
          <small>
            &copy;
            <a
              href="https://github.com/qiaork"
              target='_blank'
              style={{
                color: 'grey',
              }}
            >
              kefangliu
            </a>
          </small>
        </div>
      </div>
    );
  }
}

export default App;
