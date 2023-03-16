export type ConfigurationContextState = {
    completed: boolean;
    setCompleted: (completed: boolean) => void,
}

export const contextDefaultValues: ConfigurationContextState = {
    completed: false,
    setCompleted: () => {
    }
};
