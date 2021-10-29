import {DEFAULT_SEARCH_LIMIT, DEFAULT_SEARCH_OFFSET} from "../../constants";
import {Product} from "../model/Product";
import {Discount} from "../model/Discount";

export const formatVndMoney = (price: number) => {
    price = price !== null ? price : 0;
    return price.toLocaleString('vi-VI', { style: 'currency', currency: 'VND' });
}

export const getPercentDiscount = (price: number, discountPrice: number) => {
    return "-" + parseFloat(String((discountPrice / price) * 100)).toFixed(2)+"%";
}

export const getActualDiscountPrice = (price: number, discount: Discount) => {
    if (discount.priceMinApply < price) {
        if (discount.discountPrice > 0) {
            return discount.discountPrice > discount.discountMax ? discount.discountMax : discount.discountPrice;
        } else if (discount.discountPercent > 0) {
            let discountPrice = price * discount.discountPercent / 100;
            return discountPrice > discount.discountMax ? discount.discountMax : discountPrice;
        } else {
            return 0;
        }
    } else {
        return 0;
    }
}

export const getActualPriceAfterDiscount = (price: number, discount: Discount) => {
    if (discount.priceMinApply < price) {
        if (discount.discountPrice > 0) {
            return discount.discountPrice > discount.discountMax ? price - discount.discountMax : price - discount.discountPrice;
        } else if (discount.discountPercent > 0) {
            let discountPrice = price * discount.discountPercent / 100;
            return discountPrice > discount.discountMax ? price - discount.discountMax : price - discountPrice;
        } else {
            return price;
        }
    } else {
        return price;
    }

}

export const createSeoLink = (str: string) => {
    return str.replaceAll(" ", '-').replaceAll("/", "-");
}
