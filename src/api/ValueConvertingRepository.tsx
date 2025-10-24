import apiAdapter from "./apiAdapter";
import { IValueConverting } from "../features/valueConverting/types/ValueConverting";

const getValueConvertings = (
	page: number,
	size: number,
	sortProperty: string,
	sortDirection: string,
	excludeConvertingMap?: boolean
) => {
	return apiAdapter.get<{content: IValueConverting[]}>("/api/intern/value-convertings", {
		params: {
			page: page,
			size: size,
			sortProperty: sortProperty,
			sortDirection: sortDirection,
			excludeConvertingMap: excludeConvertingMap,
		},
	});
};

const getValueConverting = (valueConvertingId: number) => {
	return apiAdapter.get<IValueConverting>(`/api/intern/value-convertings/${valueConvertingId}`);
};

const createValueConverting = (data: IValueConverting) => {
	return apiAdapter.post<IValueConverting>("/api/intern/value-convertings", data);
};

const ValueConvertingRepository = {
	getValueConvertings,
	getValueConverting,
	createValueConverting,
};

export default ValueConvertingRepository;
