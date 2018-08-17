import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import ListSubheader from '@material-ui/core/ListSubheader';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        marginLeft: "auto",
        marginRight: "auto"
    },

    listItemCompleted: {
        textDecoration: "line-through"
    }
});

class CurrentList extends Component {

    filterTasks(flag, tasks = this.props.tasks) {
        return tasks.filter((task) => {
            if (flag) {
                return !task.Completed;
            }
            return task.Completed;
        })
    }

    renderItems(item) {
        const { classes } = this.props;

        return <ListItem
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
            />
            <ListItemText className={item.Completed ? classes.listItemCompleted : ""} primary={item.Text} />
            <ListItemSecondaryAction>
                <IconButton aria-label="Comments" onClick={() => this.props.deleteItem(item.ID)}>
                    <i className="material-icons">
                        delete_forever
                </i>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    }

    render() {
        const { classes } = this.props;

        return (
            <List className={classes.root}>
                <ListSubheader>Uncompleted</ListSubheader>
                {
                    this.filterTasks(true).map((item) => {
                        return (
                           this.renderItems(item)
                        )
                    })
                }
                <ListSubheader>Completed</ListSubheader>
                {
                    this.filterTasks(false).map((item) => {
                        return (
                           this.renderItems(item)
                        )
                    })
                }
                <Divider />
            </List>
        );
    }
}

CurrentList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CurrentList)