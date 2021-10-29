import React, {useEffect, useState} from 'react';
import styles from "./side-nav.module.scss"
import {useTranslation} from "react-i18next";
import {MegaMenu} from "primereact/megamenu";
import './override.scss'
import {useSelector} from "react-redux";
import {RootState} from "../../../../../store";
import ReorderOutlinedIcon from '@mui/icons-material/ReorderOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import {UserRouter} from "../../../../../router";
import {ProductSearchPath} from "../../../../model/search-path/ProductSearchPath";
import {createSearchQuery} from "../../../../service/search.utils";
import {Link, useHistory} from 'react-router-dom';

interface Props {

}

const SideNav: React.FC<Props> = ({}) => {

    const [t] = useTranslation('common');
    const catalogHierarchical = useSelector((state: RootState) => state.category.catalogHierarchical);
    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const history = useHistory();

    useEffect(() => {
        if (catalogHierarchical.length > 0) {
            let categoryList: { label: string; icon: string; items: never[]; }[] = [];
            catalogHierarchical.forEach(catalog => {
                // @ts-ignore
                let catalogItem = {
                    label: catalog.name,
                    icon: catalog.logo,
                    items: [],
                }
                let arr: { label: string; items: never[]; }[] = [];
                //@ts-ignore
                catalog.subCatalogs.forEach((subCatalog, index) => {
                    let subCatalogItem = {
                        label: subCatalog.name,
                        items: [],
                    }
                    // @ts-ignore
                    subCatalog.productTypes.forEach(productType => {
                        let productSearchPath: ProductSearchPath = {
                            // @ts-ignore
                            catalog: [catalog.id],
                            // @ts-ignore
                            index: [subCatalog.id],
                            // @ts-ignore
                            type: [productType.id]
                        }
                        let productTypeItem = {
                            label: productType.name,
                            url: UserRouter.productCollectionPage + createSearchQuery(productSearchPath)
                        }
                        // @ts-ignore
                        subCatalogItem.items.push(productTypeItem);
                    });
                    // @ts-ignore
                    arr.push(subCatalogItem);
                    // @ts-ignore
                    if (arr.length % 2 === 0 || index + 1 === catalog.subCatalogs?.length) {
                        // @ts-ignore
                        catalogItem.items.push(arr);
                        arr = [];
                    }

                });
                // @ts-ignore
                categoryList.push(catalogItem);
            });
            // @ts-ignore
            setCategories([...categoryList]);
        }
        setIsLoading(false);
    }, [catalogHierarchical])

    if (isLoading) {
        return (
            <div>
                Loading...
            </div>
        )
    } else {
        return (
            <div className={styles.sideNav}>
                <div className={"p-grid"}>
                    <div className={'p-col-1'}>
                    </div>
                    <div className={'p-col-10 p-d-flex p-ai-center p-jc-between'}>
                        <div className={"p-p-2 p-d-flex p-ai-center " + styles.category}>
                            <ReorderOutlinedIcon/>
                            <p className={"p-px-2"}>{t('side-nav.categories')}</p>
                            <KeyboardArrowDownOutlinedIcon/>
                            <MegaMenu model={categories} orientation="vertical" className={styles.megaMenu}/>
                        </div>
                    </div>
                    <div className={'p-col-1'}>
                    </div>
                </div>
            </div>
        );
    }
};

export default SideNav;
