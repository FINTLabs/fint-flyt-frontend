import apiAdapter from "./apiAdapter";
import {
	IIntegration,
	IIntegrationPatch,
} from "../features/integration/types/Integration";
import {Page} from "../components/types/TableTypes";

const getAllIntegrations = () => {
	return apiAdapter.get("/api/intern/integrasjoner");
};

const getAllIntegrationBySourceApplicationId = (
	sourceApplicationId: string
): Promise<{ data: IIntegration[] }> => {
	return apiAdapter.get(`/api/intern/integrasjoner?sourceApplicationId=${sourceApplicationId}`);
};

const getIntegrations = (
	page: number,
	size: number | null,
	sortProperty: string,
	sortDirection: string
) => {
	return apiAdapter.get<Page<IIntegration>>("/api/intern/integrasjoner", {
		params: {
			side: page,
			antall: size,
			sorteringFelt: sortProperty,
			sorteringRetning: sortDirection,
		},
	});
};

const getIntegration = (integrationId: string) => {
	return apiAdapter.get(`/api/intern/integrasjoner/${integrationId}`);
};
const createIntegration = (data: IIntegration) => {
	return apiAdapter.post("/api/intern/integrasjoner", data);
};
const updateIntegration = (integrationId: string, data: IIntegrationPatch) => {
	return apiAdapter.patch<{activeConfigurationId: number}>(`/api/intern/integrasjoner/${integrationId}`, data);
};

const IntegrationRepository = {
	getIntegration,
	createIntegration,
	getIntegrations,
	updateIntegration,
	getAllIntegrations,
	getAllIntegrationBySourceApplicationId
};

export default IntegrationRepository;
