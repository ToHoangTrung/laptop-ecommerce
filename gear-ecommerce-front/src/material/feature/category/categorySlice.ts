import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import CategoryState from "./CategoryState";
import {Catalog} from "../../model/Catalog";
import {SubCatalog} from "../../model/SubCatalog";
import {ProductType} from "../../model/ProductType";

const initialState: CategoryState = {
    catalogHierarchical: [],
    catalogs: [],
    subCatalogs: [],
    productTypes: []
}

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setCatalogs: (state: CategoryState, action: PayloadAction<Catalog[]>) => {
            state.catalogs = action.payload;
        },
        setCatalogHierarchical: (state: CategoryState, action: PayloadAction<Catalog[]>) => {
            state.catalogHierarchical = action.payload;
        },
        setSubCatalogs: (state: CategoryState, action: PayloadAction<SubCatalog[]>) => {
            state.subCatalogs = action.payload;
        },
        setProductTypes: (state: CategoryState, action: PayloadAction<ProductType[]>) => {
            state.productTypes = action.payload;
        }
    }
})

export const {setCatalogHierarchical, setProductTypes} = categorySlice.actions;

const categoryReducer = categorySlice.reducer;

export default categoryReducer;
