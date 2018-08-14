import React, { Component } from 'react';

class NewTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            task: {
                ID: Math.floor(Math.random() * 1000),
                Text: "",
                Completed: false
            }
        }
    }

    render() {
        return (
            <div className="outer-popup">
                <div className="inner-popup">
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        this.props.newTask(this.state.task)
                    }}>
                        <input value={this.state.task.Text} onInput={(e) => {
                            this.setState({
                                task: {
                                    ...this.state.task,
                                    Text: e.target.value
                                }
                            })
                        }} />
                        <button type="Submit">Add</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default NewTask;