export interface IIntegration {
    integrationId?: string;
    sourceApplicationId?: string;
    sourceApplicationIntegrationId?: string;
    destination?: string;
    active?: boolean;
    activeConfigurationId?: string;
    dispatched?: number;
    errors?: number;
}
