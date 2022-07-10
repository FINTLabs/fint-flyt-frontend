import {ValueBuilder} from "./ValueBuilder";

export interface ICaseSearchParams {
    primaryClassification?: string;
    primaryClass?: string| ValueBuilder;
    primaryTitle?: string| ValueBuilder;
    secondaryClassification?: string
    secondaryClass?: string | ValueBuilder;
    secondaryTitle?: string | ValueBuilder;
    tertiaryClassification?: string;
    tertiaryClass?: string | ValueBuilder;
    tertiaryTitle?: string | ValueBuilder;
    archiveSection?: string;
    type?: string;
    accessCode?: string;
}
