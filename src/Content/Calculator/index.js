import React, { Component } from 'react';

import {
    Paper,
    TextField,
    Button,
    Fab,
    Table,
    TableBody,
    TableRow,
    TableCell,
} from '@material-ui/core';
// import TextField from 'material-ui/TextField';
// import FlatButton from 'material-ui/FlatButton';
// import RaisedButton from 'material-ui/RaisedButton';
// import IconButton from 'material-ui/IconButton';
// import FloatingActionButton from 'material-ui/FloatingActionButton';

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
                <Paper style={style.paperStyle} elevation={5}>
                    <TextField
                        placeholder="insert number..."
                        value={this.state.first ? this.state.fN : this.state.sN}
                        type="number"
                        style={style.inputStyle}
                        // floatingLabelShrinkStyle={{ fontSize: "20px", textAlign: "right" }}
                        // floatingLabelText={this.state.fN + " " + this.state.operation + " " + this.state.sN}
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
                    <Button style={style.iconButtons} name={"del"} label="del" onClick={
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
                    </Button>
                    <Button style={style.iconButtons} onClick={() => { this.clearAll() }}>
                        <i className="material-icons">
                            clear
                        </i>
                    </Button>
                    <br />
                    <Paper elevation={4} style={style.operationsDiv}>
                        <Button
                            style={{ height: "60px", width: "50px", borderRadius: "100%", }}
                            // labelStyle={style.operationsButtons} 
                            label="+"
                            onClick={
                                (event) => {
                                    this.setState({
                                        operation: "+",
                                        first: false,
                                    })
                                }
                            }> + </Button>
                        <Button style={{ height: "60px", width: "50px", borderRadius: "100%", }} value={"-"} label="-"
                            // labelStyle={style.operationsButtons} 
                            onClick={
                                (event) => {
                                    this.setState({
                                        operation: "-",
                                        first: false,
                                    })
                                }
                            }> - </Button>
                        <Button style={{ height: "60px", width: "50px", borderRadius: "100%", }} value={"×"} label="×"
                            // labelStyle={style.operationsButtons} 
                            onClick={
                                (event) => {
                                    this.setState({
                                        operation: "×",
                                        first: false,
                                    })
                                }
                            }> × </Button>
                        <Button style={{ height: "60px", width: "50px", borderRadius: "100%", }} value={"÷"} label="÷"
                            // labelStyle={style.operationsButtons} 
                            onClick={
                                (event) => {
                                    this.setState({
                                        operation: "÷",
                                        first: false,
                                    })
                                }
                            }> ÷ </Button>
                    </Paper>
                    <Table style={style.numbersDiv}>
                        <TableBody>
                            <TableRow >
                                <TableCell>
                                    <Button style={style.flatButton} label="7" onClick={() => {
                                        this.addNum(7)
                                    }}> 7 </Button>
                                </TableCell>
                                <TableCell>
                                    <Button style={style.flatButton} label="8" onClick={() => {
                                        this.addNum(8)
                                    }}> 8</Button>
                                </TableCell>
                                <TableCell>
                                    <Button style={style.flatButton} label="9" onClick={() => {
                                        this.addNum(9)
                                    }}> 9</Button>
                                </TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell>
                                    <Button style={style.flatButton} label="4" onClick={() => {
                                        this.addNum(4)
                                    }}> 4</Button>
                                </TableCell>
                                <TableCell>
                                    <Button style={style.flatButton} label="5" onClick={() => {
                                        this.addNum(5)
                                    }}> 5</Button>
                                </TableCell>
                                <TableCell>
                                    <Button style={style.flatButton} label="6" onClick={() => {
                                        this.addNum(6)
                                    }}> 6</Button>
                                </TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell>
                                    <Button style={style.flatButton} label="1" onClick={() => {
                                        this.addNum(1)
                                    }}> 1</Button>
                                </TableCell>
                                <TableCell>
                                    <Button style={style.flatButton} label="2" onClick={() => {
                                        this.addNum(2)
                                    }}> 2</Button>
                                </TableCell>
                                <TableCell>
                                    <Button style={style.flatButton} label="3" onClick={() => {
                                        this.addNum(3)
                                    }}> 3</Button>
                                </TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell>
                                    <Button style={style.flatButton} label="." onClick={() => {
                                        this.addNum(".")
                                    }} disabled={true}> .</Button>
                                </TableCell>
                                <TableCell>
                                    <Button style={style.flatButton} label="0" onClick={() => {
                                        this.addNum(0)
                                    }}> 0</Button>
                                </TableCell>
                                <TableCell>
                                    <Fab style={style.actionButton} elevation={4} onClick={() => {
                                        this.result()
                                    }}>
                                        =
                                    </Fab>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        );
    }
}

export default Calculator;