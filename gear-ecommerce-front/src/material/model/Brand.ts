import {AbstractModel} from "./main/AbstractModel";
import {VnGeographyProvince} from "./VnGeographyProvince";
import {VnGeographyWard} from "./VnGeographyWard";

export interface Brand extends AbstractModel {
    name: string;
    logoUrl: string;
}
