import React, { Component } from 'react';
import TextEditor from "../../Components/TextEditor";
import NotesView from "./NotesView";
import _ from "lodash";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

import * as CountersActions from "../../Actions/CountersActions";

const MainActions = {
    ...CountersActions
}

const styles = theme => ({
    notesList: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        display: "inline-block",
        marginRight: "20px",
        marginBottom: "20px",
        position: "absolute",
        top:0,
        bottom: 0,
        left: 0,
    },
});

class Notes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentID: this.props.Notes[0].ID
        }
    }

    renderNotesList() {
        if (!this.props.Notes || !this.props.Notes.length) return null;

        const { classes } = this.props;

        return <List component="nav" className={classes.notesList}>
            {
                this.props.Notes.map((note) => {
                    return (
                        <ListItem
                            key={note.ID}
                            dense
                            button
                            onClick={() => {
                                this.setState({
                                    currentID: note.ID
                                })
                            }}
                        >
                            <Avatar>{note.Title[0]}</Avatar>
                            <ListItemText primary={note.Title} />
                        </ListItem>
                    );
                })
            }
        </List>


    }

    render() {
        return (
            <div>
                {this.renderNotesList()}
                <NotesView
                    Note={_.find(this.props.Notes, { ID: this.state.currentID })}
                />
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