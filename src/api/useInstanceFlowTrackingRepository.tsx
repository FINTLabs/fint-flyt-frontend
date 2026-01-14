import { Filters } from '../features/instances/filter/types';
import { useContext } from 'react';
import { ApiAdapterContext } from '../context/ApiAdapterContext';
import {
    IInstanceFlowTrackingResponse,
    IIntegrationDetailedStatistics,
    ISummary,
    ITotalStatistics,
} from '../features/instances/types/Event';
import { Page } from '../components/types/TableTypes';
const API_URL = import.meta.env.VITE_API_HISTORY || '';

export default function useInstanceFlowTrackingRepository() {
    const { get, post } = useContext(ApiAdapterContext);

    const getLatestSummaries = (size: number, filters?: Filters) => {
        const params: Record<string, string | string[] | boolean | number> = {
            size: size,
        };

        if (filters) {
            Object.entries(filters).forEach(([key, value]) => {
                if (Array.isArray(value) && value.length > 0) {
                    params[key] = value;
                } else if (value) {
                    // Map specific keys to the expected API format
                    switch (key) {
                        case 'timeCurrentPeriod':
                            params['time.currentPeriod'] = value;
                            break;
                        case 'timeOffSetHours':
                            params['time.offset.hours'] = value;
                            break;
                        case 'timeOffsetMinutes':
                            params['time.offset.minutes'] = value;
                            break;
                        case 'timeTimestampMin':
                            params['time.manual.min'] = value;
                            break;
                        case 'timeTimestampMax':
                            params['time.manual.max'] = value;
                            break;
                        default:
                            params[key] = value;
                            break;
                    }
                }
            });
        }

        return get<ISummary[]>(API_URL, '/api/intern/instance-flow-tracking/summaries', {
            params,
        });
    };

    const getEventsByInstanceId = (
        rowCount: string,
        sortProperty: string,
        sourceApplicationIntegrationId: string,
        kildeapplikasjonId?: number,
        kildeapplikasjonInstansId?: string
    ) => {
        return get<IInstanceFlowTrackingResponse>(
            API_URL,
            `/api/intern/instance-flow-tracking/events`,
            {
                params: {
                    size: rowCount,
                    sort: sortProperty,
                    sourceApplicationId: kildeapplikasjonId,
                    sourceApplicationInstanceId: kildeapplikasjonInstansId,
                    sourceApplicationIntegrationId: sourceApplicationIntegrationId,
                },
            }
        );
    };

    const manualDispatchEvent = (
        sourceApplicationInstanceId: string,
        sourceApplicationId: number,
        archiveInstanceId: string,
        sourceApplicationIntegrationId: string
    ) => {
        return post(
            API_URL,
            `/api/intern/instance-flow-tracking/events/instance-manually-processed`,
            {
                archiveInstanceId,
                sourceApplicationId,
                sourceApplicationInstanceId,
                sourceApplicationIntegrationId,
            }
        );
    };
    const manualRejectEvent = (
        sourceApplicationInstanceId: string,
        sourceApplicationId: number,
        sourceApplicationIntegrationId: string
    ) => {
        return post(
            API_URL,
            `/api/intern/instance-flow-tracking/events/instance-manually-rejected`,
            {
                sourceApplicationId,
                sourceApplicationInstanceId,
                sourceApplicationIntegrationId,
            }
        );
    };

    const manualTransferEvent = (
        sourceApplicationInstanceId: string,
        sourceApplicationId: number,
        sourceApplicationIntegrationId: string
    ) => {
        return post(
            API_URL,
            `/api/intern/instance-flow-tracking/events/instance-status-overridden-as-transferred`,
            {
                sourceApplicationId,
                sourceApplicationInstanceId,
                sourceApplicationIntegrationId,
            }
        );
    };

    const getAllStatistics = () => {
        return get<ITotalStatistics>(
            API_URL,
            '/api/intern/instance-flow-tracking/statistics/total'
        );
    };

    const getStatistics = () => {
        return get<Page<IIntegrationDetailedStatistics>>(
            API_URL,
            `/api/intern/instance-flow-tracking/statistics/integrations`
        );
    };

    const getStatisticsForIntegrations = (integrationIds: string[]) => {
        return get<Page<IIntegrationDetailedStatistics>>(
            API_URL,
            `/api/intern/instance-flow-tracking/statistics/integrations?integrationIds=${integrationIds.join(',')}&size=${integrationIds.length}`
        );
    };

    return {
        getLatestEvents: getLatestSummaries,
        getEventsByInstanceId,
        manualDispatchEvent,
        manualRejectEvent,
        manualTransferEvent,
        getAllStatistics,
        getStatistics,
        getStatisticsForIntegrations,
    };
}
