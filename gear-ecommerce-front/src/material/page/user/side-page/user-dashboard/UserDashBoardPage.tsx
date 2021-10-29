import React from 'react';
import UserDashBoardSideBar from "../../component/user-dashboard-sidebar/UserDashBoardSideBar";
import PrivateRoute from "../../../../component/private-route/PrivateRoute";
import {UserRouter} from "../../../../../router";
import UserAccountComponent from "./component/user-account-info/UserAccountComponent";
import UserAddressComponent from "./component/user-address/UserAddressComponent";
import UserPaymentComponent from "./component/user-payment/UserPaymentComponent";
import UserPaymentDetailComponent from "./component/user-payment-detail/UserPaymentDetailComponent";

interface Props {
}

const UserDashBoardPage: React.FC<Props> = ({}) => {
    return (
        <div>
            <div className={"p-grid"}>
                <div className={"p-col-3"}>
                    <UserDashBoardSideBar/>
                </div>
                <div className={"p-col-9"}>
                    <PrivateRoute path={UserRouter.userDashBoardPage} component={UserAccountComponent} exact/>
                    <PrivateRoute path={UserRouter.userDashBoardAddressPage} component={UserAddressComponent} exact/>
                    <PrivateRoute path={UserRouter.userDashBoardPaymentPage} component={UserPaymentComponent} exact/>
                    <PrivateRoute path={UserRouter.userDashBoardPaymentDetailPage + "/:paymentId"} component={UserPaymentDetailComponent} exact/>
                </div>
            </div>
        </div>
    );
};

export default UserDashBoardPage;
