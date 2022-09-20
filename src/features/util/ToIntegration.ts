import {IFormIntegration} from "../integration/types/Form/FormData";
import {IIntegration} from "../integration/types/Integration";

export function toIntegration(data: IFormIntegration, sourceApplicationIntegrationId?: string, active?: boolean, integrationId?: string): IIntegration {
    return {
        integrationId: integrationId,
        sourceApplicationId: data.sourceApplicationId,
        sourceApplicationIntegrationId: data.sourceApplicationIntegrationId,
        destination: data.destination,
        active: active
    }
}
