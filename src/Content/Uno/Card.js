import React, { Component } from 'react';

class Card extends Component {
    render() {
        return (
            <div style={{
                backgroundColor: this.props.Color,
                height: "400px",
                width: "200px"
            }}>
                <h1>{this.props.Number}</h1>
            </div>
        );
    }
}

export default Card;