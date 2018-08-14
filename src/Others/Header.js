import React, { Component } from 'react';
import logo from '../logo.svg';

import Paper from 'material-ui/Paper';

class ExtendedHeader extends Component {
    render() {
        const style = {
            width: "95%",
            marginTop: -25,
            marginBottom: 10,
            textAlign: 'center',
            display: 'inline-block',
          };
        return (
            <Paper style={style} zDepth={3} rounded={false} transitionEnabled={true}>
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Project //NEON/</h1>
                    <p>Built with react.js & redux ++ Material UI</p>
                </header>
            </Paper>
        );
    }
}

export default ExtendedHeader;