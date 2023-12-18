import {IIntegration, IIntegrationFormData} from "../../features/integration/types/Integration";

export function toIntegration(data: IIntegrationFormData, state: string): IIntegration {
    return {
        sourceApplicationId: data.sourceApplicationId,
        sourceApplicationIntegrationId: data.sourceApplicationIntegrationId,
        destination: data.destination,
        state: state
    }
}
