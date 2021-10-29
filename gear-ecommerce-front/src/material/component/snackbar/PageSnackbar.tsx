import { Snackbar } from '@mui/material';
import React from 'react';

interface Props {
    open: boolean,
    onClose?: any,
    autoHideDuration?: number,
    style?: any,
    anchorOrigin?: any,
    content: any,
}

const PageSnackbar: React.FC<Props> = ({open, onClose, autoHideDuration, style, anchorOrigin, content}) => {

    return (
        <Snackbar
            open={open}
            onClose={onClose}
            autoHideDuration={autoHideDuration || 2000}
            style={style || {top: "50%"}}
            anchorOrigin={anchorOrigin || {
                vertical: "top",
                horizontal: "center"
            }}>
            {content}
        </Snackbar>
    );
};

export default PageSnackbar;
