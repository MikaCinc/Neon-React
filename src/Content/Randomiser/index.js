import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

import RndNumber from "./Components/Rnd_number";
import RndColor from './Components/Rnd_color';
import Coin from './Components/Coin';
import Dice from './Components/Dice';

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
        margin: theme.spacing(1),
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
        marginBottom: theme.spacing(4)
    },
    progress: {
        marginTop: "auto",
        marginBottom: "auto",
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
            current: 0,
        }
    }

    handleMenuClick(ID) {
        this.setState({
            current: ID
        });
    }

    renderContent() {
        switch (this.state.current) {
            case 0: return <RndNumber />;
            case 1: return <RndColor />;
            case 2: return <Coin />;
            case 3: return <Dice />;
            default: return <RndNumber />;
        }
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