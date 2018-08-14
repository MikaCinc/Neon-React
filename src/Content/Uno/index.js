import React, { Component } from 'react';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

import Card from "./Card";
//import url from "../.././Pictures/Uno_cards/blue_0.png";

class Uno extends Component {
    render() {
        //var url = "";
        console.log(this.props.Uno)
        return (
            <div>
                <h1>Ovo je Uno</h1>
                {
                    this.props.Uno.map((item) => {
                        return (
                            <Card 
                                {...item}
                                onClick={()=> {
                                    
                                }}
                            />
                        )
                    })
                }
            </div>
        );
    }
}

export default connect(state => {
    const { Uno } = state;

    return {
        Uno,
    };
},
    dispatch => {
        return bindActionCreators({}, dispatch);
    })(Uno);