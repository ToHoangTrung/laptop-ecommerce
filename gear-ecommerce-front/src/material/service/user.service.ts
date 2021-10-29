import {AxiosResponse} from "axios";
import axiosClient from "../../axiosClient";
import {Gender, User} from "../model/User";

export const getCurrentUserApi = async () => {
    const result: AxiosResponse = await axiosClient.get<User>(`/api/auth/user/me`);
    return result.data;
}

export const updateCurrentUserInfo = async (user: User) => {
    try {
        const result: AxiosResponse = await axiosClient.put<User>(`/api/auth/current-user/update`, user);
        return result.data;
    } catch (err: any) {
        throw new Object(err.response.data);
    }
}


export const getALlUserGenderApi = async () => {
    const result: AxiosResponse = await axiosClient.get<Gender[]>(`/api/auth/get-all/user-gender`);
    return result.data;
}
