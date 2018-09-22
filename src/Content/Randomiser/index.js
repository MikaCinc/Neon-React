import React, { Component, Fragment } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';

import RndNumber from "./Components/Rnd_number";
import RndColor from './Components/Rnd_color';

import { rnd_num } from "../../lib/Common";

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
    arrowDiv: {
        backgroundColor: "transparent",
        width: "auto",
        marginLeft: "auto",
        marginRight: "auto",
        position: 'relative',
        marginBottom: 30,
        marginTop: 30,
    },
    showCoin: {
        borderRadius: "100%",
        width: 300,
        height: 300,
        marginLeft: "auto",
        marginRight: "auto",
        textAlign: "center",
        verticalAlign: "center",
        lineHeight: "258px",
        transitionDuration: "0.4s",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        marginBottom: theme.spacing.unit * 4
    },
    progress: {
        marginTop: "auto",
        marginBottom: "auto",
    },

    diceSpan: {
        margin: theme.spacing.unit * 2,
        fontSize: "32px",
        backgroundColor: "black",
        color: "white"
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
    },
    showDices: {
        width: "auto",
        maxWidth: 400,
        textAlign: "justify",
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: "20px",
        padding: "10px 20px",
    }
});


class Randomiser extends Component {
    constructor(props) {
        super(props);

        this.handleMenuClick = this.handleMenuClick.bind(this);

        this.timer = null;

        this.state = {
            current: 3,
            Coin: {
                Title: "",
                progress: 0
            },
            Dice: {
                NumberOfDices: 1
            }
        }
    }

    componentDidMount() {
        this.state.Coin.current === 2 ? this.handleFlip() : null;
    }


    handleMenuClick(ID) {
        this.setState({
            current: ID
        });
    }

    renderArrowDown() {
        const { classes } = this.props;

        return <Card className={classes.arrowDiv} elevation={0}>
            <i className="material-icons">
                keyboard_arrow_down
            </i>
        </Card>
    }

    renderContent() {
        switch (this.state.current) {
            case 0: return <RndNumber />;
            case 1: return <RndColor />;
            case 2: return this.renderCoin();
            case 3: return this.renderDice();
            default: return <RndNumber />;
        }
    }

    progress = () => {
        const { progress } = this.state.Coin;
        this.setState({
            Coin: {
                ...this.state.Coin,
                progress: progress + 1,
                Title: "",
            }
        }, () => {
            if (progress >= 100) {
                clearInterval(this.timer);
                this.setState({
                    Coin: {
                        ...this.state.Coin,
                        Title: rnd_num(0, 1) === 0 ? "TAILS" : "HEADS",
                        progress: 0
                    }
                });
            }
        });
    };

    handleFlip() {
        if (this.state.Coin.progress === 0) {
            this.timer = setInterval(this.progress, 10);
        } else {
            clearInterval(this.timer);
            this.setState({
                Coin: {
                    ...this.state.Coin,
                    progress: 0
                }
            });
            this.timer = setInterval(this.progress, 10);
        }
    }

    renderCoin() {
        const { classes } = this.props;

        return <Fragment>
            <Button
                variant="extendedFab"
                aria-label="flip"
                className={classes.button}
                onClick={() => this.handleFlip()}
                color="secondary"
            >
                <i className="material-icons" style={{ marginRight: "10px" }}>
                    autorenew
                </i>
                Flip
        	</Button>
            <Card
                elevation={15}
                className={classes.showCoin}
                color="primary"
                style={
                    this.state.Coin.Title === "HEADS"
                        ? { backgroundColor: "black", color: "white" }
                        : { backgroundColor: "white", color: "black" }
                }
            >
                {
                    this.state.Coin.progress > 0
                        ? <CircularProgress
                            className={classes.progress}
                            color="secondary"
                            variant="determinate"
                            size={60}
                            value={this.state.Coin.progress}

                        />
                        : <h1>{this.state.Coin.Title}</h1>
                }
            </Card>
        </Fragment>
    }

    renderFabButton() {
        const { classes } = this.props;

        return (
            <Button
                variant="extendedFab"
                color="primary"
                className={classes.fab}
                onClick={() => {
                    this.showDices()
                }}>
                <i className="material-icons" style={{ marginRight: "10px" }}>
                    autorenew
                </i>
                GENERATE
            </Button>
        )
    }

    diceInner() {
        switch (rnd_num(1, 6)) {
            case 6: return "⚅";
            case 1: return "⚀";
            case 2: return "⚁";
            case 3: return "⚂";
            case 4: return "⚃";
            case 5: return "⚄";
            default: return;
        }
    }

    showDices() {
        var arr = [];
        for (let i = 0; i < this.state.Dice.NumberOfDices; i++) {
            arr.push(i);
        }

        return arr.map((id) => {
            return <span className="diceSpan" key={id}>
                {this.diceInner()}
            </span>
        })
    }

    renderDice() {
        const { classes } = this.props;

        return (
            <Fragment>
                <Card elevation={5} className={classes.content}>
                    <TextField
                        id="NumberOfDices"
                        defaultValue={this.state.Dice.NumberOfDices}
                        className={classes.textField}
                        fullWidth
                        label="Number of dices to generate"
                        variant="outlined"
                        margin="normal"
                        onChange={(e) => { this.setState({
                            Dice: {
                                ...this.state.Dice,
                                NumberOfDices: e.target.value
                            }
                        })}}
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

    renderChips() {
        const { classes } = this.props;

        return (
            <div>
                <div className={classes.menuCard}>
                    <Chip
                        avatar={<Avatar>NU</Avatar>}
                        label="Numbers"
                        color="primary"
                        variant={this.state.current === 0 ? "default" : "outlined"}
                        onClick={() => this.handleMenuClick(0)}
                        className={classes.chip}
                    />
                    <Chip
                        avatar={<Avatar>CO</Avatar>}
                        label="Color"
                        color="secondary"
                        variant={this.state.current === 1 ? "default" : "outlined"}
                        onClick={() => this.handleMenuClick(1)}
                        className={classes.chip}
                    />
                    <Chip
                        avatar={<Avatar>CF</Avatar>}
                        label="Coin flipper"
                        variant={this.state.current === 2 ? "default" : "outlined"}
                        onClick={() => this.handleMenuClick(2)}
                        className={classes.chip}
                    />
                    <Chip
                        avatar={<Avatar>DR</Avatar>}
                        label="Dice roller"
                        variant={this.state.current === 3 ? "default" : "outlined"}
                        onClick={() => this.handleMenuClick(3)}
                        className={classes.chip}
                    />
                </div>
                {this.renderContent()}
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.renderChips()}
            </div>
        );
    }
}

Randomiser.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Randomiser);