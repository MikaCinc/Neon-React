import React, { Component, Fragment } from 'react';

//import Paper from '@material-ui/core/Paper';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';

//import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

class Arrays extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: null,
            divisedBy: 1,
        };
    }

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };

    returnEven() {
        let arr = []
        for (let i = 1; i < 100; i++) {
            if (i % 2 === 0) {
                arr.push(i)
            }
        }
        return arr;
    }

    returnOdd() {
        let arr = []
        for (let i = 1; i < 100; i++) {
            if (i % 2 !== 0) {
                arr.push(i)
            }
        }
        return arr;
    }

    returnFibonacci() {
        let arr = [0, 1]
        for (let i = 0; i <= 20; i++) {
            arr.push(arr[i] + arr[i + 1])
        }
        return arr;
    }

    isPrime(n) {
        if (n === 2)
            return true;
        if (n === 3)
            return true;
        if (n % 2 === 0)
            return false;
        if (n % 3 === 0)
            return false;

        let i = 5;
        let w = 2;

        while (i * i <= n) {
            if (n % i === 0) {
                return false;
            }
            i += w;
            w = 6 - w;
        }
        return true;
    }

    returnPrime() {
        let arr = []
        for (let i = 2; i < 100; i++) {
            if (this.isPrime(i)) {
                arr.push(i)
            }
        }
        return arr;
    }

    returnDivisible() {
        let arr = []
        for (let i = 1; i <= 100; i++) {
            if (i % this.state.divisedBy === 0) {
                arr.push(i)
            }
        }
        return arr;
    }

    renderNumbers(arr, newRow = 10) {

        if (!arr || !arr.length) return null;

        return (
            <div>
                {
                    arr.map((num, index) => {
                        if (index % newRow === 0 && index !== 0) {
                            return (
                                <Fragment>
                                    <span>{num + ", "}</span>
                                    <br />
                                </Fragment>
                            )
                        } else {
                            return num + ",";
                        }
                    })
                }
            </div>
        )


    }

    render() {
        const { expanded } = this.state;

        const style = {
            panel: {
                width: "50%",
                marginLeft: "auto",
                marginRight: "auto",
            },
        }

        return (
            <div>
                <ExpansionPanel expanded={expanded === 'panel1'} style={style.panel} onChange={this.handleChange('panel1')}>
                    <ExpansionPanelSummary expandIcon={
                        <i className="material-icons">
                            keyboard_arrow_down
                        </i>}>
                        Even numbers between 1 and 100
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        {this.renderNumbers(this.returnEven())}
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel expanded={expanded === 'panel2'} style={style.panel} onChange={this.handleChange('panel2')}>
                    <ExpansionPanelSummary expandIcon={
                        <i className="material-icons">
                            keyboard_arrow_down
                        </i>}>
                        Odd numbers between 1 and 100
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        {this.renderNumbers(this.returnOdd(), 5)}
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel expanded={expanded === 'panel3'} style={style.panel} onChange={this.handleChange('panel3')}>
                    <ExpansionPanelSummary expandIcon={
                        <i className="material-icons">
                            keyboard_arrow_down
                        </i>}>
                        First 20 Fibonacci numbers
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        {this.renderNumbers(this.returnFibonacci())}
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel expanded={expanded === 'panel4'} style={style.panel} onChange={this.handleChange('panel4')}>
                    <ExpansionPanelSummary expandIcon={
                        <i className="material-icons">
                            keyboard_arrow_down
                        </i>}>
                        Prime numbers from 1 to 100
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        {this.renderNumbers(this.returnPrime())}
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel expanded={expanded === 'panel5'} style={style.panel} onChange={this.handleChange('panel5')}>
                    <ExpansionPanelSummary expandIcon={
                        <i className="material-icons">
                            keyboard_arrow_down
                        </i>}>
                        Numbers divisible by {this.state.divisedBy === 1 ? "..." : this.state.divisedBy}
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        {this.renderNumbers(this.returnDivisible())}
                    </ExpansionPanelDetails>
                    <Divider />
                    <ExpansionPanelActions>
                        <FormControl>
                            {"Show me numbers divisible by: "}
                            <Select
                                value={this.state.divisedBy}
                                onChange={(event) => this.setState({ divisedBy: event.target.value })}
                            >
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={6}>6</MenuItem>
                                <MenuItem value={7}>7</MenuItem>
                                <MenuItem value={8}>8</MenuItem>
                                <MenuItem value={9}>9</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={15}>15</MenuItem>
                                <MenuItem value={25}>25</MenuItem>
                            </Select>
                        </FormControl>
                    </ExpansionPanelActions>
                </ExpansionPanel>
            </div>
        );
    }
}

export default Arrays;