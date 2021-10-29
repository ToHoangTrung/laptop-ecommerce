import React, {useEffect, useRef, useState} from 'react';
import styles from './payment.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {Payment, PaymentType, ShippingType} from "../../../../model/Payment";
import {RootState} from "../../../../../store";
import {Link, useHistory} from "react-router-dom";
import {AssetPath, UserRouter} from "../../../../../router";
import {setBreadCrumbItems} from "../../../../feature/bread-crumb/breadCrumbSlice";
import {useFormik} from "formik";
import {AbstractModel} from "../../../../model/main/AbstractModel";
import {NewPayment} from "../../../../model/raw/NewPayment";
import {
    createNewCurrentUserPaymentApi,
    getAllPaymentTypeApi,
    getAllShippingTypeApi
} from "../../../../service/payment.service";
import {RadioButton} from "primereact/radiobutton";
import {formatVndMoney, getActualDiscountPrice, getActualPriceAfterDiscount} from "../../../../service/util.service";
import {Button} from 'primereact/button';
import {classNames} from "primereact/utils";
import {Toast} from "primereact/toast";
import PageSpinner from "../../../../component/spinner/PageSpinner";
import {ExceptionResponse} from "../../../../model/main/ExceptionResponse";

interface Props {
}

const PaymentPage: React.FC<Props> = ({}) => {

    const dispatch = useDispatch();
    const [t] = useTranslation('common');
    const cart = useSelector((state: RootState) => state.cart.cart);
    const totalProductPriceAfterDiscount = useSelector((state: RootState) => state.cart.totalPriceAfterDiscount);
    const currentUser = useSelector((state: RootState) => state.auth.user);
    const userAddress = useSelector((state: RootState) => state.auth.address);
    const [paymentTypes, setPaymentTypes] = useState<PaymentType[]>([]);
    const [shippingTypes, setShippingTypes] = useState<ShippingType[]>([]);
    const [paymentPrice, setPaymentPrice] = useState({
        temporaryPrice: totalProductPriceAfterDiscount,
        discountPrice: cart?.discount ? getActualDiscountPrice(totalProductPriceAfterDiscount, cart.discount) : 0,
        shippingPrice: 0,
        totalPrice: cart?.discount ? getActualPriceAfterDiscount(totalProductPriceAfterDiscount, cart.discount) : totalProductPriceAfterDiscount,
    });
    const history = useHistory();
    const toast = useRef(null);
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    useEffect(() => {
        const items = [
            { label: 'Cart', url: UserRouter.cartPage},
            { label: 'Payment', url: UserRouter.paymentPage},
        ];
        dispatch(setBreadCrumbItems(items))
    }, []);

    useEffect(() => {
        getAllPaymentTypeApi().then((paymentTypes: PaymentType[]) => setPaymentTypes(paymentTypes));
        getAllShippingTypeApi().then((shippingTypes: ShippingType[]) => setShippingTypes(shippingTypes));
    }, []);

    const formik = useFormik({
        initialValues: {
            userId: currentUser?.id,
            shippingType: "",
            paymentType: "",
            temporaryPrice: paymentPrice.temporaryPrice,
            discountPrice: paymentPrice.discountPrice,
            shippingPrice: paymentPrice.shippingPrice,
            totalPrice: paymentPrice.totalPrice,
            shippingAddress: userAddress
        } as NewPayment,
        onSubmit: (data) => {
            if (!data.paymentType) {
                // @ts-ignore
                toast.current.show({ severity: 'error', summary: 'Error Message', detail: "Vui lòng chọn phương thức thanh toán", life: 3000 });
                return;
            }
            if (!data.shippingType) {
                // @ts-ignore
                toast.current.show({ severity: 'error', summary: 'Error Message', detail: "Vui lòng chọn phương thức giao hàng", life: 3000 });
                return;
            }
            createNewCurrentUserPaymentApi(data)
                .then((res) => {
                    setPaymentSuccess(true);
                }).catch((err: ExceptionResponse) => {
                    console.log(err);
            })
        }
    });

    const OrderBlock = () => {
        return (
            <div className={'p-p-3 d-div'}>
                <div className={"p-mb-2 p-d-flex p-jc-between"}>
                    <h3>{t('payment-page.order.headline')}</h3>
                    <Link to={UserRouter.cartPage}>{t('payment-page.order.edit')}</Link>
                </div>
                {
                    cart && cart.cartProducts.length > 0 ? (
                        <div className={"p-d-flex p-flex-column"}>
                            {
                                cart.cartProducts.filter(x => x.checked).map((cartProduct, index) => (
                                    <div key={index} className={"p-d-flex p-mb-2"}>`
                                        <div className={"p-mr-3 " + styles.productImage}>
                                            <img src={AssetPath.productImagePath + cartProduct.product.imageUrls[0]} alt={"product-image"}/>
                                        </div>
                                        <div>
                                            <p className={styles.productName + " p-mb-1"}>{cartProduct.product.name}</p>
                                            <p style={{color: "var(--surface-600)", fontSize: 13}} className={"p-mb-1"}>{t('payment-page.order.amount')}: {cartProduct.amount}</p>
                                            <p className={"p-text-bold"}>{(cartProduct.product.price * cartProduct.amount).toLocaleString('vi-VI', { style: 'currency', currency: 'VND' })}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    ) : (
                        <div className={"p-p-3"} style={{border: "1px solid var(--red-600)", borderRadius: 5, lineHeight: 1.5}}>
                            <p>{t('payment-page.order.cart-empty')}</p>
                        </div>
                    )
                }
            </div>
        )
    }

    const AddressBlock = () => {
        return (
            <div className={"p-p-3 d-div"}>
                <div className={"p-mb-2 p-d-flex p-jc-between"}>
                    <h3>{t('payment-page.address.headline')}</h3>
                    <Link to={UserRouter.userDashBoardAddressPage}>{t('payment-page.address.edit')}</Link>
                </div>
                {
                   currentUser && userAddress ? (
                        <div className={"p-p-3"} style={{border: "1px solid var(--blue-500)", borderRadius: 5, lineHeight: 1.5}}>
                            <p className={"p-text-bold p-mb-1"}>Họ tên: {currentUser.address?.name}</p>
                            <p>Điện thoại: {currentUser.address?.phone}</p>
                            <p>Email: {currentUser.address?.email}</p>
                            <p>Địa chỉ: {userAddress}</p>
                        </div>
                    ) : (
                        <div className={"p-p-3"} style={{border: "1px solid var(--red-600)", borderRadius: 5, lineHeight: 1.5}}>
                            <p>{t('payment-page.address.no-address')}</p>
                        </div>
                    )
                }
            </div>
        )
    }

    const PaymentTypeBlock = () => {
        return (
            <div className={"p-p-3 d-div"}>
                <h3 className={"p-mb-2"}>{t('payment-page.payment-type')}</h3>
                <div className={"p-grid"}>
                    {
                        paymentTypes.map((paymentType, index) => (
                            <div key={index} className={"p-col-6 p-d-flex p-ai-center"}>
                                <RadioButton value={paymentType.value} name="paymentType" onChange={formik.handleChange} checked={formik.values.paymentType === paymentType.value}/>
                                <img src={AssetPath.websiteImgPath + "credit-card.png"} alt={"payment-type"} width={50} className={"p-mx-3"}/>
                                <label>{paymentType.label}</label>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }

    const ShippingTypeBlock = () => {
        return (
            <div className={"p-p-3 d-div"}>
                <h3 className={"p-mb-2"}>{t('payment-page.shipping-type')}</h3>
                <div className={"p-grid"}>
                    {
                        shippingTypes.map((shippingType, index) => (
                            <div key={index} className={"p-col-6 p-d-flex p-ai-center "}>
                                <RadioButton value={shippingType.value} name="shippingType" onChange={formik.handleChange} checked={formik.values.shippingType === shippingType.value}/>
                                <img src={AssetPath.websiteImgPath + "credit-card.png"} alt={"payment-type"} width={50} className={"p-mx-3"}/>
                                <label>{shippingType.label}</label>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }

    const PaymentPriceBlock = () => {
        return (
            <div className={"p-p-3 d-div p-d-flex p-flex-column"} style={{gridRowGap: 8, color: "var(--neutralgray-700)"}}>
                <div className={"p-d-flex p-jc-between p-ai-center"}>
                    <p>{t('payment-page.order.price.temporary')}</p>
                    <h4 style={{color: "black"}}>{formatVndMoney(paymentPrice.temporaryPrice)}</h4>
                </div>
                <div className={"p-d-flex p-jc-between p-ai-center"}>
                    <p>{t('payment-page.order.price.shipping')}</p>
                    <h4 style={{color: "var(--polargreen-600)"}}>{formatVndMoney(paymentPrice.shippingPrice)}</h4>
                </div>
                <div className={"p-d-flex p-jc-between p-ai-center"}>
                    <p>{t('payment-page.order.price.discount')}</p>
                    <h4 style={{color: "var(--polargreen-600)"}}>- {formatVndMoney(paymentPrice.discountPrice)}</h4>
                </div>
                <div className={"p-d-flex p-jc-between p-ai-center"}>
                    <p>{t('payment-page.order.price.total')}</p>
                    <h2 style={{color: "var(--red-600)"}}>{formatVndMoney(paymentPrice.totalPrice)}</h2>
                </div>
                <div className={"p-d-flex p-jc-between p-ai-center"}>
                    <p/>
                    <p>{t('payment-page.order.price.vat-include')}</p>
                </div>
                <Button type={"submit"} className={"p-d-flex p-jc-center p-ai-center p-button p-button-danger"} label={t('payment-page.order-btn')}/>
            </div>
        )
    }

    if (paymentSuccess) {
        return (
            <div className={"p-d-flex p-flex-column p-ai-center p-jc-center p-p-6 d-div"}>
                <img src={AssetPath.paymentSuccessImgPath} alt={"cart-empty"} className={"p-mb-4"} width={200}/>
                <h4>Bạn đã đặt mua đơn hàng thành công, chúng tôi sẽ liên lạc với bạn sớm nhất có thể</h4>
                <Button onClick={() => history.push(UserRouter.userDashBoardPaymentPage)} className={"p-mt-4 p-py-2 p-px-6 p-button"}>Theo dõi tiến độ đơn hàng tại đây</Button>
            </div>
        );
    } else if (currentUser && cart && paymentTypes.length > 0 && shippingTypes.length > 0){
        return (
            <div>
                <Toast ref={toast}/>
                <form onSubmit={formik.handleSubmit}>
                    <div className={'p-grid'}>
                        <div className={"p-col-8"}>
                            <div className={"p-grid"}>
                                <div className={"p-col-12"}>
                                    <AddressBlock/>
                                </div>
                                <div className={"p-col-12"}>
                                    <PaymentTypeBlock/>
                                </div>
                                <div className={"p-col-12"}>
                                    <ShippingTypeBlock/>
                                </div>
                            </div>
                        </div>
                        <div className={'p-col-4'}>
                            <div className={'p-grid'}>
                                <div className={'p-col-12'}>
                                    <OrderBlock/>
                                </div>
                                <div className={'p-col-12'}>
                                    <PaymentPriceBlock/>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    } else {
        return (
            <PageSpinner/>
        )
    }

};

export default PaymentPage;
