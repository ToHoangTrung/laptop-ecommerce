import React, {useEffect, useRef, useState} from 'react';
import styles from './cart-page.module.scss'
import {RootState} from "../../../../../store";
import {useDispatch, useSelector} from "react-redux";
import {
    addOrUpdateCurrentUserCartProduct, applyDiscountToCurrentUserCartApi,
    getCurrentUserCartApi, removeCurrentUserCartDiscountApi,
    removeCurrentUserCartProductApi
} from "../../../../service/cart.service";
import {Cart} from "../../../../model/Cart";
import { setCart } from '../../../../feature/cart/cartSlice';
import {CartProduct} from "../../../../model/CartProduct";
import {useTranslation} from "react-i18next";
import {ConfirmDialog} from "primereact/confirmdialog";
import {Toast} from "primereact/toast";
import {getCurrentUserApi} from "../../../../service/user.service";
import {AssetPath, UserRouter} from "../../../../../router";
import {Button} from "primereact/button";
import {Link} from "react-router-dom";
import { setBreadCrumbItems } from '../../../../feature/bread-crumb/breadCrumbSlice';
import CartProductListComponent from "./component/cart-product-list/CartProdudctListComponent";
import CartDiscountComponent from "./component/cart-discount/CartDiscountComponent";
import {ExceptionResponse} from "../../../../model/main/ExceptionResponse";

interface Props {
}

const CartPage: React.FC<Props> = ({}) => {

    const dispatch = useDispatch();
    const cart = useSelector((state: RootState) => state.cart.cart);
    const [t] = useTranslation('common');
    const [confirmRemoveDialog, setConfirmRemoveDialog] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState<number>(-1);
    const toast = useRef(null);

    useEffect(() => {
        const items = [
            { label: 'Cart', url: UserRouter.cartPage},
        ];
        dispatch(setBreadCrumbItems(items))
    }, [])

    const addOrUpdateCurrentUserCartProductFunc = (cartProduct: CartProduct) => {
        addOrUpdateCurrentUserCartProduct(cartProduct)
            .then((res: string) => {
                getCurrentUserCartApi().then((cart: Cart) => dispatch(setCart(cart)));
            })
            .catch((err: ExceptionResponse) => {
                // @ts-ignore
                toast.current.show({ severity: 'error', summary: 'Error Message', detail: err.message, life: 3000 });
            });
    }

    const handleCheckProduct = async (id: number) => {
        if (cart !== null) {
            let choseCart: CartProduct | undefined = cart.cartProducts.find(x => x.id === id);
            if (choseCart !== undefined) {
                choseCart = {...choseCart, checked: !choseCart.checked}
                addOrUpdateCurrentUserCartProductFunc(choseCart);
            }
        }
    }

    const handleCheckAllProduct = async (type: boolean) => {
        if (cart !== null) {
            for (let i = 0; i < cart.cartProducts.length; i++) {
                let updateCartProduct: CartProduct = {
                    id: cart.cartProducts[i].id,
                    product: cart.cartProducts[i].product,
                    amount: cart.cartProducts[i].amount,
                    checked: !type,
                }
                addOrUpdateCurrentUserCartProductFunc(updateCartProduct);
            }
        }
    }

    const handleUpdateProductAmount = async (amount: number, id: number) => {
        if (cart !== null) {
            let choseCart: CartProduct | undefined = cart.cartProducts.find(x => x.id === id);
            if (choseCart !== undefined) {
                if (amount <= 0) {
                    setSelectedProductId(id);
                    setConfirmRemoveDialog(true);
                } else {
                    choseCart = {...choseCart, amount: amount}
                    addOrUpdateCurrentUserCartProductFunc(choseCart);
                }
            }
        }
    }

    const removeCurrentUserCartProductsFunc = () => {
        if (selectedProductId >= 0) {
            removeCurrentUserCartProductApi(selectedProductId)
                .then((res) => {
                    getCurrentUserCartApi().then((cart: Cart) => dispatch(setCart(cart)));
                    // @ts-ignore
                    toast.current.show({ severity: 'info', summary: 'Confirmed', detail: res, life: 3000 });
                }).catch((err) => {
                // @ts-ignore
                toast.current.show({ severity: 'error', summary: 'Error Message', detail: err, life: 3000 });
            }).finally(() => setSelectedProductId(-1))
        }
    }

    const handleApplyDiscount = (code: string) => {
        applyDiscountToCurrentUserCartApi(code)
            .then((res: string) => {
                getCurrentUserCartApi().then((cart: Cart) => dispatch(setCart(cart)));
                // @ts-ignore
                toast.current.show({ severity: 'success', summary: 'Success Message' +
                        '', detail: res, life: 3000 });
            }).catch((err: ExceptionResponse) => {
            // @ts-ignore
            toast.current.show({ severity: 'error', summary: 'Error Message', detail: err.message, life: 3000 });
        })
    }

    const handleRemoveDiscount = () => {
        removeCurrentUserCartDiscountApi()
            .then((res: string) => {
                getCurrentUserCartApi().then((cart: Cart) => dispatch(setCart(cart)));
                // @ts-ignore
                toast.current.show({ severity: 'success', summary: 'Success Message' +
                        '', detail: res, life: 3000 });
            }).catch((err: ExceptionResponse) => {
            // @ts-ignore
            toast.current.show({ severity: 'error', summary: 'Error Message', detail: err.message, life: 3000 });
        })
    }

    return (
        <div>
            <h2 className={"p-mb-3"} >{t('user-cart-page.headline')}</h2>
            {
                !cart ? (
                    <div>
                        Loading...
                    </div>
                ) : cart.cartProducts.length == 0 ? (
                    <div className={"p-d-flex p-flex-column p-ai-center p-jc-center p-p-6 d-div"}>
                        <img src={AssetPath.cartEmptyImgPath} alt={"cart-empty"} className={"p-mb-4"} width={200}/>
                        <h4>{t('user-cart-page.cart-empty')}</h4>
                        <Link to={"/"} className={"p-mt-4 p-py-2 p-px-6 p-button"}>{t('user-cart-page.continue-shopping')}</Link>
                    </div>
                ) : (
                    <div>
                        <Toast ref={toast}/>
                        <ConfirmDialog visible={confirmRemoveDialog} onHide={() => setConfirmRemoveDialog(false)} message={t('user-cart-page.remove-product-notification')}
                                       header="Confirmation" icon="pi pi-exclamation-triangle" accept={removeCurrentUserCartProductsFunc}/>
                        <div className={"p-grid"}>
                            <div className={"p-col-8"}>
                                <CartProductListComponent cartProducts={cart.cartProducts}
                                                 onCheckProduct={(id: number) => handleCheckProduct(id)}
                                                 onCheckAllProduct={(type: boolean) => handleCheckAllProduct(type)}
                                                 onUpdateProductAmount={(amount: number, id: number) => handleUpdateProductAmount(amount, id)}
                                                 onRemoveProduct={(id: number) => handleUpdateProductAmount(-1000000, id)}/>
                            </div>
                            <div className={"p-col-4"}>
                                <CartDiscountComponent
                                    onRemoveDiscount={() => handleRemoveDiscount()}
                                    onApplyDiscount={(code: string) => handleApplyDiscount(code)}/>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
};

export default CartPage;
