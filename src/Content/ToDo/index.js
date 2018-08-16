import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

//import './App.css';
import Lists from "./Components/Lists";
import CurrentList from "./Components/CurrentList";
import AddNewList from './Components/AddNewList';
import NewTask from './Components/NewTask';

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

    this.state = {
      tdl: [
        {
          ID: 0,
          ListName: "test",
          Archived: false,
          Todos: [
            {
              ID: "01",
              Text: "task #1",
              Completed: false
            }
          ]
        },
        {
          ID: 1,
          ListName: "druga lista",
          Archived: false,
          Todos: [
            {
              ID: "11",
              Text: "task #2",
              Completed: false
            }
          ]
        }
      ],
      UserName: "Mihajlo",
      CurrentList: 0,
      showNewListPopup: false,
      showNewTaskPopup: false,
    }
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
    return this.findById(this.state.tdl, this.state.CurrentList, true);
  }

  toggleItem = (ID) => {
    var listInner = this.findById(this.state.tdl, this.state.CurrentList, true);
    var e = listInner.Todos

    for (let i = 0; i < e.length; i++) {
      if (e[i].ID === ID) {
        e[i].Completed = !e[i].Completed
      }
    }

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
      tdl: tdl1
    });
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
          tasks={[...this.findById(this.state.tdl, this.state.CurrentList)]}
          toggleItem={this.toggleItem}
        />
        {
          this.state.showNewTaskPopup ?
            <NewTask open={this.state.showNewTaskPopup} listName={this.currentList().ListName} handleClose={this.exitPopups} newTask={this.newTask} />
            : null
        }
        {
          this.state.showNewListPopup ?
            <AddNewList open={this.state.showNewListPopup} listName={this.currentList().ListName} handleClose={this.exitPopups} newList={this.newList} />
            : null
        }
        <Button variant="raised" color="primary" className={classes.button} onClick={() => {
          this.setState({
            showNewTaskPopup: true
          })
        }}>
          New task
        </Button>
        <Button variant="raised" color="secondary" className={classes.button} onClick={() => {
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

export default withStyles(styles)(ToDo);