import React, { Component } from 'react';
import './App.css';
// Material UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
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

const theme = createMuiTheme({
  palette: {
    type: 'dark',
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

class App extends Component {
  render() {
    return (
      <ThemeProvider  theme={theme}>
        <div className="App">
          <Shell />
        </div>
      </ThemeProvider >
    );
  }
}

export default App;