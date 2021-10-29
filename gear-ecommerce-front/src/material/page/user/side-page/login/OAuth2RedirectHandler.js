import React from 'react';
import {Redirect} from "react-router-dom";
import {UserRouter} from "../../../../../router";
import {setToken} from '../../../../feature/auth/authSlice'
import {ACCESS_TOKEN} from "../../../../../constants";
import {useDispatch} from "react-redux";

const OAuth2RedirectHandler = (props) => {

    const {
        location,
    } = props

    const dispatch = useDispatch();

    const getUrlParameter = (name) => {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        let results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    const token = getUrlParameter('token');
    const error = getUrlParameter('error');

    if(token) {
        dispatch(setToken(token))
        return <Redirect to={{
            pathname: UserRouter.homePage,
            state: { from: location }
        }}/>;
    } else {
        return <Redirect to={{
            pathname: UserRouter.loginPage,
            state: {
                from: location,
                error: error
            }
        }}/>;
    }
};

export default OAuth2RedirectHandler;
