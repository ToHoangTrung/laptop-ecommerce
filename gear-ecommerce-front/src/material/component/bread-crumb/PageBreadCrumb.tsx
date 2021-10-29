import React from 'react';
import './override.scss'
import {BreadCrumb} from "primereact/breadcrumb";

interface Props {

}

const PageBreadCrumb: React.FC<Props> = ({}) => {

    const items = [
        { label: 'Categories' },
        { label: 'Sports' },
        { label: 'Football' },
        { label: 'Countries' },
        { label: 'Spain' },
        { label: 'F.C. Barcelona' },
        { label: 'Squad' },
        { label: 'Lionel Messi', url: 'https://en.wikipedia.org/wiki/Lionel_Messi' }
    ];

    const home = { icon: 'pi pi-home', url: 'https://www.primefaces.org/primereact' }

    return (
        <div>
            <BreadCrumb model={items} home={home}/>
        </div>
    );
};

export default PageBreadCrumb;
