import { useQuery } from "@tanstack/react-query";
import axios from "axios";
export const useGetAllIntegrations = () => {
	const {
		data: integrasjoner,
		error,
		isFetched,
	} = useQuery({
		queryKey: ["integrasjoner"],
		queryFn: async () => {
			return await axios.get("/api/intern/integrasjoner");
		},
	});
	return { integrasjoner, isFetched, error };
};
