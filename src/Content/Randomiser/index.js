import React, { Component, Fragment } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';

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


class Randomiser extends Component {
    constructor(props) {
        super(props);

        this.handleMenuClick = this.handleMenuClick.bind(this);

        this.NumberHighlight = React.createRef();

        this.state = {
            current: 0,
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
            case 0: return this.renderNumbers();
            case 1: return this.renderColor();
            case 2: return this.renderCoin();
            case 3: return this.renderDice();
        }
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
                                if (index === arr.length - 1) return <span
                                    key={index}
                                >
                                    {
                                        num
                                    }
                                </span>;
                                return <span
                                    key={index}
                                    style={
                                        num === parseInt(state.Highlight, 10)
                                            ? { color: "red" }
                                            : {}
                                    }
                                >
                                    {
                                        num + ", "
                                    }
                                </span>
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

    renderNumbers() {
        const { classes } = this.props;

        return (
            <div>
                <Card elevation={5} className={classes.content}>
                    <TextField
                        id="NumberOfIntegers"
                        defaultValue={this.state.Number.NumberOfIntegers}
                        className={classes.textField}
                        fullWidth
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
                        onClick={() => this.handleMenuClick(0)}
                        className={classes.chip}
                    />
                    <Chip
                        avatar={<Avatar>CO</Avatar>}
                        label="Color"
                        onClick={() => this.handleMenuClick(1)}
                        className={classes.chip}
                    />
                    <Chip
                        avatar={<Avatar>CF</Avatar>}
                        label="Coin flipper"
                        onClick={() => this.handleMenuClick(2)}
                        className={classes.chip}
                    />
                    <Chip
                        avatar={<Avatar>DR</Avatar>}
                        label="Dice roller"
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