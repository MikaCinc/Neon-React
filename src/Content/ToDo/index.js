import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import compose from 'recompose/compose';
import Snackbar from '@material-ui/core/Snackbar';
import Fab from '@material-ui/core/Fab';

//import './App.css';
import Lists from "./Components/Lists";
import CurrentList from "./Components/CurrentList";
import ListEdit from './Components/ListEdit';
import TaskView from './Components/TaskView';

import User from '../../Data/User';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

import * as ToDoActions from "../../Actions/ToDoActions";

const MainActions = {
  ...ToDoActions
}

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 420,
    marginLeft: "auto",
    marginRight: "auto"
  },

  button: {
    margin: theme.spacing(1),
  },

  extendedIcon: {
    marginRight: theme.spacing(1),
  },

  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
});

class ToDo extends Component {
  constructor(props) {
    super(props);

    this.exitPopups = this.exitPopups.bind(this);
    this.handleSnackbarClose = this.handleSnackbarClose.bind(this);
    this.handleUndoDelete = this.handleUndoDelete.bind(this);

    const { delete_list, new_list } = this.props;
    this.delete_list = delete_list;
    this.new_list = new_list;

    this.state = {
      tdl: [...this.props.Todo],
      UserName: User.name,
      CurrentList: 1,
      showNewListPopup: false,
      showNewTaskPopup: false,
      lastDeletedList: {}
    }
  }

  componentDidMount() {
    this.setState({
      tdl: [...this.props.Todo]
    })
  }


  findById(list, ID, flag) {
    for (let i = 0; i < list.length; i++) {
      if (list[i].ID === ID) {
        if (!flag) {
          return list[i].Todos;
        } else {
          return list[i];
        }
      }
    }
  }

  newList = (list) => {
    this.setState({
      tdl: [
        ...this.state.tdl,
        list
      ],
      showNewListPopup: false
    })
  }

  currentList() {
    return this.findById(this.props.Todo, this.state.CurrentList, true);
  }

  nextCurrent() {
    return this.props.Todo.filter((list) => {
      if (list.ID !== this.state.CurrentList) {
        return true;
      }
      return false;
    })[0].ID
  }

  handleUndoDelete() {
    this.handleSnackbarClose()
    this.new_list(this.state.lastDeletedList)
  }

  handleSnackbarClose() {
    this.setState({
      showSnackbar: false
    })
  }

  exitPopups() {
    this.setState({
      showNewListPopup: false,
      showNewTaskPopup: false,
      showEditListPopup: false
    })
  }

  renderMoreListOptions() {
    const { classes } = this.props;
    return (
      <div>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          className={classes.button}
          onClick={() => {
            this.setState({
              showNewListPopup: true
            })
          }}>
          New list
          </Button>
        <Button
          variant="outlined"
          size="medium"
          className={classes.button}
          onClick={() => {
            this.setState({
              showEditListPopup: true
            })
          }}>
          Edit list
          </Button>
        <Button
          variant="text"
          color="default"
          size="small"
          className={classes.button}
          onClick={() => {
            this.setState({
              showSnackbar: true,
              CurrentList: this.nextCurrent(),
              lastDeletedList: {
                ...this.currentList()
              }
            })

            this.delete_list(this.currentList())

          }}>
          Delete list
          </Button>
      </div>
    )
  }

  render() {
    const { classes } = this.props;

    return (
      <div className="App">
        <Lists
          lists={[...this.state.tdl]}
          current={this.state.CurrentList}
          cancel={this.exitPopups}
          newList={
            () => {
              this.setState({
                showNewListPopup: true
              })
            }
          }
          changeCurrent={
            (ID) => {
              this.setState({
                CurrentList: ID
              })
            }
          }
        />
        <CurrentList
          currentList={this.state.CurrentList}
          toggleItem={this.toggleItem}
          deleteItem={this.deleteItem}
        />
        {
          this.state.showNewTaskPopup
            ? <TaskView
              showTaskModal={this.state.showNewTaskPopup}
              listName={this.currentList().ListName}
              listID={this.state.CurrentList}
              handleModalClose={this.exitPopups}
              newTask={this.newTask}
            />
            : null
        }
        {
          this.state.showNewListPopup
            ? <ListEdit
              open={this.state.showNewListPopup}
              listName={this.currentList().ListName}
              handleClose={this.exitPopups}
            />
            : null
        }
        {
          this.state.showEditListPopup
            ? <ListEdit
              open={this.state.showEditListPopup}
              list={this.currentList()}
              handleClose={this.exitPopups}
            />
            : null
        }
        <Tooltip TransitionComponent={Zoom} title="Add new TASK">
          <Fab
            variant="extended"
            color="primary"
            className={classes.fab}
            onClick={() => {
              this.setState({
                showNewTaskPopup: true
              })
            }}>
            <i className="material-icons" style={{ marginRight: "10px" }}>add_circle_outline</i>
            New task
          </Fab>
        </Tooltip>
        {this.renderMoreListOptions()}
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={this.state.showSnackbar}
          autoHideDuration={6000}
          onClose={this.handleSnackbarClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">List deleted</span>}
          action={[
            <Button key="undo" color="secondary" size="small" onClick={this.handleUndoDelete}>
              UNDO
            </Button>,
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleSnackbarClose}
            >
              <i className="material-icons">close</i>
            </IconButton>,
          ]}
        />
      </div>
    );
  }
}

ToDo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles),
  connect(state => {
    const { Todo } = state;

    return {
      Todo,
    };
  },
    dispatch => {
      return bindActionCreators(MainActions, dispatch);
    })
)(ToDo);