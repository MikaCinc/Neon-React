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

class ListEdit extends Component {
    constructor(props) {
        super(props);

        const { new_list, edit_list } = this.props;
        this.new_list = new_list;
        this.edit_list = edit_list;

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            list: {
                ID: "",
                ListName: "",
                Archived: false,
                Todos: [],
                ...this.props.list
            }
        }
    }

    isEditing() {
        return this.state.list.ID ? true : false;
    }

    handleChange(label, value) {
        this.setState({
            list: {
                ...this.state.list,
                [label]: value
            }
        })
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.isEditing()) {
            this.edit_list(this.state.list)
        } else {
            var ID = Math.floor(Math.random() * 1000)
            this.new_list({
                ...this.state.list,
                ID
            });
        }

        this.props.handleClose();

    }

    render() {
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    {
                        this.isEditing()
                            ? "Edit list"
                            : "Add new list"
                    }
                </DialogTitle>
                <form onSubmit={this.onSubmit}>
                    <DialogContent>
                        <FormControl>
                            <InputLabel htmlFor="lis">Name your list</InputLabel>
                            <Input
                                autoFocus
                                id="list"
                                value={this.state.list.ListName}
                                onChange={(e) => {
                                    this.handleChange("ListName", e.target.value)
                                }} />
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.handleClose} color="primary">
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
    })(ListEdit);