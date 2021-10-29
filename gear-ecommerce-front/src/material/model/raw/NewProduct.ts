import { string } from "prop-types";
import {AbstractModel} from "../main/AbstractModel";

export interface NewProduct extends AbstractModel {
    name: string;
    price: number;
    sku: number;
    imageUrls?: string[];
    guaranteeTime: number;
    amount: number;
    content?: string;
    descriptionContentUrl?: string;
    type: number;
    ram: string;
    rom: string;
    screen: string;
    graphicsChip: string;
    cpu: string;
}
