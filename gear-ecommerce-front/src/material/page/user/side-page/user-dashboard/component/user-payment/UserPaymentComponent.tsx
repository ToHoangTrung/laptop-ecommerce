import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {Payment} from "../../../../../../model/Payment";
import {getAllCurrentUserPaymentApi} from "../../../../../../service/payment.service";
import PageSpinner from "../../../../../../component/spinner/PageSpinner";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import moment from "moment";
import styles from './user-payment.module.scss';
import {Link} from "react-router-dom";
import {formatVndMoney} from "../../../../../../service/util.service";
import {AssetPath, UserRouter} from "../../../../../../../router";
import {setBreadCrumbItems} from "../../../../../../feature/bread-crumb/breadCrumbSlice";

interface Props {
}

const UserPaymentComponent: React.FC<Props> = ({}) => {

    const [payments, setPayments] = useState<Payment[]>([]);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getAllCurrentUserPaymentApi()
            .then((payments: Payment[]) => {
                setPayments(payments)
            })
            .finally(() => setIsLoading(false));
        const items = [
            { label: 'Account', url: UserRouter.userDashBoardPage},
            { label: 'Order', url: UserRouter.userDashBoardPaymentPage},
        ];
        dispatch(setBreadCrumbItems(items))
    }, []);

    const idTemplate = (rowData: Payment) => {
        return (
            <Link to={UserRouter.userDashBoardPaymentDetailPage + `/${rowData.id}`}>{"0000" + rowData.id}</Link>
        )
    }

    const paymentDateTemplate = (rowData: Payment) => {
        return moment(rowData.createdDate).format("DD-MM-YYYY");
    }

    const paymentProductTemplate = (rowData: Payment) => {
        return (
            <div className={"p-d-flex p-flex-column"} style={{gridRowGap: 4}}>
                {
                    rowData.paymentProducts.map((paymentProduct, index) => (
                        <p key={index} className={styles.productName}>{paymentProduct.product.name}</p>
                    ))
                }
            </div>
        )
    }

    const totalPriceTemplate = (rowData: Payment) => {
        return (
            <p>{formatVndMoney(rowData.totalPrice)}</p>
        )
    }

    const paymentStatusTemplate = (rowData: Payment) => {
        return (
            <p>{rowData.paymentStatus.label}</p>
        )
    }

    if (isLoading) {
        return (
            <PageSpinner/>
        )
    } else if (payments.length === 0) {
        return (
            <div className={"p-d-flex p-flex-column p-ai-center p-jc-center p-p-6 d-div"}>
                <img src={AssetPath.noPaymentImgPath} alt={"cart-empty"} className={"p-mb-4"} width={200}/>
                <h4>Oops! B???n v???n ch??a c?? ????n h??ng n??o</h4>
                <Link to={"/"} className={"p-mt-4 p-py-2 p-px-6 p-button"}>Nh???n v??o ????y ????? ti???p t???c mua s???m nh??</Link>
            </div>
        )
    } else {
        return (
            <div className={"p-p-3"}>
                <h2 className={"p-mb-3"}>Danh s??ch ????n h??ng</h2>
                <DataTable value={payments} className={styles.table}>
                    <Column body={idTemplate} header="M?? ????n H??ng" style={{width: "10%"}}/>
                    <Column body={paymentDateTemplate} header="Ng??y ?????t h??ng" style={{width: "15%"}}/>
                    <Column body={paymentProductTemplate} header="S???n ph???m" style={{width: "45%"}}/>
                    <Column body={totalPriceTemplate} header="T???ng ti???n" style={{width: "15%"}}/>
                    <Column body={paymentStatusTemplate} header="Tr???ng th??i ????n h??ng" style={{width: "15%", textAlign: "right"}}/>
                </DataTable>
            </div>
        );
    }
};

export default UserPaymentComponent;
