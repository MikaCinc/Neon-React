import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    Paper,
    TextField,
    Button,
    Fab,
    Table,
    TableBody,
    TableRow,
    TableCell,
    IconButton
} from '@material-ui/core';

import {
    grey800,
    grey400
} from 'material-ui/styles/colors';

const styles = theme => {
    // console.log(theme)
    return {
        paperStyle: {
            width: "380px",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "10%"
        },
        operationsDiv: {
            width: "100%",
            backgroundColor: theme.palette.secondary.main,
            color: "white"
        },
        operationsButtons: {
            fontSize: "30px",
            color: "white"
        },
        numbersDiv: {
            backgroundColor: theme.palette.grey,
            // color: grey400,
        },
        flatButton: {
            height: "60px",
            width: "50px",
            borderRadius: "100%",
            fontSize: '32px'
        },
        actionButton: {
            marginLeft: 17,
            backgroundColor: theme.palette.primary.main,
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
}

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
                fN: this.state.fN.toString() + num
            })
        } else {
            this.setState({
                sN: this.state.sN.toString() + num
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
        const { classes } = this.props;

        return (
            <div>
                <Paper className={classes.paperStyle} elevation={5}>
                    <TextField
                        placeholder="insert number"
                        value={this.state.first ? this.state.fN : this.state.sN}
                        type="number"
                        className={classes.inputStyle}
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
                    <IconButton className={classes.iconButtons} name={"del"} label="del" onClick={
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
                    <IconButton className={classes.iconButtons} onClick={() => { this.clearAll() }}>
                        <i className="material-icons">
                            clear
                        </i>
                    </IconButton>
                    <br />
                    <Paper elevation={4} className={classes.operationsDiv}>
                        <Button
                            style={{ height: "60px", width: "50px", borderRadius: "100%", }}
                            label="+"
                            className={classes.operationsButtons}
                            onClick={
                                (event) => {
                                    this.setState({
                                        operation: "+",
                                        first: false,
                                    })
                                }
                            }> + </Button>
                        <Button
                            style={{ height: "60px", width: "50px", borderRadius: "100%", }}
                            value={"-"}
                            label="-"
                            className={classes.operationsButtons}
                            onClick={
                                (event) => {
                                    this.setState({
                                        operation: "-",
                                        first: false,
                                    })
                                }
                            }> - </Button>
                        <Button
                            style={{ height: "60px", width: "50px", borderRadius: "100%", }}
                            value={"×"}
                            label="×"
                            className={classes.operationsButtons}
                            onClick={
                                (event) => {
                                    this.setState({
                                        operation: "×",
                                        first: false,
                                    })
                                }
                            }> × </Button>
                        <Button
                            style={{ height: "60px", width: "50px", borderRadius: "100%", }}
                            value={"÷"}
                            label="÷"
                            className={classes.operationsButtons}
                            onClick={
                                (event) => {
                                    console.log('operation')
                                    this.setState({
                                        operation: "÷",
                                        first: false,
                                    })
                                }
                            }> ÷ </Button>
                    </Paper>
                    <Table className={classes.numbersDiv}>
                        <TableBody>
                            <TableRow >
                                <TableCell>
                                    <Button className={classes.flatButton} label="7" onClick={() => {
                                        this.addNum(7)
                                    }}> 7 </Button>
                                </TableCell>
                                <TableCell>
                                    <Button className={classes.flatButton} label="8" onClick={() => {
                                        this.addNum(8)
                                    }}> 8</Button>
                                </TableCell>
                                <TableCell>
                                    <Button className={classes.flatButton} label="9" onClick={() => {
                                        this.addNum(9)
                                    }}> 9</Button>
                                </TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell>
                                    <Button className={classes.flatButton} label="4" onClick={() => {
                                        this.addNum(4)
                                    }}> 4</Button>
                                </TableCell>
                                <TableCell>
                                    <Button className={classes.flatButton} label="5" onClick={() => {
                                        this.addNum(5)
                                    }}> 5</Button>
                                </TableCell>
                                <TableCell>
                                    <Button className={classes.flatButton} label="6" onClick={() => {
                                        this.addNum(6)
                                    }}> 6</Button>
                                </TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell>
                                    <Button className={classes.flatButton} label="1" onClick={() => {
                                        this.addNum(1)
                                    }}> 1</Button>
                                </TableCell>
                                <TableCell>
                                    <Button className={classes.flatButton} label="2" onClick={() => {
                                        this.addNum(2)
                                    }}> 2</Button>
                                </TableCell>
                                <TableCell>
                                    <Button className={classes.flatButton} label="3" onClick={() => {
                                        this.addNum(3)
                                    }}> 3</Button>
                                </TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell>
                                    <Button className={classes.flatButton} label="." onClick={() => {
                                        this.addNum(".")
                                    }} disabled={true}> .</Button>
                                </TableCell>
                                <TableCell>
                                    <Button className={classes.flatButton} label="0" onClick={() => {
                                        this.addNum(0)
                                    }}> 0</Button>
                                </TableCell>
                                <TableCell>
                                    <Fab className={classes.actionButton} elevation={4} onClick={() => {
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

export default withStyles(styles)(Calculator);
