
export interface IEvent {
    id: string;
    name: string;
    timeStamp: Date;
    type: string;
    errors: IError[];
    instanceFlowHeaders: IInstanceFlowHeadersEmbeddable[];
}

export interface IInstanceFlowHeadersEmbeddable {
    orgId: string;
    service: string;
    sourceApplication: string;
    sourceApplicationIntegrationId: string;
    sourceApplicationInstanceId: string;
    integrationId: string;
    correlationId: string;
    instanceId: string;
    configurationId: string;
    caseId: string;
    dispatchId: string;
}

export interface IError {
    id: string;
    errorCode: string;
    args: string[]
}
