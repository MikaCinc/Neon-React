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
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
//import Chip from '@material-ui/core/Chip';

import TaskView from './TaskView';

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

    primaryAvatar: {
        color: '#fff',
        backgroundColor: theme.palette.primary.main,
    },

    secondaryAvatar: {
        color: '#fff',
        backgroundColor: theme.palette.secondary.main,
    },

    close: {
        width: theme.spacing.unit * 4,
        height: theme.spacing.unit * 4,
    },

    buttonDelete: {
        color: '#fff',
        backgroundColor: theme.palette.secondary.main,
    }
});

class CurrentList extends Component {
    constructor(props) {
        super(props);

        const { delete_task, edit_task, new_task } = this.props;
        this.delete_task = delete_task;
        this.edit_task = edit_task;
        this.new_task = new_task;

        this.onSubmit = this.onSubmit.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleSnackbarClose = this.handleSnackbarClose.bind(this);
        this.handleUndoDelete = this.handleUndoDelete.bind(this);

        this.state = {
            showCompleted: true,
            showUncompleted: true,
            showTaskModal: false,
            showSnackbar: false,
            Task: {
                Importance: 2
            },
            lastDeleted: {}
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

    handleUndoDelete() {
        this.handleSnackbarClose()
        this.new_task({
            ID: this.props.currentList,
            Task: this.state.lastDeleted
        })
    }

    handleSnackbarClose() {
        this.setState({
            showSnackbar: false
        })
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

    renderItemImportance(item) {
        const { Importance } = item;
        switch (Importance) {
            case 1: return <i className="material-icons">low_priority</i>
            case 2: return <i className="material-icons">keyboard_arrow_right</i>
            case 3: return <i className="material-icons">priority_high</i>
            default: return <i className="material-icons">keyboard_arrow_right</i>
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
                <Avatar className={classes.primaryAvatar}>
                    {this.renderItemImportance(item)}
                </Avatar>
            </ListItemAvatar>
            <Checkbox
                checked={item.Completed}
            />
            <ListItemText
                className={item.Completed ? classes.listItemCompleted : ""}
                primary={item.Text}
                secondary={item.Notes
                    ? <i className="material-icons">notes</i>
                    : null
                }
            />
            <ListItemSecondaryAction>
                <IconButton
                    color="primary"
                    onClick={() => {
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
                <IconButton
                    aria-label="delete"
                    onClick={() => {
                        this.setState({
                            showSnackbar: true,
                            lastDeleted: {
                                ...item
                            }
                        })
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
                        ? <TaskView
                            Task={this.state.Task}
                            showTaskModal={this.state.showTaskModal}
                            listID={this.props.currentList}
                            handleModalClose={this.handleModalClose}
                        />
                        : null
                }
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    open={this.state.showSnackbar}
                    autoHideDuration={6000}
                    onClose={this.handleSnackbarClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Task deleted</span>}
                    action={[
                        <Button key="undo" color="secondary" size="small" onClick={this.handleUndoDelete}>
                            UNDO
                        </Button>,
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            className={classes.close}
                            onClick={this.handleSnackbarClose}
                        >
                            <i className="material-icons">close</i>
                        </IconButton>,
                    ]}
                />
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