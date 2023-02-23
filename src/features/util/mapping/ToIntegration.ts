import {IFormIntegration} from "../../configuration/types/OldForm/FormData";
import {IIntegration} from "../../integration/types/Integration";

export function toIntegration(data: IFormIntegration, state: string): IIntegration {
    return {
        sourceApplicationId: data.sourceApplicationId,
        sourceApplicationIntegrationId: data.sourceApplicationIntegrationId,
        destination: data.destination,
        state: state
    }
}
