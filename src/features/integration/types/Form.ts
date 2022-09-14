import {IInstanceElementMetadata} from "./FormMetadata";

export interface IForm {
    sourceApplicationIntegrationId: string;
    sourceApplicationIntegrationUri: string;
    instanceElementMetadata: IInstanceElementMetadata[]
}
