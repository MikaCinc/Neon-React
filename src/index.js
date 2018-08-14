import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// Reducer
import reducer from "./Reducers/index";
// redux
import { createStore } from 'redux'
import { Provider } from "react-redux";

const store = createStore(reducer)

//console.log(store.getState())

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root'));

registerServiceWorker();