import React, { Component } from 'react';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

const styles = {
    root: {
        flexGrow: 1,
        width: '100%',
        maxWidth: 720,
        marginLeft: "auto",
        marginRight: "auto",
        contentAlign: "center"
    },
};

class Lists extends Component {

    render() {
        const { classes } = this.props;

        return (
            <Paper className={classes.root}>
                <Tabs
                    value={this.props.current}
                    onChange={(event, value) => {
                        this.props.changeCurrent(value)
                    }}
                    indicatorColor="primary"
                    textColor="primary"
                    scrollable
                    scrollButtons="auto"
                >
                    {
                        this.props.Todo.map((item) => {
                            return (
                                <Tab label={item.ListName} key={item.ID} value={item.ID} />
                            )
                        })
                    }

                </Tabs>
            </Paper>
        );
    }
}

Lists.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default compose(
    withStyles(styles),
    connect(state => {
        const { Todo } = state;

        return {
            Todo,
        };
    },
        dispatch => {
            return bindActionCreators({}, dispatch);
        })
)(Lists);