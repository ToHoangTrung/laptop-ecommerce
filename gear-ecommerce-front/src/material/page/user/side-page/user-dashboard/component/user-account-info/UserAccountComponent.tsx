import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from "react-i18next";
import {Gender, User} from "../../../../../../model/User";
import {useFormik} from "formik";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {Calendar} from "primereact/calendar";
import {getALlUserGenderApi, getCurrentUserApi, updateCurrentUserInfo} from "../../../../../../service/user.service";
import {RadioButton} from "primereact/radiobutton";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../../../store";
import moment from "moment";
import {UserRouter} from "../../../../../../../router";
import {setBreadCrumbItems} from "../../../../../../feature/bread-crumb/breadCrumbSlice";
import {setUser} from "../../../../../../feature/auth/authSlice";
import {Toast} from "primereact/toast";

interface Props {
}

const UserAccountComponent: React.FC<Props> = ({}) => {

    const dispatch = useDispatch();
    const [t, i18n] = useTranslation('common');
    const currentUser = useSelector((state: RootState) => state.auth.user)
    const [genders, setGenders] = useState<Gender[]>([]);
    const toast = useRef(null);

    useEffect(() => {
        getALlUserGenderApi().then((genders: Gender[]) => setGenders(genders));
        const items = [
            { label: 'Account', url: UserRouter.userDashBoardPage},
        ];
        dispatch(setBreadCrumbItems(items))
    }, [])

    const formik = useFormik({
        initialValues: {
            // @ts-ignore
            birthday: currentUser?.birthday ? new Date(currentUser?.birthday) : undefined,
            email: currentUser?.email || "",
            gender: currentUser?.gender,
            id: currentUser?.id,
            imageUrl: "",
            name: currentUser?.name || "",
            password: "",
            phone: currentUser?.phone,
            role: "",
            username: "",
            version: 0,
            address: undefined
        } as User,
        onSubmit: (data) => {
            if (data.birthday !== undefined) {
                // @ts-ignore
                data.birthday = moment(data.birthday).format("yyyy-MM-DD");
            }
            updateCurrentUserInfo(data)
                .then((res: any) => {
                    getCurrentUserApi()
                        .then((user: User) => dispatch(setUser(user)));
                    // @ts-ignore
                    toast.current.show({ severity: 'success', summary: 'Success Message' +
                            '', detail: "Cập nhật thông tin account thành công", life: 3000 });
                })
                .catch((err: any) => console.log(err));
        }
    });



    return (
        <div className={"p-p-3"}>
            <Toast ref={toast}/>
            <h2 className={"p-mb-3"}>{t('user-dashboard-page.account-info.headline')}</h2>
            <form onSubmit={formik.handleSubmit} className={"p-fluid p-p-3 d-div "}>
                <div className={"p-grid"}>
                    <div className="p-field p-col-6">
                        <label>{t('user-dashboard-page.account-info.label.name')}</label>
                        <InputText name="name" value={formik.values.name} onChange={formik.handleChange} />
                    </div>
                    <div className="p-field p-col-6">
                        <label>{t('user-dashboard-page.account-info.label.email')}</label>
                        <InputText disabled name="email" value={formik.values.email} onChange={formik.handleChange} />
                    </div>
                    <div className="p-field p-col-6">
                        <label>{t('user-dashboard-page.account-info.label.phone')}</label>
                        <InputText name="phone" value={formik.values.phone} onChange={formik.handleChange} />
                    </div>
                    <div className="p-field p-col-6">
                        <label>{t('user-dashboard-page.account-info.label.birthday')}</label>
                        <Calendar dateFormat="dd-mm-yy" value={formik.values.birthday} onChange={(e) => formik.values.birthday = (e.value)} showIcon />
                    </div>
                    <div className="p-field p-col-6">
                        <label>{t('user-dashboard-page.account-info.label.birthday')}</label>
                        <div className={"p-d-flex p-jc-between"}>
                            {
                                genders.map((gender, index) => (
                                    <div key={index} >
                                        <RadioButton value={gender} name="gender" onChange={(e) => formik.values.gender = e.value} checked={formik.values.gender?.value === gender.value} />
                                        <label className={"p-ml-2"}>{gender.label}</label>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="p-col-12">
                        <Button className={"p-button"} type="submit" label={t('user-dashboard-page.account-info.accept')}/>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default UserAccountComponent;
