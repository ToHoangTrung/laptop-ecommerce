import React, {useEffect, useRef, useState} from 'react';
import styles from '../../admin-dashboard.module.scss'
import {Payment} from "../../../../model/Payment";
import PageSpinner from "../../../../component/spinner/PageSpinner";
import {Toast} from "primereact/toast";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {formatVndMoney} from "../../../../service/util.service";
import {getAllPaymentApi} from "../../../../service/payment.service";
import {AdminRouter} from "../../../../../router";
import {setBreadCrumbItems} from "../../../../feature/bread-crumb/breadCrumbSlice";
import {useDispatch} from "react-redux";
import moment from "moment";

interface Props {

}


const PaymentManagementPage: React.FC<Props> = ({}) => {

    const [payments, setPayments] = useState<Payment[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedPayments, setSelectedPayments] = useState(null);
    const toast = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        getAllPaymentApi().then((payments: Payment[]) => {
            console.log(payments)
            setPayments(payments)
        }).finally(() => setIsLoading(false));
        const items = [
            { label: 'Payment Collection', url: AdminRouter.paymentManagementPage},
        ];
        dispatch(setBreadCrumbItems(items))
    }, [])

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

    if (isLoading) {
        return (
            <PageSpinner/>
        )
    } else {
        return (
            <div>
                <Toast ref={toast} />
                <DataTable value={payments} selection={selectedPayments} onSelectionChange={(e) => setSelectedPayments(e.value)}
                           dataKey="id" className={styles.table}>
                    <Column selectionMode="multiple" headerStyle={{width: '3rem'}}/>
                    <Column body={(data: Payment) => <p>{data.id}</p>} header="Id" sortable style={{width: "7%"}}/>
                    <Column body={paymentProductTemplate} header="Products" style={{width: "35%"}}/>
                    <Column body={(data: Payment) => <p>{formatVndMoney(data.totalPrice)}</p>} header="Total Price" sortable/>
                    <Column body={(data: Payment) => <p>{data.paymentStatus.label}</p>} header="Payment Status" sortable/>
                    <Column body={(data: Payment) => <p>{data.user.name}</p>} header="Customer" sortable/>
                    <Column body={(data: Payment) => <p>{moment(data.createdDate).format("DD-MM-YYYY")}</p>} header="Purchased Date" sortable/>
                </DataTable>
            </div>
        );
    }
};

export default PaymentManagementPage;
