import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

class AddNewList extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);

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

    render() {
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Add new list</DialogTitle>
                <DialogContent>
                    <FormControl>
                        <InputLabel htmlFor="lis">Name your list</InputLabel>
                        <Input id="list" value={this.state.list.ListName} onChange={this.handleChange} />
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => this.props.newList(this.state.list)} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default AddNewList;