import axiosClient from "../../axiosClient";
import {VnGeographyProvince} from "../model/VnGeographyProvince";
import {Brand} from "../model/Brand";

export const getAllBrandApi = async () => {
    const response = await axiosClient.get<Brand[]>(`/api/brand/get-all-brand`);
    return response.data;
};
