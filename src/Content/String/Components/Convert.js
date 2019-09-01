import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(2),
        width: 500,
        marginLeft: "auto",
        marginRight: "auto",
        position: 'relative',
    },

    convertDiv: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        width: 250,
        marginLeft: "auto",
        marginRight: "auto",
        position: 'relative',
        marginBottom: 30,
        marginTop: 30,
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

    menu: {
        width: 200,
    },
});

class Convert extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            input: "",
            convertorID: 2,
            output: "",
            convertors: [
                {
                    ID: 0,
                    Label: "UPPERCASE"
                },
                {
                    ID: 1,
                    Label: "lowercase"
                },
                {
                    ID: 2,
                    Label: "Reverse"
                },
                {
                    ID: 3,
                    Label: "Morse code"
                },
                {
                    ID: 4,
                    Label: "ROT13"
                },
            ]
        }
    }

    handleChange(event, name) {
        this.setState({
            [name]: event.target.value,
        }, () => {
            this.setState({
                output: this.Convert()
            })
        });
    };

    Convert() {
        const { input } = this.state;

        switch (this.state.convertorID) {
            case 0: return input.toUpperCase();
            case 1: return input.toLowerCase();
            case 2: return input.split("").reverse().join("");
            case 3: return this.Morse(input);
            case 4: return this.ROT13(input);
            default: return "";
        }
    }

    ROT13(str) {
        var input = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        var output = 'NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm';
        var index = x => input.indexOf(x);
        var translate = x => index(x) > -1 ? output[index(x)] : x;
        return str.split('').map(translate).join('');
    }

    Morse(input) {
        var letters = [' ', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
        var morseLetters = ["\xa0\xa0\xa0\xa0", ". ___", "___ . . .", "___ . ___ .", "___ . .", ".", ". . ___ .", "___ ___ .", ". . . .", ". .", ". ___ ___ ___", "___ . ___", ". ___ . .", "___ ___", "___ .", "___ ___ ___", ". ___ ___ .", "___ ___ . ___", ". ___ .", ". . .", "_", ". . ___", ". . . ___", ". ___ ___", "___ . . ___", "___ . ___ ___", "___ ___ . .", ". ___ ___ ___ ___", ". . ___ ___ ___", ". . . ___ ___", ". . . . ___", ". . . . .", "___ . . . .", "___ ___ . . .", "___ ___ ___ . .", "___ ___ ___ ___ .", "___ ___ ___ ___ ___"];

        var newText = "";

        for (var i = 0; i < input.length; i++) {
            for (var j = 0; j < 37; j++) {
                if (input[i].toLowerCase() === letters[j]) {
                    newText += morseLetters[j];
                    newText += "\xa0\xa0\xa0";
                    break;
                }
            }
        }

        return newText;
    }

    renderInputCard() {
        const { classes } = this.props;

        return <Card className={classes.root} elevation={10}>
            <TextField
                id="multiline-flexible"
                label="Input"
                multiline
                fullWidth
                rows="4"
                rowsMax="4"
                value={this.state.input}
                onChange={(e) => this.handleChange(e, 'input')}
                margin="normal"
            />
        </Card>
    }

    renderConvertTypeCard() {
        const { classes } = this.props;

        return <Card className={classes.convertDiv} elevation={2}>
            <TextField
                id="select-convertor"
                select
                value={this.state.convertorID}
                onChange={(e) => this.handleChange(e, 'convertorID')}
                SelectProps={{
                    MenuProps: {
                        className: classes.menu,
                    },
                }}
                helperText="Select convert method"
                margin="normal"
            >
                {this.state.convertors.map(option => (
                    <MenuItem key={option.ID} value={option.ID}>
                        {option.Label}
                    </MenuItem>
                ))}
            </TextField>
        </Card>
    }

    renderOutputCard() {
        const { classes } = this.props;

        return <Card className={classes.root} elevation={10}>
            <TextField
                id="multiline-flexible"
                label="Output"
                multiline
                fullWidth
                rows="4"
                rowsMax="4"
                value={this.state.output}
                margin="normal"
                InputProps={{
                    readOnly: true,
                }}
            />
        </Card>
    }

    renderArrowDown() {
        const { classes } = this.props;

        return <Card className={classes.arrowDiv} elevation={0}>
            <i className="material-icons">
                keyboard_arrow_down
            </i>
        </Card>
    }

    render() {
        return (
            <div>
                {this.renderInputCard()}
                {this.renderArrowDown()}
                {this.renderConvertTypeCard()}
                {this.renderArrowDown()}
                {this.renderOutputCard()}
            </div>
        );
    }
}

export default withStyles(styles)(Convert);