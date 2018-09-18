import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import MenuList from '@material-ui/core/MenuList';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

// Others
import ExtendedHeader from '.././Others/Header';
// Pages
import RenderPage from ".././Content/index";

import * as GeneralActions from ".././Actions/GeneralActions";

const MainActions = {
    ...GeneralActions
}

const drawerWidth = 240;

const styles = theme => ({
    root: {
        flexGrow: 1,
        zIndex: 4,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        position: 'flex',
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawerPaper: {
        position: 'relative',
        dislay: "block",
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing.unit * 7,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        minHeight: "100vh",
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
    },
    Title: {
        cursor: 'pointer',
    }
});

class Shell extends React.Component {
    constructor(props) {
        super(props);

        const { page_change } = this.props;
        this.page_change = page_change;

        this.handleHeaderChange = this.handleHeaderChange.bind(this);

        this.state = {
            open: false,
            showHeader: false
        };
    }

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    handleHeaderChange = () => {
        let showHeader = !this.state.showHeader
        this.setState({
            showHeader
        })
    }

    pageChange(page) {
        this.page_change(page)
    }

    renderIcon(theme) {
        return (
            <i className="material-icons">
                {theme.direction === 'rtl' ? "keyboard_arrow_right" : "keyboard_arrow_left"}
            </i>
        )
    }

    renderMenuItem(page_change, icon, text) {
        return (
            <ListItem
                onClick={() => {
                    this.page_change(page_change)
                }}
                button
            >
                <ListItemIcon>
                    <i className="material-icons">
                        {icon}
                    </i>
                </ListItemIcon>
                <ListItemText primary={text} />
            </ListItem>
        )
    }

    render() {
        const { classes, theme } = this.props;

        return (
            <div className={classes.root}>
                <AppBar
                    position="absolute"
                    className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
                >
                    <Toolbar disableGutters={!this.state.open}>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerOpen}
                            className={classNames(classes.menuButton, this.state.open && classes.hide)}
                        >
                            <i className="material-icons">
                                menu
                            </i>
                        </IconButton>
                        <Typography className={classes.Title} onClick={this.handleHeaderChange} variant="title" color="inherit" noWrap>
                            Project // NEON /
                        </Typography>
                        <IconButton onClick={this.handleHeaderChange}>
                            {
                                <i className="material-icons" style={{ color: "rgb(255, 255, 255)" }}>
                                    {
                                        this.state.showHeader
                                            ? "keyboard_arrow_up"
                                            : "keyboard_arrow_down"
                                    }
                                </i>
                            }
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
                    }}
                    open={this.state.open}
                >
                    <div className={classes.toolbar}>
                        <IconButton onClick={this.handleDrawerClose}>
                            {this.renderIcon(theme)}
                        </IconButton>
                    </div>
                    <Divider />
                    <MenuList>
                        {
                            this.renderMenuItem("WelcomePage", "home", "Home")
                        }
                        {
                            this.renderMenuItem("UserPage", "face", "User")
                        }
                        {
                            this.renderMenuItem("Calculator", "dialpad", "Calculator")
                        }
                        {
                            this.renderMenuItem("ToDo", "done_all", "To-Do list")
                        }
                        {
                            this.renderMenuItem("Time", "access_time", "Time")
                        }
                        {
                            this.renderMenuItem("Arrays", "linear_scale", "Arrays")
                        }
                        {
                            this.renderMenuItem("Notes", "notes", "Notes")
                        }
                        {
                            this.renderMenuItem("Counters", "add_circle_outline", "Counters")
                        }
                        {
                            this.renderMenuItem("String", "message", "String")
                        }
                        {
                            this.renderMenuItem("Randomiser", "gesture", "Randomiser")
                        }
                        {
                            //this.renderMenuItem("Uno", "sim_card", "Uno")
                        }
                    </MenuList>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    {this.state.showHeader ? <ExtendedHeader /> : null}
                    <br />
                    <RenderPage />
                </main>
            </div>
        );
    }
}

Shell.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default compose(
    withStyles(styles, { withTheme: true }),
    connect(state => {
        const { General } = state;

        return {
            General,
        };
    },
        dispatch => {
            return bindActionCreators(MainActions, dispatch);
        })
)(Shell);