import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import MenuItem from 'material-ui/MenuItem';

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
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
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
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
    },
});

class Shell extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
        };

        const { page_change } = this.props
        this.page_change = page_change
    }

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

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
                        <Typography variant="title" color="inherit" noWrap>
                            Mini variant drawer
            </Typography>
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
                    <MenuItem
                        onClick={(event) => {
                            this.page_change("WelcomePage")
                        }}
                        leftIcon={
                            <i className="material-icons">
                                home
            </i>
                        }
                    >
                        Home
        </MenuItem>
                    <MenuItem onClick={(event) => {
                        this.page_change("UserPage")
                    }}
                        leftIcon={
                            <i className="material-icons">
                                face
          </i>
                        }
                    >
                        User
          </MenuItem>
                    <MenuItem onClick={(event) => {
                        this.page_change("Calculator")
                    }}
                        leftIcon={
                            <i className="material-icons">
                                dialpad
          </i>
                        }
                    >
                        Calculator
          </MenuItem>
                    <MenuItem onClick={(event) => {
                        this.page_change("ToDo")
                    }}
                        leftIcon={
                            <i className="material-icons">
                                done_all
          </i>
                        }
                    >
                        To-Do list
          </MenuItem>
                    <MenuItem onClick={(event) => {
                        this.page_change("Time")
                    }}
                        menuItems={[
                            <MenuItem primaryText="Show Level 2" />,
                            <MenuItem primaryText="Grid lines" checked={true} />,
                            <MenuItem primaryText="Page breaks" insetChildren={true} />,
                            <MenuItem primaryText="Rules" checked={true} />,
                        ]}
                        rightIcon={
                            <i className="material-icons">
                                keyboard_arrow_right
            </i>
                        }
                        leftIcon={
                            <i className="material-icons">
                                access_time
            </i>
                        }
                    >
                        Time
          </MenuItem>
                    <MenuItem onClick={(event) => {
                        this.page_change("Arrays")
                    }}
                        leftIcon={
                            <i className="material-icons">
                                linear_scale
          </i>
                        }
                    >
                        Arrays
          </MenuItem>
                    <MenuItem onClick={(event) => {
                        this.page_change("Uno")
                    }}
                        leftIcon={
                            <i className="material-icons">
                                sim_card
          </i>
                        }
                    >
                        Uno
          </MenuItem>
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