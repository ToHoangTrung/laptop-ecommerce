import {AbstractModel} from "./main/AbstractModel";
import {SubCatalog} from "./SubCatalog";
import {VnGeographyProvince} from "./VnGeographyProvince";
import {VnGeographyWard} from "./VnGeographyWard";

export interface VnGeographyDistrict extends AbstractModel {
    name: string;
    prefix: string;
    province?: VnGeographyProvince;
    wards?: VnGeographyWard[];
}
