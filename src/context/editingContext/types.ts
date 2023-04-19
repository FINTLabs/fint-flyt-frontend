export type EditingContextState = {
    editCollectionAbsoluteKey: string;
    setEditCollectionAbsoluteKey: (absoluteKey: string) => void
}

export const contextDefaultValues: EditingContextState = {
    editCollectionAbsoluteKey: "",
    setEditCollectionAbsoluteKey: () => {
    }
};
