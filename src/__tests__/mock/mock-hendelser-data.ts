import {IEvent} from "../../features/log/types/Event";

export const MOCK_HENDELSER: IEvent[] = [
    {
    "instanceFlowHeaders": {
        "orgId":"df5f5006-736e-47b0-9d58-2e3330fa7a87",
        "service":"service",
        "sourceApplication":"ACOS",
        "sourceApplicationIntegrationId":"VIK026",
        "sourceApplicationInstanceId":"42t63",
        "integrationId": "integration-id",
        "correlationId":"1",
        "instanceId":"null",
        "configurationId":"null",
        "caseId":"null",
        "dispatchId":"null"
    },
    "name":"incoming-instance",
    "timeStamp":new Date("2022-04-06T13:08:01.956374"),
    "type":"INFO",
    "errors":[]
},
    {
    "instanceFlowHeaders":{
        "orgId":"3dc51477-12ca-4cb7-a717-2b28b462a1cc",
        "service":"service",
        "sourceApplication":"ACOS",
        "sourceApplicationIntegrationId":"VIK036",
        "sourceApplicationInstanceId":"93875",
        "integrationId": "integration-id",
        "correlationId":"1",
        "instanceId":"1",
        "configurationId":"null",
        "caseId":"null",
        "dispatchId":"null"
    },
    "name":"new-instance",
    "timeStamp": new Date("2022-04-06T13:08:01.956935"),
    "type":"INFO",
    "errors":[]
},
    {
    "instanceFlowHeaders":{
        "orgId":"54bd03a6-0bf2-42da-97d8-ed7d749d8be0",
        "service":"service",
        "sourceApplication":"ACOS",
        "sourceApplicationIntegrationId":"VIK201",
        "sourceApplicationInstanceId":"34982",
        "integrationId": "integration-id",
        "correlationId":"1",
        "instanceId":"1",
        "configurationId":"1",
        "caseId":"null",
        "dispatchId":"null"
    },
    "name":"instance-to-case-mapping-error",
    "timeStamp":new Date("2022-04-06T13:08:01.95695"),
    "type":"ERROR",
    "errors":[{
        "errorCode":"0",
        "args":{
            "arg0":"manglende felt i skjema",
            "arg1":"'fornavn'"
        }
    }, {
        "errorCode":"1",
        "args":{
            "arg0":"feil i mapping mellom felt i instans og skjema. felt:",
            "arg1":"'administrativ enhet'"
        }
    }]
},
    {
        "instanceFlowHeaders":{
            "orgId":"3dc51477-12ca-4cb7-a717-2b28b462a1cc",
            "service":"service",
            "sourceApplication":"ACOS",
            "sourceApplicationIntegrationId":"VIK031",
            "sourceApplicationInstanceId":"1225",
            "integrationId": "integration-id",
            "correlationId":"1",
            "instanceId":"1",
            "configurationId":"null",
            "caseId":"null",
            "dispatchId":"null"
        },
        "name":"new-instance",
        "timeStamp": new Date("2022-05-06T13:08:01.956935"),
        "type":"INFO",
        "errors":[]
    },
]
