import axiosClient from "../../axiosClient";
import {Catalog} from "../model/Catalog";
import {AxiosResponse} from "axios";
import {AbstractFilter} from "../model/main/AbstractFilter";
import {SubCatalog} from "../model/SubCatalog";
import {ProductType} from "../model/ProductType";
import {ExceptionResponse} from "../model/main/ExceptionResponse";

export const getCatalogHierarchicalApi = async () => {
    let result: AxiosResponse = await axiosClient.get<Catalog[]>(`/api/category/get-hierarchical/catalog`);
    return result.data;
};

export const getAllCatalog = async () => {
    let result: AxiosResponse = await axiosClient.get<Catalog[]>(`/api/category/get-all/catalog`);
    return result.data;
};

export const getAllSubCatalog = async () => {
    let result: AxiosResponse = await axiosClient.get<SubCatalog[]>(`/api/category/get-all/sub-catalog`);
    return result.data;
};

export const getAllProductType = async () => {
    let result: AxiosResponse = await axiosClient.get<ProductType[]>(`/api/category/get-all/product-type`);
    return result.data;
};

export const getSubCatalogFiltersApi = async (id: number) => {
    const response = await axiosClient.get<AbstractFilter[]>(`/api/category/get-filter-by-catalog/sub-catalog/${id}`);
    return response.data;
};

export const getProductDetailFiltersApi = async (id: number) => {
    const response = await axiosClient.get<AbstractFilter[]>(`/api/category/get-filter-by-sub-catalog/product-detail/${id}`);
    return response.data;
};

export const getAllFilterProductDetailApi = async () => {
    const response = await axiosClient.get<AbstractFilter[]>(`/api/category/get-all-filter/product-detail`);
    return response.data;
};

export const getSubCatalogByCatalogApi = async (id: number) => {
    try {
        const response = await axiosClient.get<SubCatalog[]>(`/api/category/get-by-catalog/sub-catalog/${id}`);
        return response.data;
    } catch (err: ExceptionResponse | any) {
        throw new Object(err.response.data);
    }

};


