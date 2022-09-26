export interface IIntegration {
    id?: any;
    sourceApplicationId?: string;
    sourceApplicationIntegrationId?: string;
    destination?: string;
    state?: string;
    activeConfigurationId?: string;
    dispatched?: number;
    errors?: number;
}

export const IntegrationState = {
    ACTIVE: "ACTIVE",
    DEACTIVATED: "DEACTIVATED"
}

