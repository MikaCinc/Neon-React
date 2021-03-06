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
import Avatar from '@material-ui/core/Avatar';

import Zoom from '@material-ui/core/Zoom';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

// Others
import ExtendedHeader from '.././Others/Header';
import Profilna from "../Pictures/avatar.jpg";
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
    grow: {
        flexGrow: 1,
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
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
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
        padding: theme.spacing(3),
    },
    Title: {
        cursor: 'pointer',
    },
    avatar: {
        margin: 10,
        cursor: "pointer",
    },
    bigAvatar: {
        width: 60,
        height: 60,
    },
});

class Shell extends React.Component {
    constructor(props) {
        super(props);

        const { page_change, toggle_drawer, toggle_header } = this.props;
        this.page_change = page_change;
        this.toggle_drawer = toggle_drawer;
        this.toggle_header = toggle_header;
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
                    className={classNames(classes.appBar, this.props.General.isDrawerOpen && classes.appBarShift)}
                >
                    <Toolbar disableGutters={!this.props.General.isDrawerOpen}>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={() => this.toggle_drawer()}
                            className={classNames(classes.menuButton, this.props.General.isDrawerOpen && classes.hide)}
                        >
                            <i className="material-icons">
                                menu
                            </i>
                        </IconButton>

                        <Typography className={classNames(classes.Title, classes.grow)} onClick={() => this.toggle_header()} variant="h5" color="inherit" noWrap>
                            Project // NEON /
                        </Typography>
                        <IconButton onClick={() => this.toggle_header()}>
                            {
                                <i className="material-icons" style={{ color: "rgb(255, 255, 255)" }}>
                                    {
                                        this.props.General.isHeaderOpen
                                            ? "keyboard_arrow_up"
                                            : "keyboard_arrow_down"
                                    }
                                </i>
                            }
                        </IconButton>

                        <Avatar
                            className={classes.avatar}
                            onClick={() => {
                                window.open('https://mikacinc.github.io/Portfolio/', '_blank');
                            }}
                        >
                            <img
                                alt="Mihajlo Marjanović"
                                src={Profilna}
                            />
                        </Avatar>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: classNames(classes.drawerPaper, !this.props.General.isDrawerOpen && classes.drawerPaperClose),
                    }}
                    open={this.props.General.isDrawerOpen}
                >
                    <div className={classes.toolbar}>
                        <IconButton onClick={() => this.toggle_drawer()}>
                            {this.renderIcon(theme)}
                        </IconButton>
                    </div>
                    <Divider />
                    <MenuList>
                        {
                            this.renderMenuItem("WelcomePage", "home", "Home")
                        }
                        {
                            this.renderMenuItem("UserPage", "settings", "Settings")
                        }
                        <Divider />
                        {
                            this.renderMenuItem("ToDo", "done_all", "To-Do list")
                        }
                        {
                            this.renderMenuItem("Notes", "notes", "Notes")
                        }
                        {
                            this.renderMenuItem("Counters", "add_circle_outline", "Counters")
                        }
                        <Divider />
                        {
                            this.renderMenuItem("Time", "access_time", "Time")
                        }
                        {
                            this.renderMenuItem("Calculator", "dialpad", "Calculator")
                        }
                        {
                            this.renderMenuItem("String", "message", "String")
                        }
                        {
                            this.renderMenuItem("Randomiser", "gesture", "Randomiser")
                        }
                        <Divider />
                        {
                            this.renderMenuItem("Arrays", "linear_scale", "Arrays")
                        }
                        {
                            this.renderMenuItem("Facts", "filter_none", "Fun Facts")
                        }
                        {
                            //this.renderMenuItem("Uno", "sim_card", "Uno")
                        }
                        <Divider />
                        {
                            this.renderMenuItem("Games", "videogame_asset", "Games")
                        }
                        {
                            this.renderMenuItem("Quizes", "widgets", "Quizes")
                        }
                    </MenuList>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    {this.props.General.isHeaderOpen ? <ExtendedHeader /> : null}
                    <br />
                    <Zoom in={true} style={{ transitionDelay: 100 }}>
                        <RenderPage />
                    </Zoom>
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