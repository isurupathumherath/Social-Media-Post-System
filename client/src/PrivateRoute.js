import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {getUser} from './helper';

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route 
            {...rest} 
                render={props => 
                    getUser() ? (
                    <Component {...props} /> 
                ) : (
                    <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
                    )
            }
        />
    );
}

export default PrivateRoute;