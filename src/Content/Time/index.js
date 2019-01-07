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
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
        marginRight: "10px"
    },

    Avatar: {
        backgroundColor: theme.palette.primary.main
    }
});

class Time extends Component {
    constructor(props) {
        super(props);
        this.state = {
            now: moment(),
            selected: {
                date: moment(),
            },
            Menu: [
                {
                    ID: 1,
                    Title: "Compare time",
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
            Current: 3
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


    handleDateChange = (wrong, date) => {
        console.log(date)
        this.setState({
            selected: {
                date
            }
        })
    }

    compareTime() {
        return (
            <Fade in={true}>
                <Fragment>
                    <h1>
                        <span style={{ color: cyan500 }}>Now: </span>
                        {moment(this.state.now).format("dddd, MMMM Do YYYY, h:mm:ss a")}
                    </h1>
                    <br/>
                    <h1>
                        <span style={{ color: pinkA200 }}>Selected: </span>
                        {moment(this.state.selected.date).format("dddd, MMMM Do YYYY, h:mm:ss a")}
                    </h1>
                    <br />
                    <DatePicker
                        hintText={moment(this.state.selected.date).format("dddd, MMMM Do YYYY, h:mm:ss a")}
                        mode="landscape"
                        value={this.state.selected.date}
                        onChange={this.handleDateChange}
                    />
                    <br />
                    <Paper style={{ width: "33%", marginLeft: "auto", marginRight: "auto" }} elevation={1}>
                        <p>{moment(this.state.selected.date).from(this.state.now)}</p>
                    </Paper>
                </Fragment>
            </Fade>
        )
    }


    renderContentInner() {
        clearInterval(this.inter);

        switch (this.state.Current) {
            case 1: return this.compareTime();
            case 2: return <Stopwatch />;
            case 3: return <Countdown />;
            default: return <Stopwatch />;
        }
    }

    renderContent() {
        const { classes } = this.props;

        return (
            <Paper className={classes.Content} elevation={10}>
                {this.renderContentInner()}
            </Paper>
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
                    spacing={16}
                    className={""}
                    alignItems={"center"}
                    direction={"row"}
                    justify={"center"}
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