import React, {useState} from 'react';
import styles from './product-list.module.scss';
import {Product} from "../../../../../../model/Product";
import {Rating} from "primereact/rating";
import {Dropdown} from "primereact/dropdown";
import {AssetPath, UserRouter} from "../../../../../../../router";
import {DataView} from 'primereact/dataview';
import {Divider} from "primereact/divider";
import {useTranslation} from "react-i18next";
import {createSeoLink, formatVndMoney, getPercentDiscount} from "../../../../../../service/util.service";
import {Link} from "react-router-dom";
import { Button } from 'primereact/button';
import {DEFAULT_SEARCH_LIMIT} from "../../../../../../../constants";
import {Paginator, PaginatorTemplate} from 'primereact/paginator';
import {Ripple} from "primereact/ripple";
import {classNames} from "primereact/utils";

interface Props {
    products: Product[],
    totalProduct: number,
    currentFirst: number,
    onClickPageChange: Function,
}

const ProductList: React.FC<Props> = ({products, totalProduct, currentFirst, onClickPageChange}) => {

    const [t] = useTranslation('common');


    const renderGridItem = (data: Product) => {
        return (
            <Link to={UserRouter.productDetailPage + "/" + createSeoLink(data.name) + "." + data.id} className={"p-col-fixed p-p-3 " + styles.productGridItem}>
                <div className={"p-d-flex p-flex-column p-ai-start"}>
                    <div className={styles.productImage + " p-as-center p-mb-2"}>
                        <img src={`${AssetPath.productImagePath}${data.imageUrls[0]}`} alt={"product image"}/>
                    </div>
                    <div className={styles.productName + " p-mb-2"}>{data.name}</div>
                    <div className={styles.productRating + " p-d-flex p-ai-center p-mb-1"}>
                        <Rating value={data.rating} className={styles.rating} readOnly cancel={false}/>
                        <Divider layout="vertical" className={styles.divider}/>
                        <p>{t('product-detail-page.product-intro.purchased')} {data.numPurchased}</p>
                    </div>
                    {
                        data.discount && data.discount.discountPrice > 0 ? (
                            <div>
                                <p className={styles.productPrice}>{formatVndMoney(data.price)}</p>
                                <span className={styles.productPrePrice}>{formatVndMoney(data.price - data.discount.discountPrice)}</span>
                                <span className={"p-ml-2 " + styles.productDiscountPercent}>{getPercentDiscount(data.price, data.discount.discountPrice)}</span>
                            </div>
                        ) : data.discount && data.discount.discountPercent > 0 ? (
                            <div>
                                <p className={styles.productPrice}>{formatVndMoney(data.price)}</p>
                                <span className={styles.productPrePrice}>{formatVndMoney(data.price * 100 / data.discount.discountPercent)}</span>
                            </div>
                        ) : null
                    }
                </div>
            </Link>
        );
    }

    const itemTemplate = (product: Product) => {
        return renderGridItem(product);
    }

    const renderHeader = () => {
        return (
            <div className="p-d-flex p-ai-center" style={{gridColumnGap: "1rem"}}>
                <p style={{color: "black", marginTop: "-0.3rem"}}>Sắp xếp theo</p>
                <Button className={"p-button-outlined p-button-secondary"}>Phổ Biến</Button>
                <Button className={"p-button-outlined p-button-secondary"}>Bán Chạy</Button>
                <Button className={"p-button-outlined p-button-secondary"}>Hàng Mới</Button>
                <Button className={"p-button-outlined p-button-secondary"}>Giá Giảm Dần</Button>
                <Button className={"p-button-outlined p-button-secondary"}>Giá Tăng Dần</Button>
            </div>
        );
    }

    const header = renderHeader();

    // @ts-ignore
    const paginatorTemplate: PaginatorTemplate = {
        layout: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown CurrentPageReport',
        'PageLinks': (options: any) => {
            if ((options.view.startPage === options.page && options.view.startPage !== 0) || (options.view.endPage === options.page && options.page + 1 !== options.totalPages)) {
                const className = classNames(options.className, { 'p-disabled': true });
                return <span className={className} style={{ userSelect: 'none' }}>...</span>;
            }
            return (
                <Button className={options.className} onClick={options.onClick}>
                    {options.page + 1}
                    <Ripple />
                </Button>
            )
        },
    }

    return (
        <div className={styles.productList}>
            <div className={"p-d-flex p-flex-column"}>
                <DataView value={products} layout={'grid'} header={header} itemTemplate={itemTemplate} className={"p-d-flex p-flex-column " + styles.dataView}/>
                <Paginator className={styles.paginator + " p-p-2"} first={currentFirst}
                           onPageChange={(event) => onClickPageChange(event.page + 1)}
                           rows={DEFAULT_SEARCH_LIMIT} totalRecords={totalProduct} template={paginatorTemplate}/>
            </div>
        </div>
    );
};

export default ProductList;
