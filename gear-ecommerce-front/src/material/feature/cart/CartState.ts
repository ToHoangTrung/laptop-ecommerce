import {Catalog} from "../../model/Catalog";
import {SubCatalog} from "../../model/SubCatalog";
import {ProductType} from "../../model/ProductType";
import {Cart} from "../../model/Cart";

export default interface CartState {
    cart: Cart | null;
    totalPrice: number,
    totalPriceAfterDiscount: number;
    checkAll: boolean
}
