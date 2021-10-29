import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {getCatalogHierarchicalApi} from "../../service/catalog.service";
import {Catalog} from "../../model/Catalog";
import { setCatalogHierarchical } from '../../feature/category/categorySlice';
import {AssetPath, UserRouter} from "../../../router";
import {setBreadCrumbItems} from "../../feature/bread-crumb/breadCrumbSlice";
import {Galleria} from "primereact/galleria";
import styles from './home.module.scss';
import './override.scss'
import {getAllBrandApi} from "../../service/brand.service";
import {Brand} from "../../model/Brand";
import {Carousel} from "primereact/carousel";
import {Link} from "react-router-dom";
import {ProductCriterion} from "../../model/criterion/ProductCriterion";
import {getProductByCriterionApi} from "../../service/product.service";
import {Product} from "../../model/Product";
import FlashOnOutlinedIcon from '@mui/icons-material/FlashOnOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import {
    formatVndMoney,
    getActualDiscountPrice,
    getActualPriceAfterDiscount,
    getPercentDiscount
} from "../../service/util.service";
import {Button} from "primereact/button";
import {ProgressBar} from "primereact/progressbar";

interface Props {

}

const HomePage: React.FC<Props> = ({}) => {

    const dispatch = useDispatch();
    const [brands, setBrands] = useState<Brand[]>([]);
    const [newProducts, setNewProduct] = useState<Product[]>([]);

    useEffect(() => {
        dispatch(setBreadCrumbItems([]));
        getAllBrandApi().then((brands: Brand[]) => setBrands(brands));
        getProductByCriterionApi({} as ProductCriterion).then((products: Product[]) => setNewProduct(products));
    }, []);

    const TopAdvertisement = () => {
        const imageItems = [
            "https://salt.tikicdn.com/cache/w1080/ts/banner/5e/e0/a7/693d416662d34d7e0b67c4b6d39a0ebf.png.webp",
            "https://salt.tikicdn.com/cache/w1080/ts/banner/a1/d8/a6/f344e0c705db1aa8f47cdb5bf9e4f5f5.png.webp",
            "https://salt.tikicdn.com/cache/w1080/ts/banner/eb/2f/ee/d131bbb61effcb81e704c47a2700e7c5.png.webp",
            "https://salt.tikicdn.com/cache/w1080/ts/banner/b8/55/4b/50581d670462195db7aa65668f755a2b.png.webp",
            "https://salt.tikicdn.com/cache/w1080/ts/banner/95/c8/47/a8073623bcde7b39d023569c5cb4db3d.png.webp"
        ]

        const responsiveOptions = [
            {
                breakpoint: '1024px',
                numVisible: 5
            },
            {
                breakpoint: '768px',
                numVisible: 3
            },
            {
                breakpoint: '560px',
                numVisible: 1
            }
        ];

        const itemTemplate = (item: any) => {
            return <img src={item} alt={item.alt} style={{ width: '100%', display: 'block' }} />;
        }

        return (
            <div className={"p-grid"}>
                <div className={"p-col-8"}>
                    <Galleria value={imageItems} responsiveOptions={responsiveOptions} numVisible={5}
                              circular showItemNavigators showThumbnails={false} showIndicators item={itemTemplate}/>
                </div>
                <div className={"p-col-4"}>
                    <div>
                        <img src={"https://salt.tikicdn.com/cache/w400/ts/banner/19/ae/91/16c49d9e67ccb8b3ee1c49a70cc75b6a.png.webp"} width={"100%"} alt={"ad"}/>
                    </div>
                </div>
            </div>
        )
    }

    const TopBrand = () => {

        const responsiveOptions = [
            {
                breakpoint: '1024px',
                numVisible: 3,
                numScroll: 3
            },
            {
                breakpoint: '768px',
                numVisible: 2,
                numScroll: 2
            },
            {
                breakpoint: '560px',
                numVisible: 1,
                numScroll: 1
            }
        ];

        const brandTemplate = (brand: Brand) => {
            return (
                <div className={"p-d-flex p-flex-column p-ai-center p-mb-2 " + styles.brandTemplate}>
                    <Link to={"/"} className={styles.brandImg + " p-d-flex"}>
                        <img src={AssetPath.brandImagePath + brand.logoUrl} alt={"brand"} />
                    </Link>
                </div>
            )
        }

        return (
            <div className={"d-div p-p-2"}>
                <Carousel value={brands} numVisible={4} numScroll={1} responsiveOptions={responsiveOptions}
                          itemTemplate={brandTemplate} header={<h3 className={"p-mb-3 p-ml-2 p-mt-1"}>Thương hiệu nổi bậc</h3>} />
            </div>
        )
    }

    const NewArrivedProduct = () => {
        const responsiveOptions = [
            {
                breakpoint: '1024px',
                numVisible: 3,
                numScroll: 3
            },
            {
                breakpoint: '768px',
                numVisible: 2,
                numScroll: 2
            },
            {
                breakpoint: '560px',
                numVisible: 1,
                numScroll: 1
            }
        ];

        const productTemplate = (product: Product) => {
            return (
                <Link to={"/"} className={"p-d-flex p-flex-column p-jc-stretch p-ai-start p-p-3 " + styles.productTemplate}>
                    <Link to={"/"} className={styles.productImg + " p-as-center"}>
                        <img src={AssetPath.productImagePath + product.imageUrls[0]} alt={"product"} />
                    </Link>
                    <p className={"p-mt-3 p-mb-2 " + styles.productName}>{product.name}</p>
                    {
                        product.discount ? (
                            <div className={"p-d-flex p-ai-start p-mb-2"}>
                                <p className={styles.productPrice}>{formatVndMoney(getActualPriceAfterDiscount(product.price, product.discount))}</p>
                                <Button className={"p-ml-2 p-button-danger p-button-sm " + styles.percent}>{getPercentDiscount(product.price, getActualDiscountPrice(product.price, product.discount))}</Button>
                            </div>
                        ) : (
                            <div>
                                <p className={styles.productPrice}>{formatVndMoney(product.price)}</p>
                            </div>
                        )
                    }
                    <ProgressBar value={40} displayValueTemplate={(value => (
                        <p>Đã bán {value}</p>
                    ))}/>
                </Link>
            )
        }

        return (
            <div className={"d-div p-p-2"}>
                <Carousel value={newProducts} numVisible={6} numScroll={6} responsiveOptions={responsiveOptions}
                          itemTemplate={productTemplate} header={
                    <div className={"p-pb-3 p-ml-2 p-mt-1 p-d-flex p-jc-between p-ai-center"} style={{borderBottom: "1px solid var(--neutralgray-400"}}>
                        <h2 className={"p-d-flex p-ai-center"} style={{color: "var(--red-600)", fontStyle: "italic"}}>Giá sốc <FlashOnOutlinedIcon style={{fontSize: 30}}/> hôm nay</h2>
                        <Link to={"/"} className={"p-d-flex p-ai-center"}>Xem tất cả <KeyboardArrowRightOutlinedIcon/></Link>
                    </div>
                } />
            </div>
        )
    }

    const CatalogAdvertisement = () => {
        return (
            <div className={"p-grid"}>
                <div className={"p-col-6"}>
                    <div>
                        <div className={"p-p-3"}>
                            <h3>LAPTOP - MACBOOK</h3>
                            <Link to={"/"}>Xem tất cả</Link>
                        </div>
                        <div className={"p-d-flex"}>
                            <div>
                                <img src={"https://lh3.googleusercontent.com/osX_wM7_cYDGeSAsQO6EkHZc-FpTjksz7EE1PJaz4zsJ2C1kiSkwuxmJ635ylVePnpdGvcTzuwVej-hu7UMVf7FcLcRqXOM=rw-w400"}/>
                            </div>
                            <div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className={"p-grid"}>
                <div className={"p-col-12"}>
                    <TopAdvertisement/>
                </div>
                <div className={"p-col-12"}>
                    {
                        brands && (
                            <TopBrand/>
                        )
                    }
                </div>
                <div className={"p-col-12"}>
                    {
                        newProducts && (
                            <NewArrivedProduct/>
                        )
                    }
                </div>
                <div className={"p-col-12"}>
                    {/*<CatalogAdvertisement/>*/}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
