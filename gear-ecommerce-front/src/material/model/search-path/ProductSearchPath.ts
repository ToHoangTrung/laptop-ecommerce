import {PaginationCriterion} from "../main/PaginationCriterion";
import {AbstractModel} from "../main/AbstractModel";

export interface ProductSearchPath extends AbstractModel{
    catalog?: [];
    index?: [];
    type?: [];
    cpu?: [];
    chip?: [];
    screen?: [];
    ram?: [];
    rom?: [];
    page?: number;
}
