import {AbstractModel} from "./main/AbstractModel";
import {SubCatalog} from "./SubCatalog";
import {User} from "./User";
import {Discount} from "./Discount";
import {CartProduct} from "./CartProduct";

export interface Cart extends AbstractModel {
    user: User;
    cartProducts: CartProduct[];
    discount: Discount
}
