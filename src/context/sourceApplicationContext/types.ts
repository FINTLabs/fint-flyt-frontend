import {ISelect} from "../../features/integration/types/InputField";

export interface ISourceApplicationItem {
    sourceApplication: string;
    sourceApplicationForms: ISelect[];
}

export type SourceApplicationContextState = {
    allForms: ISourceApplicationItem;
    availableForms: ISourceApplicationItem;
    getAllForms: () => void;
    getForms: () => void;
};

export const contextDefaultValues: SourceApplicationContextState = {
    allForms: {sourceApplication: '', sourceApplicationForms: []},
    availableForms: {sourceApplication: '', sourceApplicationForms: []},
    getAllForms: () => {},
    getForms: () => {}
};
