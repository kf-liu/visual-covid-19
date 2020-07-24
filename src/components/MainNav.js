import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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

var provinces = [];
provinces = getJson('Region_CN', provinceNewConfirmedData);
var country = [];
country = getJson('Region_CN', countryNewConfirmedData);

// MainNav

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

export class MainNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultExpanded: false
        }
        // this.MNxialaOnClick = this.MNxialaOnClick.bind(this);
    }

    setArea = (level1, level2) => {
        this.props.setArea(level1, level2.item);
        this.setState({
            defaultExpanded: false
        });
        // $('html').scrollTop(0);
    }
    // MNdianjiOnClick = () => {
    //     console.log('1');
    //     if ($('.lPart').width() < $(window).width() / 2) {
    //         $('.lPart').css('width', '100%');
    //         $('.rPart').css('width', '100%');
    //     } else {
    //         $('.lPart').css('width', '20%');
    //         $('.rPart').css('width', '80%');
    //     }
    // }
    // MNxialaOnClick = () => {
    //     // this.previousSbiling.click();
    //     console.log(this.previousElementSibling);
    //     this.forceUpdate();
    // }

    render() {

        const classes = {};

        return (
            <div className={classes.root}>
                <div className="title">正在看 · <b>{this.props.level2}</b></div>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        className='MNdianji'
                    >
                        <Typography>国际数据</Typography>
                    </AccordionSummary>
                    <AccordionDetails
                        className='MNxiala'
                    >
                        <Typography>
                            {country.map(item => (
                                <Button key={item} onClick={() => { this.setArea('global', { item }) }}>{item}</Button>
                            ))}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        className='MNdianji'
                    >
                        <Typography>国内数据</Typography>
                    </AccordionSummary>
                    <AccordionDetails className='MNxiala'>
                        <Typography>
                            {provinces.map(item => (
                                <Button key={item} onClick={() => { this.setArea('china', { item }) }}>{item}</Button>
                            ))}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3a-content"
                        id="panel3a-header"
                        className='MNdianji'
                    >
                        <Typography>湖北省内数据</Typography>
                    </AccordionSummary>
                </Accordion>
            </div >
        );
    }
}

