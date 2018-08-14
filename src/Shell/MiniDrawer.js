import React, { Component } from 'react';

import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

import * as GeneralActions from ".././Actions/GeneralActions";

const MainActions = {
    ...GeneralActions
}

class MiniDrawer extends Component {
    constructor(props) {
        super(props);

        const { page_change } = this.props
        this.page_change = page_change

    }

    pageChange(page) {
        this.page_change(page)
    }

    render() {
        return (
            <div>
                <AppBar
                    position="absolute"
                    className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
                >
                    <Toolbar disableGutters={!this.state.open}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.handleDrawerOpen}
                            className={classNames(classes.menuButton, this.state.open && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
                    }}
                    open={this.state.open}
                >
                    <div className={classes.toolbar}>
                        <IconButton onClick={this.handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List>{mailFolderListItems}</List>
                    <Divider />
                    <List>{otherMailFolderListItems}</List>
                </Drawer>

            </div>
        );
    }
}

export default connect(state => {
    const { General } = state;

    return {
        General,
    };
},
    dispatch => {
        return bindActionCreators(MainActions, dispatch);
    })(MiniDrawer);