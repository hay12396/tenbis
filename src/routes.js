import React from 'react';
import App from './components/App';
import Error404 from './components/Error404';
import { Route, IndexRoute } from 'react-router';
import HomePage from './components/home/HomePage';
import CoursesPage from './components/courses/CoursesPage';
import ManageCoursePage from './components/courses/ManageCoursePage';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage} />
        <Route path="courses" component={CoursesPage} />
        <Route path="course" component={ManageCoursePage} />
        <Route path="course/:courseId" component={ManageCoursePage} />
        <Route path="*" component={Error404} />
    </Route>
);