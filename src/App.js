import React, { Component } from 'react';
import './App.css';
// Material UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//import RaisedButton from 'material-ui/RaisedButton';
//import Avatar from 'material-ui/Avatar';
// Dark theme
/*
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
*/
// Shell
import Shell from './Shell/Shell'

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <Shell />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;