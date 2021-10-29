import {AbstractModel} from "./main/AbstractModel";
import {SubCatalog} from "./SubCatalog";
import {VnGeographyDistrict} from "./VnGeographyDistrict";

export interface VnGeographyProvince extends AbstractModel {
    name: string;
    code: string;
    district?: VnGeographyDistrict[];
}
