import React from "react";
import {Route} from "react-router-dom";
import {AdminRouter} from "../../../router";
import CategoryManagementPage from "./side-page/category-management/CategoryManagementPage";
import ProductManagementPage from "./side-page/product-management/ProductManagementPage";
import NewProductPage from "./side-page/product-management/new-product/NewProductPage";
import ProductDetailPage from "../user/side-page/product-detail/ProductDetailPage";
import AdminProductDetailPage from "./side-page/product-management/product-detail/AdminProductDetailPage";
import PaymentManagementPage from "./side-page/payment-management/PaymentManagementPage";

interface Props {

}

const AdminDashBoardPage: React.FC<Props> = ({}) => {

    return (
        <div>
            <Route path={AdminRouter.categoryManagementPage} component={CategoryManagementPage} exact/>
            <Route path={AdminRouter.productManagementPage} component={ProductManagementPage} exact/>
            <Route path={AdminRouter.paymentManagementPage} component={PaymentManagementPage} exact/>
            <Route path={AdminRouter.productDetailPage + "/*.:productId"} component={AdminProductDetailPage} exact/>
            <Route path={AdminRouter.newProductPage} component={NewProductPage} exact/>
        </div>
    );
}


export default AdminDashBoardPage;
