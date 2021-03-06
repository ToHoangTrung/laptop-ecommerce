import React, {useEffect, useState} from 'react';
import styles from './user-payment-detail.module.scss';
import {useHistory, useParams} from "react-router-dom";
import {Payment} from "../../../../../../model/Payment";
import {getCurrentUserPaymentDetailApi} from "../../../../../../service/payment.service";
import {ExceptionResponse} from "../../../../../../model/main/ExceptionResponse";
import {AssetPath, UserRouter} from "../../../../../../../router";
import PageSpinner from "../../../../../../component/spinner/PageSpinner";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../../../store";
import moment from "moment";
import {setBreadCrumbItems} from "../../../../../../feature/bread-crumb/breadCrumbSlice";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {PaymentProduct} from "../../../../../../model/PaymentProduct";
import {Button} from "primereact/button";
import {formatVndMoney} from "../../../../../../service/util.service";

interface Props {
}

interface RouteParams {
    paymentId: number
}

const UserPaymentDetailComponent: React.FC<Props> = ({}) => {

    // @ts-ignore
    const params: RouteParams = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const [payment, setPayment] = useState<Payment>();
    const currentUser = useSelector((state: RootState) => state.auth.user);
    const userAddress = useSelector((state: RootState) => state.auth.address);

    useEffect(() => {
        getCurrentUserPaymentDetailApi(params.paymentId)
            .then((payment: Payment) => {
                const items = [
                    { label: 'Account', url: UserRouter.userDashBoardPage},
                    { label: 'Order', url: UserRouter.userDashBoardPaymentPage},
                    { label: `Order Detail: ${ '#0000'+ payment.id}`, url: UserRouter.userDashBoardPaymentDetailPage + "/" + payment.id},
                ];
                dispatch(setBreadCrumbItems(items))
                setPayment(payment);
            })
            .catch((err: ExceptionResponse) =>
                history.push({
                    pathname: UserRouter.errorPage,
                    state: {
                        content: err.status === 404 ? "Xin l???i, c?? ??i???u g?? ???? kh??ng ????ng ???? x???y ra, h??y th??? l???i sau" : ""
                    },
            }));

    }, []);

    const productTemplate = (rowData: PaymentProduct) => {
        return (
            <div className={"p-d-flex"}>
                <img src={AssetPath.productImagePath + rowData.product.imageUrls[0]} alt={'product img'} width={70}/>
                <div className={"p-d-flex p-flex-column p-ml-3"} style={{gridRowGap: 8}}>
                    <p className={styles.productName}>{rowData.product.name}</p>
                    <p style={{fontSize: 12}}>SKU: {rowData.product.sku}</p>
                    <Button label={"Vi???t nh???n x??t"} className={"p-button-outlined p-button-sm"} style={{width: "fit-content"}}/>
                </div>
            </div>
        )
    }

    const priceTemplate = (rowData: PaymentProduct) => {
        return (
            <p>
                {formatVndMoney(rowData.paymentPrice)}
            </p>
        )
    }

    const amountTemplate = (rowData: PaymentProduct) => {
        return (
            <p>
                {rowData.amount}
            </p>
        )
    }

    const discountTemplate = (rowData: PaymentProduct) => {
        return (
            <p>
                {formatVndMoney(rowData.paymentDiscount)}
            </p>
        )
    }

    const totalTemplate = (rowData: PaymentProduct) => {
        return (
            <p>
                {formatVndMoney((rowData.paymentPrice - rowData.paymentDiscount) * rowData.amount )}
            </p>
        )
    }

    if (!payment || !currentUser) {
        return (
            <PageSpinner/>
        )
    } else {
        return (
            <div className={"p-p-3"}>
                <div className={"p-mb-3 p-d-flex p-jc-between"}>
                    <h2>Chi ti???t ????n h??ng: #{"0000" + payment.id}</h2>
                    <h2 className={"p-text-normal"}>Tr???ng Th??i: {payment.paymentStatus.label}</h2>
                </div>
                <div className={"p-grid"}>
                    <div className={"p-col-12"}>
                        <div className={"d-div p-p-3"}>
                            <h3>Th??ng b??o</h3>
                            <div className={"p-p-3 p-mt-2 p-d-flex p-flex-column d-div"} style={{border: "1px solid var(--blue-500)", gridRowGap: 8}}>
                                <p>{moment(payment.createdDate).format("DD-MM-YYYY")}: ?????t h??ng th??nh c??ng</p>
                                {
                                    payment.paymentDate && (
                                        <p>{moment(payment.paymentDate).format("DD-MM-YYYY")}: Thanh to??n th??nh c??ng</p>
                                    )
                                }
                                {
                                    payment.shippingDate && (
                                        <p>{moment(payment.shippingDate).format("DD-MM-YYYY")}: Giao h??ng th??nh c??ng</p>
                                    )
                                }
                                {
                                    payment.refundDate && (
                                        <p>{moment(payment.refundDate).format("DD-MM-YYYY")}: Ho??n tr??? h??ng th??nh c??ng</p>
                                    )
                                }
                                {
                                    payment.cancelDate && (
                                        <p>{moment(payment.cancelDate).format("DD-MM-YYYY")}: H???y ????n h??ng th??nh c??ng</p>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className={"p-col-12"}>
                        <div className={"d-div p-p-3"}>
                            <h3>?????a ch??? nh???n h??ng</h3>
                            <div className={"p-p-3 p-mt-2 p-d-flex p-flex-column d-div"} style={{border: "1px solid var(--blue-500)", gridRowGap: 8}}>
                                <p>H??? t??n: {currentUser.address?.name}</p>
                                <p>??i???n tho???i: {currentUser.address?.phone}</p>
                                <p>Email: {currentUser.address?.email}</p>
                                <p>?????a ch???: {userAddress}</p>
                            </div>
                        </div>
                    </div>
                    <div className={"p-col-6"}>
                        <div className={"d-div p-p-3"}>
                            <h3>Ph????ng th???c thanh to??n</h3>
                            <div className={"p-p-3 p-mt-2 d-div"} style={{border: "1px solid var(--polargreen-600)"}}>
                                <p>{payment.paymentType.label}</p>
                            </div>
                        </div>
                    </div>
                    <div className={'p-col-6'}>
                        <div className={"d-div p-p-3"}>
                            <h3>Ph????ng th???c v???n chuy???n</h3>
                            <div className={"p-p-3 p-mt-2 d-div"} style={{border: "1px solid var(--red-600)"}}>
                                <p>{payment.shippingType.label}</p>
                            </div>
                        </div>
                    </div>
                    <div className={"p-col-12"}>
                        <DataTable value={payment.paymentProducts} className={styles.table}>
                            <Column body={productTemplate} header="S???n ph???m" style={{width: "40%"}}/>
                            <Column body={priceTemplate} header="Gi??"/>
                            <Column body={amountTemplate} header="S??? l?????ng"/>
                            <Column body={discountTemplate} header="Gi???m gi??"/>
                            <Column body={totalTemplate} header="T???m t??nh" style={{textAlign: "right"}}/>
                        </DataTable>
                    </div>
                    <div className={"p-col-12"}>
                        <div className={'d-div'}>
                            <div className={"p-p-3 p-d-flex p-flex-column"} style={{width: "50%", marginLeft: "auto", gridRowGap: 8, color: "var(--neutralgray-700)"}}>
                                <div className={"p-d-flex p-jc-between p-ai-center"}>
                                    <p>T???m t??nh</p>
                                    <h4 style={{color: "black"}}>{formatVndMoney(payment.temporaryPrice)}</h4>
                                </div>
                                <div className={"p-d-flex p-jc-between p-ai-center"}>
                                    <p>Ph?? v???n chuy???n</p>
                                    <h4 style={{color: "var(--polargreen-600)"}}>{formatVndMoney(payment.shippingPrice)}</h4>
                                </div>
                                <div className={"p-d-flex p-jc-between p-ai-center"}>
                                    <p>Gi???m gi??</p>
                                    <h4 style={{color: "var(--polargreen-600)"}}>- {formatVndMoney(payment.discountPrice)}</h4>
                                </div>
                                <div className={"p-d-flex p-jc-between p-ai-center"}>
                                    <p>T??ng c???ng</p>
                                    <h2 style={{color: "var(--red-600)"}}>{formatVndMoney(payment.totalPrice)}</h2>
                                </div>
                                <div className={"p-d-flex p-jc-between p-ai-center"}>
                                    <p/>
                                    <p>???? bao g???m VAT</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

};

export default UserPaymentDetailComponent;
