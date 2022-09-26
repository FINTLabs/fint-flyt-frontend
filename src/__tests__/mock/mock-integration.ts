// noinspection DuplicatedCode

import {IIntegration, IntegrationState} from "../../features/integration/types/Integration";

export const MOCK_INTEGRATION_NOT_ACTIVE: IIntegration  = {
    sourceApplicationId: "ACOS",
    destination: "fylkesrad",
    sourceApplicationIntegrationId: "TEST234",
    state: IntegrationState.DEACTIVATED
}

export const MOCK_INTEGRATION_ACTIVE: IIntegration  = {
    sourceApplicationId: "ACOS",
    destination: "fylkesrad",
    sourceApplicationIntegrationId: "TEST345",
    state: IntegrationState.ACTIVE,

}
