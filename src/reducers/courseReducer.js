import * as types from '../actions/actionTypes';
import initialState from './initialState';
//What ever we return from here will be the value of the 'state.{defined name in reducers/rootReducer.js}'
//argument in the mapStateToProps function in the components that uses this reducer.
export default function CourseReducer(state = initialState.courses, action) {//starting out with no courses (default state).
    switch (action.type) {
        case types.LOAD_COURSES_SUCCESS:
            return action.courses;

        case types.CREATE_COURSE_SUCCESS://returning a new instance of the state array.
            return [...state, Object.assign({}, action.course)];//doing a deep copy of the action.course, returning a new array with the copy

        case types.UPDATE_COURSE_SUCCESS:
            return [
                ...state.filter(course => course.id !== action.course.id),//create a new array with all the other courses
                Object.assign({}, action.course)];//and add a copy of the updated course to the new array.

        case types.DELETE_COURSE_SUCCESS:
            return [
                ...state.filter(course => course.id !== action.course.id)];//create a new array with all the other courses

        default:
            return state;
    }
}