import {AbstractModel} from "./main/AbstractModel";
import {AbstractEnum} from "./main/AbstractEnum";
import DateTimeFormat = Intl.DateTimeFormat;
import {UserAddress} from "./UserAddress";

export interface User extends AbstractModel {
    username: string;
    email: string;
    password: string;
    phone?: string,
    name: string,
    imageUrl: string,
    birthday?: Date | Date[] | undefined,
    role: string,
    address?: UserAddress,
    gender?: Gender;
}

export interface Gender extends AbstractEnum {}

export enum UserRole {
    Guest = 1,
    Customer = 2,
    Admin = 3
}
