export type ConfigurationContextState = {
    completed: boolean;
    setCompleted: (completed: boolean) => void,
    active: boolean;
    setActive: (completed: boolean) => void,
    editingCollection: string | undefined
    setEditingCollection: (collectionKey: string | undefined) => void;
}

export const contextDefaultValues: ConfigurationContextState = {
    completed: false,
    setCompleted: () => {
    },
    active: false,
    setActive: () => {
    },
    editingCollection: undefined,
    setEditingCollection: () => {
    }
};
