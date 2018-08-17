import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const styles = {
    root: {
        flexGrow: 1,
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
                        this.props.lists.map((item) => {
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

export default withStyles(styles)(Lists);

/* 
<button id="add-new-list" className="hoverable" onClick={
                        () => {
                            this.props.newList()
                        }
                    }>+</button> */