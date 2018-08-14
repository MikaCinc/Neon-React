import React, { Component } from 'react';

class CurrentList extends Component {
    render() {
        return (
            <ol>
                {
                    this.props.tasks.map((item) => {
                        return (
                            <li
                                key={item.ID}
                                className={item.Completed ? "item-completed" : "item-default"}
                                onClick={() => {
                                    this.props.toggleItem(item.ID)
                                }}
                                >
                                {
                                    item.Text
                                }
                            </li>
                        )
                    })
                }
            </ol>
        );
    }
}

export default CurrentList;