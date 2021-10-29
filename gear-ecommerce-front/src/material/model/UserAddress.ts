import {AbstractModel} from "./main/AbstractModel";
import {User} from "./User";
import {VnGeographyProvince} from "./VnGeographyProvince";
import {VnGeographyDistrict} from "./VnGeographyDistrict";
import {VnGeographyWard} from "./VnGeographyWard";

export interface UserAddress extends AbstractModel {
    user?: User | undefined;
    name: string | undefined;
    email: string | undefined;
    phone?: string | undefined;
    street?: string | undefined;
    province?: VnGeographyProvince | undefined;
    district?: VnGeographyDistrict | undefined;
    ward?: VnGeographyWard| undefined;
}
