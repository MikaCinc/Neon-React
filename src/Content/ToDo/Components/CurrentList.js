import React, { Component } from 'react';
import compose from 'recompose/compose';
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
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import * as ToDoActions from "../../../Actions/ToDoActions";

const MainActions = {
    ...ToDoActions
}

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        marginLeft: "auto",
        marginRight: "auto"
    },

    listItemCompleted: {
        textDecoration: "line-through"
    },

    arrow: {
        paddingTop: "15px",
        verticalAlign: "center"
    },
});

class CurrentList extends Component {
    constructor(props) {
        super(props);

        const { delete_task, edit_task } = this.props;
        this.delete_task = delete_task;
        this.edit_task = edit_task;

        this.handleModalClose = this.handleModalClose.bind(this);

        this.state = {
            showCompleted: true,
            showUncompleted: true,
            showTaskModal: false
        }
    }

    findById(list, ID, flag) {
        for (let i = 0; i < list.length; i++) {
            if (list[i].ID === ID) {
                if (!flag) {
                    return list[i].Todos;
                } else {
                    return list[i];
                }
            }
        }
    }

    handleChange(label) {
        let value = this.state[label];
        this.setState({
            [label]: !value
        })
    }

    filterTasks(flag, tasks = this.findById(this.props.Todo, this.props.currentList, false)) {
        return tasks.filter((task) => {
            if (flag) {
                return !task.Completed;
            }
            return task.Completed;
        })
    }

    renderTaskModal(item) {
        return (
            <Dialog
                open={this.state.showTaskModal}
                onClose={this.handleModalClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">{item.Text}</DialogTitle>
                <form onSubmit={this.onSubmit}>
                    <DialogContent>
                        <FormControl>
                            <InputLabel htmlFor="lis">Name your list</InputLabel>
                            <Input autoFocus id="list" value={this.state.list.ListName} onChange={this.handleChange} />
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleModalClose} color="primary">
                            Cancel
                        </Button>
                        <Button type="submit" color="primary">
                            Add
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        );
    }

    renderItems(item) {
        const { classes } = this.props;

        return <ListItem
            key={item.ID}
            role={undefined}
            dense
            button
            onClick={() => {
                const data = {
                    ID: this.props.currentList,
                    Task: {
                        ...item,
                        Completed: !item.Completed
                    }
                }
                this.edit_task(data)
            }}
            className={classes.listItem}
        >
            <ListItemAvatar>
                <Avatar onClick={() => console.log("avatar")}>
                    <i className="material-icons">
                        notes
                    </i>
                </Avatar>
            </ListItemAvatar>
            <Checkbox
                checked={item.Completed}
            />
            <ListItemText className={item.Completed ? classes.listItemCompleted : ""} primary={item.Text} />
            <ListItemSecondaryAction>
                <IconButton onClick={() => {
                    this.setState({
                        showTaskModal: true
                    })
                }}>
                    <i className="material-icons">
                        edit
                    </i>
                </IconButton>
                <IconButton aria-label="Comments" onClick={() => {
                    const data = {
                        ID: this.props.currentList,
                        Task: item
                    }
                    this.delete_task(data)
                }}>
                    <i className="material-icons">
                        delete_forever
                    </i>
                </IconButton>
            </ListItemSecondaryAction>
            {
                this.state.showTaskModal
                    ? this.renderTaskModal(item)
                    : null
            }
        </ListItem>
    }

    render() {
        const { classes } = this.props;

        return (
            <List className={classes.root}>
                <ListSubheader onClick={() => this.handleChange("showUncompleted")}>
                    <IconButton onClick={() => this.handleChange("showUncompleted")}>
                        <i className={"material-icons"}>
                            {!this.state.showUncompleted ? "keyboard_arrow_down" : "keyboard_arrow_up"}
                        </i>
                    </IconButton>
                    Uncompleted
                </ListSubheader>
                {
                    this.state.showUncompleted && this.filterTasks(true).map((item) => {
                        return (
                            this.renderItems(item)
                        )
                    })
                }
                <ListSubheader onClick={() => this.handleChange("showCompleted")}>
                    <IconButton onClick={() => this.handleChange("showCompleted")}>
                        <i className={"material-icons"}>
                            {!this.state.showCompleted ? "keyboard_arrow_down" : "keyboard_arrow_up"}
                        </i>
                    </IconButton>
                    Completed
                </ListSubheader>
                {
                    this.state.showCompleted && this.filterTasks(false).map((item) => {
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

export default compose(
    withStyles(styles),
    connect(state => {
        const { Todo } = state;

        return {
            Todo,
        };
    },
        dispatch => {
            return bindActionCreators(MainActions, dispatch);
        })
)(CurrentList);