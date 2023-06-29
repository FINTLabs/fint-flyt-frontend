export type ConfigurationContextState = {
    completed: boolean;
    setCompleted: (completed: boolean) => void,
    active: boolean;
    setActive: (completed: boolean) => void,
    resetConfigurationContext: () => void;
}

export const contextDefaultValues: ConfigurationContextState = {
    completed: false,
    setCompleted: () => undefined,
    resetConfigurationContext: () => undefined,
    active: false,
    setActive: () => undefined
};
