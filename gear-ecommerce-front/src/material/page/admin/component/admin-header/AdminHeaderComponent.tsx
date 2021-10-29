import React from 'react';
import {Avatar} from "primereact/avatar";
import {AssetPath} from "../../../../../router";
import {Button} from "primereact/button";
import {Toolbar} from "primereact/toolbar";

const AdminHeaderComponent = () => {

    const leftContents = (
        <React.Fragment>
            <Avatar image={AssetPath.logoPath} size="large"  className="p-mr-3" />
            <div className="p-text-bold">Hoang Trung</div>
        </React.Fragment>
    );

    const rightContents = (
        <React.Fragment>
            <Button label="Log out" icon={"pi pi-sign-out"} className={"p-button-warning"}/>
        </React.Fragment>
    );

    return (
        <Toolbar left={leftContents} right={rightContents} className={"p-pr-3"}/>
    );
};

export default AdminHeaderComponent;
