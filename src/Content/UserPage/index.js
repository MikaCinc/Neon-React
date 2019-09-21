import React, { Component } from 'react';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import * as UserActions from "../.././Actions/UserActions";
import * as GeneralActions from "../.././Actions/GeneralActions";

const MainActions = {
    ...UserActions,
    ...GeneralActions
}

const styles = theme => ({
    UserPaper: {
        margin: theme.spacing(2),
        width: "auto",
        maxWidth: 400,
        backgroundColor: theme.palette.background.paper,
        marginLeft: "auto",
        marginRight: "auto",
        padding: 20
    },

    textInput: {
        margin: theme.spacing(1)
    },

    switch: {
        // display: 'inline-block'
    },

    button: {
        margin: theme.spacing(1)
    }
});

class UserPage extends Component {
    constructor(props) {
        super(props);

        const { name_change } = this.props
        this.name_change = name_change

        this.state = {
            userName: "",
        }
    }

    render() {
        const { classes } = this.props;
        const { themeType } = this.props.General;

        return (
            <Paper elevation={10} className={classes.UserPaper}>
                <TextField
                    id="userName-changer"
                    variant="outlined"
                    label="Your name"
                    className={classes.textInput}
                    value={this.props.User.name}
                    onChange={(event) => {
                        this.name_change(event.target.value)
                    }}
                />
                <Divider variant="middle" />
                <Button variant="contained" color="secondary" className={classes.button}>
                    Delete your stats
                    <i className="material-icons" style={{ marginLeft: "7px" }}>
                        delete_forever
                    </i>
                </Button>
                <Divider variant="middle" />
                <FormControlLabel
                    control={
                        <Switch
                    checked={themeType === 'dark'}
                    onChange={() => this.props.togge_theme(themeType === 'dark' ? 'light' : 'dark')}
                    value="theme"
                    className={classes.switch}
                />
                    }
                    label="Switch to the dark side?"
                />
                <Typography variant='subtitle1' color="primary">
                    
                </Typography>
                
            </Paper>
        );
    }
}

export default compose(
    withStyles(styles),
    connect(state => {
        const { User, General } = state;

        return {
            User,
            General
        };
    },
        dispatch => {
            return bindActionCreators(MainActions, dispatch);
        })
)(UserPage);