export type ConfigurationContextState = {
    completed: boolean;
    setCompleted: (completed: boolean) => void,
    active: boolean;
    setActive: (completed: boolean) => void,
    editCollectionAbsoluteKey: string;
    setEditCollectionAbsoluteKey: (absoluteKey: string) => void
    resetConfigurationContext: () => void;
}

export const contextDefaultValues: ConfigurationContextState = {
    completed: false,
    setCompleted: () => {
    },
    resetConfigurationContext: () => {
    },
    active: false,
    setActive: () => {
    },
    editCollectionAbsoluteKey: "",
    setEditCollectionAbsoluteKey: () => {
    }
};
