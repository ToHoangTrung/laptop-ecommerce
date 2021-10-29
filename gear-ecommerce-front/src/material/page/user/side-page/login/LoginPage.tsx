import React, {useEffect} from 'react';
import styles from './login.module.scss'
import {useTranslation} from "react-i18next";
import {Link, Redirect} from "react-router-dom";
import {FACEBOOK_AUTH_URL, GOOGLE_AUTH_URL} from "../../../../../constants";
import {Button} from "primereact/button";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../store";
import {UserRouter} from "../../../../../router";

interface Props {
    location: any;
    history: any;
}

const LoginPage: React.FC<Props> = ({location, history}) => {

    const [t] = useTranslation('common');
    const token = useSelector((state: RootState) => state.auth.token)

    useEffect(() => {
        if(location.state && location.state.error) {
            setTimeout(() => {
                history.replace({
                    pathname: location.pathname,
                    state: {}
                });
            }, 100);
        }
    },[]);

    if (token) {
        return (
            <Redirect
                to={{
                    pathname: UserRouter.homePage,
                    state: { from: location }
                }}/>
        )
    } else {
        return (
            <div className={"p-mt-3 p-d-flex p-flex-column p-ai-center " + styles.login}>
                <p className={"p-text-center p-text-bold p-mb-3 "} style={{fontSize: 20}}>{t('login-page.headline')}</p>
                <a href={FACEBOOK_AUTH_URL}>
                    <Button className="facebook p-py-2 p-mb-3">
                        <i className="pi pi-facebook"/>
                        <span className={styles.method} >{t('login-page.fb-login')}</span>
                    </Button>
                </a>
                <a href={GOOGLE_AUTH_URL}>
                    <Button className="google p-py-2 p-mb-3">
                        <i className="pi pi-google"/>
                        <span className={styles.method}>{t('login-page.google-login')}</span>
                    </Button>
                </a>
            </div>
        );
    }
};

export default LoginPage;
