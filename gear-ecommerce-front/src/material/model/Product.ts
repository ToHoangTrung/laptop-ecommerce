import {AbstractModel} from "./main/AbstractModel";
import {SubCatalog} from "./SubCatalog";
import {ProductDetail} from "./ProductDetail";
import {ProductType} from "./ProductType";
import {Discount} from "./Discount";
import {AbstractEnum} from "./main/AbstractEnum";

export interface Product extends AbstractModel {
    name: string;
    price: number;
    sku: number;
    imageUrls: string[];
    guaranteeTime: number;
    amount: number;
    descriptionContentUrl?: string;
    content?: string;
    rating: number;
    numRating: number;
    numPurchased: number;
    detail?: ProductDetail;
    type?: ProductType;
    discount?: Discount;
    status?: Status
}

export interface Status extends AbstractEnum {}
