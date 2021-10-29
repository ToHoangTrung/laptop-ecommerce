import AuthState from "../auth/AuthState";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {User} from "../../model/User";
import CartState from "./CartState";
import {Cart} from "../../model/Cart";
import {CartProduct} from "../../model/CartProduct";

const initialState: CartState = {
    cart: null,
    totalPrice: 0,
    totalPriceAfterDiscount: 0,
    checkAll: false
}


export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (state: CartState, action: PayloadAction<Cart>) => {
            state.cart = action.payload;
            let totalPriceTemp = 0;
            let totalPriceAfterDiscountTemp = 0;
            let flag = true;
            // for (let i = 0; i < state.cart.cartProducts.length; i++) {
            //     if (state.cart.cartProducts[i].checked) {
            //         totalPriceTemp += state.cart.cartProducts[i].product.price * state.cart.cartProducts[i].amount;
            //         if (state.cart.cartProducts[i].product.discount.discountPrice > 0) {
            //             totalPriceAfterDiscountTemp += (state.cart.cartProducts[i].product.price - state.cart.cartProducts[i].product.discount.discountPrice) * state.cart.cartProducts[i].amount;
            //         } else if (state.cart.cartProducts[i].product.discount.discountPercent > 0) {
            //             totalPriceAfterDiscountTemp += (state.cart.cartProducts[i].product.price - state.cart.cartProducts[i].product.price * state.cart.cartProducts[i].product.discount.discountPercent / 100) * state.cart.cartProducts[i].amount;
            //         } else {
            //             totalPriceAfterDiscountTemp = state.cart.cartProducts[i].product.price * state.cart.cartProducts[i].amount;
            //         }
            //     } else {
            //         flag = false;
            //     }
            // }
            state.totalPrice = totalPriceTemp;
            state.totalPriceAfterDiscount = totalPriceAfterDiscountTemp;
            state.checkAll = flag;
        }
    }
})

export const {setCart} = cartSlice.actions;
const cartReducer = cartSlice.reducer;
export default cartReducer;
