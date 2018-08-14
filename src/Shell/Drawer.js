import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

import * as GeneralActions from ".././Actions/GeneralActions";

const MainActions = {
  ...GeneralActions
}

class LeftDrawer extends React.Component {
  constructor(props) {
    super(props);

    const { page_change } = this.props
    this.page_change = page_change

  }

  pageChange(page) {
    this.page_change(page)
  }

  render() {
    return (
      <Drawer
        open={this.props.open}
        zDepth={4}
      >
        <AppBar
          title="NeonGation"
          onLeftIconButtonClick={() => {
            this.props.change()
          }}
        />
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

export default connect(state => {
  const { General } = state;

  return {
    General,
  };
},
  dispatch => {
    return bindActionCreators(MainActions, dispatch);
  })(LeftDrawer);