// Set up your application entry point here...
/*eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import './styles/styles.css'; //Webpack can import css files too!
import routes from './routes';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { loadCourses } from './actions/courseActions';
import { Router, browserHistory } from 'react-router';
import '../node_modules/toastr/build/toastr.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const store = configureStore();
store.dispatch(loadCourses());//dispatching the loadCourses action when the app starts.

render(//Provider connects the entire application to the redux store.
    <Provider store={store} >
        <Router history={browserHistory} routes={routes} />
    </Provider>,
    document.getElementById('app')
);
