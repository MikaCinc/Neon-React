import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
//import FlatButton from 'material-ui/FlatButton';
import IconButton from '@material-ui/core/IconButton';

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const styles = theme => ({
    root: {
      flexGrow: 1,
      height: 430,
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
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
  });

class MUIHeader extends Component {
    render() {
        const styles = {
            title: {
                cursor: 'pointer',
            },
        };

        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <AppBar
                    position="static"
                    className={classNames(classes.appBar, this.props.open && classes.appBarShift)}
                >
                    <Toolbar disableGutters={!this.props.open}>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.props.drawerToggle}
                            className={classNames(classes.menuButton, this.props.open && classes.hide)}
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
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(MUIHeader);

/* <AppBar
                zDepth={2}
                title={<span style={styles.title}>Project //NEON/</span>}
                //iconClassNameRight="muidocs-icon-navigation-expand-more"
                
                iconElementRight={
                    <IconButton >
                        {
                            this.props.arrowPosition 
                            ? <i className="material-icons">keyboard_arrow_up</i>
                            : <i className="material-icons">keyboard_arrow_down</i>
                        }
                        
                    </IconButton>
                }
                
                onTitleClick={
                    () => { this.props.onTitleClick() }
                }

                onRightIconButtonClick={
                    () => { this.props.onTitleClick() }
                }

                onLeftIconButtonClick={
                    () => { this.props.drawerToggle() }
                }
            >
                
            </AppBar> */