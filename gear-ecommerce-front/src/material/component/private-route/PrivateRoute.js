import React, {Component} from 'react';
import {
    Route,
    Redirect
} from "react-router-dom";
import {UserRouter} from "../../../router";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";

const PrivateRoute = ({ component: Component, ...rest }) => {

    const authenticated = useSelector((state) => state.auth.authenticated);

    return (
        <Route
            {...rest}
            render={props =>
                authenticated ? (
                    <Component {...rest} {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: UserRouter.loginPage,
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    )
};

export default PrivateRoute
