import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import i18next from "i18next";
import {I18nextProvider} from "react-i18next";
import en from './material/lang/en.json';
import vn from './material/lang/vn.json';
import {Provider} from "react-redux";
import store from "./store"
import 'primeflex/primeflex.css';
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import './override.scss'
import App from "./material/App";

export const MultilingualCode = {
    Language: "lan",
    English : "en",
    Vietnamese: "vn"
}

i18next.init({
    interpolation: { escapeValue: false },
    lng: MultilingualCode.Vietnamese,
    resources: {
        en: {
            common: en
        },
        vn: {
            common: vn
        },
    },
});

ReactDOM.render(
    <React.StrictMode>
        <I18nextProvider i18n={i18next}>
            <Provider store={store}>
                <App/>
            </Provider>
        </I18nextProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
serviceWorker.unregister();
