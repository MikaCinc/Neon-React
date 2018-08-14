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
import MUIHeader from './Shell/AppBar';
import LeftDrawer from "./Shell/Drawer";
// Others
import ExtendedHeader from './Others/Header';
// Pages
import RenderPage from "./Content/index";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showHeader: false,
      showDrawer: false
    }
  }

  handleTitleClick = () => {
    var showHeader = !this.state.showHeader
    this.setState({
      showHeader
    })
  }

  handleDrawerChange = () => {
    var showDrawer = !this.state.showDrawer
    this.setState({
      showDrawer
    })
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <MUIHeader 
          onTitleClick={this.handleTitleClick} 
          arrowPosition={this.state.showHeader} 
          drawerToggle={
            () => {
              this.setState({
                showDrawer: !this.state.showDrawer
              })
            }
          } />
          {this.state.showHeader ? <ExtendedHeader/> : null}
          {this.state.showDrawer ? <LeftDrawer open={this.state.showDrawer} change={()=> {this.handleDrawerChange()}}/>  : null}
          <br />
          <RenderPage/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
