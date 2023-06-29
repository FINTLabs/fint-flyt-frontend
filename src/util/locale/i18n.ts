import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import enUK from './en.json';
import noNB from './no.json';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            no: {
                translations: noNB
            },
            en: {
                translations: enUK
            }
        },
        fallbackLng: "no",
        debug: true,

        ns: ["translations"],
        defaultNS: "translations",

        keySeparator: '.',

        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
