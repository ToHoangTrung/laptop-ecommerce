import {AbstractModel} from "./main/AbstractModel";
import {SubCatalog} from "./SubCatalog";

export interface ProductType extends AbstractModel {
    name: string;
    subCatalog?: SubCatalog;
}
