import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Card from '@material-ui/core/Card';

import RndNumber from "./Components/Rnd_number";
import RndColor from './Components/Rnd_color';

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
});


class Randomiser extends Component {
    constructor(props) {
        super(props);

        this.handleMenuClick = this.handleMenuClick.bind(this);

        this.state = {
            current: 1,
        }
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
            case 0: return <RndNumber/>;
            case 1: return <RndColor/>;
            case 2: return this.renderCoin();
            case 3: return this.renderDice();
            default: return <RndNumber/>;
        }
    }

    renderColor() {

    }

    renderCoin() {

    }

    renderDice() {

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
                        variant={this.state.current === 0 ? "filled" : "outlined"}
                        onClick={() => this.handleMenuClick(0)}
                        className={classes.chip}
                    />
                    <Chip
                        avatar={<Avatar>CO</Avatar>}
                        label="Color"
                        color="secondary"
                        variant={this.state.current === 1 ? "filled" : "outlined"}
                        onClick={() => this.handleMenuClick(1)}
                        className={classes.chip}
                    />
                    <Chip
                        avatar={<Avatar>CF</Avatar>}
                        label="Coin flipper"
                        variant={this.state.current === 2 ? "filled" : "outlined"}
                        onClick={() => this.handleMenuClick(2)}
                        className={classes.chip}
                    />
                    <Chip
                        avatar={<Avatar>DR</Avatar>}
                        label="Dice roller"
                        variant={this.state.current === 3 ? "filled" : "outlined"}
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