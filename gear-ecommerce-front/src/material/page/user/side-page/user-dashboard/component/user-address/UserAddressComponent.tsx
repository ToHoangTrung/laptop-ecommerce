import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../../../store";
import {useTranslation} from "react-i18next";
import {useFormik} from "formik";
import mainStyles from "../../user-dashboard.module.scss";
import {VnGeographyProvince} from "../../../../../../model/VnGeographyProvince";
import {VnGeographyDistrict} from "../../../../../../model/VnGeographyDistrict";
import {VnGeographyWard} from "../../../../../../model/VnGeographyWard";
import {
    getDistrictByProvinceApi,
    getProvinceListApi,
    getWardByDistrictApi
} from "../../../../../../service/geography.service";
import {Dropdown} from "primereact/dropdown";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {getCurrentUserApi, updateCurrentUserInfo} from "../../../../../../service/user.service";
import {User} from "../../../../../../model/User";
import {AbstractModel} from "../../../../../../model/main/AbstractModel";
import {classNames} from "primereact/utils";
import {Toast} from "primereact/toast";
import {setUser} from "../../../../../../feature/auth/authSlice";

interface Props {
}

const UserAddressComponent: React.FC<Props> = ({}) => {

    const [t, i18n] = useTranslation('common');
    const currentUser = useSelector((state: RootState) => state.auth.user)

    const [provinceList, setProvinceList] = useState<VnGeographyProvince[]>([]);
    const [districtList, setDistrictList] = useState<VnGeographyDistrict[]>([]);
    const [wardList, setWardList] = useState<VnGeographyWard[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const toast = useRef(null);
    const dispatch = useDispatch();
    const district = useRef(null);
    const ward = useRef(null);

    useEffect(() => {
        getProvinceListApi().then((provinces: VnGeographyProvince[]) => {
            setProvinceList(provinces);
            if (currentUser?.address?.province !== null) {
                // @ts-ignore
                getDistrictByProvinceApi(currentUser.address.province.id).then((districts: VnGeographyDistrict[]) => setDistrictList(districts));
                // @ts-ignore
                getWardByDistrictApi(currentUser?.address?.district?.id).then((wards: VnGeographyWard[]) => setWardList(wards));
            }
        })
            .finally(() => setIsLoading(false));
    }, [])

    const formik = useFormik({
        initialValues: {
            name: currentUser?.address?.name,
            email: currentUser?.address?.email || undefined,
            phone: currentUser?.address?.phone,
            street: currentUser?.address?.street,
            provinceId: currentUser?.address?.province?.id || undefined,
            districtId: currentUser?.address?.district?.id || undefined,
            wardId: currentUser?.address?.ward?.id || undefined,
        } as AbstractModel,
        validate: (data) => {
            let errors = {} as AbstractModel;
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
                errors.email = 'Invalid email address. E.g. example@email.com';
            }
            if (!data.provinceId) {
                errors.provinceId = 'Vui lòng chọn tỉnh/thành phố';
            }
            if (!data.districtId) {
                errors.districtId = 'Vui lòng chọn quận/huyện';
            }
            if (!data.wardId) {
                errors.wardId = 'Vui lòng chọn phường/xã';
            }
            if (!data.street) {
                errors.street = 'Vui lòng nhập địa chỉ cụ thể';
            }
            return errors;
        },
        onSubmit: (data) => {
            let updateUser: User | null = currentUser;
            console.log(data)
            // @ts-ignore
            updateUser = {...updateUser, address: {
                    province: provinceList.find(x => x.id === data.provinceId),
                    district: districtList.find(x => x.id === data.districtId),
                    ward: wardList.find(x => x.id === data.wardId),
                    email: data.email,
                    name: data.name,
                    phone: data.phone,
                    street: data.street
                }}
            // @ts-ignore
            updateCurrentUserInfo(updateUser)
                .then((res) => {
                    getCurrentUserApi()
                        .then((user: User) => dispatch(setUser(user)));
                    // @ts-ignore
                    toast.current.show({ severity: 'success', summary: 'Success Message' +
                            '', detail: "Cập nhật thông tin địa chỉ thành công", life: 3000 });
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    });

    const isFormFieldValid = (name: any) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name: any) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    if (isLoading) {
        return (
            <div>
                Loading...
            </div>
        )
    } else {
        return (
            <div className={"p-p-3"}>
                <Toast ref={toast}/>
                <h2 className={"p-mb-3"}>{t('user-dashboard-page.user-address.headline')}</h2>
                <form onSubmit={formik.handleSubmit} className={"p-fluid p-p-3 d-div"}>
                    <div className={"p-grid"}>
                        <div className="p-field p-col-12">
                            <label>{t('user-dashboard-page.user-address.label.name')}</label>
                            <InputText name="name" value={formik.values.name} placeholder={t('user-dashboard-page.user-address.placeholder.name')} onChange={formik.handleChange} />
                        </div>
                        <div className="p-field p-col-6">
                            <label className={classNames({ 'p-error': isFormFieldValid("email") })}>{t('user-dashboard-page.user-address.label.email')}</label>
                            <InputText name="email" value={formik.values.email} placeholder={t('user-dashboard-page.user-address.placeholder.email')} onChange={formik.handleChange}  className={classNames({ 'p-invalid': isFormFieldValid("email")})} />
                            {getFormErrorMessage("email")}
                        </div>
                        <div className="p-field p-col-6">
                            <label>{t('user-dashboard-page.user-address.label.phone')}</label>
                            <InputText name="phone" value={formik.values.phone} placeholder={t('user-dashboard-page.user-address.placeholder.phone')} onChange={formik.handleChange} />
                        </div>
                        <div className="p-field p-col-6">
                            <label className={classNames({ 'p-error': isFormFieldValid("provinceId") })}>{t('user-dashboard-page.user-address.label.province')}</label>
                            <Dropdown name="provinceId" value={formik.values.provinceId}
                                      onChange={(e) => {
                                getDistrictByProvinceApi(e.value)
                                    .then((districts: VnGeographyDistrict[]) => {
                                        setDistrictList(districts);
                                    });
                                formik.handleChange(e)
                            }}        className={classNames({ 'p-invalid': isFormFieldValid("provinceId")})}
                                      placeholder={t('user-dashboard-page.user-address.placeholder.province')}
                                      options={provinceList} optionLabel="name" optionValue={"id"}/>
                            {getFormErrorMessage("provinceId")}
                        </div>
                        <div className="p-field p-col-6">
                            <label className={classNames({ 'p-error': isFormFieldValid("districtId") })}>{t('user-dashboard-page.user-address.label.district')}</label>
                            <Dropdown ref={district} name="districtId" value={formik.values.districtId} onChange={(e) => {
                                getWardByDistrictApi(e.value)
                                    .then((wards: VnGeographyWard[]) => {
                                        setWardList(wards);
                                        formik.values.ward = ""
                                    });
                                formik.handleChange(e);
                            }}        className={classNames({ 'p-invalid': isFormFieldValid("districtId")})}
                                      placeholder={t('user-dashboard-page.user-address.placeholder.district')}
                                      options={districtList} optionLabel="name" optionValue={"id"}/>
                            {getFormErrorMessage("districtId")}
                        </div>
                        <div className="p-field p-col-6">
                            <label className={classNames({ 'p-error': isFormFieldValid("wardId") })}>{t('user-dashboard-page.user-address.label.ward')}</label>
                            <Dropdown ref={ward} name="wardId" value={formik.values.wardId} onChange={formik.handleChange}
                                      className={classNames({ 'p-invalid': isFormFieldValid("wardId")})}
                                      placeholder={t('user-dashboard-page.user-address.placeholder.ward')}
                                      options={wardList} optionLabel="name" optionValue={"id"}/>
                            {getFormErrorMessage("wardId")}
                        </div>
                        <div className="p-field p-col-6">
                            <label className={classNames({ 'p-error': isFormFieldValid("street") })}>{t('user-dashboard-page.user-address.label.street')}</label>
                            <InputText name="street" value={formik.values.street} placeholder={t('user-dashboard-page.user-address.placeholder.street')} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid("street")})}/>
                            {getFormErrorMessage("street")}
                        </div>
                        <div className="p-col-12">
                            <Button type="submit" label={t('user-dashboard-page.user-address.accept')} className={"p-button"}/>
                        </div>
                    </div>
                </form>

            </div>
        );
    }
};

export default UserAddressComponent;
