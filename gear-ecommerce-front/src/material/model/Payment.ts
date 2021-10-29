import {AbstractModel} from "./main/AbstractModel";
import {SubCatalog} from "./SubCatalog";
import {User} from "./User";
import {AbstractEnum} from "./main/AbstractEnum";
import {PaymentProduct} from "./PaymentProduct";

export interface Payment extends AbstractModel {
    user: User;
    temporaryPrice: number;
    totalPrice: number;
    discountPrice: number;
    shippingPrice: number;
    createdDate?: string;
    paymentDate?: string;
    shippingDate?: string;
    refundDate?: string;
    cancelDate?: string;
    shippingAddress: string;
    paymentStatus: PaymentStatus;
    paymentProducts: PaymentProduct[];
    paymentType: PaymentType;
    shippingType: ShippingType;
}

export interface PaymentStatus extends AbstractEnum {}
export interface PaymentType extends AbstractEnum {}
export interface ShippingType extends AbstractEnum {}
