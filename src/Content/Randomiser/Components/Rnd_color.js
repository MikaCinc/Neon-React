import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import { rnd_color } from "../../../lib/Common";

const styles = theme => ({
    propsDiv: {
        width: 300,
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: "20px",
        padding: "5px 10px",
    },
    showColor: {
        width: "auto",
        maxWidth: 400,
        minHeight: 400,
        textAlign: "center",
        marginLeft: "auto",
        marginRight: "auto",
        transitionDuration: "0.4s",
        cursor: "pointer",
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

class RndColor extends Component {
    constructor(props) {
        super(props);

        this.changeColor = this.changeColor.bind(this);

        this.state = {
            Color: rnd_color()
        }
    }

    changeColor() {
        this.setState({
            Color: rnd_color()
        });
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Card elevation={15} className={classes.showColor}>
                    <div
                        className={classes.showColor}
                        style={{ backgroundColor: this.state.Color }}
                        onClick={this.changeColor}
                    />
                </Card>
            </div>
        );
    }
}

export default withStyles(styles)(RndColor);