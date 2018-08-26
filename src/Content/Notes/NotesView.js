import React, { Component } from 'react';
import TextEditor from "../../Components/TextEditor";
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

import * as CountersActions from "../../Actions/CountersActions";

const MainActions = {
    ...CountersActions
}

const styles = theme => ({
    note: {
        width: '100%',
        maxWidth: 530,
        backgroundColor: theme.palette.background.paper,
        display: "inline-block"
    },

    editorSpace: {
        width: '100%',
        maxWidth: 530,
        backgroundColor: theme.palette.background.paper,
        height: 450
    }
});

class NotesView extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            Note: {
                ...this.props.Note
            }
        }
    }

    /* componentDidUpdate() {
        this.setState({
            Note: {
                ...this.props.Note
            }
        })
    } */

    handleChange(newValue) {
        this.setState({
            Note: {
                ...this.state.Note,
                Content: newValue
            }
        })
    }
    
    render() {
        console.log(this.state)
        const { classes } = this.props;
        return (
            <div className={classes.note}>
                <TextEditor
                    value={this.state.Note.Content}
                    handleChange={this.handleChange}
                >
                <div className={classes.editorSpace}></div>
                </TextEditor>
            </div>
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