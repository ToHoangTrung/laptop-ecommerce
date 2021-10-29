import React, {useEffect, useRef, useState} from 'react';
import styles from './product-detail.module.scss';
import './override.scss'
import {useHistory, useParams} from 'react-router-dom';
import {Product} from "../../../../model/Product";
import {getProductDetailApi} from "../../../../service/product.service";
import ProductIntro from "./component/product-intro/ProductIntro";
import {Menu} from "primereact/menu";
import {useTranslation} from "react-i18next";
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import AssignmentReturnOutlinedIcon from '@mui/icons-material/AssignmentReturnOutlined';
import StackedLineChartOutlinedIcon from '@mui/icons-material/StackedLineChartOutlined';
import HomeRepairServiceOutlinedIcon from '@mui/icons-material/HomeRepairServiceOutlined';
import LaptopWindowsOutlinedIcon from '@mui/icons-material/LaptopWindowsOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import ReactHtmlParser from 'react-html-parser';
import {useSelector} from "react-redux";
import {RootState} from "../../../../../store";
import {CartProduct} from "../../../../model/CartProduct";
import {addOrUpdateCurrentUserCartProduct} from "../../../../service/cart.service";
import {Toast} from "primereact/toast";
import {ExceptionResponse} from "../../../../model/main/ExceptionResponse";
import PageSpinner from "../../../../component/spinner/PageSpinner";
import {UserRouter} from "../../../../../router";


interface Props {
}

interface RouteParams {
    productId: number
}

const ProductDetailPage: React.FC<Props> = ({}) => {

    // @ts-ignore
    const params: RouteParams = useParams()
    const history = useHistory();
    const [product, setProduct] = useState<Product>();
    const toast = useRef(null);
    const authenticated = useSelector((state: RootState) => state.auth.authenticated)
    const [t] = useTranslation('common');

    const productSalesPolicies = [
        {
            label: t('product-detail-page.product-sales-policy.policy-list.is-free-ship'),
            template: (item: any, options: any) => {
                return (
                    <a className={options.className + " " + styles.salePolicyItem}>
                        <LocalShippingOutlinedIcon/>
                        <span>{item.label}</span>
                    </a>
                );
            }
        },
        {
            separator:true
        },
        {
            label: t('product-detail-page.product-sales-policy.headline'),
            template: (item: any, options: any) => {
                return (
                    <a className={options.className + " p-mt-4 " + styles.salePolicyItem}>
                        <span className={"p-text-bold"}>{item.label}</span>
                    </a>
                );
            }
        },
        {
            label: t('product-detail-page.product-sales-policy.policy-list.guaranteed-genuine'),
            template: (item: any, options: any) => {
                return (
                    <a className={options.className + " " + styles.salePolicyItem}>
                        <VerifiedUserOutlinedIcon/>
                        <span>{item.label}</span>
                    </a>
                );
            }
        },
        {
            label: t('product-detail-page.product-sales-policy.policy-list.refund'),
            template: (item: any, options: any) => {
                return (
                    <a className={options.className + " " + styles.salePolicyItem}>
                        <AssignmentReturnOutlinedIcon/>
                        <span>{item.label}</span>
                    </a>
                );
            }
        },
        {
            label: t('product-detail-page.product-sales-policy.policy-list.free-ship-condition'),
            template: (item: any, options: any) => {
                return (
                    <a className={options.className + " " + styles.salePolicyItem}>
                        <StackedLineChartOutlinedIcon/>
                        <span>{item.label}</span>
                    </a>
                );
            }
        },
        {
            label: t('product-detail-page.product-sales-policy.other-service'),
            template: (item: any, options: any) => {
                return (
                    <a className={options.className + " p-mt-3 " + styles.salePolicyItem}>
                        <span className={"p-text-bold"}>{item.label}</span>
                    </a>
                );
            }
        },
        {
            label: t('product-detail-page.product-sales-policy.policy-list.repair'),
            template: (item: any, options: any) => {
                return (
                    <a className={options.className + " " + styles.salePolicyItem}>
                        <HomeRepairServiceOutlinedIcon/>
                        <span>{item.label}</span>
                    </a>
                );
            }
        },
        {
            label: t('product-detail-page.product-sales-policy.policy-list.cleaning'),
            template: (item: any, options: any) => {
                return (
                    <a className={options.className + " " + styles.salePolicyItem}>
                        <LaptopWindowsOutlinedIcon/>
                        <span>{item.label}</span>
                    </a>
                );
            }
        },
        {
            label: t('product-detail-page.product-sales-policy.policy-list.warranty'),
            template: (item: any, options: any) => {
                return (
                    <a className={options.className + " " + styles.salePolicyItem}>
                        <SecurityOutlinedIcon/>
                        <span>{item.label}</span>
                    </a>
                );
            }
        },
        {
            label: t('product-detail-page.product-sales-policy.detail'),
            template: (item: any, options: any) => {
                return (
                    <a className={options.className + " " + styles.salePolicyDetail}>
                        <SecurityOutlinedIcon/>
                        <span>{item.label}</span>
                    </a>
                );
            }
        }
    ];

    useEffect(() => {
        getProductDetailApi(params.productId)
            .then((product: Product) => {
                setProduct(product)
            })
            .catch((err: ExceptionResponse) => {
                history.push({
                    pathname: UserRouter.errorPage,
                    state: {
                        content: err.status === 404 ? "Xin lỗi, sản phẩm bạn đang tìm kiếm không tồn tại" : ""
                    },
                })
        });
    }, [params.productId]);

    const handleAddToCart = () => {
        if (authenticated && product) {
            let cartProduct: CartProduct = {
                id: undefined,
                product: product,
                amount: 1,
            }
            console.log(cartProduct)
            addOrUpdateCurrentUserCartProduct(cartProduct)
                .then((res) => {
                    // @ts-ignore
                    toast.current
                        .show({ severity: 'success', summary: 'Successful', detail: res, life: 3000 });
                })
                .catch((err) => {
                    // @ts-ignore
                    toast.current
                        .show({ severity: 'error', summary: 'Error Message', detail: err, life: 3000 });
                })
        } else {
            // @ts-ignore
            toast.current
                .show({ severity: 'info', summary: 'Info Message', detail: t('notification.un-sign-in-add-to-cart'), life: 3000 });
        }
    }

    if (product) {
        return (
            <div className={styles.productDetail}>
                <Toast ref={toast}/>
                <div className={"p-grid"}>
                    <div className={"p-col-9"}>
                        <ProductIntro product={product} onClickAddToCart={() => handleAddToCart()}/>
                    </div>
                    <div className={"p-col-3"}>
                        <div className={"p-p-3 d-div"}>
                            <Menu model={productSalesPolicies} style={{width: "100%"}}/>
                        </div>
                    </div>
                    <div className={'p-col-8'}>
                        <div className={"p-p-3 d-div"}>
                            <h2 className={"p-mb-2 " + styles.productDescription}>{t('product-detail-page.product-content')}</h2>
                            { ReactHtmlParser(product.content as string) }
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <PageSpinner/>
        )
    }
};

export default ProductDetailPage;
