import { Link } from 'react-router';
import React from 'react';

const Error404 = () => {
    return (
        <div className="jumbotron">
            <h1>404</h1>
            <h2>Nothing to see here..</h2>
            <Link className="btn btn-primary btn-lg" to="/">Go Back..</Link>
        </div>
    );
};

export default Error404;