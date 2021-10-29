import {AbstractFilter} from "../model/main/AbstractFilter";
import {ProductSearchPath} from "../model/search-path/ProductSearchPath";
import {ProductCriterion} from "../model/criterion/ProductCriterion";
import {DEFAULT_SEARCH_LIMIT, DEFAULT_SEARCH_OFFSET} from "../../constants";

export const createSearchQuery = (dto: any) => {
    let searchPath = "";
    for (const [key, value] of Object.entries(dto)) {
        // @ts-ignore
        if (value !== null && value !== undefined && value.length !== 0) {
            searchPath = searchPath + "&" + key + "=" + value;
        }
    }
    return "?" + searchPath.slice(1)
}

export const getModelFromSearchParams = (params: URLSearchParams, dto: any) => {
    // @ts-ignore
    for (let param of params.keys()) {
        if (param !== null && dto.hasOwnProperty(param)) {
            if (Array.isArray(dto[param])) {
                dto[param] = splitStrAndReturnArr(params.get(param), ',');
            } else {
                dto[param] = splitStrAndReturnArr(params.get(param), ',')[0];
            }
        }
    }
    return dto;
}

export const splitStrAndReturnArr = (str: string | null, comma: string) => {
    return str !== null ? [...str.split(comma)] : []
}

const updateFiltersFromSearchPathByType = (arr: any[], filters: AbstractFilter[], type: string) => {
    for (let filter of filters) {
        if (filter.type === type) {
            for (let i of arr) {
                // @ts-ignore
                filter.valueList.find((y: { value: string; }) => y.value === i).checked = true;
            }
            break;
        }
    }
    return filters;
}

export const updateFiltersFromSearchPath = (filters: AbstractFilter[], searchPath: any) => {
    const keys = Object.keys(searchPath);
    for (let k of keys) {
        // @ts-ignore
        if (Array.isArray(searchPath[k])) {
            // @ts-ignore
            filters = updateFiltersFromSearchPathByType(searchPath[k], filters, k)
        }
    }
    return filters;
}

export const productSearchPathToProductCriterion = (productSearchPath: ProductSearchPath) => {
    let productCriterion: ProductCriterion = {
        catalogIds: [...productSearchPath.catalog || []],
        cpuList: [...productSearchPath.cpu || []],
        graphicsChipList: [...productSearchPath.chip || []],
        id: "",
        limit: DEFAULT_SEARCH_LIMIT,
        // @ts-ignore
        offset: productSearchPath.page == 0 ? DEFAULT_SEARCH_OFFSET : (productSearchPath.page - 1) * DEFAULT_SEARCH_LIMIT,
        name: "",
        productTypeIds: [...productSearchPath.type || []],
        ramList: [...productSearchPath.ram || []],
        romList: [...productSearchPath.rom || []],
        screenList: [...productSearchPath.screen || []],
        subCatalogIds: [...productSearchPath.index || []]
    }
    return productCriterion;
}
