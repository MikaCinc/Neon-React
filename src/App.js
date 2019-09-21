import React, { Component } from 'react';
import './App.css';
// Material UI
import { ThemeProvider } from '@material-ui/styles';
// import CssBaseline from '@material-ui/core/CssBaseline';
//import RaisedButton from 'material-ui/RaisedButton';
//import Avatar from 'material-ui/Avatar';
// Dark theme
/*
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
*/
// Shell
import Shell from './Shell/Shell'

import purple from '@material-ui/core/colors/purple';

import { createMuiTheme } from '@material-ui/core/styles';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

class App extends Component {

  getTheme() {
    return createMuiTheme({
      palette: {
        type: this.props.General.themeType,
        // primary: {
        //   main: '#00ff00',
        // },
        // secondary: {
        //   main: '#f44336',
        // },
        primary: purple,
        secondary: {
          main: '#f44336',
        },
      },
      typography: {
        useNextVariants: true,
      },
    });
  }


  render() {
    return (
      <ThemeProvider theme={this.getTheme()}>
        <div className="App">
          <Shell />
        </div>
      </ThemeProvider >
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
      return bindActionCreators({}, dispatch);
  })(App);