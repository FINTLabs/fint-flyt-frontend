export type SessionContextState = {
    expired: boolean;
    expires: string
}

export const contextDefaultValues: SessionContextState = {
    expires: '',
    expired: false
};
