import React, { Component, Fragment } from 'react'
import QuizTile from './QuizTile';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import { Fab } from '@material-ui/core';

import Success from '../../Components/SnackBars/SnackSuccess';
import Error from '../../Components/SnackBars/SnackError';
import Summary from './Summary';

import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';

import _ from 'lodash';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

import * as QuizActions from "../../Actions/QuizActions";

import EditQuiz from './EditQuiz';

const MainActions = {
    ...QuizActions
}

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
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
    },
});

class Quizes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: "start", // Think about it
            toEdit: {},
            toPlay: {},
            shuffledQuestions: [],
            nextQuestion: 0,
            isFinished: false,
            answerResults: [],
            showSnackbar: false,
            showDeleteSnackbar: false,
            snackMessage: '',
            snackType: '',
            showSummary: false,
            lastDeletedQuiz: {}
        }

        const { delete_quiz, new_quiz } = this.props;
        this.delete_quiz = delete_quiz;
        this.new_quiz = new_quiz;

        this.handlePlay = this.handlePlay.bind(this);
        this.handleSnackbarClose = this.handleSnackbarClose.bind(this);
        this.handleSummaryClose = this.handleSummaryClose.bind(this);
        this.handleDeleteQuiz = this.handleDeleteQuiz.bind(this);
        this.handleUndoDelete = this.handleUndoDelete.bind(this);
        //this.handleAnswer = this.handleAnswer.bind(this);
    }

    handleSummaryClose() {
        this.setState({
            showSummary: false,
            toPlay: {},
            shuffledQuestions: [],
            nextQuestion: 0,
            isFinished: true,
            answerResults: [],
        })
    }

    handleSnackbarClose() {
        this.setState({
            showSnackbar: false,
            showDeleteSnackbar: false
        })
    }

    getNextQuestion() {
        return this.state.shuffledQuestions[this.state.nextQuestion];
    }

    returnShuffledQuiz(QuestionsArray) {
        return _.shuffle(QuestionsArray.map((Question) => {
            return {
                ...Question,
                Answers: _.shuffle(Question.Answers)
            }
        }))
    }

    handleDeleteQuiz(ID) {
        this.delete_quiz({ ID });

        this.setState({
            lastDeletedQuiz: _.find(this.props.Quizes, {ID}),
            showDeleteSnackbar: true,
        })
    }

    handleUndoDelete() {
        this.new_quiz(this.state.lastDeletedQuiz);

        this.setState({
            showDeleteSnackbar: false,
        })
    }

    handlePlay(ID) {
        const obj = _.find(this.props.Quizes, { ID: ID })

        this.setState({
            currentPage: "QuizPlay", // Think about it
            toPlay: obj,
            shuffledQuestions: this.returnShuffledQuiz(obj.Questions), // We randomise order of questions and answers
            nextQuestion: 0,
            isFinished: false,
            answerResults: [],
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
                                    onDelete={this.handleDeleteQuiz}
                                />
                            </Grid>
                        )
                    })
                }
            </Grid>
        )
    }

    handleAnswer(Ans) {
        this.setState({
            showSnackbar: true,
            answerResults: [
                ...this.state.answerResults,
                {
                    QuestionText: this.state.shuffledQuestions[this.state.nextQuestion].Text,
                    UserAnswer: Ans.Text,
                    CorrectAnswer: _.find(this.state.shuffledQuestions[this.state.nextQuestion].Answers, { Correct: true }).Text,
                    isCorrect: Ans.Correct,
                }
            ],
            snackMessage: Ans.Correct ? 'Correct!' : 'Not correct!',
            snackType: Ans.Correct ? 'Success' : 'Error'
        }, () => {
            if (this.state.nextQuestion + 2 > this.state.shuffledQuestions.length) {
                this.setState({
                    isFinished: true,
                    showSummary: true,
                })
            } else {
                this.setState({
                    nextQuestion: this.state.nextQuestion + 1,

                })
            }
        })
    }

    renderPage() {
        const { classes } = this.props;

        if(this.state.newQuiz) return <EditQuiz />;

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
                        Q.Answers.map((Ans, index) => {
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

    renderSnackBar() {
        //const { classes } = this.props;

        return this.state.snackType === "Success"
            ? <Success
                open={this.state.showSnackbar}
                handleClose={this.handleSnackbarClose}
                text={this.state.snackMessage}
                autoHideDuration={1500}
            />
            : <Error
                open={this.state.showSnackbar}
                handleClose={this.handleSnackbarClose}
                text={this.state.snackMessage}
                autoHideDuration={1500}
            />
    }

    renderUndoDeleteSnackbar() {
        const { classes } = this.props; 

        return (
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                open={this.state.showDeleteSnackbar}
                autoHideDuration={6000}
                onClose={this.handleSnackbarClose}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">Quiz deleted</span>}
                action={[
                    <Button key="undo" color="secondary" size="small" onClick={this.handleUndoDelete}>
                        UNDO
                    </Button>,
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        className={classes.close}
                        onClick={this.handleSnackbarClose}
                    >
                        <i className="material-icons">close</i>
                    </IconButton>,
                ]}
            />
        )
    }

    renderSummary() {
        if (!this.state.isFinished) return null;

        return <Summary
            showSummary={this.state.showSummary}
            handleSummaryClose={this.handleSummaryClose}
            QuizName={this.state.toPlay.Name}
            results={this.state.answerResults}
        />
    }

    renderFabButton() {
        const { classes } = this.props;

        return (
            <Tooltip TransitionComponent={Zoom} title="Add new QUIZ">
                <Fab
                    variant="extended"
                    color="primary"
                    className={classes.fab}
                    onClick={() => {
                        this.setState({
                            newQuiz: true
                        })
                    }}>
                    <i className="material-icons" style={{marginRight: "10px"}}>add_circle</i>
                    New Quiz
                </Fab>
            </Tooltip>
        )
    }

    render() {
        return (
            <div>
                {this.renderPage()}
                {this.renderSnackBar()}
                {this.renderSummary()}
                {this.renderUndoDeleteSnackbar()}
                {this.renderFabButton()}
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
            return bindActionCreators(MainActions, dispatch);
        })
)(Quizes);