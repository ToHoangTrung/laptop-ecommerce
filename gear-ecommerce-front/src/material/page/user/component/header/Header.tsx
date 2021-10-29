import React from 'react';
import styles from './header.module.scss'
import './override.scss'
import {AssetPath, UserRouter} from "../../../../../router";
import {Image} from 'primereact/image';
import {useFormik} from "formik";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../store";
import {Menubar} from "primereact/menubar";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import UserDashBoardPage from "../../side-page/user-dashboard/UserDashBoardPage";

interface Props {

}

const Header: React.FC<Props> = ({}) => {

    const [t] = useTranslation('common');
    const currentUser = useSelector((state: RootState) => state.auth.user);
    const formik = useFormik({
        initialValues: {
            keyword: ""
        },
        onSubmit: (data) => {
            // formik.resetForm();
        }
    });

    const items = [
        {
            template: (item: any, options: any) => {
                return (
                    <Link to={"/"} className={options.className + " p-d-flex p-flex-column p-ai-center p-jc-between"}>
                        <i className="pi pi-tags p-mb-2"/>
                        <p>{t('header.discount')}</p>
                    </Link>
                );
            }
        },
        {
            template: (item: any, options: any) => {
                return (
                    <Link to={"/"} className={options.className + " p-d-flex p-flex-column p-ai-center p-jc-between"}>
                        <i className="pi pi-bell p-mb-2"/>
                        <p className={"p-text-center"}>{t('header.notification')}</p>
                    </Link>
                );
            }
        },
        {
            template: (item: any, options: any) => {
                return (
                    <Link to={UserRouter.userDashBoardPaymentPage} className={options.className + " p-d-flex p-flex-column p-ai-center p-jc-between"}>
                        <i className="pi pi-bookmark p-mb-2"/>
                        <p>{t('header.order')}</p>
                    </Link>
                );
            }
        },
        {
            items: [
                {
                    template: (item: any, options: any) => {
                        return (
                            <Link to={UserRouter.userDashBoardPage} className={options.className + " p-d-flex p-ai-center p-jc-start p-p-2"} target={item.target} onClick={options.onClick}>
                                <AccountCircleOutlinedIcon className={"p-ml-0 p-mr-2"}/>
                                <p>{t('header.user-block.account-info')}</p>
                            </Link>
                        );
                    }
                },
                {
                    template: (item: any, options: any) => {
                        return (
                            <Link to={"/"} className={options.className + " p-d-flex p-ai-center p-jc-start p-p-2"} target={item.target} onClick={options.onClick}>
                                <MailOutlinedIcon className={"p-ml-0 p-mr-2"}/>
                                <p>{t('header.user-block.mail')}</p>
                            </Link>
                        );
                    }
                },
                {
                    template: (item: any, options: any) => {
                        return (
                            <div className={"p-p-2 p-d-flex"}>
                                <Button label={t('header.logout')} className={styles.logout}/>
                            </div>
                        );
                    }
                },
            ],
            template: (item: any, options: any) => {
                return (
                    <Link to={UserRouter.loginPage} className={options.className + " p-d-flex p-flex-column p-ai-center p-jc-between"}
                          onClick={currentUser !== null ? options.onClick : null}
                          style={{position: "relative"}}>
                        <i className="pi pi-user p-mb-2"/>
                        {
                            currentUser !== null ? (
                                <p>{currentUser.name}</p>
                            ) : (
                                <p>{t('header.sign-in')}</p>
                            )
                        }
                    </Link>
                );
            }

        },
        {
            template: (item: any, options: any) => {
                return (
                    <Link to={UserRouter.cartPage} className={options.className + " p-d-flex p-flex-column p-ai-center p-jc-between"}>
                        <i className="pi pi-shopping-cart p-mb-2"/>
                        <p>{t('header.cart')}</p>
                    </Link>
                );
            }
        },
    ];

    return (
        <div className={"p-grid p-nogutter " + styles.header}>
            <div className={'p-col-1'}>
            </div>
            <div className={'p-col-10 p-d-flex p-ai-center p-jc-between'}>
                <Link to={"/"}><img src={AssetPath.logoPath} alt="Image" width="60px" className={"p-mr-3"} /></Link>
                <Link to={"/"} className={"p-text-bold p-mr-4 " + styles.headline}>Closure Gear</Link>
                <form onSubmit={formik.handleSubmit} className={"p-mr-4 " + styles.form}>
                    <div className="p-inputgroup" >
                        <InputText placeholder={t('header.search')} name="keyword" value={formik.values.keyword} onChange={formik.handleChange}/>
                        <Button icon="pi pi-search"/>
                    </div>
                </form>
                <Menubar model={items}/>
            </div>
            <div className={'p-col-1'}>
            </div>
        </div>
    );
};

export default Header;
