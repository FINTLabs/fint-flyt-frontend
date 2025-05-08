export interface IEvent {
    id?: string;
    name: string;
    timestamp: Date | string;
    type: string;
    status: string;
    errors: IError[];
    applicationId?: string;
    displayName?: string;
    instanceFlowHeaders: IInstanceFlowHeadersEmbeddable;
}

export interface IInstanceFlowHeadersEmbeddable {
    orgId: string;
    service: string;
    archiveInstanceId: string;
    sourceApplicationId: string;
    sourceApplicationIntegrationId: string;
    sourceApplicationInstanceId: string;
    correlationId: string;
    instanceId: string;
    configurationId: string;
    caseId: string;
    dispatchId: string;
}

export interface IError {
    id?: string;
    errorCode: string;
    args: Record<string, string>;
}

export interface IErrorArg {
    type: string;
    value: string;
}

// export interface IEvent {
//     sourceApplicationId: number;
//     sourceApplicationIntegrationId: string;
//     sourceApplicationInstanceId: string;
//     integrationId: number;
//     latestUpdate: string; // ISO timestamp
//     status: string;
//     intermediateStorageStatus: string;
//     destinationId?: string | null;
// }

export interface IPageable {
    sort: ISort;
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
}

export interface ISort {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}

// export interface IEventResponse {
//     content: IEvent[];
//     pageable: IPageable;
//     size: number;
//     number: number;
//     sort: ISort;
//     numberOfElements: number;
//     first: boolean;
//     last: boolean;
//     empty: boolean;
// }
/// NEW

export interface ISummary {
    sourceApplicationId: number;
    sourceApplicationIntegrationId: string;
    sourceApplicationInstanceId: string;
    integrationId: number;
    latestUpdate: string;
    status: string;
    intermediateStorageStatus: string;
    destinationInstanceIds: string;
    displayName?: string;
    // errors: IError[];
}

export interface IEventNew {
    sourceApplicationId: number;
    sourceApplicationIntegrationId: string;
    sourceApplicationInstanceId: string;
    integrationId: number;
    latestUpdate: string; // ISO timestamp
    status: string;
    intermediateStorageStatus: string;
    destinationId?: string | null;
    displayName?: string;
    destinationInstanceIds?: string;
    latestInstanceId?: string;
}

export interface IInstanceFlowTrackingResponse {
    content: IInstanceFlowTracking[];
    pageable: IPageable;
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    number: number;
    sort: ISort;
    numberOfElements: number;
    first: boolean;
    empty: boolean;
}

export interface IInstanceFlowTracking {
    instanceFlowHeaders: IInstanceFlowHeaders;
    category: string;
    timestamp: string;
    type: string;
    applicationId: string;
    errors: any[];
}

export interface IInstanceFlowHeaders {
    sourceApplicationId: number;
    sourceApplicationIntegrationId: string;
    sourceApplicationInstanceId: string;
    fileIds: string[];
    correlationId: string;
    integrationId: number;
    instanceId?: number | null;
    configurationId?: number | null;
    archiveInstanceId?: string | null;
}

export interface IPageableNew {
    sort: ISort;
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
}

export interface ISortNew {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}

export interface ITotalStatistics {
    total: number;
    inProgress: number;
    transferred: number;
    aborted: number;
    failed: number;
}

export interface IIntegrationDetailedStatistics {
    integrationId: string;
    total: number;
    inProgress: number;
    transferred: number;
    aborted: number;
    failed: number;
}

export interface IIntegrationDetailedStatisticsResponse {
    content: IIntegrationDetailedStatistics[];
}
