
export interface IEvent {
    id?: string;
    name: string;
    timeStamp: string | Date;
    type: string;
    errors: IError[];
    instanceFlowHeaders: IInstanceFlowHeadersEmbeddable;
}

export interface IInstanceFlowHeadersEmbeddable {
    orgId: string;
    service: string;
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
    mappingField?: string;
    instanceField?: string;
    configurationField?: string;
    status?: string;
}
