import React, { Component } from 'react';

class Convert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: "",
            convertorID: 0,
            output: "",
            convertors: [
                {
                    ID: 0,
                    Label: "UPPERCASE"
                },
                {
                    ID: 1,
                    Label: "LOWERCASE"
                },
            ]
        }
    }
    
    render() {
        return (
            <div>
                0
            </div>
        );
    }
}

export default Convert;