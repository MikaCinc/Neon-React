import React, { Component } from 'react';

class Lists extends Component {

    isSelected(list) {
        if(list.ID === this.props.current){
            return true;
        } else {
            return false;
        }
    }

    render() {
        return (
            <div id="lists-container">
                {
                    this.props.lists.map((item, index)=>{
                        var selected = this.isSelected(item) ? "selected" : "";
                        return (
                            <div className={"lists-item hoverable " + selected} key={item.ID} onClick={() => {
                                this.props.changeCurrent(item.ID)
                            }}>
                                {item.ListName}
                            </div>
                        )
                    })
                }
                <button id="add-new-list" className="hoverable" onClick={
                    () => {
                        this.props.newList()
                    }
                }>+</button>
            </div>
        );
    }
}

export default Lists;