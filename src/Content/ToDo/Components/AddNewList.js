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

class AddNewList extends Component {
    constructor(props) {
        super(props);

        const { new_list } = this.props;
        this.new_list = new_list;

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            list: {
                ID: Math.floor(Math.random() * 1000),
                ListName: "",
                Archived: false,
                Todos: []
            }
        }
    }

    handleChange(e) {
        this.setState({
            list: {
                ...this.state.list,
                ListName: e.target.value
            }
        })
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.handleClose();
        this.props.new_list(this.state.list);
    }

    render() {
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Add new list</DialogTitle>
                <form onSubmit={this.onSubmit}>
                    <DialogContent>
                        <FormControl>
                            <InputLabel htmlFor="lis">Name your list</InputLabel>
                            <Input autoFocus id="list" value={this.state.list.ListName} onChange={this.handleChange} />
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
    })(AddNewList);