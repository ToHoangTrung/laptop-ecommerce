import React from "react";
import styles from './admin-sidebar.module.scss';
import {AdminRouter, AssetPath} from "../../../../../router";
import {PanelMenu} from "primereact/panelmenu";
import {Image} from 'primereact/image';
import {Link, NavLink} from "react-router-dom";

interface Props {

}

const items = [
    {
        label:'Catalog Management',
        icon:'pi pi-fw pi-tags',
        url: AdminRouter.categoryManagementPage,
        className: styles.item,
        template: (item: any, options: any) => {
            return (
                <NavLink className={options.className} to={item.url} activeStyle={{color: 'black', background: "white"}}>
                    <span className={options.iconClassName}/>
                    <span>{item.label}</span>
                </NavLink>
            );
        }
    },
    {
        label:'Product Management',
        icon:'pi pi-fw pi-th-large',
        url: AdminRouter.productManagementPage,
        className: styles.item,
        template: (item: any, options: any) => {
            return (
                <NavLink className={options.className} to={item.url} activeStyle={{color: 'black', background: "white"}}>
                    <span className={options.iconClassName}/>
                    <span>{item.label}</span>
                </NavLink>
            );
        }
    },
    {
        label:'Order Management',
        icon:'pi pi-fw pi-wallet',
        className: styles.item,
        url: AdminRouter.paymentManagementPage,
        template: (item: any, options: any) => {
            return (
                <NavLink className={options.className} to={item.url} activeStyle={{color: 'black', background: "white"}}>
                    <span className={options.iconClassName}/>
                    <span>{item.label}</span>
                </NavLink>
            );
        }
    },
    {
        label:'User Management',
        icon:'pi pi-fw pi-user',
        className: styles.item
    }
];

const AdminSideBarComponent: React.FC<Props> = ({}) => {

    return (
        <div className={styles.adminSidebar}>
            <div className="card">
                <div className="p-d-flex p-ai-center p-jc-between p-p-3 ">
                    <Image src={AssetPath.logoPath} alt="Admin logo" width="100"  />
                    <div className={"p-text-bold p-text-center " + styles.headline}>Closure Gear Admin</div>
                </div>
                <PanelMenu model={items}/>
            </div>
        </div>
    );
}

export default AdminSideBarComponent;
