import React, { Component } from 'react';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Badge from '@material-ui/core/Badge';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        maxWidth: 720,
        marginLeft: "auto",
        marginRight: "auto",
        contentAlign: "center"
    },

    padding: {
        padding: `0 ${theme.spacing.unit * 2}px`,
    }
});

class Lists extends Component {

    renderBadgeNumber(item) {
        var unCompleted = item.Todos.filter((task)=> {
            if(!task.Completed) {
                return true;
            }
            return false;
        })

        return unCompleted.length;
    }

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
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    {
                        this.props.Todo.map((item) => {
                            return (
                                <Tab
                                    label={
                                        <Badge 
                                        className={classes.padding} 
                                        color="secondary" 
                                        badgeContent={this.renderBadgeNumber(item)}>
                                            {item.ListName}
                                        </Badge>
                                    }
                                    key={item.ID}
                                    value={item.ID}
                                />
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