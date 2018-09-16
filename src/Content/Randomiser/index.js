import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Card from '@material-ui/core/Card';

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
});


class Randomiser extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);

        this.state = {
            current: 0,
        }
    }

    handleClick(ID) {
        this.setState({
            current: ID
        });

        console.log(ID)
    }

    renderChips() {
        const { classes } = this.props;

        return (
            <Card raised className={classes.menuCard}>
                <Chip label="Basic Chip" className={classes.chip} />
                <Chip
                    avatar={<Avatar>MB</Avatar>}
                    label="Clickable Chip"
                    onClick={() => this.handleClick(1)}
                    className={classes.chip}
                />
            </Card>
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