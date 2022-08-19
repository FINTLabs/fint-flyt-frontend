
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
    arg0: string;
    arg1: string;
}
