import React, { Component } from 'react';
import logo from '../logo.svg';
import { Paper } from '@material-ui/core';

class ExtendedHeader extends Component {
    render() {
        const style = {
            width: "90%",
            marginTop: -25,
            marginBottom: 40,
            textAlign: 'center',
            display: 'inline-block',
        };
        return (
            <Paper
                style={style}
                elevation={10}
            >
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Project // NEON /</h1>
                    <p>Version 0.8.9 // BY: Mihajlo Marjanović</p>
                    <p>Built with React.js & Redux.js & Material UI</p>
                </header>
            </Paper>
        );
    }
}

export default ExtendedHeader;