import React, { Component } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

import * as ToDoActions from "../../../Actions/ToDoActions";

const MainActions = {
    ...ToDoActions
}

class TaskView extends Component {
    constructor(props) {
        super(props);

        const { new_task } = this.props;
        this.new_task = new_task;

        this.handleTaskEdit = this.handleTaskEdit.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            Task: {
                ID: "",
                Text: "",
                Completed: false,
                Notes: "",
                Importance: 2,
                ...this.props.Task
            }
        }
    }

    isEditing() {
        return this.state.Task.ID ? true : false;
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

    onSubmit(e) {
        e.preventDefault();

        var ID = Math.floor(Math.random() * 1000),
            Task = {};

        if (this.isEditing()) {
            Task = {
                ...this.state.Task,
            }
            this.props.edit_task({
                ID: this.props.listID,
                Task
            })
        } else {
            Task = {
                ...this.state.Task,
                ID
            }
            this.props.new_task({
                ID: this.props.listID,
                Task
            })
        }

        this.props.handleModalClose()
    }

    render() {
        const { Task } = this.state;
        return (
            <Dialog
                open={this.props.showTaskModal}
                onClose={this.props.handleModalClose}
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
                                        fullWidth
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
                                color={Task.Importance === 1 ? "primary" : "default"}
                                onClick={
                                    () => {
                                        this.handleTaskEdit("Importance", 1)
                                    }
                                }
                                aria-label="Delete">
                                <i className="material-icons">
                                    low_priority
                                </i>
                            </IconButton>
                            <IconButton
                                color={Task.Importance === 2 ? "primary" : "default"}
                                onClick={
                                    () => {
                                        this.handleTaskEdit("Importance", 2)
                                    }
                                }
                                aria-label="Delete">
                                <i className="material-icons">
                                    code
                                </i>
                            </IconButton>
                            <IconButton
                                color={Task.Importance === 3 ? "primary" : "default"}
                                onClick={
                                    () => {
                                        this.handleTaskEdit("Importance", 3)
                                    }
                                }
                                aria-label="Delete">
                                <i className="material-icons">
                                    priority_high
                                </i>
                            </IconButton>
                        </div>
                        {
                            /*
                            <Button variant="flat" color="primary">
                                Move to list
                            <i className="material-icons">send</i>
                            </Button>
                            */
                        }
                        <br />
                        <FormControl>
                            <TextField
                                variant="filled"
                                label="Notes"
                                fullWidth
                                multiline
                                rows="3"
                                value={Task.Notes}
                                onChange={(e) => {
                                    this.handleTaskEdit("Notes", e.target.value)
                                }} />
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.handleModalClose} color="primary">
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
}

export default connect(() => {
    return {};
},
    dispatch => {
        return bindActionCreators(MainActions, dispatch);
    })(TaskView);