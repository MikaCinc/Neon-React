import React, { Component } from 'react';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

import TextField from 'material-ui/TextField';

import * as UserActions from "../.././Actions/UserActions";

const MainActions = {
    ...UserActions
}

class UserPage extends Component {
    constructor(props) {
        super(props);

        const { name_change } = this.props
        this.name_change = name_change

        this.state = {
            userName: ""
        }
    }

    render() {
        return (
            <div>
                <TextField
                    id="userName-changer"
                    value={this.props.User.name}
                    onChange={(event) => {
                        this.name_change(event.target.value)
                    }}
                />
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
        return bindActionCreators(MainActions, dispatch);
    })(UserPage);