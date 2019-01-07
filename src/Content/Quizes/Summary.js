import React, { Component, Fragment } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

class Summary extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <Dialog
                open={this.props.showSummary}
                onClose={this.props.handleSummaryClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">{"Summary of -" + this.props.QuizName + "-"}</DialogTitle>
                <Divider variant="middle" />
                {
                    this.props.results.map((r, index) => {
                        return (
                            <Fragment key={index}>
                                <div style={{ padding: 12 }}>
                                    <p style={{ display: 'inline' }}>
                                        <b>
                                            {
                                                `#${index + 1}: ${r.QuestionText}`
                                            }
                                        </b>
                                    </p>
                                    <i
                                        className="material-icons"
                                        style={
                                            { 
                                                display: 'inline',
                                                color: r.isCorrect ? 'green' : 'red',
                                                marginLeft: 3
                                         }
                                        }>
                                        {r.isCorrect ? 'done_all' : 'close'}
                                    </i>
                                    <p>Your answer: {r.UserAnswer}</p>
                                    {
                                        !r.isCorrect
                                            ? <p>Correct answer: {r.CorrectAnswer}</p>
                                            : null
                                    }
                                </div>

                                <Divider variant="middle" />
                            </Fragment>
                        )
                    })
                }
                <Button
                    color="primary"
                    onClick={this.props.handleSummaryClose}
                >
                    Back to menu
                </Button>
            </Dialog>
        );
    }
}

export default connect(() => {
    return {};
},
    dispatch => {
        return bindActionCreators({}, dispatch);
    })(Summary);