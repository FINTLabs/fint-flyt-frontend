export interface IIntegration {
    integrationId?: string;
    sourceApplicationId?: string;
    sourceApplicationIntegrationId?: string;
    destination?: string;
    state?: string;
    activeConfigurationId?: string;
    dispatched?: number;
    errors?: number;
}
