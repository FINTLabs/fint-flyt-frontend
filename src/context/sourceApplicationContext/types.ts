import {ISelect} from "../../features/integration/types/InputField";

export interface ISourceApplicationItem {
    sourceApplication: string;
    sourceApplicationForms: ISelect[];
}

export type SourceApplicationContextState = {
    allForms: ISourceApplicationItem;
    availableForms: ISourceApplicationItem;
    getAllForms: (forms: ISelect[]) => void;
    getAvailableForms: () => void;
    getMetadata: () => void;
};

export const contextDefaultValues: SourceApplicationContextState = {
    allForms: {sourceApplication: '', sourceApplicationForms: []},
    availableForms: {sourceApplication: '', sourceApplicationForms: []},
    getAllForms: () => {},
    getAvailableForms: () => {},
    getMetadata: () => {}
};
