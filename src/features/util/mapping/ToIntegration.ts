import {IFormIntegration} from "../../integration/types/Form/FormData";
import {IIntegration} from "../../integration/types/Integration";

export function toIntegration(data: IFormIntegration, state?: string): IIntegration {
    return {
        sourceApplicationId: data.sourceApplicationId,
        sourceApplicationIntegrationId: data.sourceApplicationIntegrationId,
        destination: data.destination,
        state: state
    }
}
