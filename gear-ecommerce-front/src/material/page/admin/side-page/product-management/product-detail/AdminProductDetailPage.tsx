import React, {useEffect, useRef, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import {Product} from "../../../../../model/Product";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../../store";
import {useTranslation} from "react-i18next";
import {createNewProductApi, getProductDetailApi} from "../../../../../service/product.service";
import {ExceptionResponse} from "../../../../../model/main/ExceptionResponse";
import {AdminRouter, UserRouter} from "../../../../../../router";
import {Toast} from "primereact/toast";
import {setBreadCrumbItems} from "../../../../../feature/bread-crumb/breadCrumbSlice";
import {createSeoLink} from "../../../../../service/util.service";
import PageSpinner from "../../../../../component/spinner/PageSpinner";
import {Form, Formik, useFormik} from "formik";
import {NewProduct} from "../../../../../model/raw/NewProduct";
import {AbstractModel} from "../../../../../model/main/AbstractModel";
import {Accordion, AccordionTab} from "primereact/accordion";
import {classNames} from "primereact/utils";
import {InputText} from "primereact/inputtext";
import {InputNumber} from "primereact/inputnumber";
import {Dropdown} from "primereact/dropdown";
import {Editor} from "primereact/editor";
import {Button} from "primereact/button";
import {getAllFilterProductDetailApi, getAllProductType} from "../../../../../service/catalog.service";
import {ProductType} from "../../../../../model/ProductType";
import {AbstractFilter} from "../../../../../model/main/AbstractFilter";

interface Props {
}

interface RouteParams {
    productId: number
}


const AdminProductDetailPage: React.FC<Props> = ({}) => {

    // @ts-ignore
    const params: RouteParams = useParams()
    const [product, setProduct] = useState<Product>({
        amount: 0,
        content: "",
        createdDate: "",
        descriptionContentUrl: "",
        detail: undefined,
        discount: undefined,
        guaranteeTime: 0,
        id: 0,
        imageUrls: [],
        name: "",
        numPurchased: 0,
        numRating: 0,
        price: 0,
        rating: 0,
        sku: 0,
        status: undefined,
        type: undefined,
        updatedDate: "",
        version: 0
    });
    const toast = useRef(null);
    const [t] = useTranslation('common');
    const dispatch = useDispatch();
    const [productTypes, setProductTypes] = useState<ProductType[]>([]);
    const [details, setDetails] = useState<AbstractFilter[]>([]);

    useEffect(() => {
        getProductDetailApi(params.productId)
            .then((product: Product) => {
                const items = [
                    { label: 'Product Collection', url: AdminRouter.productManagementPage},
                    { label: product.name, url: AdminRouter.productDetailPage + "/" + createSeoLink(product.name) + "." + product.id},
                ];
                dispatch(setBreadCrumbItems(items));
                setProduct(product);
            })
            .catch((err: ExceptionResponse) => {
                // @ts-ignore
                toast.current.show({ severity: 'error', summary: 'Error Message', detail: err.message, life: 3000 });
            });
        getAllProductType().then((productTypes: ProductType[]) => setProductTypes(productTypes));
        getAllFilterProductDetailApi().then((details: AbstractFilter[]) => setDetails(details));
    }, [params.productId]);

    const formik = useFormik({
        initialValues: product,
        enableReinitialize: true,
        validate: (data) => {
            let errors = {} as AbstractModel;
            if (!data.name) {
                errors.name = 'Product Name is required';
            }
            if (!data.sku) {
                errors.sku = 'Product Sku is required';
            }
            if (!data.amount) {
                errors.amount = 'Product Amount is required';
            }
            if (!data.guaranteeTime) {
                errors.guaranteeTime = 'Product Guarantee Time is required';
            }
            if (!data.price) {
                errors.price = 'Product Price is required';
            }
            if (!data.type) {
                errors.type = "Product Type is required"
            }
            return errors;
        },
        onSubmit: (data) => {
        }
    });

    const isFormFieldValid = (name: any) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name: any) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };


    if (product) {
        return (
            <div>
                <Toast ref={toast}/>
                <form onSubmit={formik.handleSubmit} className={"p-fluid"}>
                    <Accordion multiple activeIndex={[0]} >
                        <AccordionTab header="Basic Info">
                            <div className={"p-grid"}>
                                <div className="p-field p-col-12">
                                    <label className={classNames({ 'p-error': isFormFieldValid('name') })}>Product Name*</label>
                                    <InputText name="name" value={formik.values.name} onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('name') })}/>
                                    {getFormErrorMessage('name')}
                                </div>
                                <div className="p-field p-col-12 p-md-3">
                                    <label className={classNames({ 'p-error': isFormFieldValid("sku") })}>Product Sku*</label>
                                    <InputNumber name={"sku"} value={formik.values.sku} onValueChange={(e) => formik.values.sku = e.value} className={classNames({ 'p-invalid': isFormFieldValid("sku")})} mode="decimal" useGrouping={false}/>
                                    {getFormErrorMessage("sku")}
                                </div>
                                <div className="p-field p-col-12 p-md-3">
                                    <label className={classNames({ 'p-error': isFormFieldValid("price") })}>Product Price*</label>
                                    <InputNumber name={"price"} value={formik.values.price} onValueChange={(e) => formik.values.price = e.value} className={classNames({ 'p-invalid': isFormFieldValid("price")})} mode="currency" currency="VND" locale="vi-VN" />
                                    {getFormErrorMessage("price")}
                                </div>
                                <div className="p-field p-col-12 p-md-3">
                                    <label className={classNames({ 'p-error': isFormFieldValid("price") })}>Product Amount*</label>
                                    <InputNumber name={"amount"} value={formik.values.amount} onValueChange={(e) => formik.values.amount = e.value} className={classNames({ 'p-invalid': isFormFieldValid("amount")})} mode="decimal" useGrouping={false}/>
                                    {getFormErrorMessage("amount")}
                                </div>
                                <div className="p-field p-col-12 p-md-3">
                                    <label className={classNames({ 'p-error': isFormFieldValid("guaranteeTime") })}>Product Guarantee Time*</label>
                                    <InputNumber name={"guaranteeTime"} value={formik.values.guaranteeTime} onValueChange={(e) => formik.values.guaranteeTime = e.value} className={classNames({ 'p-invalid': isFormFieldValid("guaranteeTime")})} mode="decimal" useGrouping={false}/>
                                    {getFormErrorMessage("guaranteeTime")}
                                </div>
                                <div className="p-field p-col-12 p-md-3">
                                    <label className={classNames({ 'p-error': isFormFieldValid("type") })}>Product Type*</label>
                                    <Dropdown name="type" value={formik.values.type} onChange={formik.handleChange} options={productTypes} optionLabel="name" optionValue={"id"} className={classNames({ 'p-invalid': isFormFieldValid("type")})} />
                                    {getFormErrorMessage("type")}
                                </div>
                            </div>
                        </AccordionTab>
                        <AccordionTab header="Detail Info">
                            <div className={"p-grid"}>
                                {
                                    details.map((detail, index) => (
                                        <div className="p-field p-col-12 p-md-3" key={index}>
                                            <label>{detail.label}</label>
                                            <Dropdown name={detail.type} value={formik.values[detail.type]} onChange={formik.handleChange} options={detail.valueList} />
                                        </div>
                                    ))
                                }
                            </div>
                        </AccordionTab>
                        <AccordionTab header="Description Content">
                            <div className={"p-grid"}>
                                <div className="p-field p-col-12">
                                    <label>Product Description Content*</label>
                                    <Editor style={{height:'1000px'}} value={formik.values.content} onTextChange={(e) => formik.values.content = e.htmlValue || ""} />
                                </div>
                            </div>
                        </AccordionTab>
                    </Accordion>
                    <Button type="submit" label="Update Product" className="p-mt-4" />
                </form>
            </div>
        );
    } else {
        return (
            <PageSpinner/>
        )
    }

};

export default AdminProductDetailPage;
