import axios from "axios";
import {
	IIntegration,
	IIntegrationPatch,
} from "../features/integration/types/Integration";
import {Page} from "../components/types/TableTypes";

const getAllIntegrations = () => {
	return axios.get("/api/intern/integrasjoner");
};

const getIntegrations = (
	page: number,
	size: number | null,
	sortProperty: string,
	sortDirection: string
) => {
	return axios.get<Page<IIntegration>>("/api/intern/integrasjoner", {
		params: {
			side: page,
			antall: size,
			sorteringFelt: sortProperty,
			sorteringRetning: sortDirection,
		},
	});
};

const getIntegration = (integrationId: string) => {
	return axios.get(`/api/intern/integrasjoner/${integrationId}`);
};
const createIntegration = (data: IIntegration) => {
	return axios.post("/api/intern/integrasjoner", data);
};
const updateIntegration = (integrationId: string, data: IIntegrationPatch) => {
	return axios.patch(`/api/intern/integrasjoner/${integrationId}`, data);
};

const IntegrationRepository = {
	getIntegration,
	createIntegration,
	getIntegrations,
	updateIntegration,
	getAllIntegrations,
};

export default IntegrationRepository;
