import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
});

class CurrentList extends Component {
    render() {
        const { classes } = this.props;

        return (
            <ol>
                {
                    this.props.tasks.map((item) => {
                        return (
                            <ListItem
                                key={item.ID}
                                role={undefined}
                                dense
                                button
                                onClick={() => {
                                    this.props.toggleItem(item.ID)
                                }}
                                className={classes.listItem}
                            >
                                <Checkbox
                                    checked={item.Completed}
                                    tabIndex={-1}
                                />
                                <ListItemText primary={item.Text} />
                            </ListItem>
                        )
                    })
                }
            </ol>
        );
    }
}

CurrentList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CurrentList)


{/* <li
    key={item.ID}
    className={item.Completed ? "item-completed" : "item-default"}
    onClick={() => {
        this.props.toggleItem(item.ID)
    }}
>
    {
        item.Text
    }
</li> */}