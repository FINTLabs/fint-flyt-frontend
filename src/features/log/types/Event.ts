
export interface IEvent {
    id?: string;
    name: string;
    timeStamp: string | Date;
    type: string;
    errors: IError[];
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
    args: errorArgs;
}

export interface errorArgs {
    instanceFieldKey?: string;
    fieldPath?: string;
    errorMessage?: string;
}
