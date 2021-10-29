import axiosClient from "../../axiosClient";
import {VnGeographyDistrict} from "../model/VnGeographyDistrict";
import {Payment, PaymentType, ShippingType} from "../model/Payment";
import {NewPayment} from "../model/raw/NewPayment";
import {ExceptionResponse} from "../model/main/ExceptionResponse";

export const getAllPaymentTypeApi = async () => {
    const response = await axiosClient.get<PaymentType[]>(`/api/payment/get-all/payment-type`);
    return response.data;
};

export const getAllPaymentApi = async () => {
    const response = await axiosClient.get<Payment[]>(`/api/payment/get-all-payment`);
    return response.data;
};

export const getAllCurrentUserPaymentApi = async () => {
    const response = await axiosClient.get<Payment[]>(`/api/payment/get-all/current-user/payment`);
    return response.data;
};

export const getCurrentUserPaymentDetailApi = async (id: number) => {
    try {
        const response = await axiosClient.get<Payment>(`/api/payment/current-user/get-payment-detail/${id}`);
        return response.data;
    } catch (err: ExceptionResponse | any) {
        throw new Object(err.response.data)
    }

};


export const getAllShippingTypeApi = async () => {
    const response = await axiosClient.get<ShippingType[]>(`/api/payment/get-all/shipping-type`);
    return response.data;
};

export const createNewCurrentUserPaymentApi = async (newPayment: NewPayment) => {
    try {
        const response = await axiosClient.post<NewPayment>(`/api/payment/current-user/create-new-payment`, newPayment);
        return response.data;
    } catch (err: ExceptionResponse | any) {
        throw new Object(err.response.data)
    }
};
