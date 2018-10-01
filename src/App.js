import React, { Component } from 'react';
import './App.css';
// Material UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CssBaseline from '@material-ui/core/CssBaseline';
//import RaisedButton from 'material-ui/RaisedButton';
//import Avatar from 'material-ui/Avatar';
// Dark theme
/*
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
*/
// Shell
import Shell from './Shell/Shell'

import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00ff00',
    },
    secondary: {
      main: '#f44336',
    },
  },
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <Shell />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;