
export interface IEvent {
    id: string;
    orgId: string;
    sourceApplication: string;
    sourceApplicationIntegrationId: string;
    sourceApplicationInstanceId: string;
    instanceId: string;
    correlationId: string;
    timestamp: string;
    type: string;
    description: string;
    data: IData[];
    errors: IError[];
}

export interface IData {
    id: string;
    contentType: string;
    content: string;
}

export interface IError {
    id: string;
    errorCode: string;
    description: string;
    timestamp: string;
    args: string[]
}
