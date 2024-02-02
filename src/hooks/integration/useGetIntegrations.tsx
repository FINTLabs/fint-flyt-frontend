import { useQuery } from "@tanstack/react-query";
import axios from "axios";
export const useGetAllIntegrations = () => {
	const {
		data: allAvailableIntegrations,
		error,
		isFetched,
	} = useQuery({
		queryKey: ["allAvailableIntegrations"],
		queryFn: async () => {
			return await axios.get("/api/intern/integrasjoner");
		},
	});
	return { allAvailableIntegrations, isFetched, error };
};

export const useGetIntegrations = (
	page: number,
	size: number | null,
	sortProperty: string,
	sortDirection: string
) => {
	const {
		data: integrations,
		error,
		isFetched,
	} = useQuery({
		queryKey: ["integrations"],
		queryFn: async () => {
			return await axios.get("/api/intern/integrasjoner", {
				params: {
					side: page,
					antall: size,
					sorteringFelt: sortProperty,
					sorteringRetning: sortDirection,
				},
			});
		},
	});

	return { integrations, isFetched, error };
};
