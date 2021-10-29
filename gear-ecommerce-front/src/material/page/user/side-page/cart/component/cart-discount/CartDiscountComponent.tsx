import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../../../store";
import {useFormik} from "formik";
import {AbstractModel} from "../../../../../../model/main/AbstractModel";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {Divider} from "primereact/divider";
import {
    formatVndMoney,
    getActualDiscountPrice,
    getActualPriceAfterDiscount
} from "../../../../../../service/util.service";
import {useHistory} from "react-router-dom";
import {UserRouter} from "../../../../../../../router";

interface Props {
    onApplyDiscount: Function,
    onRemoveDiscount: Function,
}

const CartDiscountComponent: React.FC<Props> = ({onApplyDiscount, onRemoveDiscount}) => {

    const cart = useSelector((state: RootState) => state.cart.cart);
    const totalProductPrice = useSelector((state: RootState) => state.cart.totalPrice);
    const totalProductPriceAfterDiscount = useSelector((state: RootState) => state.cart.totalPriceAfterDiscount);
    const [t] = useTranslation('common');
    const history = useHistory();

    const formik = useFormik({
        initialValues: {
            code: cart?.discount !== null ? cart?.discount.code : ""
        } as AbstractModel,
        onSubmit: (data) => {
            onApplyDiscount(data.code)
        }
    });

    return (
        <div>
            <div className={"p-grid"}>
                <div className={"p-col-12"}>
                    {
                        cart?.discount !== null ? (
                            <div className={"p-fluid p-p-3 d-div"}>
                                <div className={"p-grid p-d-flex p-ai-end"}>
                                    <div className="p-col-7">
                                        <label className={"p-text-bold"}><h3>Mã giảm giá</h3></label>
                                        <InputText name="code" className={"p-mt-3"} value={cart?.discount.code} disabled={true}/>
                                    </div>
                                    <div className="p-col-5">
                                        <Button className={"p-button p-button-danger"} label={"Hủy mã"} onClick={() => onRemoveDiscount()}/>
                                    </div>
                                </div>
                                <Divider className={"p-mt-5"}/>
                            </div>
                        ) : (
                            <form onSubmit={formik.handleSubmit} className={"p-fluid p-p-3 d-div"}>
                                <div className={"p-grid p-d-flex p-ai-end"}>
                                    <div className="p-col-7">
                                        <label className={"p-text-bold"}><h3>Mã giảm giá</h3></label>
                                        <InputText name="code" className={"p-mt-3"} value={formik.values.code} onChange={formik.handleChange} placeholder={"Nhập mã giảm giá của bạn"}/>
                                    </div>
                                    <div className="p-col-5">
                                        <Button className={"p-button"} label={"Áp dụng ngay"} disabled={formik.values.code === ""}/>
                                    </div>
                                </div>
                                <Divider className={"p-mt-5"}/>
                            </form>
                        )
                    }
                </div>
                <div className={"p-col-12"}>
                    <div className={"p-p-3 d-div p-d-flex p-flex-column"} style={{gridRowGap: 8, color: "var(--neutralgray-700)"}}>
                        <h2 style={{color: "black"}}>Thanh toán</h2>
                        <div className={"p-d-flex p-jc-between p-ai-center"}>
                            <p>Tạm tính</p>
                            <h4 style={{color: "black"}}>{formatVndMoney(totalProductPriceAfterDiscount)}</h4>
                        </div>
                        {
                            cart?.discount && (
                                <div className={"p-d-flex p-jc-between p-ai-center"}>
                                    <p>Khuyến mãi</p>
                                    <h4 style={{color: "var(--polargreen-600)"}}>-{formatVndMoney(getActualDiscountPrice(totalProductPriceAfterDiscount, cart.discount))}</h4>
                                </div>
                            )
                        }
                        <div className={"p-d-flex p-jc-between p-ai-center"}>
                            <p>Thành tiền</p>
                            {
                                cart?.discount ? (
                                    <h2 style={{color: "var(--red-600)"}}>{formatVndMoney(getActualPriceAfterDiscount(totalProductPriceAfterDiscount, cart.discount))}</h2>
                                ) : (
                                    <h2 style={{color: "var(--red-600)"}}>{formatVndMoney(totalProductPriceAfterDiscount)}</h2>
                                )
                            }
                        </div>
                        <div className={"p-d-flex p-jc-between p-ai-center"}>
                            <p/>
                            <p>(Đã bao gồm VAT)</p>
                        </div>
                        <Button className={"p-button"} onClick={() => history.push(UserRouter.paymentPage)} label={"Tiếp tục thanh toán"} disabled={totalProductPrice === 0}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartDiscountComponent;

