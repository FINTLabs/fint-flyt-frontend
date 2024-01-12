import { useQuery } from "@tanstack/react-query";
import IntegrationRepository from "../api/IntegrationRepository"; // Adjust the path as needed

const useAllIntegrations = (
	page: number,
	size: number,
	sortProperty: string,
	sortDirection: string
) => {
	const {
		isError,
		isPending,
		data: allintegrations,
		error,
	} = useQuery({
		queryKey: ["allintegrations", page, size, sortProperty, sortDirection],
		queryFn: () => IntegrationRepository.getAllIntegrations(),
	});

	return { isError, isPending, allintegrations, error };
};

export default useAllIntegrations;
