import React, { Component } from 'react';
import TextEditor from "../../Components/TextEditor";

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

});

class Notes extends Component {
    constructor(props) {
        super(props);

    }

    renderNotesList() {
        if (!this.props.Notes || !this.props.Notes.length) return null;

        return <List component="nav">
            {
                this.props.Notes.map((note) => {
                    console.log(note.ID)
                    return <ListItem key={note.ID} dense button className={""}>
                        <Avatar>{note.Title[0]}</Avatar>
                        <ListItemText primary={note.Title} />
                    </ListItem>
                })
            }
        </List>


    }

    render() {
        return (
            <div>
                {this.renderNotesList()}
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