import { ISelectable } from '../features/configuration/types/Selectable';
import { Source } from '../features/configuration/util/UrlUtils';
import { useContext } from 'react';
import {
    AdapterRequestConfigType,
    AdapterResponse,
    ApiAdapterContext,
} from '../context/ApiAdapterContext';

export default function useResourceRepository() {
    const { get } = useContext(ApiAdapterContext);

    const getClasses = (link: string) => {
        return get(`/api/intern/arkiv/kodeverk/klasse/`, {
            params: { klassifikasjonssystemLink: link },
        });
    };

    const getResource = (resource: string) => {
        return get(`/api/intern/arkiv/kodeverk/${resource}`);
    };

    const getSelectables = (
        url: string,
        config?: AdapterRequestConfigType
    ): Promise<AdapterResponse<ISelectable[]>> => {
        return get<ISelectable[]>(url, config);
    };

    const getSelectableKodeverkFormat = () => {
        return get<ISelectable[]>('/api/intern/arkiv/kodeverk/format');
    };

    const getSak = (caseYear: number | string, id: number | string) => {
        return get(`/api/intern/arkiv/saker/${caseYear}/${id}/tittel`, {
            timeout: 10000,
        });
    };

    const search = (source: Source): Promise<{ value: string } | undefined> => {
        return get<{ value: string }>('/' + source.url, source.config)
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
