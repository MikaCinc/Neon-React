import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Fade from '@material-ui/core/Fade';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import moment from 'moment';
import { Fab } from '@material-ui/core';

const styles = theme => ({
    fab: {
        marginRight: theme.spacing.unit,
        marginLeft: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
    chip: {
        display: "block",
        marginTop: theme.spacing.unit,
    }
});

class Stopwatch extends Component {
    constructor(props) {
        super(props);

        this.updateDisplay = this.updateDisplay.bind(this);

        this.state = {
            display: "00:00:00",
            flags: [],
            action: "pause",
            time: null
        }

        this.timer = null;
    }

    componentWillUnmount() {
        this.initial();
    }

    renderDisplay() {
        return (
            <h1>
                {this.state.display}
            </h1>
        )
    }

    updateDisplay() {
        this.setState({
            time: moment(this.state.time.add(1, "second"))
        }, () => {
            this.setState({
                display: moment(this.state.time).format("HH:mm:ss")
            })
        })

    }

    initial() {
        this.setState({
            display: "00:00:00",
            flags: [],
            action: "pause",
            time: null
        });

        clearInterval(this.timer);
    }

    setFlag() {
        this.setState({
            flags: [
                ...this.state.flags,
                {
                    ID: Math.floor(Math.random() * 1000),
                    time: this.state.display
                }
            ]
        });
    }

    renderControls() {
        const { classes } = this.props;

        return (
            <Fade in={true}>
                <div>
                    <Tooltip title={this.state.action === "start" ? "Put a flag" : "Reset"}>
                        <IconButton
                            color="secondary"
                            className={classes.button}
                            aria-label="FlagOrReset"
                            onClick={() => {
                                this.state.action === "start"
                                    ? this.setFlag()
                                    : this.initial()
                            }}
                        >
                            <i className="material-icons">
                                {this.state.action === "start" ? "outlined_flag" : "restore"}
                            </i>
                        </IconButton>
                    </Tooltip>

                    <Fab
                        variant="extended"
                        color="primary"
                        className={classes.fab}
                        onClick={() => {
                            this.setState({
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
                            })
                        }}>
                        <i className="material-icons" style={{ marginRight: "10px" }}>
                            {this.state.action === "start" ? "pause" : "play_arrow"}
                        </i>
                        {this.state.action === "start" ? "Pause" : "Start"}
                    </Fab>

                    <Tooltip title={"Pin to Home"}>
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

    render() {
        return (
            <div>
                {this.renderDisplay()}
                {this.renderControls()}
                {this.renderFlags()}
            </div>
        );
    }
}

export default withStyles(styles)(Stopwatch);