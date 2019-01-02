import React, { Component, Fragment } from 'react'
import QuizTile from './QuizTile';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';

import _ from 'lodash';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        maxWidth: '50%',
        marginRight: 'auto',
        marginLeft: 'auto',
        marginBottom: 50,
    },
    Answers: {
        cursor: 'pointer',
    }
});

class Quizes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: "start", // Think about it
            toEdit: {},
            toPlay: _.find(this.props.Quizes, { ID: 1 }),
            shuffledQuestions: _.shuffle(_.find(this.props.Quizes, { ID: 1 }).Questions),
            nextQuestion: 0,
            isFinished: false,
            answerResults: [],
            showSnackbar: false,
        }

        this.handlePlay = this.handlePlay.bind(this);
        this.handleSnackbarClose = this.handleSnackbarClose.bind(this);
        //this.handleAnswer = this.handleAnswer.bind(this);
    }

    handleSnackbarClose() {
        this.setState({
            showSnackbar: false,
        })
    }

    getNextQuestion() {
        return this.state.shuffledQuestions[this.state.nextQuestion];
    }

    handlePlay(ID) {
        const obj = _.find(this.props.Quizes, { ID: ID })

        this.setState({
            currentPage: "QuizPlay", // Think about it
            toPlay: obj,
            shuffledQuestions: _.shuffle(obj.Questions), // We randomise order of questions
            nextQuestion: 0,
            isFinished: false,
        })
    }

    renderDefaultQuizes() {
        if (!this.props.Quizes || !this.props.Quizes.length) return null;

        return (
            <Grid container justify="center" spacing={32}>
                {
                    this.props.Quizes.map((item) => {
                        return (
                            <Grid key={item.ID} item>
                                <QuizTile
                                    quiz={{ ...item }}
                                    onPlay={this.handlePlay}
                                />
                            </Grid>
                        )
                    })
                }
            </Grid>
        )
    }

    handleAnswer(Ans) {
        alert(Ans.Correct ? 'Correct!' : 'Not correct!'); // Snackbar, trajanje od 1s // Animacija // Green / Red
        if (this.state.nextQuestion + 2 > this.state.shuffledQuestions.length) {
            alert("Završio si kviz!"); // Otvara se modul sa rezultatima
            this.setState({
                isFinished: true,
                toPlay: {},
            })
        } else {
            this.setState({
                nextQuestion: this.state.nextQuestion + 1,
                answerResults: [
                    ...this.state.answerResults,
                    Ans.Correct ? true : false
                ],
                showSnackbar: true,
            })
        }
    }

    renderPage() {
        const { classes } = this.props;

        if (!this.state.toPlay.ID) {
            return (
                <div style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}>
                    {this.renderDefaultQuizes()}
                </div>
            )
        }

        const Q = this.getNextQuestion();
        return (
            <Fragment>
                <Paper className={classes.root} elevation={5}>
                    <h2>{Q.Text}</h2>
                </Paper>
                <Grid container justify="center" spacing={40}>
                    {
                        _.shuffle(Q.Answers).map((Ans, index) => {
                            return (
                                <Grid key={index} item>
                                    <Button
                                        variant="contained"
                                        className={classes.Answers}
                                        onClick={() => this.handleAnswer(Ans)}
                                    >
                                        {
                                            Ans.Text
                                        }
                                    </Button>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Fragment>
        )

    }

    snackMessage() {
        if(this.state.answerResults[this.state.answerResults.length]) {
            return "Correct!";
        }

        return "Not correct!"
    }

    renderSnackBar() {
        const { classes } = this.props;

        return (
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                open={this.state.showSnackbar}
                onClose={this.handleSnackbarClose}
                autoHideDuration={1500}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">{this.snackMessage()}</span>}
            />
        )
    }

    render() {
        return (
            <div>
                {this.renderPage()}
                {this.renderSnackBar()}
            </div>
        )
    }
}

export default compose(
    withStyles(styles),
    connect(state => {
        const { Quizes } = state;

        return {
            Quizes,
        };
    },
        dispatch => {
            return bindActionCreators({}, dispatch);
        })
)(Quizes);