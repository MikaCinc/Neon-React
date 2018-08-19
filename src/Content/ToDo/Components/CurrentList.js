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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

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

    margin: {
        margin: theme.spacing.unit,
    },

    listItemCompleted: {
        textDecoration: "line-through"
    },

    arrow: {
        paddingTop: "15px",
        verticalAlign: "center"
    },

    avatar: {
        margin: 10,
    },

    pinkAvatar: {
        margin: 10,
        color: '#fff',
        backgroundColor: "pink",
    },

    greenAvatar: {
        margin: 10,
        color: '#fff',
        backgroundColor: "green",
    },
});

class CurrentList extends Component {
    constructor(props) {
        super(props);

        const { delete_task, edit_task } = this.props;
        this.delete_task = delete_task;
        this.edit_task = edit_task;

        this.onSubmit = this.onSubmit.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);

        this.state = {
            showCompleted: true,
            showUncompleted: true,
            showTaskModal: false,
            Task: {
                Importance: 2
            }
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

    handleModalClose() {
        this.setState({
            showTaskModal: false
        })
    }

    handleChange(label) {
        let value = this.state[label];
        this.setState({
            [label]: !value
        })
    }

    handleTaskEdit(label, value) {
        this.setState({
            ...this.state,
            Task: {
                ...this.state.Task,
                [label]: value
            }
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

    onSubmit(e) {
        e.preventDefault()
        this.handleModalClose()
        const data = {
            ID: this.props.currentList,
            Task: this.state.Task
        }
        this.edit_task(data)
    }

    renderTaskModal() {
        const { classes } = this.props;
        const { Task } = this.state;

        return (
            <Dialog
                open={this.state.showTaskModal}
                onClose={this.handleModalClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">{"Edit task #" + Task.ID}</DialogTitle>
                <form onSubmit={this.onSubmit}>
                    <DialogContent>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={Task.Completed}
                                    onChange={() => this.handleTaskEdit("Completed", !Task.Completed)}
                                    value={"?"}
                                />
                            }
                            label={
                                <FormControl>
                                    <InputLabel htmlFor="text">Name</InputLabel>
                                    <Input
                                        autoFocus
                                        id="text"
                                        value={Task.Text}
                                        onChange={(e) => {
                                            this.handleTaskEdit("Text", e.target.value)
                                        }} />
                                </FormControl>
                            }
                        />
                        <br />
                        <div>
                            Importance level:
                            <IconButton
                                color={Task.Importance === 1 ? "primary" : ""}
                                onClick={
                                    () => {
                                        this.handleTaskEdit("Importance", 1)
                                    }
                                }
                                aria-label="Delete">
                                <i class="material-icons">
                                    low_priority
                                </i>
                            </IconButton>
                            <IconButton
                                color={Task.Importance === 2 ? "primary" : ""}
                                onClick={
                                    () => {
                                        this.handleTaskEdit("Importance", 2)
                                    }
                                }
                                aria-label="Delete">
                                <i class="material-icons">
                                    code
                                </i>
                            </IconButton>
                            <IconButton
                                color={Task.Importance === 3 ? "primary" : ""}
                                onClick={
                                    () => {
                                        this.handleTaskEdit("Importance", 3)
                                    }
                                }
                                aria-label="Delete">
                                <i class="material-icons">
                                    priority_high
                                </i>
                            </IconButton>
                        </div>
                        <FormControl>
                            <InputLabel htmlFor="notes">Notes</InputLabel>
                            <Input
                                id="notes"
                                multiline
                                rows="4"
                                value={Task.Notes}
                                onChange={(e) => {
                                    this.handleTaskEdit("Notes", e.target.value)
                                }} />
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleModalClose} color="primary">
                            Cancel
                        </Button>
                        <Button type="submit" color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        );
    }

    renderItemImportance(item) {
        const { Importance } = item;
        switch(Importance) {
            case 1: return <i className="material-icons">low_priority</i>
            case 2: return <i className="material-icons">code</i>
            case 3: return <i className="material-icons">priority_high</i>
        }
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
                    {this.renderItemImportance(item)}
                </Avatar>
            </ListItemAvatar>
            <Checkbox
                checked={item.Completed}
            />
            <ListItemText className={item.Completed ? classes.listItemCompleted : ""} primary={item.Text} />
            <ListItemSecondaryAction>
                <IconButton onClick={() => {
                    this.setState({
                        showTaskModal: true,
                        Task: {
                            ...this.state.Task,
                            ...item
                        }
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
                {
                    this.state.showTaskModal
                        ? this.renderTaskModal()
                        : null
                }
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