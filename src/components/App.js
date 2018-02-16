import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from './common/Header';

class App extends React.Component {
    render() {
        return (
            <div className="container">
                <Header loading={this.props.loading} />
                {/*The child component of the Route will be placed here (/about will send AboutPage to here)*/}
                {this.props.children}
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
};

function mapStateToProps(rootReducer/*, props*/) {
    return {
        loading: rootReducer.ajaxCallsInProgress > 0
    };
}

export default connect(mapStateToProps)(App);