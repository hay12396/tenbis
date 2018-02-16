import * as courseActions from '../../actions/courseActions';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import React, { PropTypes } from 'react';
import CourseList from './CourseList';
import { connect } from 'react-redux';
import toastr from 'toastr';

class CoursesPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
    }

    redirectToAddCoursePage(/*event*/) {
        browserHistory.push('/course');
    }

    deleteCourse(course) {
        debugger;
        this.props.actions.deleteCourse(course)
            .then(() => {
                toastr.success('Course deleted.');
            })
            .catch((error) => {
                toastr.error(error);
            });
    }

    render() {
        return (
            <div>
                <h1>Courses</h1>
                <input type="submit"
                    value="Add Course"
                    className="btn btn-primary"
                    onClick={this.redirectToAddCoursePage} />
                {this.props.courses.length > 0 &&
                    <CourseList courses={this.props.courses} onDelete={this.deleteCourse} />}
            </div>
        );
    }
}

CoursesPage.propTypes = {
    courses: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

//This function returns an object that defines the properties that we would like to see exposed in our component.
//state: is the data that is within our Redux store, we have state.courses because we defined it in the rootReducer.
//ownProps: a reference to the component own props.
//We will be able to access the 'courses' via this.props.courses in this component.
//The state is the object exported and defined in the reducers/rootReducer.js.
function mapStateToProps(rootReducer/*, ownProps*/) {
    let sortedCoruses = [...rootReducer.courses].sort((a, b) => { return a.title.localeCompare(b.title); });
    return {
        courses: sortedCoruses
    };
}

//This function returns an object that defines what actions we will be able to access from 'this.props' in our component.
//This will let us do 'this.props.createCourse' in our component.
// function mapDispatchToProps(dispatch) {
//     return {
//         createCourse: (course) => dispatch(courseActions.createCourse(course))
//     };
// }

//This function returns an object that defines what actions we will be able to access from 'this.props' in our component.
//This will let us do 'this.props.actions.{an action}' for every function in courseActions file.
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions, dispatch)
    };
}

//connect allow this component (CoursesPage) to interact with Redux.
//if we didn't supplied the second argument, it would also add a '.dispatch' function to the props of this component.
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);