import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

class NewTask extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);

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

    render() {
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">{this.props.listName}</DialogTitle>
                <DialogContent>
                    <FormControl>
                        <InputLabel htmlFor="task">Add new task</InputLabel>
                        <Input id="task" value={this.state.task.Text} onChange={this.handleChange} />
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={()=>this.props.newTask(this.state.task)} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default NewTask;