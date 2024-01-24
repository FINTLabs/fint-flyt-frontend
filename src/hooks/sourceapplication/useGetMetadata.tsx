import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetMetadata = (id: number, onlyLastestVersion: boolean) => {
	const {
		data: allMetadata,
		error,
		isFetched,
	} = useQuery({
		queryKey: ["allmetadata"],
		queryFn: async () => {
			return (
				await axios.get("/api/intern/metadata"),
				{
					params: {
						kildeapplikasjonId: id,
						bareSisteVersjoner: onlyLastestVersion,
					},
				}
			);
		},
	});
	return { allMetadata, isFetched, error };
};
