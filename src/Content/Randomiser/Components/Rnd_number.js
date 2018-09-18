import React, { Component, Fragment } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';

import { rnd_num } from "../../../lib/Common";

const styles = theme => ({
    menuCard: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        width: 500,
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: "20px"
    },
    chip: {
        margin: theme.spacing.unit,
    },
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
    arrowDiv: {
        backgroundColor: "transparent",
        width: "auto",
        marginLeft: "auto",
        marginRight: "auto",
        position: 'relative',
        marginBottom: 30,
        marginTop: 30,
    },
    textField1: {
        width: "145px",
        marginRight: "10px"
    },
    textField2: {
        width: "145px",
    },
});

class RndNumber extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Number: {
                NumberOfIntegers: 10,
                Min: 1,
                Max: 10,
                NumberOfColumns: 3,
                Highlight: 2,
                NumbersToShow: [
                    []
                ]
            }
        }
    }

    componentDidMount() {
        this.generateNumbers()
    }

    renderArrowDown() {
        const { classes } = this.props;

        return <Card className={classes.arrowDiv} elevation={0}>
            <i className="material-icons">
                keyboard_arrow_down
            </i>
        </Card>
    }

    handleNumberChange(e, label) {
        var value = e.target.value;
        this.setState({
            Number: {
                ...this.state.Number,
                [label]: value
            }
        }, () => {
            if (label === "Highlight") return;
            if (value === "") return;
            this.generateNumbers()
        });
    }

    showNumbers() {
        const state = this.state.Number;

        return state.NumbersToShow.map((arr, i) => {
            return (
                <Fragment key={i}>
                    <p>
                        {
                            arr.map((num, index) => {
                                return <span
                                    key={index}
                                    style={
                                        num === parseInt(state.Highlight, 10)
                                            ? { color: "red" }
                                            : {}
                                    }
                                >
                                    {
                                        index === arr.length - 1
                                            ? num
                                            : num + ", "
                                    }
                                </span>;
                            })
                        }
                    </p>
                    {
                        i === state.NumbersToShow.length - 1
                            ? null
                            : <Divider />
                    }
                </Fragment>
            )
        })
    }

    generateNumbers() {
        const state = this.state.Number;

        if (!state.NumberOfColumns) return;

        var rows = parseInt(state.NumberOfColumns, 10) >= parseInt(state.NumberOfIntegers, 10)
            ? state.NumberOfIntegers
            : state.NumberOfColumns

        var mainArr = [];
        for (let i = 0; i < rows; i++) {
            mainArr.push([])
        }

        var current = 0;
        for (let n = 0; n < state.NumberOfIntegers; n++) {
            mainArr[current].push(rnd_num(this.state.Number.Min, this.state.Number.Max))
            current++
            if (current === mainArr.length) {
                current = 0;
            }
        }

        this.setState({
            Number: {
                ...this.state.Number,
                NumbersToShow: [...mainArr]
            }
        })
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Card elevation={5} className={classes.content}>
                    <TextField
                        id="NumberOfIntegers"
                        defaultValue={this.state.Number.NumberOfIntegers}
                        className={classes.textField}
                        fullWidth
                        variant="outlined"
                        label="Password"
                        helperText="Number of integers to generate"
                        margin="normal"
                        onChange={(e) => { this.handleNumberChange(e, "NumberOfIntegers") }}
                    />
                    <TextField
                        id="min"
                        defaultValue={this.state.Number.Min}
                        className={classes.textField1}
                        helperText="Minimum"
                        margin="normal"
                        onChange={(e) => { this.handleNumberChange(e, "Min") }}
                    />
                    <TextField
                        id="max"
                        defaultValue={this.state.Number.Max}
                        className={classes.textField2}
                        helperText="Maximum"
                        margin="normal"
                        onChange={(e) => { this.handleNumberChange(e, "Max") }}
                    />
                    <TextField
                        id="min"
                        defaultValue={this.state.Number.Highlight}
                        onChange={(e) => { this.handleNumberChange(e, "Highlight") }}
                        className={classes.textField1}
                        helperText="Highlight number"
                        margin="normal"
                    />
                    <TextField
                        id="max"
                        defaultValue={this.state.Number.NumberOfColumns}
                        className={classes.textField2}
                        helperText="Rows"
                        margin="normal"
                        onChange={(e) => { this.handleNumberChange(e, "NumberOfColumns") }}
                    />
                </Card>
                {this.renderArrowDown()}
                <Card elevation={2} className={classes.showNumbers}>
                    {this.showNumbers()}
                </Card>
            </div>
        )
    }
}

export default withStyles(styles)(RndNumber);