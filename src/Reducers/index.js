import {combineReducers} from "redux";
import General from "./GeneralReducer";
import User from "./UserReducer";
import Uno from "./UnoReducer";
import Todo from "./ToDoReducer";

export default combineReducers({
    General,
    User,
    Uno,
    Todo
});