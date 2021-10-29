import {AbstractModel} from "./main/AbstractModel";
import {SubCatalog} from "./SubCatalog";

export interface Discount extends AbstractModel {
    name: string;
    code: string;
    description: string;
    discountPrice: number;
    discountPercent: number;
    discountMax: number;
    priceMinApply: number;
    applyDate: string;
    expireDate: string;
}
