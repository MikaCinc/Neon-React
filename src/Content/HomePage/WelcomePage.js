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

const useStyles = makeStyles({
    card: {
        minWidth: 275,
        maxWidth: 400,
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: 10,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
        textAlign: 'left'
    },
    pos: {
        marginBottom: 12,
    },
});

const WelcomePage = (props) => {
    const classes = useStyles();
    const [fact, setFact] = useState('');

    useEffect(() => {
        let url = `http://numbersapi.com/${moment().format('M/D')}/date`;
        fetch(url)
            .then((response) => response.text())
            .then(data => {
                setFact(data)
            })
    }, [])

    return (
        <div>
            <h1>WELCOME, {props.User.name} !</h1>
            <Card className={classes.card}>
                <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    On this day
                </Typography>
                    {fact}
                </CardContent>
                <CardActions>
                    <Button size="small">See more fun facts</Button>
                </CardActions>
            </Card>
            <Card className={classes.card}>
                <CardContent>
                    <h3>Feel free to explore NEON</h3>
                </CardContent>
                <CardActions>
                    <Button size="small">See more fun facts</Button>
                </CardActions>
            </Card>
        </div>
    )
}

export default connect(state => {
    const { User } = state;

    return {
        User,
    };
},
    dispatch => {
        return bindActionCreators({}, dispatch);
    })(WelcomePage);