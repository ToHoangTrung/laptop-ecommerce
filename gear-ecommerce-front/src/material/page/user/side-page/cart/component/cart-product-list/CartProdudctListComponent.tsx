import React, {useEffect, useState} from 'react';
import './override.scss';
import styles from './cart-product-list.module.scss';
import {OrderList} from "primereact/orderlist";
import {CartProduct} from "../../../../../../model/CartProduct";
import {AssetPath} from "../../../../../../../router";
import {Checkbox} from "primereact/checkbox";
import {Button} from "primereact/button";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {formatVndMoney} from "../../../../../../service/util.service";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../../../store";

interface Props {
    cartProducts: CartProduct[],
    onUpdateProductAmount: Function,
    onCheckProduct: Function
    onCheckAllProduct: Function,
    onRemoveProduct: Function,
}

const CartProductListComponent: React.FC<Props> = ({cartProducts, onUpdateProductAmount, onCheckProduct, onCheckAllProduct, onRemoveProduct}) => {

    const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);
    const totalPriceAfterDiscount = useSelector((state: RootState) => state.cart.totalPriceAfterDiscount);
    const checkAll = useSelector((state: RootState) => state.cart.checkAll);
    const [t] = useTranslation('common');

    const itemTemplate = (item: CartProduct) => {
        return (
            <div className={"p-d-flex p-jc-between p-p-3 p-jc-between " + styles.productItem}>
                <Checkbox checked={item.checked} className={"p-as-center p-mr-3 "} onChange={() => onCheckProduct(item.id)}/>
                <div className={"p-mr-3 " + styles.productImage}>
                    <img src={`${AssetPath.productImagePath}${item.product.imageUrls[0]}`} alt={"product-image"}/>
                </div>
                <div className={"p-pr-3"} style={{flexBasis: "70%"}}>
                    <Link to={"/"} className={"p-mb-2 " + styles.productName}>{item.product.name}</Link>
                    <p className={styles.productSku}>SKU: {item.product.sku}</p>
                </div>
                <div className={"p-d-flex p-flex-column p-ai-center p-mr-3"}>
                    <span className={"p-d-flex " + styles.buttonSet}>
                        <Button className={"p-d-flex p-jc-center p-ai-center"} onClick={() => onUpdateProductAmount(item.amount - 1, item.id)}><RemoveOutlinedIcon/></Button>
                        <Button className={"p-d-flex p-jc-center p-ai-center"}>{item.amount}</Button>
                        <Button className={"p-d-flex p-jc-center p-ai-center"} onClick={() => onUpdateProductAmount(item.amount + 1, item.id)}><AddOutlinedIcon/></Button>
                    </span>
                    <p className={"p-mt-2 " + styles.removeLabel} onClick={() => onRemoveProduct(item.id)}>{t('user-cart-page.remove-label')}</p>
                </div>
                {
                    item.product.discount && item.product.discount.discountPrice > 0 ? (
                        <div className={"p-mb-2 p-text-right " + styles.productPrice}>
                            <h3>{formatVndMoney((item.product.price - item.product.discount.discountPrice) * item.amount)}</h3>
                            <h4>{formatVndMoney(item.product.price * item.amount)}</h4>
                        </div>
                    ) : item.product.discount && item.product.discount.discountPercent > 0 ? (
                        <div className={"p-mb-2 p-text-right " + styles.productPrice}>
                            <h3>{formatVndMoney((item.product.price - item.product.price * item.product.discount.discountPercent / 100) * item.amount)}</h3>
                            <h4>{formatVndMoney(item.product.price * item.amount)}</h4>
                        </div>
                    ) : (
                        <div className={"p-mb-2 p-text-right " + styles.productPrice}>
                            <h3>{formatVndMoney(item.product.price * item.amount)}</h3>
                        </div>
                    )
                }
            </div>
        );
    }

    const HeaderItemPlate = () => {
        return (
            <div className={"p-d-flex p-py-2 p-px-3 p-jc-start p-ai-center " + styles.header}>
                <Checkbox checked={checkAll} className={"p-mr-3"} onChange={() => onCheckAllProduct(checkAll)}/>
                <div className={styles.websiteImage}>
                    <img src={AssetPath.logoPath} alt={"product-image"}/>
                </div>
                <h3 className={"p-ml-3"}>Closure Gear</h3>
                <div className={"p-ml-auto p-text-right " + styles.totalPrice}>
                    <h3>{formatVndMoney(totalPriceAfterDiscount)}</h3>
                    <h4>{formatVndMoney(totalPrice)}</h4>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.cartProduct}>
            <HeaderItemPlate/>
            <OrderList value={cartProducts} dataKey="id" itemTemplate={itemTemplate}/>
        </div>
    );
};

export default CartProductListComponent;
