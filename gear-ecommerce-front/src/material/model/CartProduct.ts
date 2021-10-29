import {AbstractModel} from "./main/AbstractModel";
import {Cart} from "./Cart";
import {Product} from "./Product";

export interface CartProduct extends AbstractModel {
    cart?: Cart;
    product: Product;
    amount: number;
    checked?: boolean;
}
