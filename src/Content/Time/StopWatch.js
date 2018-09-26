import React, { Component } from 'react';

import moment from 'moment';

class Stopwatch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display: "",
            laps: [
                {
                    ID: 1,
                    time: ""
                }
            ]
        }
    }
    
    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default Stopwatch;