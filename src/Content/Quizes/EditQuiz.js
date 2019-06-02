import React, { Component } from 'react';

import _ from 'lodash';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    content: {
        width: 300,
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: "20px",
        padding: "5px 10px",
    },
    showNumbers: {
        width: "auto",
        maxWidth: 700,
        textAlign: "justify",
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: "20px",
        padding: "10px 20px",
    },
    textField1: {
        width: "145px",
        marginRight: "10px"
    },
    textField2: {
        width: "145px",
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
    },
});

class EditQuiz extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Quiz: {
                ID: 0,
                Name: '',
                ShortDescription: '',
                Color: '#000',
                Tags: [],
                Questions: [
                    {
                        ID: 0,
                        Text: '',
                        Answers: [
                            {
                                Text: '',
                                Correct: false
                            },
                            {
                                Text: '',
                                Correct: false
                            },
                            {
                                Text: '',
                                Correct: false
                            },
                            {
                                Text: '',
                                Correct: true
                            },
                        ]
                    }
                ]
            },
            CurrentID: 0,
        }
    }

    componentDidMount() {
        const ID = _.uniqueId();

        this.setState({
            Quiz: {
                ID: _.uniqueId(),
                Name: '',
                ShortDescription: '',
                Color: '#000',
                Tags: [],
                Questions: [
                    {
                        ID,
                        Text: '',
                        Answers: [
                            {
                                Text: '',
                                Correct: false
                            },
                            {
                                Text: '',
                                Correct: false
                            },
                            {
                                Text: '',
                                Correct: false
                            },
                            {
                                Text: '',
                                Correct: true
                            },
                        ]
                    }
                ]
            },
            CurrentID: ID,
        })
    }
    

    handleQuestionChange({ target: { value } }, ID) {
        this.setState({
            Quiz: {
                ...this.state.Quiz,
                Questions: [
                    ...this.state.Quiz.Questions.map((Q) => {
                        if(Q.ID !== ID) return Q;
                        return {
                            ...Q,
                            Text: value
                        }
                    })
                ]
            }
        })
    }

    handleAnswerChange({ target: { value } }, index) {
        const ID = this.state.CurrentID;

        this.setState({
            Quiz: {
                ...this.state.Quiz,
                Questions: [
                    ...this.state.Quiz.Questions.map((Q) => {
                        if(Q.ID !== ID) return Q;
                        return {
                            ...Q,
                            Answers: [
                                ..._.find(this.state.Quiz.Questions, {ID}).Answers.map((A, i) => {
                                    if(i !== index) return A;
                                    return {
                                        ...A,
                                        Text: value
                                    }
                                })
                            ]
                        }
                    })
                ]
            }
        })
    }

    renderFields() {
        const { classes } = this.props;
        const { Questions } = this.state.Quiz;
        const { CurrentID } = this.state;
        const CurrentQuestion = _.find(Questions, { ID: CurrentID });
        const { Answers } = CurrentQuestion;


        return (
            <Card elevation={5} className={classes.content}>
                <TextField
                    defaultValue={CurrentQuestion.Text}
                    className={classes.textField}
                    fullWidth
                    label="Question"
                    variant="outlined"
                    margin="normal"
                    onChange={(e) => { this.handleQuestionChange(e, CurrentID) }}
                />
                <TextField
                    defaultValue={Answers[0].Text}
                    className={classes.textField1}
                    helperText="First answer"
                    margin="normal"
                    onChange={(e) => { this.handleAnswerChange(e, 0) }}
                />
                <TextField
                    defaultValue={Answers[1].Text}
                    className={classes.textField1}
                    helperText="Second answer"
                    margin="normal"
                    onChange={(e) => { this.handleAnswerChange(e, 1) }}
                />
                <TextField
                    defaultValue={Answers[2].Text}
                    className={classes.textField1}
                    helperText="Third answer"
                    margin="normal"
                    onChange={(e) => { this.handleAnswerChange(e, 2) }}
                />
                <TextField
                    id="min"
                    defaultValue={Answers[3].Text}
                    className={classes.textField1}
                    helperText="Fourth answer"
                    margin="normal"
                    onChange={(e) => { this.handleAnswerChange(e, 3) }}
                />

            </Card>
        )
    }

    render() {
        return (
            <div>
                {this.renderFields()}
            </div>
        );
    }
}

export default withStyles(styles)(EditQuiz);