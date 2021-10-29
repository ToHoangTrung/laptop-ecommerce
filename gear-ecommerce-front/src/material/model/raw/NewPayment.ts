import {AbstractModel} from "../main/AbstractModel";
import {Cart} from "../Cart";

export interface NewPayment extends AbstractModel {
    userId: number;
    shippingType: string;
    paymentType: string;
    temporaryPrice: number;
    shippingPrice: number;
    discountPrice: number;
    totalPrice: number;
    shippingAddress: string;
}
