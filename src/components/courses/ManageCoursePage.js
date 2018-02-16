import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';
import { browserHistory } from 'react-router';
import toastr from 'toastr';

class ManageCoursePage extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            course: Object.assign({}, this.props.course),
            errors: {},
            saving: false
        };

        this.updateCourseState = this.updateCourseState.bind(this);
        this.saveCourse = this.saveCourse.bind(this);
    }

    //This React lifecycle function is called anytime the props have changed.
    //Or when React thinks that the props might have changed.
    componentWillReceiveProps(nextProps) {
        //safety check (if) because React may call this function when he thinks that the props have changed again.
        //Which is randomally for us (we don't know if and when that might happen)
        if (this.state.course.id !== nextProps.course.id) {
            this.setState({ course: Object.assign({}, nextProps.course) });
        }
    }

    updateCourseState(event) {
        const field = event.target.name;
        let course = Object.assign({}, this.state.course);
        course[field] = event.target.value;
        return this.setState({ course: course });
    }

    saveCourse(event) {
        event.preventDefault();
        let valid = true;
        let errors = {};
        if (this.state.course.length == 0) {
            errors.length = "Please enter the course length.";
            valid = false;
        }

        if (this.state.course.title == 0) {
            errors.title = "Title must be atleast 3 characters.";
            valid = false;
        }

        if (this.state.course.authorId.length == 0) {
            errors.authorId = "Please select an author.";
            valid = false;
        }

        if (this.state.course.category.length == 0) {
            errors.category = "Category must be atleast 3 characters.";
            valid = false;
        }

        if (!valid) {
            this.setState({ errors: errors });
            return;
        }

        this.setState({ saving: true });
        this.props.actions.saveCourse(this.state.course)
            .then(() => {
                this.setState({ saving: false });
                browserHistory.push('/courses');
                toastr.success('Changes saved.');
            }).catch((error) => {
                toastr.error(error);
                this.setState({ saving: false });
            });
    }

    render() {
        return (
            <CourseForm
                onChange={this.updateCourseState}
                allAuthors={this.props.authors}
                course={this.state.course}
                errors={this.state.errors}
                onSave={this.saveCourse}
                saving={this.state.saving} />
        );
    }
}

ManageCoursePage.propTypes = {
    course: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

function getCourseById(courses, id) {
    const filteredCourses = courses.filter(course => course.id === id);
    if (filteredCourses.length > 0) return filteredCourses[0];
    return null;
}

function mapStateToProps(rootReducer, props) {
    let course = {};
    if (props.params.courseId && rootReducer.courses.length > 0) {
        course = getCourseById(rootReducer.courses, props.params.courseId);
    }
    else {
        course = { id: '', watchHref: '', title: '', authorId: '', length: '', category: '' };
    }

    /*
    const formattedAuthorList = rootReducer.authors.map((author) => {
        return {
            value: author.id,
            text: author.firstName + " " + author.lastName
        };
    });
*/
    return {
        course: course,
        authors: []
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);