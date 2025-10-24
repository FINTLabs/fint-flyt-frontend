import apiAdapter from './apiAdapter';
import { Filters } from '../features/instances/filter/types';
import {
    IIntegrationDetailedStatistics,
    ITotalStatistics,
} from '../features/instances/types/Event';

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

    return apiAdapter.get('/api/intern/instance-flow-tracking/summaries', { params });
};

const getEventsByInstanceId = (
    rowCount: string,
    sortProperty: string,
    sourceApplicationIntegrationId: string,
    kildeapplikasjonId?: number,
    kildeapplikasjonInstansId?: string
) => {
    return apiAdapter.get(`/api/intern/instance-flow-tracking/events`, {
        params: {
            size: rowCount,
            sort: sortProperty,
            sourceApplicationId: kildeapplikasjonId,
            sourceApplicationInstanceId: kildeapplikasjonInstansId,
            sourceApplicationIntegrationId: sourceApplicationIntegrationId,
        },
    });
};

const manualDispatchEvent = (
    sourceApplicationInstanceId: string,
    sourceApplicationId: number,
    archiveInstanceId: string,
    sourceApplicationIntegrationId: string
) => {
    return apiAdapter.post(`/api/intern/instance-flow-tracking/events/instance-manually-processed`, {
        archiveInstanceId,
        sourceApplicationId,
        sourceApplicationInstanceId,
        sourceApplicationIntegrationId,
    });
};
const manualRejectEvent = (
    sourceApplicationInstanceId: string,
    sourceApplicationId: number,
    sourceApplicationIntegrationId: string
) => {
    return apiAdapter.post(`/api/intern/instance-flow-tracking/events/instance-manually-rejected`, {
        sourceApplicationId,
        sourceApplicationInstanceId,
        sourceApplicationIntegrationId,
    });
};

const manualTransferEvent = (
    sourceApplicationInstanceId: string,
    sourceApplicationId: number,
    sourceApplicationIntegrationId: string
) => {
    return apiAdapter.post(`/api/intern/instance-flow-tracking/events/instance-status-overridden-as-transferred`, {
        sourceApplicationId,
        sourceApplicationInstanceId,
        sourceApplicationIntegrationId,
    });
};

const getAllStatistics = () => {
    return apiAdapter.get<ITotalStatistics>('/api/intern/instance-flow-tracking/statistics/total');
};

const getStatistics = () => {
    // TODO: figure out the correct type of this response
    return apiAdapter.get<{content: IIntegrationDetailedStatistics[]}>(`/api/intern/instance-flow-tracking/statistics/integrations`);
};


// const getDetailedStatistics = () => {
//     return apiAdapter.get<IIntegrationDetailedStatisticsResponse>(
//         '/api/intern/instance-flow-tracking/statistics/integrations'
//     );
// };

const InstanceFlowTrackingRepository = {
    getLatestEvents: getLatestSummaries,
    getEventsByInstanceId,
    getAllStatistics,
    getStatistics,
    // getDetailedStatistics,
    manualRejectEvent,
    manualDispatchEvent,
    manualTransferEvent,
};

export default InstanceFlowTrackingRepository;
