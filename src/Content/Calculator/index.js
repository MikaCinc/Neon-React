import React, { Component } from 'react';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
//import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';

import {
    Table,
    TableBody,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

import {
    cyan500,
    grey800,
    grey400
} from 'material-ui/styles/colors';


class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fN: "",
            operation: "",
            sN: "",
            first: true,
        }
    }

    result() {
        if (!this.state.first && this.state.sN) {
            let fNum = parseInt(this.state.fN, 10);
            let sNum = parseInt(this.state.sN, 10);
            switch (this.state.operation) {
                case "+":
                    this.setState({
                        fN: fNum + sNum,
                        operation: "",
                        sN: "",
                        first: true,
                    })
                    break;
                case "-":
                    this.setState({
                        fN: fNum - sNum,
                        operation: "",
                        sN: "",
                        first: true,
                    })
                    break;
                case "×":
                    this.setState({
                        fN: fNum * sNum,
                        operation: "",
                        sN: "",
                        first: true,
                    })
                    break;
                case "÷":
                    this.setState({
                        fN: fNum / sNum,
                        operation: "",
                        sN: "",
                        first: true,
                    })
                    break;
                default:
                    return
            }
        }
    }

    addNum(num) {
        if (this.state.first) {
            this.setState({
                fN: this.state.fN + num
            })
        } else {
            this.setState({
                sN: this.state.sN + num
            })
        }
    }

    clearAll() {
        this.setState({
            fN: "",
            operation: "",
            sN: "",
            first: true,
        })
    }

    render() {
        const style = {
            paperStyle: {
                width: "380px",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "10%"
            },
            operationsDiv: {
                width: "100%",
                backgroundColor: cyan500,
                color: "white"
            },
            operationsButtons: {
                fontSize: "30px",
                color: "white"
            },
            numbersDiv: {
                backgroundColor: grey800,
                color: grey400
            },
            flatButton: {
                height: "60px",
                width: "50px",
                borderRadius: "100%"
            },
            actionButton: {
                marginLeft: 17,
                color: "black",
                fontSize: "20px",
            },
            inputStyle: {
                fontSize: "32px",
                textAlign: "right",
                width: "70%",
                display: "inline-block",
            },
            iconButtons: {
                display: "inline-block",
            }
        }
        return (
            <div>
                <Paper style={style.paperStyle} zDepth={5} rounded={false} transitionEnabled={true}>
                    <TextField
                        hintText="insert number..."
                        value={this.state.first ? this.state.fN : this.state.sN}
                        type="number"
                        style={style.inputStyle}
                        floatingLabelShrinkStyle={{ fontSize: "20px", textAlign: "right" }}
                        floatingLabelText={this.state.fN + " " + this.state.operation + " " + this.state.sN}
                        onInput={
                            (event) => {
                                this.state.first ?
                                    this.setState({
                                        fN: event.target.value
                                    })
                                    :
                                    this.setState({
                                        sN: event.target.value
                                    })
                            }
                        }
                    />
                    <IconButton style={style.iconButtons} name={"del"} label="del" onClick={
                        (event) => {
                            let fNum = "" + this.state.fN;
                            let sNum = "" + this.state.sN;
                            if (this.state.first) {
                                if (fNum !== "") {
                                    this.setState({
                                        fN: fNum.substring(0, fNum.length - 1)
                                    })
                                }
                            } else {
                                if (sNum !== "") {
                                    this.setState({
                                        sN: sNum.substring(0, sNum.length - 1)
                                    })
                                }
                            }
                        }
                    }>
                        <i className="material-icons">
                            backspace
                        </i>
                    </IconButton>
                    <IconButton style={style.iconButtons} onClick={()=> {this.clearAll()}}>
                        <i className="material-icons">
                            clear
                        </i>
                    </IconButton>
                    <br />
                    <Paper zDepth={4} style={style.operationsDiv}>
                        <FlatButton style={{ height: "60px", width: "50px", borderRadius: "100%", }} name={"+"} rippleColor="black" labelStyle={style.operationsButtons} label="+" onClick={
                            (event) => {
                                this.setState({
                                    operation: "+",
                                    first: false,
                                })
                            }
                        } />
                        <FlatButton style={{ height: "60px", width: "50px", borderRadius: "100%", }} name={"-"} rippleColor="black" label="-" labelStyle={style.operationsButtons} onClick={
                            (event) => {
                                this.setState({
                                    operation: "-",
                                    first: false,
                                })
                            }
                        } />
                        <FlatButton style={{ height: "60px", width: "50px", borderRadius: "100%", }} name={"×"} rippleColor="black" label="×" labelStyle={style.operationsButtons} onClick={
                            (event) => {
                                this.setState({
                                    operation: "×",
                                    first: false,
                                })
                            }
                        } />
                        <FlatButton style={{ height: "60px", width: "50px", borderRadius: "100%", }} name={"÷"} rippleColor="black" label="÷" labelStyle={style.operationsButtons} onClick={
                            (event) => {
                                this.setState({
                                    operation: "÷",
                                    first: false,
                                })
                            }
                        } />
                    </Paper>
                    <Table style={style.numbersDiv} selectable={false}>
                        <TableBody displayRowCheckbox={false}>
                            <TableRow displayBorder={false}>
                                <TableRowColumn>
                                    <FlatButton style={style.flatButton} rippleColor="white" label="7" labelStyle={style.operationsButtons} onClick={() => {
                                        this.addNum(7)
                                    }} />
                                </TableRowColumn>
                                <TableRowColumn>
                                    <FlatButton style={style.flatButton} rippleColor="white" label="8" labelStyle={style.operationsButtons} onClick={() => {
                                        this.addNum(8)
                                    }} />
                                </TableRowColumn>
                                <TableRowColumn>
                                    <FlatButton style={style.flatButton} rippleColor="white" label="9" labelStyle={style.operationsButtons} onClick={() => {
                                        this.addNum(9)
                                    }} />
                                </TableRowColumn>
                            </TableRow>
                            <TableRow displayBorder={false}>
                                <TableRowColumn>
                                    <FlatButton style={style.flatButton} rippleColor="white" label="4" labelStyle={style.operationsButtons} onClick={() => {
                                        this.addNum(4)
                                    }} />
                                </TableRowColumn>
                                <TableRowColumn>
                                    <FlatButton style={style.flatButton} rippleColor="white" label="5" labelStyle={style.operationsButtons} onClick={() => {
                                        this.addNum(5)
                                    }} />
                                </TableRowColumn>
                                <TableRowColumn>
                                    <FlatButton style={style.flatButton} rippleColor="white" label="6" labelStyle={style.operationsButtons} onClick={() => {
                                        this.addNum(6)
                                    }} />
                                </TableRowColumn>
                            </TableRow>
                            <TableRow displayBorder={false}>
                                <TableRowColumn>
                                    <FlatButton style={style.flatButton} rippleColor="white" label="1" labelStyle={style.operationsButtons} onClick={() => {
                                        this.addNum(1)
                                    }} />
                                </TableRowColumn>
                                <TableRowColumn>
                                    <FlatButton style={style.flatButton} rippleColor="white" label="2" labelStyle={style.operationsButtons} onClick={() => {
                                        this.addNum(2)
                                    }} />
                                </TableRowColumn>
                                <TableRowColumn>
                                    <FlatButton style={style.flatButton} rippleColor="white" label="3" labelStyle={style.operationsButtons} onClick={() => {
                                        this.addNum(3)
                                    }} />
                                </TableRowColumn>
                            </TableRow>
                            <TableRow displayBorder={false}>
                                <TableRowColumn>
                                    <FlatButton style={style.flatButton} rippleColor="white" label="." labelStyle={style.operationsButtons} onClick={() => {
                                        this.addNum(".")
                                    }} disabled={true} />
                                </TableRowColumn>
                                <TableRowColumn>
                                    <FlatButton style={style.flatButton} rippleColor="white" label="0" labelStyle={style.operationsButtons} onClick={() => {
                                        this.addNum(0)
                                    }} />
                                </TableRowColumn>
                                <TableRowColumn>
                                    <FloatingActionButton style={style.actionButton} secondary={true} zDepth={4} onClick={() => {
                                        this.result()
                                    }}>
                                        =
                                    </FloatingActionButton>
                                </TableRowColumn>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        );
    }
}

export default Calculator;