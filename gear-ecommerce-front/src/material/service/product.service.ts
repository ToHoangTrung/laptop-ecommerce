import {AxiosResponse} from "axios";
import axiosClient from "../../axiosClient";
import {Catalog} from "../model/Catalog";
import {ProductCriterion} from "../model/criterion/ProductCriterion";
import {Product} from "../model/Product";
import {NewProduct} from "../model/raw/NewProduct";
import {ExceptionResponse} from "../model/main/ExceptionResponse";
import {VnGeographyDistrict} from "../model/VnGeographyDistrict";
import {AssetPath} from "../../router";

export const getProductByCriterionApi = async (productCriterion: ProductCriterion) => {
    let result: AxiosResponse = await axiosClient.post<Product[]>(`/api/product/search`, productCriterion);
    return result.data.content;
};

export const countProductByCriterionApi = async (productCriterion: ProductCriterion) => {
    let result: AxiosResponse = await axiosClient.post<number>(`/api/product/count`, productCriterion);
    return result.data;
};


export const createNewProductApi = async (newProduct: NewProduct) => {
    try {
        let result: AxiosResponse = await axiosClient.post<NewProduct>(`/api/product/create-new/product`, newProduct);
        return result.data;
    } catch (err: any) {
        throw new Object(err.response.data);
    }
};

export const getProductDetailApi = async (id: number) => {
    try {
        const result: AxiosResponse = await axiosClient.get<Product>(`/api/product/get-detail/${id}`);
        const product = result.data;
        await fetch(`${AssetPath.productContentPath}${product.descriptionContentUrl}`)
            .then((r) => r.text())
            .then(text  => {
                product.content = text
            })
        return product;
    } catch (err: ExceptionResponse | any) {
        throw new Object(err.response.data)
    }
}
