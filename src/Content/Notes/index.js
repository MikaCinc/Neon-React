import React, { Component } from 'react';
import NotesView from "./NotesView";
import _ from "lodash";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';

import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

import * as CountersActions from "../../Actions/CountersActions";
//import { Fab } from '@material-ui/core';

const MainActions = {
    ...CountersActions
}

const styles = theme => ({
    notesList: {
        width: '100%',
        maxWidth: 240,
        backgroundColor: theme.palette.background.paper,
        marginRight: "20px",
        marginBottom: "20px",
    },
    root: {
        flexGrow: 1,
    },
});

const EmptyNote = {
    ID: null,
    Title: "",
    Content: "",
    Color: "#0d47a1",
    Date: new Date(),
}

class Notes extends Component {
    constructor(props) {
        super(props);

        this.handleCancel = this.handleCancel.bind(this);
        this.changeCurrentOnAdd = this.changeCurrentOnAdd.bind(this);

        this.state = {
            currentNote: this.getFirst(),
            isNew: false,
        }
    }

    /* static getDerivedStateFromProps(props, state) {
        return 
    } */

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.Notes === this.props.Notes) return null;

        if (!this.props.Notes.length) {
            return this.setState({
                currentNote: EmptyNote
            })
        }

        return this.setState({
            currentNote: this.props.Notes[0]
        })
    }


    getFirst(arr = this.props.Notes) {
        if (!arr.length) return EmptyNote;

        return arr[0]
    }

    renderNotesList() {
        const { classes, Notes } = this.props;

        if (!Notes || !Notes.length) return null;

        return (
            <Paper elevation={5} className={classes.notesList}>
                <List component="nav" dense>
                    {
                        Notes.map((note, index) => {
                            return (
                                <Zoom in={true}
                                    key={note.ID}
                                    style={{ transitionDelay: index * 100 }}
                                >
                                    <div>
                                        <ListItem
                                            dense
                                            button
                                            onClick={() => {
                                                this.setState({
                                                    currentNote: _.find(this.props.Notes, { ID: note.ID })
                                                })
                                            }}
                                        >
                                            <Avatar
                                                style={{
                                                    backgroundColor: note.Color,
                                                    marginRight: 10,
                                                }}
                                            >
                                                {note.Title[0]}
                                            </Avatar>
                                            <ListItemText primary={note.Title} />
                                        </ListItem>
                                        {
                                            !(this.props.Notes.length - 1 === index)
                                                ? <Divider variant="inset" />
                                                : null
                                        }
                                    </div>
                                </Zoom>
                            );
                        })
                    }
                </List>
            </Paper>
        )
    }

    renderFabButton() {
        const { classes } = this.props;

        return (
            <Tooltip TransitionComponent={Zoom} title="Add new NOTE">
                <Zoom in={true}>
                    <Fab
                        color="primary"
                        style={{ marginRight: '10px' }}
                        onClick={() => {
                            this.setState({
                                isNew: true,
                                currentNote: {
                                    ID: null,
                                    Title: "",
                                    Content: "",
                                    Color: "#0d47a1",
                                    Date: new Date()
                                }
                            })
                        }}>
                        <i className="material-icons">add_circle</i>
                    </Fab>
                </Zoom>
            </Tooltip>
        )
    }

    handleCancel() {
        this.setState({
            isNew: false,
            currentNote: this.getFirst()
        })
    }

    changeCurrentOnAdd(ID) {
        this.setState({
            isNew: false,
        })
    }

    getNote() {
        return {
            ID: null,
            Title: "",
            Content: "",
            Color: "#0d47a1",
            Date: new Date(),
            ...(this.state.isNew ? { ID: null } : _.find(this.props.Notes, { ID: this.state.currentID }))
        };
    }

    render() {
        return (
            <div>
                <Grid
                    container
                    spacing={10}
                    className={""}
                    direction="row"
                    justify="center"
                    alignItems="center"
                    style={{ marginTop: 50 }}
                >
                    {this.renderFabButton()}
                    {this.renderNotesList()}
                    <Zoom in={true} style={{ transitionDelay: 500 }}>
                        <NotesView
                            Note={this.state.currentNote}
                            handleCancel={this.handleCancel}
                            isNew={this.state.isNew}
                            changeCurrentOnAdd={this.changeCurrentOnAdd}
                        />
                    </Zoom>
                </Grid>
            </div>
        );
    }
}

export default compose(
    withStyles(styles),
    connect(state => {
        const { Notes } = state;

        return {
            Notes,
        };
    },
        dispatch => {
            return bindActionCreators(MainActions, dispatch);
        })
)(Notes);