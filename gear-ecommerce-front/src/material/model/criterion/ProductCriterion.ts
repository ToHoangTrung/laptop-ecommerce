import {PaginationCriterion} from "../main/PaginationCriterion";
import {Catalog} from "../Catalog";
import {SubCatalog} from "../SubCatalog";

export interface ProductCriterion extends PaginationCriterion {
    id: string;
    name: string;
    catalogIds: number[];
    subCatalogIds: number[];
    productTypeIds: string[];
    cpuList: string[];
    ramList: string[];
    romList: string[];
    screenList: string[];
    graphicsChipList: string[];
}
