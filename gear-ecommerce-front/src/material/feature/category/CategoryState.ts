import {Catalog} from "../../model/Catalog";
import {SubCatalog} from "../../model/SubCatalog";
import {ProductType} from "../../model/ProductType";

export default interface CategoryState {
    catalogHierarchical: Catalog[];
    catalogs: Catalog[];
    subCatalogs: SubCatalog[];
    productTypes: ProductType[];
}
