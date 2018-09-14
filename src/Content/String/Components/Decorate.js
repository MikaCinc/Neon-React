import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';

import Success from '../../../Components/SnackBars/SnackSuccess';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        width: 500,
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: 10,
        position: 'relative',
    },
    copyButton: {
        display: 'inline-block',
        paddingLeft: "5px",
        position: 'absolute',
        right: "0",
        top: "0",
        bottom: "0",
        verticalAlign: "10px"
    },
    text: {
        display: "inline-block"
    }
});

class Decorate extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSBClose = this.handleSBClose.bind(this);

        this.state = {
            text: "",
            snackBarSuccess: false
        }

        this.Decorations = [
            {
                left: "▁ ▂ ▄ ▅ ▆ ▇ █ [",
                right: "] █ ▇ ▆ ▅ ▄ ▂ ▁",
            },
            {
                left: "•´¯`•. [",
                right: "] .•´¯`•",
            },
            {
                left: "(-_-) [",
                right: "] (-_-)",
            },
            {
                left: "▀▄▀▄▀▄ [",
                right: "] ▄▀▄▀▄▀",
            },
            {
                left: "▌│█║▌║▌║ [",
                right: "] ║▌║▌║█│▌",
            },
            {
                left: "๑۞๑,¸¸,ø¤º°`°๑۩ [",
                right: "] ๑۩ ,¸¸,ø¤º°`°๑۞๑",
            },
            {
                left: "↦↦↦↦↦ [",
                right: "] ↤↤↤↤↤",
            },
            {
                left: "░▒▓█ [",
                right: "] █▓▒░",
            },
            {
                left: "➶➶➶➶➶ [",
                right: "] ➷➷➷➷➷",
            },
            {
                left: "★彡 [",
                right: "] 彡★",
            },
        ]
    }

    handleChange(event, name) {
        this.setState({
            [name]: event.target.value,
        });
    };

    copyToClipboard(text) {
        var data = new DataTransfer();
        data.items.add("text/plain", text);
        navigator.clipboard.writeText(text);
        this.setState({
            snackBarSuccess: true
        });
    }

    renderDecorations() {
        const { classes } = this.props;

        return this.Decorations.map((item, index) => {
            var textToDisplay = `${item.left} ${this.state.text} ${item.right}`;
            return <Card className={classes.root} elevation={1} key={index}>
                <Typography component="p" className={classes.text}>
                    {
                        textToDisplay
                    }
                </Typography>
                <div className={classes.copyButton}>
                    <Tooltip TransitionComponent={Zoom} title="Copy to clipboard">
                        <IconButton color="secondary" aria-label="Copy" onClick={() => {
                            this.copyToClipboard(textToDisplay)
                        }}>
                            {
                                <i className="material-icons">
                                    send
                                </i>
                            }
                        </IconButton>
                    </Tooltip>
                </div>
            </Card>
        })
    }

    handleSBClose() {
        this.setState({
            snackBarSuccess: false
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Card className={classes.root} elevation={10}>
                    <Typography component="p">
                        You can use this to decorate your string with additional characters.
                    </Typography>
                    <TextField
                        id="text"
                        label="Text"
                        className={classes.textField}
                        value={this.state.text}
                        onChange={(e) => this.handleChange(e, 'text')}
                        margin="normal"
                        inputProps={{
                            autoComplete: "off"
                        }}
                    />
                </Card>
                {this.renderDecorations()}
                <Success
                    open={this.state.snackBarSuccess}
                    handleClose={this.handleSBClose}
                />
            </div>
        );
    }
}

export default withStyles(styles)(Decorate);