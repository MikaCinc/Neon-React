import React, { Component } from 'react';

class AddNewList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: {
                ID: Math.floor(Math.random() * 1000),
                ListName: "",
                Archived: false,
                Todos: []
            }
        }
    }

    render() {
        return (
            <div className="outer-popup">
                <div className="inner-popup">
                    <form onSubmit={(e) => {
                        console.log("Uđoh u submit")
                        e.preventDefault()
                        this.props.newList(this.state.list)
                    }}
                    onReset={(e) => {
                        e.preventDefault()
                        console.log("Uđoh u reset")
                        this.props.cancel()
                    }}
                    >
                        <input value={this.state.list.ListName} onInput={(e) => {
                            this.setState({
                                list: {
                                    ...this.state.list,
                                    ListName: e.target.value
                                }
                            })
                        }} />
                        <button type="submit">Save</button>
                        <button type="reset">Cancel</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default AddNewList;