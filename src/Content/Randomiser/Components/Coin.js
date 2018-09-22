import React, { Component, Fragment } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { rnd_num } from "../../../lib/Common";

const styles = theme => ({
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
});

class Coin extends Component {
    constructor(props) {
        super(props);

        this.timer = null;

        this.state = {
            Coin: {
                Title: "",
                progress: 0
            },
        }
    }

    componentDidMount() {
        this.handleFlip();
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
    
    render() {
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
}

export default withStyles(styles)(Coin);