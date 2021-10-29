import React, {useEffect, useState} from "react";
import {Catalog} from "../../../../../model/Catalog";
import {SubCatalog} from "../../../../../model/SubCatalog";
import {ProductType} from "../../../../../model/ProductType";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {InputText} from "primereact/inputtext";
import {Product} from "../../../../../model/Product";
import {classNames} from 'primereact/utils';
import {ProductDetail} from "../../../../../model/ProductDetail";
import {FormikErrors, useFormik} from 'formik';
import {AbstractModel} from "../../../../../model/main/AbstractModel";
import styles from './new-product.module.scss';
import {InputNumber} from "primereact/inputnumber";
import {getAllFilterProductDetailApi, getAllProductType} from "../../../../../service/catalog.service";
import {Dropdown} from "primereact/dropdown";
import {AbstractFilter} from "../../../../../model/main/AbstractFilter";
import {NewProduct} from "../../../../../model/raw/NewProduct";
import {Accordion, AccordionTab} from "primereact/accordion";
import {Editor} from "primereact/editor";
import {FileUpload} from "primereact/fileupload";
import {Tooltip} from "primereact/tooltip";
import {createNewProductApi} from "../../../../../service/product.service";
import {ExceptionResponse} from "../../../../../model/main/ExceptionResponse";


interface Props {

}

const NewProductPage: React.FC<Props> = ({}) => {

    const [productTypes, setProductTypes] = useState<ProductType[]>([]);

    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState<NewProduct>({
        amount: 0,
        content: "",
        descriptionContentUrl: "",
        ram: "",
        rom: "",
        screen: "",
        graphicsChip: "",
        cpu: "",
        guaranteeTime: 0,
        id: 0,
        imageUrls: [],
        name: "",
        price: 0,
        sku: 0,
        type: 0,
    });
    const [details, setDetails] = useState<AbstractFilter[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getAllProductType().then((productTypes: ProductType[]) => setProductTypes(productTypes));
        getAllFilterProductDetailApi().then((details: AbstractFilter[]) => setDetails(details));
        setIsLoading(false);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const formik = useFormik({
        initialValues: {
            amount: 0,
            content: "",
            descriptionContentUrl: "",
            ram: "",
            rom: "",
            screen: "",
            graphicsChip: "",
            cpu: "",
            guaranteeTime: 0,
            id: 0,
            imageUrls: [],
            name: "",
            price: 0,
            sku: 0,
            type: 0,
        } as NewProduct,
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
            setFormData(data);
            createNewProductApi(formData).then((res: string) => {
                console.log(res)
            }).catch((err: ExceptionResponse) => {
                console.log(err)
            });
            setShowMessage(true);
            // formik.resetForm();
        }
    });

    const isFormFieldValid = (name: any) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name: any) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    const dialogFooter = <div className="p-d-flex p-jc-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} /></div>;

    if (isLoading) {
        return (
            <div>
                Loading...
            </div>
        )
    } else {
        return (
            <div>
                <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                    <div className="p-d-flex p-ai-center p-dir-col p-pt-6 p-px-3">
                        <i className="pi pi-check-circle" style={{fontSize: '5rem', color: 'var(--green-500)'}}/>
                        <h5>Registration Successful!</h5>
                        <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                            Your account is registered under name <b>{formData.name}</b> ; it'll be valid next 30 days without activation. Please check <b>{formData.email}</b> for activation instructions.
                        </p>
                    </div>
                </Dialog>
                <div className={"card"}>
                    <form onSubmit={formik.handleSubmit} className={"p-fluid"}>
                            <Accordion multiple  activeIndex={[0]} >
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
                                        {/*<div className="p-field p-col-12">*/}
                                        {/*    <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />*/}
                                        {/*    <label className={classNames({ 'p-error': isFormFieldValid("type") })}>Product Image*</label>*/}
                                        {/*    <FileUpload name="demo[]" url="https://primefaces.org/primereact/showcase/upload.php" onUpload={onUpload} multiple accept="image/*" maxFileSize={1000000}*/}
                                        {/*                emptyTemplate={<p className="p-m-0">Drag and drop files to here to upload.</p>} />*/}
                                        {/*    {getFormErrorMessage("type")}*/}
                                        {/*</div>*/}
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
                        <div className="p-field p-col-12">
                            <Button type="submit" label="Create New product" className="p-mt-2" />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default NewProductPage
