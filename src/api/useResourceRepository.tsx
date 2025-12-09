import { ISelectable } from '../features/configuration/types/Selectable';
import { Source } from '../features/configuration/util/UrlUtils';
import { useContext } from 'react';
import {
    AdapterRequestConfigType,
    AdapterResponse,
    ApiAdapterContext,
} from '../context/ApiAdapterContext';
const API_URL = import.meta.env.RES_API || '';

export default function useResourceRepository() {
    const { get } = useContext(ApiAdapterContext);

    const getClasses = (link: string) => {
        return get(API_URL, `/api/intern/arkiv/kodeverk/klasse/`, {
            params: { klassifikasjonssystemLink: link },
        });
    };

    const getResource = (resource: string) => {
        return get(API_URL, `/api/intern/arkiv/kodeverk/${resource}`);
    };

    const getSelectables = (
        url: string,
        config?: AdapterRequestConfigType
    ): Promise<AdapterResponse<ISelectable[]>> => {
        return get<ISelectable[]>(API_URL, url, config);
    };

    const getSelectableKodeverkFormat = () => {
        return get<ISelectable[]>(API_URL, '/api/intern/arkiv/kodeverk/format');
    };

    const getSak = (caseYear: number | string, id: number | string) => {
        return get(API_URL, `/api/intern/arkiv/saker/${caseYear}/${id}/tittel`, {
            timeout: 10000,
        });
    };

    const search = (source: Source): Promise<{ value: string } | undefined> => {
        return get<{ value: string }>(API_URL, source.url, source.config)
            .then<{ value: string } | undefined>(
                (
                    response: AdapterResponse<{ value: string } | undefined>
                ): { value: string } | undefined => response.data
            )
            .catch((err) => {
                console.error(err);
                return undefined;
            });
    };

    return {
        getClasses,
        getSelectableKodeverkFormat,
        getResource,
        getSelectables,
        getSak,
        search,
    };
}
