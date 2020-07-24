import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export class SubNav extends Component {
    constructor(props) {
        super(props);
    }
    setMainEChartsType = (i) => {
        this.props.setMainEChartsType(i);
    }
    setDeEChartsM = (i) => {
        this.props.setDeEChartsM(i);
    }
    render() {
        const handleChange = (event, newValue) => {
            this.props.setTime(newValue);
        };
        return (
            <div className="SubNav">
                <div className="centerBut">
                    <Button
                        variant="contained"
                        className="SubNavBut"
                        onClick={() => { this.setMainEChartsType('themeRiver') }}
                    >河流图</Button>
                    <Button
                        variant="contained"
                        className="SubNavBut"
                        onClick={() => { this.setMainEChartsType('bar') }}
                    >柱状图</Button>
                    <Button
                        variant="contained"
                        className="SubNavBut"
                        onClick={() => { this.setMainEChartsType('line') }}
                    >折线图</Button>
                </div>
                <div>
                    <Typography id="range-slider" gutterBottom>
                        默认时间范围
                    </Typography>
                    <Slider
                        value={this.props.timeValue}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                    // getAriaValueText={this.props.timeValueText}
                    />
                </div>
                <hr></hr><br></br>
                每日占比图月份 · 当前 {this.props.DeEChartsM}<br></br>
                <div className="centerBut">
                    <Button
                        className="SubNavBut"
                        onClick={() => { this.setDeEChartsM('2019-12') }}
                    >2019-12</Button>
                    <Button
                        className="SubNavBut"
                        onClick={() => { this.setDeEChartsM('2020-01') }}
                    >2020-01</Button>
                    <Button
                        className="SubNavBut"
                        onClick={() => { this.setDeEChartsM('2020-02') }}
                    >2020-02</Button>
                    <Button
                        className="SubNavBut"
                        onClick={() => { this.setDeEChartsM('2020-03') }}
                    >2019-03</Button>
                    <Button
                        className="SubNavBut"
                        onClick={() => { this.setDeEChartsM('2020-04') }}
                    >2020-04</Button>
                    <Button
                        className="SubNavBut"
                        onClick={() => { this.setDeEChartsM('2020-05') }}
                    >2020-05</Button>
                </div>
                <hr></hr><br></br>
                <div style={{ width: '100%' }}>
                    <FormControl className="select">
                        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                            X轴
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-placeholder-label-label"
                            id="demo-simple-select-placeholder-label"
                            onChange={handleChange}
                            displayEmpty
                            className=""
                            value={10}
                        >
                            <MenuItem value={10}>人均GDP</MenuItem>
                            <MenuItem value={10}>人均GDP</MenuItem>
                            <MenuItem value={10}>人均GDP</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className="select">
                        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                            Y轴
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-placeholder-label-label"
                            id="demo-simple-select-placeholder-label"
                            onChange={handleChange}
                            displayEmpty
                            className=""
                            value={10}
                        >
                            <MenuItem value={10}>人均综合医院数</MenuItem>
                            <MenuItem value={10}>人均综合医院数</MenuItem>
                            <MenuItem value={10}>人均综合医院数</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className="select">
                        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                            半径
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-placeholder-label-label"
                            id="demo-simple-select-placeholder-label"
                            onChange={handleChange}
                            displayEmpty
                            className=""
                            value={10}
                        >
                            <MenuItem value={10}>确诊率</MenuItem>
                            <MenuItem value={10}>确诊率</MenuItem>
                            <MenuItem value={10}>确诊率</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
        )
    }
}