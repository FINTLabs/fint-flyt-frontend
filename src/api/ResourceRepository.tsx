import apiAdapter from "./apiAdapter";
import { ISelectable } from "../features/configuration/types/Selectable";
import { Source } from "../features/configuration/util/UrlUtils";

const getClasses = (link: string) => {
	return apiAdapter.get(`/api/intern/arkiv/kodeverk/klasse/`, {
		params: { klassifikasjonssystemLink: link },
	});
};

const getResource = (resource: string) => {
	return apiAdapter.get(`/api/intern/arkiv/kodeverk/${resource}`);
};

const getSelectables = (
	url: string,
	config?: { params?: Record<string, any> }
): Promise<{ data: ISelectable[] }> => {
	return apiAdapter.get<ISelectable[]>(url, config);
};

const getSak = (caseYear: number | string, id: number | string) => {
	return apiAdapter.get(`/api/intern/arkiv/saker/${caseYear}/${id}/tittel`);
};

const search = (source: Source): Promise<{ value: string } | undefined> => {
	return apiAdapter
		.get<{ value: string }>("/" + source.url, source.config)
		.then<{ value: string } | undefined>(
			(
				response: { data: { value: string } | undefined }
			): { value: string } | undefined => response.data
		)
		.catch((err) => {
			console.error(err);
			return undefined;
		});
};

const ResourceRepository = {
	getClasses,
	getResource,
	getSelectables,
	getSak,
	search,
};

export default ResourceRepository;
