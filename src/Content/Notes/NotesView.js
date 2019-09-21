import React, { Component } from 'react';
import TextEditor from "../../Components/TextEditor";
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

import { CirclePicker } from 'react-color';
import darkColors from "../../Data/Settings/darkPickerColors";

import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

import * as NotesActions from "../../Actions/NotesActions";

const MainActions = {
    ...NotesActions
}

const styles = theme => ({
    note: {
        width: '100%',
        maxWidth: 530,
        backgroundColor: theme.palette.background.paper,
    },

    editorSpace: {
        width: '100%',
        maxWidth: 530,
        backgroundColor: theme.palette.background.paper,
        height: 375,
    },

    avatar: {
        width: 20,
        height: 20,
        marginLeft: 10,
    },

    Button: {
        display: "inline-block"
    },

    titleInput: {
        // height: 30
    }
});

class NotesView extends Component {
    constructor(props) {
        super(props);

        const { new_note, delete_note, edit_note } = this.props;
        this.new_note = new_note;
        this.delete_note = delete_note;
        this.edit_note = edit_note;

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

        this.state = {
            Note: {
                ID: null,
                Title: "",
                Content: "",
                Color: "#0d47a1",
                Date: new Date(),
                ...this.props.Note
            }
        }
    }

    isEditing() {
        return this.state.Note.ID ? true : false;
    }

    componentDidUpdate(prevProps) {
        if (!this.props.Note || prevProps.Note.ID === this.props.Note.ID) return null;
        if (!this.props.isNew) {
            return this.setState({
                Note: {
                    ID: null,
                    Title: "",
                    Content: "",
                    Color: "#0d47a1",
                    Date: new Date(),
                    ...this.props.Note
                }
            })
        }
        else {
            return this.setState({
                Note: {
                    ...this.props.Note
                }
            })
        }
    }

    handleChange(newValue) {
        this.setState({
            Note: {
                ...this.state.Note,
                Content: newValue
            }
        })
    }

    handleValueChange(label, value) {
        this.setState({
            Note: {
                ...this.state.Note,
                [label]: value
            }
        })
    }

    handleDelete() {
        this.delete_note(this.state.Note)
        // this.props.changeCurrentOnAdd()
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.isEditing()) {
            this.edit_note(this.state.Note)
        } else {
            var ID = Math.floor(Math.random() * 1000)
            this.new_note({
                ...this.state.Note,
                ID
            });
            this.props.changeCurrentOnAdd(ID)
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <form onSubmit={this.onSubmit}>
                <Paper elevation={12} className={classes.note}>
                    <TextField
                        id="full-width"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Avatar
                                        style={{ backgroundColor: this.state.Note.Color }}
                                        className={classes.avatar}
                                    >
                                        {this.state.Note.Title[0]}
                                    </Avatar>
                                </InputAdornment>
                            ),
                        }}
                        className={classes.titleInput}
                        required
                        placeholder="Enter title here..."
                        fullWidth
                        value={this.state.Note.Title}
                        onChange={(e) => {
                            this.handleValueChange("Title", e.target.value)
                        }}
                    />
                    <TextEditor
                        value={this.state.Note.Content}
                        handleChange={this.handleChange}
                    />
                    <div style={{ display: "inline-block" }}>
                        <CirclePicker
                            color={this.state.Note.Color}
                            width="260px"
                            colors={darkColors}
                            circleSpacing={3}
                            onChange={(value) => {
                                this.handleValueChange("Color", value.hex)
                            }}
                        />
                    </div>
                    {
                        this.isEditing()
                            ? <Button
                                color="secondary"
                                className={classes.Button}
                                onClick={this.handleDelete}>
                                Delete
                                </Button>
                            : <Button
                                color="secondary"
                                className={classes.Button}
                                onClick={this.props.handleCancel}>
                                Cancel
                                </Button>
                    }
                    <Button className={classes.Button} type="submit" color="primary">
                        Save
                        </Button>
                </Paper>
            </form>
        );
    }
}

export default compose(
    withStyles(styles),
    connect(() => {
        return {}
    },
        dispatch => {
            return bindActionCreators(MainActions, dispatch);
        })
)(NotesView);