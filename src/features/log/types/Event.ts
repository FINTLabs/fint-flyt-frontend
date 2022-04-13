
export interface IEvent {
    id: string;
    name: string;
    timeStamp: Date;
    type: string;
    errors: IError[];
    skjemaEventHeaders: ISkjemaEventHeaders[];
}

export interface ISkjemaEventHeaders {
    orgId: string;
    service: string;
    sourceApplication: string;
    sourceApplicationIntegrationId: string;
    sourceApplicationInstanceId: string;
    correlationId: number;
    instanceId: number;
    configurationId: number;
    caseId: number;
    dispatchId: number;
}

export interface IError {
    id: string;
    errorCode: string;
    args: string[]
}
