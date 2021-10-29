import axiosClient from "../../axiosClient";
import {CartProduct} from "../model/CartProduct";
import {Cart} from "../model/Cart";

export const getCurrentUserCartApi = async () => {
    const response = await axiosClient.get<Cart>(`/api/cart/get-cart/current-user`);
    return response.data;
};

export const addOrUpdateCurrentUserCartProduct = async (cartProduct: CartProduct) => {
    try {
        const response = await axiosClient.post(`/api/cart/current-user/add-or-update-cart-product/`, cartProduct);
        return response.data;
    } catch (err: any) {
        throw new Object(err.response.data)
    }

};

export const applyDiscountToCurrentUserCartApi = async (code: string) => {
    try {
        const response = await axiosClient.post(`/api/cart/current-user/apply-discount-to-cart-by-code`, code);
        return response.data;
    } catch (err: any) {
        throw new Object(err.response.data)
    }

};

export const removeCurrentUserCartProductApi = async (id: number) => {
    const response = await axiosClient.delete(`/api/cart/current-user/delete-cart-product`, {
        data: id
    });
    return response.data;
};

export const removeCurrentUserCartDiscountApi = async () => {
    const response = await axiosClient.delete(`/api/cart/current-user/remove-cart-discount`);
    return response.data;
};
