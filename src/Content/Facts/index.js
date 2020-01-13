import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

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
        textAlign: "center",
        marginLeft: "auto",
        marginRight: "auto",
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

const Facts = (props) => {
    const classes = useStyles();
    const [fact, setFact] = useState('');

    useEffect(() => {
        fetch('http://numbersapi.com/random/year', {
            mode: 'no-cors'
          })
            .then((response) => response.text())
            .then(data => {
                setFact(data)
            })
    }, [])

    return (
        <div>
            <Card className={classes.card}>
                <CardContent>
                    {fact}
                </CardContent>
            </Card>
        </div>
    )
}

export default connect(state => {
    return {};
},
    dispatch => {
        return bindActionCreators({}, dispatch);
    })(Facts);