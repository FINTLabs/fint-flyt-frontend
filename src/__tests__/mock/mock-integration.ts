// noinspection DuplicatedCode

import {IIntegration} from "../../features/integration/types/Integration";

export const MOCK_INTEGRATION: IIntegration = {
    sourceApplicationId: "ACOS",
    destination: "fylkesrad",
    sourceApplicationIntegrationId: "TEST123",
    active: true
}

export const MOCK_INTEGRATION_NOT_ACTIVE: IIntegration  = {
    sourceApplicationId: "ACOS",
    destination: "fylkesrad",
    sourceApplicationIntegrationId: "TEST234",
    active: false

}

export const MOCK_INTEGRATION_ACTIVE: IIntegration  = {
    sourceApplicationId: "ACOS",
    destination: "fylkesrad",
    sourceApplicationIntegrationId: "TEST345",
    active: true,

}
