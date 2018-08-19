import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

import * as ToDoActions from "../../../Actions/ToDoActions";

const MainActions = {
    ...ToDoActions
}

class NewTask extends Component {
    constructor(props) {
        super(props);

        const { new_task } = this.props;
        this.new_task = new_task;

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            task: {
                ID: Math.floor(Math.random() * 1000),
                Text: "",
                Completed: false
            }
        }
    }

    handleChange(e) {
        this.setState({
            task: {
                ...this.state.task,
                Text: e.target.value
            }
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const data = {
            ID: this.props.listID,
            Task: this.state.task
        }

        this.props.new_task(data)
        this.props.handleClose()
    }

    render() {
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">{this.props.listName}</DialogTitle>
                <form onSubmit={this.onSubmit}>
                    <DialogContent>
                        <FormControl>
                            <InputLabel htmlFor="task">Add new task</InputLabel>
                            <Input autoFocus id="task" value={this.state.task.Text} onChange={this.handleChange} />
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.handleClose} color="primary">
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
}

export default connect(() => {
    return {};
},
    dispatch => {
        return bindActionCreators(MainActions, dispatch);
    })(NewTask);