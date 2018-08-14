import {combineReducers} from "redux";
import General from "./GeneralReducer";
import User from "./UserReducer";
import Uno from "./UnoReducer";

export default combineReducers({
    General,
    User,
    Uno
});