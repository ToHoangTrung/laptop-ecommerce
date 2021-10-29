import AuthState from "../auth/AuthState";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {User} from "../../model/User";
import {ACCESS_TOKEN} from "../../../constants";
import {any} from "prop-types";
import CategoryState from "../category/CategoryState";
import {Catalog} from "../../model/Catalog";

const initialState = {
    items: []
}

export const breadCrumbSlice = createSlice({
    name: 'breadCrumb',
    initialState,
    reducers: {
        setBreadCrumbItems: (state: any, action: PayloadAction<Object[]>) => {
            state.items = action.payload;
        },
    }
})

export const {setBreadCrumbItems} = breadCrumbSlice.actions;

const breadCrumbReducer = breadCrumbSlice.reducer;
export default breadCrumbReducer;
