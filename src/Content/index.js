import React, { Component } from 'react';
import WelcomePage from "./HomePage/WelcomePage";
import Calculator from "./Calculator";
//import ToDo from "./ToDo";
import UserPage from "./UserPage";
import Time from "./Time";
import Arrays from "./Arrays";
import Uno from "./Uno";
import ToDo from './ToDo';
import Notes from './Notes';
import Counters from './Counters';
import String from './String';
import Randomiser from './Randomiser';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

import * as GeneralActions from ".././Actions/GeneralActions";


const MainActions = {
    ...GeneralActions
}

class RenderPage extends Component {
    constructor(props) {
        super(props);

        const { page_change } = this.props
        this.page_change = page_change
    }

    render() {
        switch (this.props.General.currentPage) {
            case ("WelcomePage"):
                return (<WelcomePage />);
            case ("UserPage"):
                return (<UserPage />);
            case ("Calculator"):
                return (<Calculator />);
            case ("ToDo"):
                return (<ToDo />);
            case ("Time"):
                return (<Time />);
            case ("Arrays"):
                return (<Arrays />);
            case ("Uno"):
                return (<Uno />);
            case ("Notes"):
                return (<Notes />);
            case ("Counters"):
                return (<Counters />);
            case ("String"):
                return (<String />);
            case ("Randomiser"):
                return (<Randomiser />);
            default:
                return (<WelcomePage />);
        }
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
    })(RenderPage);