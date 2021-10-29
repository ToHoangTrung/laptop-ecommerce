import React, {useState} from 'react';
import './override.scss';
import styles from './product-intro.module.scss'
import {Product} from "../../../../../../model/Product";
import {Galleria} from "primereact/galleria";
import {AssetPath} from "../../../../../../../router";
import { Link } from 'react-router-dom';
import {Divider} from "primereact/divider";
import {Button} from "primereact/button";
import {useTranslation} from "react-i18next";
import {Rating} from "primereact/rating";
import {Tag} from "primereact/tag";
import {formatVndMoney, getPercentDiscount} from "../../../../../../service/util.service";

interface Props {
    product: Product,
    onClickAddToCart: Function
}

const ProductIntro: React.FC<Props> = ({product, onClickAddToCart}) => {

    const [t] = useTranslation('common');

    const itemTemplate = (item: { alt: string | undefined; }) => {
        return <img src={`${AssetPath.productImagePath}${item}`} alt={item.alt} />
    }

    const thumbnailTemplate = (item: { alt: string | undefined; }) => {
        return <img src={`${AssetPath.productImagePath}${item}`} alt={item.alt} width={1000} className={styles.thumbnail}/>
    }

    const responsiveOptions = [
        {
            breakpoint: '1500px',
            numVisible: 5
        },
        {
            breakpoint: '1024px',
            numVisible: 3
        },
        {
            breakpoint: '768px',
            numVisible: 2
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];

    return (
        <div className={"p-p-3 d-div " + styles.productIntro}>
            <div className={"p-grid"}>
                <div className={"p-col-5"}>
                    <Galleria value={product.imageUrls} numVisible={5} className={styles.galleria + " p-pr-3"}
                              responsiveOptions={responsiveOptions}
                              item={itemTemplate} thumbnail={thumbnailTemplate}/>
                </div>
                <div className={"p-col-7"}>
                    <div className={"p-d-flex p-ai-center p-mb-2"}>
                        <p>Thương hiệu <Link to={"/"}>OK</Link></p>
                        <Divider layout="vertical" className={styles.divider}/>
                        <p>SKU: {product.sku}</p>
                    </div>
                    <p className={styles.productName + " p-mb-2"}>{product.name}</p>
                    <div className={"p-d-flex p-ai-center p-mb-3"}>
                        <Rating value={product.rating} cancel={false} readOnly className={"p-mr-3"} />
                        <Link to={"/"}>Xem {product.numRating} đánh giá</Link>
                        <Divider layout="vertical" className={styles.divider}/>
                        <p>{t('product-detail-page.product-intro.purchased')} {product.numPurchased}</p>
                    </div>
                    {
                        product.discount && product.discount.discountPrice > 0 ? (
                            <div className={styles.productPrice + " p-mb-4 p-p-3 p-d-flex p-ai-end"}>
                                <p className={styles.discountPrice + " p-mr-3"}>{formatVndMoney(product.price - product.discount.discountPrice)}</p>
                                <p className={styles.price + " p-mr-3"}>{formatVndMoney(product.price)}</p>
                                <p className={styles.percent}>{getPercentDiscount(product.price, product.discount.discountPrice)}</p>
                            </div>
                        ) : product.discount && product.discount.discountPercent > 0 ? (
                            <div className={styles.productPrice + " p-mb-4 p-p-3 p-d-flex p-ai-end p-jc-start"}>
                                <p className={styles.discountPrice + " p-mr-3"}>{formatVndMoney(product.price - product.discount.discountPrice)}</p>
                                <p className={styles.price + " p-mr-3"}>{formatVndMoney(product.price)}</p>
                                <p className={styles.percent}>{getPercentDiscount(product.price, product.discount.discountPrice)}</p>
                            </div>
                        ) : null
                    }
                    <div className={styles.productDiscount + " p-py-3 p-mb-4"}>
                        <p className={"p-text-bold p-mb-2"}>3 Mã giảm giá</p>
                        <div className={'p-d-flex p-ai-center'}>
                            <Button className={"p-mr-2 p-button-outlined"}>Content</Button>
                            <Button className={"p-mr-2 p-button-outlined"}>Content</Button>
                            <Button className={"p-mr-2 p-button-outlined"}>Content</Button>
                            <Button className={"p-mr-2 p-button-outlined"}>Content</Button>
                        </div>
                    </div>
                    <div className={styles.eventBtn}>
                        <Button label={t('product-detail-page.product-intro.add-to-cart-btn')} onClick={() => onClickAddToCart()}/>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ProductIntro;
