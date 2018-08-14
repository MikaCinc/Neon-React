import React, { Component } from 'react';

import DatePicker from 'material-ui/DatePicker';
//import Subheader from 'material-ui/Subheader';
import Paper from 'material-ui/Paper';

import * as moment from 'moment';

import {
    cyan500,
    pinkA200,
} from 'material-ui/styles/colors';

class Time extends Component {
    constructor(props) {
        super(props);
        this.state = {
            now: moment(),
            selected: {
                date: moment(),
            }
            
        }
    }

    componentDidMount() {
        this.inter = setInterval(this.updateNowInState, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.inter)
    }


    updateNowInState = () => {
        this.setState({
            now: moment()
        })
    }


    handleDateChange = (wrong, date) => {
        console.log(date)
        this.setState({
            selected: {
                date
            }
        })
    }

    render() {
        return (
            <div>
                <h1>
                    <span style={{ color: cyan500 }}>Now: </span>
                    {moment(this.state.now).format("dddd, MMMM Do YYYY, h:mm:ss a")}
                </h1>
                <h1>
                    <span style={{ color: pinkA200 }}>Selected: </span>
                    {moment(this.state.selected.date).format("dddd, MMMM Do YYYY, h:mm:ss a")}
                </h1>
                <br />
                <DatePicker
                    hintText={moment(this.state.selected.date).format("dddd, MMMM Do YYYY, h:mm:ss a")}
                    mode="landscape"
                    value={this.state.selected.date}
                    onChange={this.handleDateChange}
                />
                <br/>
                <Paper style={{width: "33%", marginLeft: "auto", marginRight: "auto"}} zDepth={1}>
                <p>{moment(this.state.selected.date).from(this.state.now)}</p>
                </Paper>
            </div>
        );
    }
}

export default Time;