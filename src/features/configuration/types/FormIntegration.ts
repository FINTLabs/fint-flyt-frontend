export interface IFormIntegration {
    sourceApplicationId: string;
    sourceApplicationIntegrationId: string;
    destination: string;
    active?: boolean;
    activeConfigurationId?: string;
    displayName?: string;
}