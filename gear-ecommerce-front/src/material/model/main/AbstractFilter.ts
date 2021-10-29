import {AbstractEnum} from "./AbstractEnum";

export interface AbstractFilter {
    label: string;
    type: string;
    valueList: AbstractEnum[];
}
