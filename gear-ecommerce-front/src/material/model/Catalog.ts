import {AbstractModel} from "./main/AbstractModel";
import {SubCatalog} from "./SubCatalog";

export interface Catalog extends AbstractModel {
    name: string;
    logo: string;
    subCatalogs?: SubCatalog[];
}
