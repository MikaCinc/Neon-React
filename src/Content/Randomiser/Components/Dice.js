import React, { Component, Fragment } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { rnd_num } from "../../../lib/Common";
import { Fab } from '@material-ui/core';

const styles = theme => ({
    content: {
        width: 300,
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: "20px",
        padding: "5px 10px",
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
    button: {
        marginBottom: theme.spacing(4)
    },

    diceSpan: {
        margin: theme.spacing(2),
        fontSize: "32px",
        backgroundColor: "black",
        color: "white"
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    showDices: {
        width: "auto",
        maxWidth: 400,
        textAlign: "center",
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: "20px",
        padding: "10px 20px",
    }
});

class Dice extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Dice: {
                NumberOfDices: 6,
                Dices: []
            }
        }
    }

    componentDidMount() {
        this.generateDices()
    }


    renderArrowDown() {
        const { classes } = this.props;

        return <Card className={classes.arrowDiv} elevation={0}>
            <i className="material-icons">
                keyboard_arrow_down
            </i>
        </Card>
    }

    renderFabButton() {
        const { classes } = this.props;

        return (
            <Fab
                variant="extended"
                color="primary"
                className={classes.fab}
                onClick={() => {
                    this.generateDices()
                }}>
                <i className="material-icons" style={{ marginRight: "10px" }}>
                    border_outer
                </i>
                Roll
            </Fab>
        )
    }

    diceInner(dice) {
        switch (dice) {
            case 6: return "https://png.icons8.com/material/50/000000/6.png";
            case 1: return "https://png.icons8.com/material/50/000000/1.png";
            case 2: return "https://png.icons8.com/material/50/000000/2.png";
            case 3: return "https://png.icons8.com/material/50/000000/3.png";
            case 4: return "https://png.icons8.com/material/50/000000/4.png";
            case 5: return "https://png.icons8.com/material/50/000000/5.png";
            default: return;
        }
    }

    generateDices() {
        var arr = [];
        for (let i = 0; i < this.state.Dice.NumberOfDices; i++) {
            arr.push(rnd_num(1, 6));
        }

        this.setState({
            Dice: {
                ...this.state.Dice,
                Dices: [...arr]
            }
        })
    }

    showDices() {
        return this.state.Dice.Dices.map((dice, index) => {
            return <img
                alt="dice"
                className="diceSpan"
                src={this.diceInner(dice)}
                key={index}
            />
        })
    }

    render() {
        const { classes } = this.props;

        return (
            <Fragment>
                <Card elevation={5} className={classes.content}>
                    <TextField
                        id="NumberOfDices"
                        defaultValue={this.state.Dice.NumberOfDices}
                        className={classes.textField}
                        fullWidth
                        label="Number of dices to roll"
                        variant="outlined"
                        margin="normal"
                        onChange={(e) => {
                            this.setState({
                                Dice: {
                                    ...this.state.Dice,
                                    NumberOfDices: e.target.value
                                }
                            }, () => { this.generateDices() })
                        }}
                    />
                </Card>
                {this.renderArrowDown()}
                <Card elevation={2} className={classes.showDices}>
                    {this.showDices()}
                </Card>
                {this.renderFabButton()}
            </Fragment>
        )
    }
}

export default withStyles(styles)(Dice);