import React from 'react';
import {ProgressSpinner} from "primereact/progressspinner";

interface Props {
}

const PageSpinner: React.FC<Props> = () => {
    return (
        <div className={"p-d-flex p-jc-center p-ai-center p-page-spinner"}>
            <ProgressSpinner animationDuration="1s"/>
        </div>
    );
};

export default PageSpinner;
