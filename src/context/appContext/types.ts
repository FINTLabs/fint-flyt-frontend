export type AppContextState = {
    connectionError: boolean,
    setConnectionError: (error: boolean) => void,
};

export const contextDefaultValues: AppContextState = {
    connectionError: false,
    setConnectionError: () => {}
};