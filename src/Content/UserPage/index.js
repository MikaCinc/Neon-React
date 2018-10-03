import React, { Component } from 'react';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import * as UserActions from "../.././Actions/UserActions";

const MainActions = {
    ...UserActions
}

const styles = theme => ({
    UserPaper: {
        margin: theme.spacing.unit * 2,
        width: "auto",
        maxWidth: 400,
        backgroundColor: theme.palette.background.paper,
        marginLeft: "auto",
        marginRight: "auto",
        padding: 20
    },

    button: {
        margin: theme.spacing.unit
    }
});

class UserPage extends Component {
    constructor(props) {
        super(props);

        const { name_change } = this.props
        this.name_change = name_change

        this.state = {
            userName: ""
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <Paper elevation={10} className={classes.UserPaper}>
                <TextField
                    id="userName-changer"
                    variant="outlined"
                    label="Your name"
                    value={this.props.User.name}
                    onChange={(event) => {
                        this.name_change(event.target.value)
                    }}
                />
                <br/>
                <Button variant="contained" color="secondary" className={classes.button}>
                    Delete your stats
                    <i className="material-icons" style={{marginLeft: "7px"}}>
                        delete_forever
                    </i>
                </Button>
            </Paper>
        );
    }
}

export default compose(
    withStyles(styles),
    connect(state => {
        const { User } = state;

        return {
            User,
        };
    },
        dispatch => {
            return bindActionCreators(MainActions, dispatch);
        })
)(UserPage);