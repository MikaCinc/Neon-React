import React, { Component } from 'react';

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

/* myComponents */
import Convert from "./Components/Convert";
import Decorate from "./Components/Decorate";

class String extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            current: 0
        }
    }

    handleChange(e, value) {
        this.setState({
            current: value
        })
    }

    renderTabs() {
        return (
            <Paper square style={{ width: 500, marginLeft: "auto", marginRight: "auto", marginBottom:"20px" }}>
                <Tabs
                    value={this.state.current}
                    onChange={this.handleChange}
                    variant="fullWidth"
                    indicatorColor="secondary"
                    textColor="secondary"
                >
                    <Tab
                        icon={
                            <i className="material-icons">autorenew</i>
                        }
                        label="CONVERT"
                    />
                    <Tab
                        icon={
                            <i className="material-icons">text_format</i>
                        }
                        label="DECORATE"
                    />
                    <Tab
                        icon={
                            <i className="material-icons">text_fields</i>
                        }
                        label="STYLE"
                        disabled
                    />
                </Tabs>
            </Paper>
        );
    }

    renderTabContent() {
        switch(this.state.current) {
            case 0: return <Convert/>;
            case 1: return <Decorate/>;
            default: return <Convert/>;
        }
    }

    render() {
        return (
            <div>
                {this.renderTabs()}
                {this.renderTabContent()}
            </div>
        );
    }
}

export default String;