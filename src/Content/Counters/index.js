import React, { Component } from 'react';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

import * as CountersActions from "../../Actions/ToDoActions";

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
        margin: theme.spacing.unit,
    },

    extendedIcon: {
        marginRight: theme.spacing.unit,
    },

    fab: {
        position: 'absolute',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
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
        marginRight: "8px"
    },

    badge: {
        top: -2,
        right: -20,
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
});

class Counters extends Component {
    constructor(props) {
        super(props);
        this.counterModal = this.counterModal.bind(this);
        this.exitModals = this.exitModals.bind(this);

        this.state = {
            showEditModal: false,
        }
    }

    counterModal() {
        this.setState({
            showEditModal: true,
        })
    }

    exitModals() {
        this.setState({
            showEditModal: false,
        })
    }


    renderCounters() {
        if (!this.props.Counters || !this.props.Counters.length) return null;

        const { classes } = this.props;

        return this.props.Counters.map((Counter) => {
            return (
                <Card
                    key={Counter.ID}
                    className={classes.card}
                    raised
                    style={{ backgroundColor: Counter.Color }}
                >
                    <CardContent
                        className={classes.CardContent}
                        onClick={this.counterModal}
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
                            onClick={() => { console.log("-1") }}
                        >
                            <i className="material-icons">remove_circle_outline</i>
                        </IconButton>
                    </div>
                    <div className={classes.rightDiv}>
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            onClick={() => { console.log("+1") }}
                        >
                            <i className="material-icons">add_circle_outline</i>
                        </IconButton>
                    </div>
                </Card>
            )
        })
    }

    renderFabButton() {
        const { classes } = this.props;

        return (
            <Tooltip TransitionComponent={Zoom} title="Add new COUNTER">
                <Button
                    variant="fab"
                    color="primary"
                    className={classes.fab}
                    onClick={() => {
                        this.setState({
                            showNewCounterPopup: true
                        })
                    }}>
                    <i className="material-icons">add_circle</i>
                </Button>
            </Tooltip>
        )
    }

    render() {
        return (
            <div>
                {this.renderCounters()}
                {this.renderFabButton()}
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