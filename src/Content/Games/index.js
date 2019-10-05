import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Paper from '@material-ui/core/Paper';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    root: {
        width: "380px",
        marginLeft: "auto",
        marginRight: "auto",
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    title: {
        margin: 10,
    },
}));

const data = [
    {
        firstIcon: 'group_work',
        title: 'Mastermind',
        url: 'https://mikacinc.github.io/Mastermind/'
    },
    {
        firstIcon: 'memory',
        title: 'Memory game',
        url: 'https://mikacinc.github.io/MemoryGame/'
    },
    {
        firstIcon: 'location_city',
        title: 'Capital Cities',
        url: 'https://mikacinc.github.io/GlavniGradovi/'
    },
    {
        firstIcon: 'add',
        title: 'Do the math',
        url: 'https://mikacinc.github.io/Izracunaj/'
    },
]

const Item = ({ item }) => {
    return (
        <ListItem
            onClick={() => {
                window.open(item.url);
            }}
        >
            <ListItemAvatar>
                <Avatar>
                    <i className="material-icons">
                        {item.firstIcon}
                    </i>
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={item.title}
            />
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => {
                    window.open(item.url);
                }}>
                    <i className="material-icons">
                        arrow_right
                    </i>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
}

const Games = () => {
    const classes = useStyles();

    return (
        <div>
            <Paper className={classes.root} elevation={3}>
                <Typography variant="h6" className={classes.title}>
                    React versions Coming Soon™
                </Typography>
            </Paper>
            <Paper className={classes.root} elevation={7}>
                <List>
                    {
                        data.map((item) => {
                            return (
                                <Item key={item.title} item={item} />
                            )
                        })
                    }
                </List>
            </Paper>
        </div>

    )
}

export default Games;