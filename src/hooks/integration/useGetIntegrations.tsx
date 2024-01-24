import { useQuery } from "@tanstack/react-query";
import axios from "axios";
export const useGetAllIntegrations = () => {
	const {
		data: alleintegrasjoner,
		error,
		isFetched,
	} = useQuery({
		queryKey: ["alleintegrasjoner"],
		queryFn: async () => {
			return await axios.get("/api/intern/integrasjoner");
		},
	});
	return { alleintegrasjoner, isFetched, error };
};

export const useGetIntegrations = (
	page: number,
	size: number | null,
	sortProperty: string,
	sortDirection: string
) => {
	const {
		data: integrasjoner,
		error,
		isFetched,
	} = useQuery({
		queryKey: ["integrasjoner"],
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

	return { integrasjoner, isFetched, error };
};
