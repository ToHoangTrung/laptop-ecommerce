import React, {useEffect, useRef, useState} from "react";
import {Product} from "../../../../model/Product";
import styles from '../../admin-dashboard.module.scss'
import {ProductCriterion} from "../../../../model/criterion/ProductCriterion";
import {getProductByCriterionApi} from "../../../../service/product.service";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Button} from "primereact/button";
import {Toast} from "primereact/toast";
import {Toolbar} from "primereact/toolbar";
import {useDispatch} from "react-redux";
import {Link, useHistory} from "react-router-dom";
import {AdminRouter, AssetPath, UserRouter} from "../../../../../router";
import {Image} from 'primereact/image';
import PageSpinner from "../../../../component/spinner/PageSpinner";
import {createSeoLink, formatVndMoney} from "../../../../service/util.service";
import {Rating} from "primereact/rating";
import {setBreadCrumbItems} from "../../../../feature/bread-crumb/breadCrumbSlice";

interface Props {

}

const ProductManagementPage: React.FC<Props> = ({}) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [productCriterion, setProductCriterion] = useState<ProductCriterion>({
        catalogIds: [],
        cpuList: [],
        graphicsChipList: [],
        id: "",
        limit: 0,
        name: "",
        offset: 0,
        productTypeIds: [],
        ramList: [],
        romList: [],
        screenList: [],
        subCatalogIds: []
    });
    const [selectedProducts, setSelectedProducts] = useState(null);
    const toast = useRef(null);

    useEffect(() => {
        getProductByCriterionApi(productCriterion)
            .then((products: Product[]) => setProducts(products))
            .finally(() => {
                setIsLoading(false);
            });
        const items = [
            { label: 'Product Collection', url: AdminRouter.productManagementPage},
        ];
        dispatch(setBreadCrumbItems(items))
    }, [productCriterion]);

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="New" icon="pi pi-plus" className="p-button p-mr-2" onClick={() => history.push(AdminRouter.newProductPage)} />
                <Button label="Delete" icon="pi pi-trash" className="p-button-danger" disabled={!selectedProducts} />
            </React.Fragment>
        )
    }

    const nameBodyTemplate = (rowData: Product) => {
        return <Link to={AdminRouter.productDetailPage + `/${createSeoLink(rowData.name)}.${rowData.id}`} className={styles.productLink}>{rowData.name}</Link>
    }

    if (isLoading) {
        return (
            <PageSpinner/>
        )
    } else {
        return (
            <div>
                <Toast ref={toast} />
                <Toolbar className="p-mb-4" left={leftToolbarTemplate}/>
                <DataTable value={products} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                           dataKey="id" className={styles.table}>
                    <Column selectionMode="multiple" headerStyle={{width: '3rem'}}/>
                    <Column body={(data: Product) => <p>{data.id}</p>} header="Id" sortable style={{width: "7%"}}/>
                    <Column header="Name" sortable body={nameBodyTemplate} style={{width: "30%"}}/>
                    <Column body={(data: Product) => <img src={`${AssetPath.productImagePath}${data.imageUrls[0]}`} alt="Image" width="70"/>} header="Image" />
                    <Column body={(data: Product) => <p>{formatVndMoney(data.price)}</p>} header="Price" sortable/>
                    <Column body={(data: Product) => <p>{data.status?.label}</p>} header="Status" sortable/>
                    <Column body={(data: Product) => <p>{data.amount}</p>} header="Amount" sortable/>
                    <Column body={(data: Product) => <Rating value={data.rating} readOnly cancel={false}/>} header="Rating" sortable/>
                </DataTable>
            </div>
        );
    }
}

export default ProductManagementPage
