import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import compose from 'recompose/compose';

//import './App.css';
import Lists from "./Components/Lists";
import CurrentList from "./Components/CurrentList";
import AddNewList from './Components/AddNewList';
import TaskView from './Components/TaskView';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

import * as ToDoActions from "../../Actions/ToDoActions";

const MainActions = {
  ...ToDoActions
}

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

class ToDo extends Component {
  constructor(props) {
    super(props);

    this.exitPopups = this.exitPopups.bind(this);
    this.deleteItem = this.deleteItem.bind(this);

    this.state = {
      tdl: [...this.props.Todo],
      UserName: "Mihajlo",
      CurrentList: 0,
      showNewListPopup: false,
      showNewTaskPopup: false,
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

  newTask = (task) => {
    this.exitPopups()
    var listInner = this.findById(this.state.tdl, this.state.CurrentList, true)
    var e = listInner.Todos
    e.push(task)

    var tdl1 = this.state.tdl;

    tdl1.map(list => {
      if (list.ID === this.state.CurrentList) {
        return {
          ...listInner
        }
      } else {
        return list;
      }
    })

    this.setState({
      tdl: tdl1,
      showNewTaskPopup: false,
    });
  }

  currentList() {
    return this.findById(this.props.Todo, this.state.CurrentList, true);
  }

  toggleItem = (ID) => {
    var listInner = [...this.findById(this.state.tdl, this.state.CurrentList, true)];
    var e = listInner.Todos

    for (let i = 0; i < e.length; i++) {
      if (e[i].ID === ID) {
        e[i].Completed = true
      }
    }

    var tdl1 = [...this.state.tdl];

    tdl1.map(list => {
      if (list.ID === this.state.CurrentList) {
        return {
          ...listInner
        }
      } else {
        return list;
      }
    })

    this.setState({
      tdl: tdl1
    });
  }

  deleteItem(ID) {
    var listInner = this.findById(this.state.tdl, this.state.CurrentList, false);
    var newList = [];

    for (let i = 0; i < listInner.length; i++) {
      if (listInner[i].ID !== ID) {
        newList.push(listInner[i])
      }
    }

    var newTDL = this.state.tdl.map((list) => {
      if (list.ID === this.state.CurrentList) {
        return {
          ...list,
          Todos: [
            ...newList
          ]
        };
      } else {
        return list;
      }
    })

    this.setState({
      tdl: [...newTDL]
    })
  }

  exitPopups() {
    this.setState({
      showNewListPopup: false,
      showNewTaskPopup: false,
    })
  }

  render() {
    const { classes } = this.props;

    return (
      <div className="App">
        <h1 id="title">This is a {this.state.UserName}'s ToDo list:</h1>
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
            ? <AddNewList
              open={this.state.showNewListPopup}
              listName={this.currentList().ListName}
              handleClose={this.exitPopups}
              newList={this.newList}
            />
            : null
        }
        <Button
          variant="raised"
          color="primary"
          className={classes.button}
          onClick={() => {
            this.setState({
              showNewTaskPopup: true
            })
          }}>
          New task
        </Button>
        <Tooltip TransitionComponent={Zoom} title="More list actions">
          <IconButton
            aria-label="More"
            aria-owns={'long-menu'}
            aria-haspopup="true"
          >
            <i className="material-icons">more_vert</i>
          </IconButton>
        </Tooltip>
        <Button
          variant="raised"
          color="secondary"
          className={classes.button}
          onClick={() => {
            this.setState({
              showNewListPopup: true
            })
          }}>
          New list
        </Button>
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