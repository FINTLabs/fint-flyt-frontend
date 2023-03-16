export type ConfigurationContextState = {
    completed: boolean;
    setCompleted: (completed: boolean) => void,
    active: boolean;
    setActive: (completed: boolean) => void,
}

export const contextDefaultValues: ConfigurationContextState = {
    completed: false,
    setCompleted: () => {
    },
    active: false,
    setActive: () => {
    }
};
