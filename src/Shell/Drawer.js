import React from 'react';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import AppBar from 'material-ui/AppBar';
import compose from 'recompose/compose';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

import * as GeneralActions from ".././Actions/GeneralActions";

const MainActions = {
  ...GeneralActions
}

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

class LeftDrawer extends React.Component {
  constructor(props) {
    super(props);

    const { page_change } = this.props
    this.page_change = page_change

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

  render() {
    const { classes, theme } = this.props;

    return (
      <Drawer
        variant="permanent"
        classes={{
          paper: classNames(classes.drawerPaper, !this.props.open && classes.drawerPaperClose),
        }}
        open={this.props.open}
      >
        {
          /*   <AppBar
              title="NeonGation"
              onLeftIconButtonClick={() => {
                this.props.change()
              }}
            /> */
        }
        <div className={classes.toolbar}>
          <IconButton onClick={this.props.change}>
            {this.renderIcon(theme)}
          </IconButton>
        </div>

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
    );
  }
}

LeftDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

/* export default withStyles(styles, { withTheme: true })(LeftDrawer);

export default connect(state => {
  const { General } = state;

  return {
    General,
  };
},
  dispatch => {
    return bindActionCreators(MainActions, dispatch);
  })(LeftDrawer); */


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
)(LeftDrawer);