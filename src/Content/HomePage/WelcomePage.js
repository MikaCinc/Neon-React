import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

import moment from 'moment'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import * as GeneralActions from "../../Actions/GeneralActions";

const MainActions = {
    ...GeneralActions
};

const useStyles = makeStyles({
    card: {
        minWidth: 275,
        maxWidth: 435,
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: 10,
    },
    title: {
        margin: 7
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    cardTitle: {
        fontSize: 14,
        textAlign: 'left'
    },
    pos: {
        marginBottom: 12,
    },
    button: {
        margin: 3,
    },
    actions: {
        textAlign: "center"
    }
});

const WelcomePage = (props) => {
    const { page_change, toggle_header, toggle_drawer, change_theme_property, General: { theme: { palette: { type: themeType } } } } = props;

    const classes = useStyles();
    const [fact, setFact] = useState('');
    const [currentTime, setCurrentTime] = useState(moment().format('MM/DD/YYYY HH:mm:ss'));

    useEffect(() => {
        let url = `http://numbersapi.com/${moment().format('M/D')}/date`;
        fetch(url, {
            mode: 'no-cors'
        })
            .then((response) => response.text())
            .then(data => {
                setFact(data)
            })
    }, [])

    // console.log(themeType)
    useEffect(() => {
        var timeInt = setInterval(() => {
            return setCurrentTime(moment().format('MM/DD/YYYY HH:mm:ss'));
        }, 1000)

        return () => clearInterval(timeInt);
    }, [])


    return (
        <div>
            <Typography variant='h4' color="secondary" className={classes.title}>
                WELCOME, {props.User.name} !
            </Typography>
            <Card className={classes.card}>
                <CardContent>
                    <Typography className={classes.cardTitle} color="secondary" gutterBottom>
                        On this day
                    </Typography>
                    {fact}
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={() => { page_change('Facts') }}>See more fun facts</Button>
                </CardActions>
            </Card>
            <Card className={classes.card}>
                <CardContent>
                    <Typography className={classes.cardTitle} color="secondary" gutterBottom>
                        Current time
                    </Typography>
                    {currentTime}
                </CardContent>
            </Card>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant='h6'>
                        Feel free to explore NEON
                    </Typography>
                </CardContent>
                <CardActions className={classes.actions}>
                    <Button variant="contained" size="small" color={"primary"} className={classes.button}
                        onClick={() => { toggle_drawer() }}
                    >
                        <i className="material-icons">
                            menu_open
                        </i>
                        Open Menu
                     </Button>
                    <Button variant="contained" size="small" color="secondary" className={classes.button}
                        onClick={() => { toggle_header() }}
                    >
                        <i className="material-icons">
                            info
                        </i>
                        See Details
                    </Button>
                    <Button variant="contained" size="small" className={classes.button}
                        onClick={() => { page_change('UserPage') }}
                    >
                        <i className="material-icons">
                            settings_input_component
                        </i>
                        Change Settings
                    </Button>
                </CardActions>
            </Card>
            <Card className={classes.card}>
                <CardContent>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={themeType === 'dark'}
                                onChange={() => change_theme_property('palette.type', themeType === 'dark' ? 'light' : 'dark')}
                                value="theme"
                                className={classes.switch}
                            />
                        }
                        label="Switch to the dark side?"
                    />
                </CardContent>
            </Card>
        </div>
    )
}

export default connect(state => {
    const { User, General } = state;

    return {
        User,
        General
    };
},
    dispatch => {
        return bindActionCreators(MainActions, dispatch);
    })(WelcomePage);