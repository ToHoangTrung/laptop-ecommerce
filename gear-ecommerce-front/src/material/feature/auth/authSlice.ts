import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import AuthState from "./AuthState";
import {User} from "../../model/User";
import Axios from 'axios'
import {ACCESS_TOKEN} from "../../../constants";


const initialState: AuthState = {
    user: null,
    token: null,
    authenticated: false,
    address: "",
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state: AuthState, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.authenticated = true;
            if (state.user.address?.province && state.user.address?.district &&state.user.address?.ward &&
                state.user.address?.name && state.user.address?.email && state.user.address?.phone && state.user.address?.street) {
                state.address = state.user.address?.street + ", " + state.user.address?.ward?.name + ", " + state.user.address?.district?.name + ", " + state.user.address?.province?.name;
            }
        },
        setToken: (state: AuthState, action: PayloadAction<string>) => {
            localStorage.setItem(ACCESS_TOKEN, action.payload);
            state.token = action.payload;
        },
    }
})

export const {setToken, setUser} = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
