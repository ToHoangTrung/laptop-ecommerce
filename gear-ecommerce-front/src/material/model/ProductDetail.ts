import {AbstractModel} from "./main/AbstractModel";
import {SubCatalog} from "./SubCatalog";

export interface ProductDetail extends AbstractModel {
    cpu: string;
    ram: string;
    rom: string;
    screen: string;
    graphicsChip: string;
}
