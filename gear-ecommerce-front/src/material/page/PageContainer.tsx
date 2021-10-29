import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AdminRouter, UserRouter} from "../../router";
import HomePage from "./user/HomePage";
import Header from "./user/component/header/Header";
import ProductCollectionPage from "./user/side-page/product-collection/ProductCollectionPage";
import {getCatalogHierarchicalApi} from "../service/catalog.service";
import {Catalog} from "../model/Catalog";
import {setCatalogHierarchical} from "../feature/category/categorySlice";
import ProductDetailPage from "./user/side-page/product-detail/ProductDetailPage";
import PrivateRoute from "../component/private-route/PrivateRoute";
import CartPage from "./user/side-page/cart/CartPage";
import LoginPage from "./user/side-page/login/LoginPage";
import {ACCESS_TOKEN} from "../../constants";
import {getCurrentUserApi} from "../service/user.service";
import {User} from "../model/User";
import {setUser} from '../feature/auth/authSlice';
import OAuth2RedirectHandler from "./user/side-page/login/OAuth2RedirectHandler";
import {getCurrentUserCartApi} from "../service/cart.service";
import {Cart} from "../model/Cart";
import {setCart} from '../feature/cart/cartSlice';
import UserDashBoardPage from "./user/side-page/user-dashboard/UserDashBoardPage";
import {RootState} from "../../store";
import {BreadCrumb} from "primereact/breadcrumb";
import PaymentPage from "./user/side-page/payment/PaymentPage";
import SideNav from "./user/component/side-nav/SideNav";
import ErrorPage from "./user/side-page/error/ErrorPage";
import AdminDashBoardPage from "./admin/AdminDashBoardPage";
import AdminSideBarComponent from './admin/component/admin-sidebar/AdminSideBarComponent';
import AdminHeaderComponent from "./admin/component/admin-header/AdminHeaderComponent";

const PageContainer = () => {

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const breadCrumbItems = useSelector((state: RootState) => state.breadCrumb.items)

    useEffect(() => {
        if (localStorage.getItem(ACCESS_TOKEN)) {
            getCurrentUserApi()
                .then((user: User) => dispatch(setUser(user)));
            getCurrentUserCartApi()
                .then((cart: Cart) => dispatch(setCart(cart)))
                .finally(() => setIsLoading(false));
        } else {
            setIsLoading(false)
        }
    }, []);

    useEffect(() => {
        getCatalogHierarchicalApi().then((catalogs: Catalog[]) => dispatch(setCatalogHierarchical(catalogs)));
    },[]);

    const home = { icon: 'pi pi-home', url: '/'}

    if (!isLoading) {
        return (
            <Router>
                <div>
                    <AdminSideBarComponent/>
                    <div style={{width: "79.5%", marginLeft: 300}}>
                            <AdminHeaderComponent/>
                        <div className={"d-div p-p-3"}>
                            <BreadCrumb model={breadCrumbItems} home={home} className={"p-mb-3"}/>
                            <Route path={AdminRouter.dashboardPage} component={AdminDashBoardPage}/>
                        </div>
                    </div>
                </div>
            </Router>
        )
    } else {
        return (
            <Router>
                <div >
                    <div className={"p-grid"}>
                        <div className={"p-col-12"}>
                            <Header/>
                        </div>
                        <div className={'p-col-12'}>
                            <SideNav/>
                        </div>
                        <div className={'p-col-1'}>
                        </div>
                        <div className={'p-col-10'}>
                            <div className={"p-mb-2"}>
                                {
                                    breadCrumbItems.length !== 0 && (
                                        <BreadCrumb model={breadCrumbItems} home={home}/>
                                    )
                                }
                            </div>
                            <Route path={UserRouter.homePage} component={HomePage} exact/>
                            <Route path={UserRouter.loginPage}
                                   render={(props) =>
                                       <LoginPage {...props}/>}/>
                            <Route path={UserRouter.oauth2Redirect} component={OAuth2RedirectHandler}/>
                            <Route path={UserRouter.productCollectionPage} component={ProductCollectionPage}/>
                            <Route path={UserRouter.productDetailPage + "/*.:productId"} component={ProductDetailPage}/>
                            <Route path={UserRouter.errorPage} exact
                                   render={(props) =>
                                <ErrorPage {...props}/>}/>
                            <PrivateRoute path={UserRouter.cartPage} component={CartPage}/>
                            <PrivateRoute path={UserRouter.userDashBoardPage} component={UserDashBoardPage}/>
                            <PrivateRoute path={UserRouter.paymentPage} component={PaymentPage}/>
                        </div>
                        <div className={'p-col-1'}>
                        </div>
                    </div>
                </div>
            </Router>
        )
    }
};

export default PageContainer;
