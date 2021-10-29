import React, {useEffect, useState} from 'react';
import ProductList from "./component/product-list/ProductList";
import {Product} from "../../../../model/Product";
import {AbstractFilter} from "../../../../model/main/AbstractFilter";
import {countProductByCriterionApi, getProductByCriterionApi} from "../../../../service/product.service";
import {ProductSearchPath} from "../../../../model/search-path/ProductSearchPath";
import {getProductDetailFiltersApi, getSubCatalogByCatalogApi} from "../../../../service/catalog.service";
import {
    createSearchQuery,
    getModelFromSearchParams,
    productSearchPathToProductCriterion,
    updateFiltersFromSearchPath
} from "../../../../service/search.utils";
import {useHistory} from 'react-router-dom';
import {AssetPath, UserRouter} from "../../../../../router";
import {ProductCriterion} from "../../../../model/criterion/ProductCriterion";
import PageSpinner from "../../../../component/spinner/PageSpinner";
import {useSelector} from "react-redux";
import {SubCatalog} from "../../../../model/SubCatalog";
import {RootState} from "../../../../../store";
import {Fieldset} from "primereact/fieldset";
import {Dropdown} from "primereact/dropdown";
import {Button} from "primereact/button";
import {useTranslation} from "react-i18next";

interface Props {

}

const ProductCollectionPage: React.FC<Props> = ({}) => {

    const history = useHistory();
    const [t, i18n] = useTranslation('common')

    const [products, setProducts] = useState<Product[]>([]);
    const [totalProduct, setTotalProduct] = useState(0);
    const [filters, setFilters] = useState<AbstractFilter[]>([]);
    const catalogHierarchical = useSelector((state: RootState) => state.category.catalogHierarchical)
    const [selectedSubCatalogs, setSelectedSubCatalogs] = useState<SubCatalog[]>([]);
    const [productSearchPath, setProductSearchPath] = useState<ProductSearchPath>({
        catalog: [],
        chip: [],
        cpu: [],
        index: [],
        page: 0,
        ram: [],
        rom: [],
        screen: [],
        type: [],
    });
    const [productCriterion, setProductCriterion] = useState<ProductCriterion>();
    const [isLoading, setIsLoading] = useState(true);

    const query = new URLSearchParams(window.location.search);

    useEffect(() => {
        const fetchProduct = async () => {
            setProductSearchPath(getModelFromSearchParams(query, productSearchPath));
            getProductDetailFiltersFunc();
            let criterion: ProductCriterion = productSearchPathToProductCriterion(productSearchPath);
            setProductCriterion(criterion);
            countProductByCriterionFunc(criterion);
            getProductByCriterionFunc(criterion);
        }
        fetchProduct().then(() => {
            setIsLoading(false);
        })
    }, [window.location.search]);

    const getProductDetailFiltersFunc = () => {
        if (!Array.isArray(productSearchPath.catalog) || !Array.isArray(productSearchPath.index) ||
             productSearchPath.catalog.length === 0 || productSearchPath.index.length === 0) {
            history.push(UserRouter.errorPage)
        } else {
            // @ts-ignore
            getProductDetailFiltersApi(productSearchPath.index[0])
                .then((filters: AbstractFilter[]) => {
                    setFilters(updateFiltersFromSearchPath(filters, productSearchPath))})
                .catch(() => history.push(UserRouter.errorPage));
            // @ts-ignore
            getSubCatalogByCatalogApi(productSearchPath.catalog[0])
                .then((subCatalogs: SubCatalog[]) => setSelectedSubCatalogs(subCatalogs))
                .catch(() => history.push(UserRouter.errorPage));
        }
    }

    const countProductByCriterionFunc = (criterion: ProductCriterion) => {
        if (criterion) {
            countProductByCriterionApi(criterion)
                .then((amount: number) => setTotalProduct(amount))
                .catch(() => history.push(UserRouter.errorPage));
        }
    }

    const getProductByCriterionFunc = (criterion: ProductCriterion) => {
        if (criterion) {
            getProductByCriterionApi(criterion)
                .then((products: Product[]) => {setProducts(products)})
                .catch(() => history.push(UserRouter.errorPage));
        }
    }

    const handleClickCriterion = (value: string, type: string) => {
        // @ts-ignore
        if (productSearchPath[type].filter(x => x === value).length === 0) {
            // @ts-ignore
            productSearchPath[type] = [...productSearchPath[type], value];
        } else {
            // @ts-ignore
            productSearchPath[type] = [...productSearchPath[type].filter(x => x !== value)]
        }
        setProductSearchPath(productSearchPath);
        history.push(UserRouter.productCollectionPage + createSearchQuery(productSearchPath));
    }

    const handlePageChange = (page: number) => {
        productSearchPath.page = page;
        setProductSearchPath(productSearchPath)
        history.push(UserRouter.productCollectionPage + createSearchQuery(productSearchPath));
    }

    const handleChangeSubCatalog = (value: number) => {
        // @ts-ignore
        productSearchPath.index = [...[], value];
        // @ts-ignore
        productSearchPath.catalog = [...[], productCriterion.catalogIds[0]];
        productSearchPath.ram = [];
        productSearchPath.type = [];
        productSearchPath.cpu = [];
        setProductSearchPath(productSearchPath);
        history.push(UserRouter.productCollectionPage + createSearchQuery(productSearchPath));
    }

    const handleChangeCatalog = (value: number) => {
        // @ts-ignore
        productSearchPath.catalog = [...[], value];
        // @ts-ignore
        productSearchPath.index = [...[], catalogHierarchical.find(x => x.id === value).subCatalogs[0].id];
        productSearchPath.ram = [];
        productSearchPath.type = [];
        productSearchPath.cpu = [];
        setProductSearchPath(productSearchPath);
        history.push(UserRouter.productCollectionPage + createSearchQuery(productSearchPath));
    }

    const ProductFilter = () => {
        return (
            <div>
                <Fieldset legend={t('product-collection-page.product-filter.headline')}>
                    <div className={"p-grid p-ai-center"}>
                        <div className={"p-col-2"}>
                            <p className={"p-text-bold"}>Danh mục</p>
                        </div>
                        <div className={"p-col-3"}>
                            <Dropdown name="catalogIds" value={
                                  // @ts-ignore
                                  parseInt(String(productCriterion.catalogIds[0]))}
                                  style={{width: "100%"}}
                                  placeholder={"Danh sách danh mục"}
                                  onChange={(e) => handleChangeCatalog(e.value)}
                                  options={catalogHierarchical} optionLabel="name" optionValue={"id"}/>
                        </div>
                    </div>
                    <div className={"p-grid p-ai-center"}>
                        <div className={"p-col-2"}>
                            <p className={"p-text-bold"}>Danh mục con </p>
                        </div>
                        <div className={"p-col-3"}>
                            <Dropdown name="subCatalogIds" value={
                                // @ts-ignore
                                parseInt(String(productCriterion.subCatalogIds[0]))}
                                      style={{width: "100%"}}
                                      onChange={(e) => handleChangeSubCatalog(e.value)}
                                      placeholder={"Danh sách danh mục con"}
                                      options={selectedSubCatalogs} optionLabel="name" optionValue={"id"}/>
                        </div>
                    </div>
                    {
                        filters.map((filter, index1) => (
                            <div className={"p-grid p-ai-center"} key={index1}>
                                <div className={"p-col-2"}>
                                    <p className={"p-text-bold"}>{filter.label}</p>
                                </div>
                                <div className={"p-col"}>
                                    {
                                        filter.valueList.map((valueItem, index2) => (
                                            <Button key={index2}
                                                    label={valueItem.label}
                                                    className={
                                                        valueItem.checked === true ?
                                                            `p-button-outlined p-button p-mr-2` : "p-button-outlined p-button-secondary p-mr-2"
                                                    }
                                                    onClick={() => handleClickCriterion(valueItem.value, filter.type)}
                                            />))
                                    }
                                </div>
                            </div>
                        ))
                    }
                </Fieldset>
            </div>
        )
    }

    if (isLoading || !productCriterion) {
        return (
            <PageSpinner/>
        )
    } else {
        return (
            <div>
                <ProductFilter/>
                <div className={"p-mt-3"}>
                    {
                        totalProduct > 0 ? (
                            <ProductList products={products} totalProduct={totalProduct}
                                         onClickPageChange={(page: number) => handlePageChange(page)}
                                         currentFirst={productCriterion?.offset || 0}/>
                        ) : (
                            <div className={"d-div p-d-flex p-flex-column p-ai-center p-jc-center p-p-3"}>
                                <img src={AssetPath.noProductFoundImgPath} alt={"no-product-found"} width={300}/>
                                <h2 className={"p-mt-3"}>Không tìm thấy sản phẩm nào ứng với bộ lọc hiện tại</h2>
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
};

export default ProductCollectionPage;
