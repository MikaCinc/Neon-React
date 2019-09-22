import React, { Component, Fragment } from 'react';

import DatePicker from 'material-ui/DatePicker';
import _ from "lodash";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Zoom from '@material-ui/core/Zoom';
import Fade from '@material-ui/core/Fade';
import Divider from '@material-ui/core/Divider';

import Stopwatch from "./Components/StopWatch.js";
import Countdown from "./Components/Countdown.js";

import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment'

import { withStyles } from '@material-ui/core/styles';

import * as moment from 'moment';

import {
    cyan500,
    pinkA200,
} from 'material-ui/styles/colors';

const styles = theme => ({
    Menu: {
        width: '100%',
        maxWidth: 240,
        backgroundColor: theme.palette.background.paper,
        marginRight: "20px",
        marginBottom: "20px",
    },
    Content: {
        width: '100%',
        maxWidth: 300,
        backgroundColor: theme.palette.background.paper,
        minHeight: 100,
        height: "auto",
        padding: 75,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },

    root: {
        flexGrow: 1,
    },

    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
        marginRight: "10px"
    },

    Avatar: {
        backgroundColor: theme.palette.primary.main,
        marginRight: 10,
    },

    newRow: {
        display: 'block'
    }
});

class Time extends Component {
    constructor(props) {
        super(props);
        this.state = {
            compare: {
                date1: moment().unix() * 1000,
                date2: moment().unix() * 1000,
            },
            Menu: [
                {
                    ID: 1,
                    Title: "Compare dates",
                    Icon: "compare_arrows"
                },
                {
                    ID: 2,
                    Title: "Stopwatch",
                    Icon: "timer"
                },
                {
                    ID: 3,
                    Title: "Countdown",
                    Icon: "timelapse"
                },
            ],
            Current: 2
        }
    }

    componentDidMount() {
        //this.inter = setInterval(this.updateNowInState, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.inter)
    }


    updateNowInState = () => {
        this.setState({
            now: moment()
        })
    }


    handleDateChange = (date, key) => {
        console.log(date.unix() * 1000, key)
        this.setState({
            compare: {
                ...this.state.compare,
                [key]: date.unix() * 1000
            }
        })
    }

    compareTime() {
        const { classes } = this.props;
        const { date1, date2 } = this.state.compare;

        return (
            <Fragment>
                <div className={classes.newRow}>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            format="MM/DD/YYYY"
                            margin="normal"
                            id="date-picker-inline"
                            label="First date"
                            value={date1}
                            onChange={(date) => this.handleDateChange(date, 'date1')}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            style={{ display: 'block' }}
                        />
                    </MuiPickersUtilsProvider>
                </div>
                <div className={classes.newRow}>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            format="MM/DD/YYYY"
                            margin="normal"
                            id="date-picker-inline"
                            label="Second date"
                            value={date2}
                            onChange={(date) => this.handleDateChange(date, 'date2')}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </div>
                <div className={classes.newRow}>
                    <Paper elevation={1} style={{ display: 'block' }}>
                        <p>{moment(date1).diff(moment(date2), 'days')}</p>
                    </Paper>
                </div>
            </Fragment>
        )
    }


    renderContentInner() {
        clearInterval(this.inter);

        const { classes } = this.props;

        switch (this.state.Current) {
            case 1: return this.compareTime();
            case 2: return <Paper className={classes.Content} elevation={10}><Stopwatch /></Paper>;
            case 3: return <Paper className={classes.Content} elevation={10}><Countdown /></Paper>;
            default: return <Paper className={classes.Content} elevation={10}><Stopwatch /></Paper>;
        }
    }

    renderContent() {
        return (
            this.renderContentInner()
        );
    }

    renderMenu() {
        const { classes } = this.props;

        return (
            <Paper elevation={3} className={classes.Menu}>
                <List component="nav" dense>
                    {
                        this.state.Menu.map((item, index) => {
                            return (
                                <Zoom in={true}
                                    key={item.ID}
                                    style={{ transitionDelay: index * 100 }}
                                >
                                    <div>
                                        <ListItem
                                            dense
                                            button
                                            onClick={() => {
                                                this.setState({
                                                    Current: item.ID
                                                })
                                            }}
                                        >
                                            <Avatar className={classes.Avatar}>
                                                <i className="material-icons">
                                                    {item.Icon}
                                                </i>
                                            </Avatar>
                                            <ListItemText primary={item.Title} />
                                        </ListItem>
                                        {
                                            !(this.state.Menu.length - 1 === index)
                                                ? <Divider variant="inset" />
                                                : null
                                        }
                                    </div>
                                </Zoom>
                            );
                        })
                    }
                </List>
            </Paper>
        )
    }

    render() {
        return (
            <div>
                <Grid
                    container
                    spacing={10}
                    className={""}
                    alignItems={"center"}
                    direction={"row"}
                    justify={"center"}
                    style={{ marginTop: 50 }}
                >
                    {this.renderMenu()}
                    <Fade in={true} style={{ transitionDelay: 100 }}>
                        {this.renderContent()}
                    </Fade>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(Time);