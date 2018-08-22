import {combineReducers} from "redux";
import General from "./GeneralReducer";
import User from "./UserReducer";
import Uno from "./UnoReducer";
import Todo from "./ToDoReducer";
import Counters from "./CountersReducer";

export default combineReducers({
    General,
    User,
    Uno,
    Todo,
    Counters
});