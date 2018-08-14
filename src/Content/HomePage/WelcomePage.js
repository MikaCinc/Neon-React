import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
//import MobileTearSheet from '.././Others/MobileTearSheet';
import Paper from 'material-ui/Paper';
import Stats from "../.././Others/Stats";
//import User from "../.././Data/User";
//import TextField from 'material-ui/TextField';

class WelcomePage extends Component {
    render() {
        const listStyle = {
            width: "30%",
            marginLeft: "auto",
            marginRight: "auto"
        }
        return (
            <div>
                <h1>WELCOME, {this.props.User.name} !</h1>
                <Stats />
                <Divider inset={false} />
                <br />
                <Paper style={listStyle} zDepth={3} rounded={false} transitionEnabled={true}>
                    <List >
                        <Subheader>Explore NEON</Subheader>
                        <ListItem
                            primaryText="Simple Calculator"
                            leftAvatar={
                                <Avatar>
                                    <i className="material-icons">dialpad</i>
                                </Avatar>
                            }
                        />
                        <Divider inset={true} />
                        <ListItem
                            primaryText="To-Do list"
                            leftAvatar={
                                <Avatar>
                                    <i className="material-icons">done_all</i>
                                </Avatar>
                            }
                        />
                        <Divider inset={true} />
                        <ListItem
                            primaryText="Time"
                            leftAvatar={
                                <Avatar>
                                    <i className="material-icons">
                                        access_time
                                    </i>
                                </Avatar>
                            }
                        />
                    </List>
                </Paper>
            </div>
        );
    }
}

export default connect(state => {
    const { User } = state;

    return {
        User,
    };
},
    dispatch => {
        return bindActionCreators({}, dispatch);
    })(WelcomePage);