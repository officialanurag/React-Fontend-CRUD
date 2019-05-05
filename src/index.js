import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Reducer from './reducer/employeeReducer';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';


let store = createStore(Reducer);
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));