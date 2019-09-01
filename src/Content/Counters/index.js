import React, { Component } from 'react';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import Slide from '@material-ui/core/Slide';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import LinearProgress from '@material-ui/core/LinearProgress';

import CounterView from "./CounterView";

import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

import * as CountersActions from "../../Actions/CountersActions";
import { Fab } from '@material-ui/core';

const MainActions = {
    ...CountersActions
}

const styles = theme => ({
    card: {
        width: '100%',
        maxWidth: 360,
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: '20px',
        borderRadius: '100px',
        position: 'relative',
        color: "#FFFFFF"
    },

    button: {
        margin: theme.spacing(1),
    },

    extendedIcon: {
        marginRight: theme.spacing(1),
    },

    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },

    white: {
        color: "#fff"
    },

    CardContent: {
        display: 'inline-block',
    },

    title: {
        color: "#fff",
        fontWeight: "bold",
        display: "inline-block",
        marginRight: "8px",
        cursor: "pointer"
    },

    badge: {
        top: -2,
        right: -20,
        cursor: "pointer"
    },

    leftDiv: {
        display: 'inline-block',
        position: 'absolute',
        left: "0",
        top: "0",
        bottom: "0",
        margin: "1px",
        paddingRight: "5px",
        borderRight: "1px solid darkgrey",
        verticalAlign: "center"
    },

    rightDiv: {
        display: 'inline-block',
        position: 'absolute',
        right: "0",
        top: "0",
        bottom: "0",
        margin: "1px",
        paddingLeft: "5px",
        borderLeft: "1px solid grey"
    },

    minusButton: {
        margin: "1px"
    },

    bar: {
        position: 'absolute',
        bottom: "0",
        right: "0",
        left: "0",
    },

    completedProgress: {
        backgroundColor: '#76ff03',
    },

    uncompletedProgress: {
        backgroundColor: '#f50057',
    },
});

class Counters extends Component {
    constructor(props) {
        super(props);
        this.counterModal = this.counterModal.bind(this);
        this.exitModals = this.exitModals.bind(this);

        const { increase, decrease } = this.props;
        this.increase = increase;
        this.decrease = decrease;

        this.state = {
            showEditModal: false,
            showNewCounterPopup: false,
            CounterToEdit: {}
        }
    }

    counterModal(Counter) {
        this.setState({
            showEditModal: true,
            CounterToEdit: { ...Counter }
        })
    }

    exitModals() {
        this.setState({
            showEditModal: false,
            showNewCounterPopup: false
        })
    }

    renderProgress(Counter) {
        if (!Counter.Goal) return null;

        const { classes } = this.props;

        return (
            <LinearProgress
                color={
                    this.progress(Counter) === 100
                        ? "primary"
                        : "secondary"
                }
                variant="determinate"
                value={this.progress(Counter)}
                className={classes.bar}
            />
        )
    }

    progress(Counter) {
        if (Counter.Value >= Counter.Goal) return 100;

        return ((100 * Counter.Value) / Counter.Goal);
    }

    renderCounters() {
        if (!this.props.Counters || !this.props.Counters.length) return null;

        const { classes } = this.props;

        return this.props.Counters.map((Counter, index) => {
            return (
                <Slide
                    direction="up"
                    in={true}
                    key={Counter.ID}
                    style={{transitionDelay: 100*index}}
                    mountOnEnter
                    unmountOnExit
                >
                    <Card
                        className={classes.card}
                        raised
                        style={{ backgroundColor: Counter.Color }}
                    >
                        <CardContent
                            className={classes.CardContent}
                            onClick={() => this.counterModal(Counter)}
                        >
                            <Badge
                                badgeContent={Counter.Value}
                                color="secondary"
                                classes={{ badge: classes.badge }}
                            >
                                <Typography className={classes.title}>
                                    {Counter.Title}
                                </Typography>
                            </Badge>
                        </CardContent>
                        <div className={classes.leftDiv}>
                            <IconButton
                                key="close"
                                aria-label="Close"
                                color="inherit"
                                className={classes.minusButton}
                                onClick={() => { this.decrease(Counter.ID) }}
                            >
                                <i className="material-icons">remove_circle_outline</i>
                            </IconButton>
                        </div>
                        <div className={classes.rightDiv}>
                            <IconButton
                                key="close"
                                aria-label="Close"
                                color="inherit"
                                onClick={() => { this.increase(Counter.ID) }}
                            >
                                <i className="material-icons">add_circle_outline</i>
                            </IconButton>
                        </div>
                        {this.renderProgress(Counter)}
                    </Card>
                </Slide>
            )
        })
    }

    renderFabButton() {
        const { classes } = this.props;

        return (
            <Tooltip TransitionComponent={Zoom} title="Add new COUNTER">
                <Fab
                    variant="extended"
                    color="primary"
                    className={classes.fab}
                    onClick={() => {
                        this.setState({
                            showNewCounterPopup: true
                        })
                    }}>
                    <i className="material-icons" style={{marginRight: "10px"}}>add_circle</i>
                    New Counter
                </Fab>
            </Tooltip>
        )
    }

    renderNewCounterModal() {
        return this.state.showNewCounterPopup && <CounterView
            open={this.state.showNewCounterPopup}
            handleClose={this.exitModals}
        />
    }

    renderEditCounterModal() {
        return this.state.showEditModal && <CounterView
            open={this.state.showEditModal}
            Counter={this.state.CounterToEdit}
            handleClose={this.exitModals}
        />
    }

    render() {
        return (
            <div>
                {this.renderCounters()}
                {this.renderFabButton()}
                {this.renderNewCounterModal()}
                {this.renderEditCounterModal()}
            </div>
        );
    }
}

export default compose(
    withStyles(styles),
    connect(state => {
        const { Counters } = state;

        return {
            Counters,
        };
    },
        dispatch => {
            return bindActionCreators(MainActions, dispatch);
        })
)(Counters);