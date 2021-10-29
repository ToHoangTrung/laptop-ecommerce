import {AbstractModel} from "./main/AbstractModel";
import {SubCatalog} from "./SubCatalog";
import {VnGeographyDistrict} from "./VnGeographyDistrict";

export interface VnGeographyWard extends AbstractModel {
    name: string;
    prefix: string;
    district?: VnGeographyDistrict;
}
