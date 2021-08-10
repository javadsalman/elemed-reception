import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import AppointmentReducer from './store/reducres/appointmentReducer';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import authReducer from './store/reducres/authReducer';

const rootReducer = combineReducers({
    appointment: AppointmentReducer,
    auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));


ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
