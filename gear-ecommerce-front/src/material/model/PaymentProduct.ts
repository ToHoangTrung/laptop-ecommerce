import {AbstractModel} from "./main/AbstractModel";
import {SubCatalog} from "./SubCatalog";
import {Product} from "./Product";
import {Payment} from "./Payment";

export interface PaymentProduct extends AbstractModel {
    product: Product;
    paymentPrice: number;
    amount: number;
    paymentDiscount: number;
    payment?: Payment;
}
