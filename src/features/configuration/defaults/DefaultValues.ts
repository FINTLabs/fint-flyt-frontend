import {ISelect} from "../types/Select";
import {IAlertContent} from "../types/AlertContent";

export const defaultAlert: IAlertContent = {severity: 'info', message: ''}
export const savedAlert: IAlertContent = {severity: 'info', message: 'Konfigurasjon lagret'}
export const errorAlert: IAlertContent = {severity: 'error', message: 'Feil eller manglende felter'}
export const completedAlert: IAlertContent = {severity: 'success', message: 'Konfigurasjon ferdigstilt'}
export const activeAlert: IAlertContent = {severity: 'success', message: 'Konfigurasjon aktivert'}

export const variant = 'https://beta.felleskomponent.no/arkiv/kodeverk/variantformat/systemid/P'
export const format = 'https://beta.felleskomponent.no/arkiv/kodeverk/format/systemid/PDF'

export const sourceApplications: ISelect[] = [
    {label: "ACOS", value: "1"},
    {label: "eGrunnerverv", value: "2"},
    {label: "Regionalforvaltning", value: "3"}
];
export const fromApplicationIds: ISelect[] = [
    {label: "ACOS", value: "1"},
    {label: "eGrunnerverv", value: "2"},
    {label: "Regionalforvaltning", value: "3"}
];

export const fromTypeIds: ISelect[] = [
    {label: "Mediatype", value: "mediatype"},
    {label: "Tekst", value: "text"}
];

export const toTypeIds: ISelect[] = [
    {label: "Filformat", value: "filformat"},
    {label: "Tekst", value: "text"}
];

export const destinations: ISelect[] = [
    {label: "Fylkesråd", value: "fylkesrad"}
];



