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
                        content: err.status === 404 ? "Xin lỗi, có điều gì đó không đúng đã xảy ra, hãy thử lại sau" : ""
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
                    <Button label={"Viết nhận xét"} className={"p-button-outlined p-button-sm"} style={{width: "fit-content"}}/>
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
                    <h2>Chi tiết đơn hàng: #{"0000" + payment.id}</h2>
                    <h2 className={"p-text-normal"}>Trạng Thái: {payment.paymentStatus.label}</h2>
                </div>
                <div className={"p-grid"}>
                    <div className={"p-col-12"}>
                        <div className={"d-div p-p-3"}>
                            <h3>Thông báo</h3>
                            <div className={"p-p-3 p-mt-2 p-d-flex p-flex-column d-div"} style={{border: "1px solid var(--blue-500)", gridRowGap: 8}}>
                                <p>{moment(payment.createdDate).format("DD-MM-YYYY")}: Đặt hàng thành công</p>
                                {
                                    payment.paymentDate && (
                                        <p>{moment(payment.paymentDate).format("DD-MM-YYYY")}: Thanh toán thành công</p>
                                    )
                                }
                                {
                                    payment.shippingDate && (
                                        <p>{moment(payment.shippingDate).format("DD-MM-YYYY")}: Giao hàng thành công</p>
                                    )
                                }
                                {
                                    payment.refundDate && (
                                        <p>{moment(payment.refundDate).format("DD-MM-YYYY")}: Hoàn trả hàng thành công</p>
                                    )
                                }
                                {
                                    payment.cancelDate && (
                                        <p>{moment(payment.cancelDate).format("DD-MM-YYYY")}: Hủy đơn hàng thành công</p>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className={"p-col-12"}>
                        <div className={"d-div p-p-3"}>
                            <h3>Địa chỉ nhận hàng</h3>
                            <div className={"p-p-3 p-mt-2 p-d-flex p-flex-column d-div"} style={{border: "1px solid var(--blue-500)", gridRowGap: 8}}>
                                <p>Họ tên: {currentUser.address?.name}</p>
                                <p>Điện thoại: {currentUser.address?.phone}</p>
                                <p>Email: {currentUser.address?.email}</p>
                                <p>Địa chỉ: {userAddress}</p>
                            </div>
                        </div>
                    </div>
                    <div className={"p-col-6"}>
                        <div className={"d-div p-p-3"}>
                            <h3>Phương thức thanh toán</h3>
                            <div className={"p-p-3 p-mt-2 d-div"} style={{border: "1px solid var(--polargreen-600)"}}>
                                <p>{payment.paymentType.label}</p>
                            </div>
                        </div>
                    </div>
                    <div className={'p-col-6'}>
                        <div className={"d-div p-p-3"}>
                            <h3>Phương thức vận chuyển</h3>
                            <div className={"p-p-3 p-mt-2 d-div"} style={{border: "1px solid var(--red-600)"}}>
                                <p>{payment.shippingType.label}</p>
                            </div>
                        </div>
                    </div>
                    <div className={"p-col-12"}>
                        <DataTable value={payment.paymentProducts} className={styles.table}>
                            <Column body={productTemplate} header="Sản phẩm" style={{width: "40%"}}/>
                            <Column body={priceTemplate} header="Giá"/>
                            <Column body={amountTemplate} header="Số lượng"/>
                            <Column body={discountTemplate} header="Giảm giá"/>
                            <Column body={totalTemplate} header="Tạm tính" style={{textAlign: "right"}}/>
                        </DataTable>
                    </div>
                    <div className={"p-col-12"}>
                        <div className={'d-div'}>
                            <div className={"p-p-3 p-d-flex p-flex-column"} style={{width: "50%", marginLeft: "auto", gridRowGap: 8, color: "var(--neutralgray-700)"}}>
                                <div className={"p-d-flex p-jc-between p-ai-center"}>
                                    <p>Tạm tính</p>
                                    <h4 style={{color: "black"}}>{formatVndMoney(payment.temporaryPrice)}</h4>
                                </div>
                                <div className={"p-d-flex p-jc-between p-ai-center"}>
                                    <p>Phí vận chuyển</p>
                                    <h4 style={{color: "var(--polargreen-600)"}}>{formatVndMoney(payment.shippingPrice)}</h4>
                                </div>
                                <div className={"p-d-flex p-jc-between p-ai-center"}>
                                    <p>Giảm giá</p>
                                    <h4 style={{color: "var(--polargreen-600)"}}>- {formatVndMoney(payment.discountPrice)}</h4>
                                </div>
                                <div className={"p-d-flex p-jc-between p-ai-center"}>
                                    <p>Tông cộng</p>
                                    <h2 style={{color: "var(--red-600)"}}>{formatVndMoney(payment.totalPrice)}</h2>
                                </div>
                                <div className={"p-d-flex p-jc-between p-ai-center"}>
                                    <p/>
                                    <p>Đã bao gồm VAT</p>
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
