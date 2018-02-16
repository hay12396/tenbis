import ajaxCallsInProgress from './ajaxStatusReducer';
import { combineReducers } from 'redux';
import courses from './courseReducer';

const rootReducer = combineReducers({
    courses, //this will be the way we will access the courseReducer throughout the app.
    ajaxCallsInProgress
});

export default rootReducer;