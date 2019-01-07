import React, { Component, Fragment } from 'react'
import QuizTile from './QuizTile';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

import Success from '../../Components/SnackBars/SnackSuccess';
import Error from '../../Components/SnackBars/SnackError';
import Summary from './Summary';

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
            toPlay: {},
            shuffledQuestions: [],
            nextQuestion: 0,
            isFinished: false,
            answerResults: [],
            showSnackbar: false,
            snackMessage: '',
            snackType: '',
            showSummary: false,
        }

        this.handlePlay = this.handlePlay.bind(this);
        this.handleSnackbarClose = this.handleSnackbarClose.bind(this);
        this.handleSummaryClose = this.handleSummaryClose.bind(this);
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
                    CorrectAnswer: _.find(this.state.shuffledQuestions[this.state.nextQuestion].Answers, {Correct: true}).Text,
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

    renderSummary() {
        if(!this.state.isFinished) return null;
        
        return <Summary 
            showSummary={this.state.showSummary}
            handleSummaryClose={this.handleSummaryClose}
            QuizName={this.state.toPlay.Name}
            results={this.state.answerResults}
        />
    }

    render() {
        return (
            <div>
                {this.renderPage()}
                {this.renderSnackBar()}
                {this.renderSummary()}
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