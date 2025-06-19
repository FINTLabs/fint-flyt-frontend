import {ISelect} from "../types/Select";
import {IAlertContent} from "../types/AlertContent";

export const defaultAlert: IAlertContent = {severity: "info", message: ""};
export const savedAlert: IAlertContent = {
    severity: "info",
    message: "Konfigurasjon lagret",
};
export const errorAlert: IAlertContent = {
    severity: "error",
    message: "Feil eller manglende felter",
};
export const completedAlert: IAlertContent = {
    severity: "success",
    message: "Konfigurasjon ferdigstilt",
};
export const activeAlert: IAlertContent = {
    severity: "success",
    message: "Konfigurasjon aktivert",
};

export function getSelectableDefaultByLanguage(lang: string): string {
    if (lang === "no") {
        return "Velg kildeapplikasjon";
    } else if (lang === "en") {
        return "Select source application";
    } else {
        return "Velg kjeldeapplikasjon";
    }
}

export const fromTypeIds: ISelect[] = [
    {label: "Mediatype", value: "mediatype"},
    {label: "Tekst", value: "text"},
];

export const toTypeIds: ISelect[] = [
    {label: "Filformat", value: "filformat"},
    {label: "Tekst", value: "text"},
];

export const destinations: ISelect[] = [
    {label: "Arkivsystem", value: "fylkesrad"},
];

export function selectableDestinations(lang: string): ISelect[] {
    return [
        {
            label: lang === "en" ? "- Select destination" : "- Velg destinasjon",
            value: "",
        },
        {label: "Arkivsystem", value: "fylkesrad"},
    ];
}