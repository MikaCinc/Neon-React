import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';

//import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';



class MUIHeader extends Component {
    render() {
        const styles = {
            title: {
                cursor: 'pointer',
            },
        };

        return (
            <AppBar
                zDepth={2}
                title={<span style={styles.title}>Project //NEON/</span>}
                //iconClassNameRight="muidocs-icon-navigation-expand-more"
                
                iconElementRight={
                    <IconButton >
                        {
                            this.props.arrowPosition 
                            ? <i className="material-icons">keyboard_arrow_up</i>
                            : <i className="material-icons">keyboard_arrow_down</i>
                        }
                        
                    </IconButton>
                }
                
                onTitleClick={
                    () => { this.props.onTitleClick() }
                }

                onRightIconButtonClick={
                    () => { this.props.onTitleClick() }
                }

                onLeftIconButtonClick={
                    () => { this.props.drawerToggle() }
                }
            >
                
            </AppBar>
        );
    }
}

export default MUIHeader;