import {ISelect} from "../../features/integration/types/InputField";

export interface ISourceApplicationItem {
    sourceApplication: string;
    sourceApplicationForms: ISelect[];
}

export type SourceApplicationContextState = {
    availableForms: ISourceApplicationItem;
    getAllForms: () => void;
    getForms: () => void;
};

export const contextDefaultValues: SourceApplicationContextState = {
    availableForms: {sourceApplication: '', sourceApplicationForms: []},
    getAllForms: () => {},
    getForms: () => {}
};
