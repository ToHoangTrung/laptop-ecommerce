import React from 'react';
import './override.scss'
import styles from './user-dashboard-sidebar.module.scss';
import {useTranslation} from "react-i18next";
import {Link, NavLink} from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import {Menu} from "primereact/menu";
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import EditLocationOutlinedIcon from '@mui/icons-material/EditLocationOutlined';
import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import {UserRouter} from "../../../../../router";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../store";

const UserDashBoardSideBar = () => {

    const [t, i18n] = useTranslation('common');
    const currentUser = useSelector((state: RootState) => state.auth.user)

    const items = [
        {
            className: styles.account,
            template: (item: any, options: any) => {
                return (
                    <div className={options.className + " p-d-flex"} style={{pointerEvents: "none"}}>
                        <AccountCircleOutlinedIcon style={{fontSize: 40}}/>
                        <p className={'p-d-flex p-flex-column p-ml-2'}>
                            <span>{t('user-dashboard-page.side-bar.account-of')}</span>
                            <span className={"p-text-bold"}>{currentUser?.name}</span>
                        </p>
                    </div>
                );
            }
        },
        {
            className: styles.link,
            template: (item: any, options: any) => {
                return (
                    <NavLink to={UserRouter.userDashBoardPage} className={options.className + " p-d-flex"} activeClassName={styles.selected} exact>
                        <ContactsOutlinedIcon/>
                        <p>{t('user-dashboard-page.side-bar.info')}</p>
                    </NavLink>
                );
            }
        },
        {
            className: styles.link,
            template: (item: any, options: any) => {
                return (
                    <NavLink to={UserRouter.userDashBoardPaymentPage} className={options.className + " p-d-flex"} activeClassName={styles.selected} >
                        <AssignmentTurnedInOutlinedIcon/>
                        <p>{t('user-dashboard-page.side-bar.order')}</p>
                    </NavLink>
                );
            }
        },
        {
            className: styles.link,
            template: (item: any, options: any) => {
                return (
                    <NavLink to={UserRouter.userDashBoardAddressPage} className={options.className + " p-d-flex"} activeClassName={styles.selected} >
                        <EditLocationOutlinedIcon/>
                        <p>{t('user-dashboard-page.side-bar.address')}</p>
                    </NavLink>
                );
            }
        },
        {
            className: styles.link,
            template: (item: any, options: any) => {
                return (
                    <NavLink to={"/s"} className={options.className + " p-d-flex"} activeClassName={styles.selected} >
                        <MarkEmailReadOutlinedIcon/>
                        <p>{t('user-dashboard-page.side-bar.notification')}</p>
                    </NavLink>
                );
            }
        },
    ];

    return (
        <div className={styles.userDashBoardSideBar}>
            <Menu model={items} />
        </div>
    );
};

export default UserDashBoardSideBar;
