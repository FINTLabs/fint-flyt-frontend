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
    type: string,
    value: string
}