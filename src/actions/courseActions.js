import * as types from './actionTypes';
import CourseApi from '../api/mockCourseApi';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';

export function createCourse(course) {
    return { type: types.CREATE_COURSE, course: course };
}

export function createCourseSuccess(course) {//indicates that the call was successfully returned.
    return { type: types.CREATE_COURSE_SUCCESS, course: course };
}

export function updateCourseSuccess(course) {//indicates that the call was successfully returned.
    return { type: types.UPDATE_COURSE_SUCCESS, course: course };
}

export function loadCoursesSuccess(courses) {//indicates that the call was successfully returned.
    return { type: types.LOAD_COURSES_SUCCESS, courses: courses };
}

export function deleteCoursesSuccess(course) {//indicates that the call was successfully returned.
    return { type: types.DELETE_COURSE_SUCCESS, course: course };
}

export function loadCourses() {
    return function (dispatch) {//every thunk returns a function that accept a dispach.
        dispatch(beginAjaxCall());

        return CourseApi.getAllCourses()
            .then((courses) => {
                dispatch(loadCoursesSuccess(courses));
            }).catch((error) => {
                dispatch(ajaxCallError(error));
                throw (error);
            });
    };
}

export function saveCourse(course) {
    //every thunk returns a function that accept a dispach.
    return function (dispatch/*, getState*/) {//the getState parameter is used to access the redux store directly.
        dispatch(beginAjaxCall());
        
        return CourseApi.saveCourse(course)
            .then((savedCourse) => {
                course.id ? dispatch(updateCourseSuccess(savedCourse)) :
                    dispatch(createCourseSuccess(savedCourse));
            }).catch((error) => {
                dispatch(ajaxCallError(error));
                throw (error);
            });
    };
}

export function deleteCourse(course) {
    //every thunk returns a function that accept a dispach.
    return function (dispatch/*, getState*/) {//the getState parameter is used to access the redux store directly.
        dispatch(beginAjaxCall());
        
        return CourseApi.deleteCourse(course.id)
            .then(() => {
                dispatch(deleteCoursesSuccess(course));
            }).catch((error) => {
                dispatch(ajaxCallError(error));
                throw (error);
            });
    };
}