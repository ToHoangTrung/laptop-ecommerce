import axiosClient from "../../axiosClient";
import {VnGeographyProvince} from "../model/VnGeographyProvince";
import {VnGeographyDistrict} from "../model/VnGeographyDistrict";
import {VnGeographyWard} from "../model/VnGeographyWard";
import {UserAddress} from "../model/UserAddress";

export const getProvinceListApi = async () => {
    const response = await axiosClient.get<VnGeographyProvince[]>(`/api/geography/get-province-list`);
    return response.data;
};

export const getDistrictListApi = async () => {
    const response = await axiosClient.get<VnGeographyDistrict[]>(`/api/geography/get-district-list`);
    return response.data;
};

export const getDistrictByProvinceApi = async (id: number) => {
    const response = await axiosClient.get<VnGeographyDistrict[]>(`/api/geography/get-district-by-province/${id}`);
    return response.data;
};


export const getWardListApiApi = async () => {
    const response = await axiosClient.get<VnGeographyWard[]>(`/api/geography/get-ward-list`);
    return response.data;
};

export const getWardByDistrictApi = async (id: number) => {
    const response = await axiosClient.get<VnGeographyWard[]>(`/api/geography/get-ward-by-district/${id}`);
    return response.data;
};

