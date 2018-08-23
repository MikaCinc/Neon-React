import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';

import { CirclePicker } from 'react-color';
import darkColors from "../../Data/Settings/darkPickerColors";

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import * as CountersActions from "../../Actions/CountersActions";

const MainActions = {
    ...CountersActions
}

class CounterView extends Component {
    constructor(props) {
        super(props);

        const { new_counter, delete_counter, edit_counter } = this.props;
        this.new_counter = new_counter;
        this.delete_counter = delete_counter;
        this.edit_counter = edit_counter;

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

        this.state = {
            Counter: {
                ID: null,
                Title: "",
                Value: 0,
                Date: new Date(),
                Color: "#0d47a1",
                Goal: 0,
                ...this.props.Counter
            }
        }
    }

    isEditing() {
        return this.state.Counter.ID ? true : false;
    }

    handleChange(label, value) {
        this.setState({
            Counter: {
                ...this.state.Counter,
                [label]: value
            }
        })
    }

    handleDelete() {
        this.props.handleClose()
        this.delete_counter(this.state.Counter)
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.isEditing()) {
            this.edit_counter(this.state.Counter)
        } else {
            var ID = Math.floor(Math.random() * 1000)
            this.new_counter({
                ...this.state.Counter,
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
                            ? "Edit counter"
                            : "Add new counter"
                    }
                    {
                        this.isEditing()
                        && <Tooltip TransitionComponent={Zoom} title="DELETE COUNTER">
                            <IconButton
                                key="delete"
                                aria-label="Delete"
                                color="inherit"
                                onClick={this.handleDelete}
                            >
                                <i className="material-icons">delete_forever</i>
                            </IconButton>
                        </Tooltip>
                    }
                </DialogTitle>
                <form onSubmit={this.onSubmit}>
                    <DialogContent>
                        <FormControl>
                            <TextField
                                required
                                autoFocus
                                label="Name your counter"
                                id="list"
                                value={this.state.Counter.Title}
                                onChange={(e) => {
                                    this.handleChange("Title", e.target.value)
                                }} />
                        </FormControl>
                        <br />
                        <FormControl>
                            <InputLabel htmlFor="lis">
                                {
                                    this.isEditing()
                                        ? "Value"
                                        : "Starting value"
                                }
                            </InputLabel>
                            <Input
                                autoFocus
                                id="list"
                                value={this.state.Counter.Value}
                                onChange={(e) => {
                                    this.handleChange("Value", parseInt(e.target.value, 10))
                                }} />
                        </FormControl>
                        <br />
                        <FormControl>
                            <InputLabel htmlFor="lis">Counter goal</InputLabel>
                            <Input
                                autoFocus
                                id="list"
                                value={this.state.Counter.Goal}
                                onChange={(e) => {
                                    this.handleChange("Goal", parseInt(e.target.value, 10))
                                }} />
                        </FormControl>
                        <br />
                        <br />
                        <FormControl>
                            <CirclePicker
                                color={this.state.Counter.Color}
                                width="180px"
                                colors={darkColors}
                                circleSpacing={17}
                                onChange={(value) => {
                                    this.handleChange("Color", value.hex)
                                }}
                            />
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.handleClose} color="secondary">
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
    })(CounterView);