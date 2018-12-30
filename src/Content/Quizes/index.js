import React, { Component } from 'react'
import QuizTile from './QuizTile';
import Grid from '@material-ui/core/Grid';

import _ from 'lodash';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

class Quizes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: "start",
            toEdit: {},
            toPlay: {},
        }

        this.handlePlay = this.handlePlay.bind(this);
    }

    handlePlay(ID) {
        console.log(ID)
        this.setState({
          currentPage: "QuizPlay",
          toPlay: _.find(this.props.Quizes, { ID: ID })
        })
      }


    renderDefaultQuizes() {
        if (!this.props.Quizes || !this.props.Quizes.length) return null;

        return (
            <Grid container justify="center" spacing={32}>
                {
                    this.props.Quizes.map((item) => {
                        return (
                            <Grid key={item.ID} item>
                                <QuizTile
                                    quiz={{ ...item }}
                                    onPlay={this.handlePlay}
                                />
                            </Grid>
                        )
                    })
                }
            </Grid>
        )
    }

    render() {
        //console.log(this.props.Quizes)
        return (
            <div style={{ width: "50%", marginLeft: "auto", marginRight: "auto" }}>
                {this.renderDefaultQuizes()}
            </div>
        )
    }
}

export default connect(state => {
    const { Quizes } = state;

    return {
        Quizes,
    };
},
    dispatch => {
        return bindActionCreators({}, dispatch);
    })(Quizes);