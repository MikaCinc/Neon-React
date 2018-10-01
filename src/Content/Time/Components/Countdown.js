import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Fade from '@material-ui/core/Fade';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

import Success from '../../../Components/SnackBars/SnackSuccess';

import moment from 'moment';

import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
    fab: {
        marginRight: theme.spacing.unit,
        marginLeft: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
    chip: {
        display: "block",
        marginTop: theme.spacing.unit,
    },
    InputFields: {
        margin: 7,
    }
});

class Countdown extends Component {
    constructor(props) {
        super(props);

        this.updateDisplay = this.updateDisplay.bind(this);
        this.handleSBClose = this.handleSBClose.bind(this);

        this.state = {
            display: "00:00:00",
            action: "pause",
            time: {
                h: 0,
                m: 0,
                s: 20
            },
            snackBarSuccess: false
        }

        this.timer = null;
    }

    componentWillUnmount() {
        this.initial();
    }


    handleInputChange(label, value) {
        this.setState({
            time: {
                ...this.state.time,
                [label]: value
            }
        })
    }

    makeOptionsArr(label) {
        if (label === "h") {
            let arr = [];
            for (let i = 0; i < 24; i++) {
                let obj = {
                    value: i,
                    label: i,
                }
                arr.push(obj);
            }

            return arr;
        }

        let arr = [];
        for (let i = 0; i < 60; i++) {
            let obj = {
                value: i,
                label: i,
            }
            arr.push(obj);
        }

        return arr;
    }

    renderDisplay() {
        const { classes } = this.props;
        if (this.state.display === "00:00:00") {
            return (
                <div className={classes.InputFields}>
                    <TextField
                        select
                        variant="outlined"
                        label="Hours"
                        value={this.state.time.h}
                        onChange={(e) => this.handleInputChange('h', e.target.value)}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">H</InputAdornment>,
                        }}
                    >
                        {this.makeOptionsArr("h").map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        select
                        variant="outlined"
                        label="Minutes"
                        value={this.state.time.m}
                        onChange={(e) => this.handleInputChange('m', e.target.value)}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">M</InputAdornment>,
                        }}
                    >
                        {this.makeOptionsArr("m").map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        select
                        variant="outlined"
                        label="Seconds"
                        value={this.state.time.s}
                        onChange={(e) => this.handleInputChange('s', e.target.value)}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">S</InputAdornment>,
                        }}
                    >
                        {this.makeOptionsArr("s").map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
            )
        }
        return (
            <h1>
                {moment(this.state.display).format("HH:mm:ss")}
            </h1>
        )
    }

    updateDisplay() {
        if (this.state.display.format("HH:mm:ss") === "00:00:00") {
            console.log("FINISHED!")
            clearInterval(this.timer)
            this.initial();
            this.setState({
                snackBarSuccess: true
            })
        } else {
            this.setState({
                display: this.state.display.subtract(1, "second")
            })
        }
    }

    initial() {
        this.setState({
            display: "00:00:00",
            action: "pause",
            time: {
                h: 0,
                m: 0,
                s: 20
            }
        });

        clearInterval(this.timer);
    }

    handleStartPause() {
        if (this.state.display === "00:00:00") {
            const { time } = this.state;
            this.setState({
                display: moment(`${time.h}:${time.m}:${time.s}`, "HH:mm:ss"),
            });
            this.timer = setInterval(this.updateDisplay, 1000);
            return;
        }

        if (this.state.action === "pause") {
            clearInterval(this.timer);
            return;
        } else {
            this.timer = setInterval(this.updateDisplay, 1000);
            return;
        }

        /* this.setState({
            action: this.state.action === "start" ? "pause" : "start",
            time: this.state.display === "00:00:00"
                ? moment("00:00:00", "HH:mm:ss")
                : this.state.time
        }, () => {
            if (this.state.action === "start") {
                this.timer = setInterval(this.updateDisplay, 1000);
            } else {
                clearInterval(this.timer);
            }
        }) */
    }

    renderControls() {
        const { classes } = this.props;

        return (
            <Fade in={true}>
                <div>
                    <Tooltip title={"Reset"}>
                        <IconButton
                            color="secondary"
                            className={classes.button}
                            aria-label="FlagOrReset"
                            onClick={() => {
                                this.initial()
                            }}
                        >
                            <i className="material-icons">
                                {"restore"}
                            </i>
                        </IconButton>
                    </Tooltip>

                    <Button
                        variant="extendedFab"
                        color="primary"
                        className={classes.fab}
                        onClick={() => {
                            this.setState({
                                action: this.state.action === "start" ? "pause" : "start",
                            }, () => {
                                this.handleStartPause()
                            })
                        }}>
                        <i className="material-icons" style={{ marginRight: "10px" }}>
                            {this.state.action === "start" ? "pause" : "play_arrow"}
                        </i>
                        {this.state.action === "start" ? "Pause" : "Start"}
                    </Button>

                    <Tooltip title={"Pin to AppBar"}>
                        <IconButton
                            color="secondary"
                            className={classes.button}
                            aria-label="FlagOrReset"
                        >
                            <i className="material-icons">
                                add_location
                            </i>
                        </IconButton>
                    </Tooltip>
                </div>
            </Fade>
        )
    }

    renderFlags() {
        const { flags } = this.state;
        if (!flags || !flags.length) return null;

        const { classes } = this.props;

        return (
            <div>
                {
                    flags.map((flag, index) => {
                        return (
                            <div
                                className={classes.chip}
                                key={flag.ID}
                            >
                                <Badge
                                    badgeContent={index + 1}
                                    color="secondary"
                                >
                                    <Chip
                                        avatar={
                                            <Avatar>
                                                <i className="material-icons">
                                                    flag
                                                </i>
                                            </Avatar>
                                        }
                                        variant="outlined"
                                        label={flag.time}

                                    />
                                </Badge>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    handleSBClose() {
        this.setState({
            snackBarSuccess: false
        })
    }

    render() {
        return (
            <div>
                {this.renderDisplay()}
                {this.renderControls()}
                {this.renderFlags()}
                <Success
                    open={this.state.snackBarSuccess}
                    handleClose={this.handleSBClose}
                    text={"Countdown finished!"}
                />
            </div>
        );
    }
}

export default withStyles(styles)(Countdown);