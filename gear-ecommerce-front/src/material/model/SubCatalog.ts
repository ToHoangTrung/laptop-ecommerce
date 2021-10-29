import {AbstractModel} from "./main/AbstractModel";
import {ProductType} from "./ProductType";
import {Catalog} from "./Catalog";

export interface SubCatalog extends AbstractModel {
    name: string;
    productTypes?: ProductType[];
    catalog?: Catalog;
}
