import {IEvent} from "../../features/log/types/Event";

export const MOCK_HENDELSER: IEvent[] = [
    {
        "instanceFlowHeaders": {
            "orgId":"df5f5006-736e-47b0-9d58-2e3330fa7a87",
            "service":"service",
            "sourceApplication":"ACOS",
            "sourceApplicationIntegrationId":"VIK026",
            "sourceApplicationInstanceId":"234g",
            "integrationId": "integration-id",
            "correlationId":"1",
            "instanceId":"null",
            "configurationId":"null",
            "caseId":"null",
            "dispatchId":"null"
        },
        "name":"incoming-instance",
        "timeStamp": "2022-01-06T19:13:00.00",
        "type":"INFO",
        "errors":[]
    },
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
        "timeStamp": "2022-01-06T18:08:00.00",
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
        "timeStamp": "2022-01-03T06:08:01.956935",
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
        "timeStamp": "2022-03-06T11:08:01.95695",
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
        "timeStamp": "2022-05-04T12:08:01.956935",
        "type":"INFO",
        "errors":[]
    },
    {
        "instanceFlowHeaders": {
            "orgId":"feearrg-736e-47b0-9d58-gsera4532",
            "service":"service",
            "sourceApplication":"ACOS",
            "sourceApplicationIntegrationId":"VIK076",
            "sourceApplicationInstanceId":"42t63",
            "integrationId": "integration-id",
            "correlationId":"1",
            "instanceId":"null",
            "configurationId":"null",
            "caseId":"null",
            "dispatchId":"null"
        },
        "name":"incoming-instance",
        "timeStamp": "2022-01-06T19:08:00.00",
        "type":"INFO",
        "errors":[]
    },
    {
        "instanceFlowHeaders":{
            "orgId":"754gsdfrg-0bf2-42da-97d8-2347edfgd",
            "service":"service",
            "sourceApplication":"ACOS",
            "sourceApplicationIntegrationId":"VIK014",
            "sourceApplicationInstanceId":"34982",
            "integrationId": "integration-id",
            "correlationId":"1",
            "instanceId":"1",
            "configurationId":"1",
            "caseId":"null",
            "dispatchId":"null"
        },
        "name":"instance-to-case-mapping-error",
        "timeStamp": "2022-03-06T11:08:01.95695",
        "type":"ERROR",
        "errors":[{
            "errorCode":"0",
            "args":{
                "arg0":"manglende obligatorisk felt i skjema",
                "arg1":"'fødselsnummer'"
            }
        }]
    },
    {
        "instanceFlowHeaders":{
            "orgId":"feay55-df4y-42da-97d8-45246",
            "service":"service",
            "sourceApplication":"ACOS",
            "sourceApplicationIntegrationId":"VIK163",
            "sourceApplicationInstanceId":"2312",
            "integrationId": "integration-id",
            "correlationId":"1",
            "instanceId":"1",
            "configurationId":"1",
            "caseId":"null",
            "dispatchId":"null"
        },
        "name":"connection-error",
        "timeStamp": "2022-03-06T11:08:01.95695",
        "type":"ERROR",
        "errors":[{
            "errorCode":"0",
            "args":{
                "arg0":"mangler data fra",
                "arg1":"'Elements'"
            }
        }]
    },
    {
        "instanceFlowHeaders":{
            "orgId":"feay55-df4y-42da-97d8-65255",
            "service":"service",
            "sourceApplication":"ACOS",
            "sourceApplicationIntegrationId":"VIK94",
            "sourceApplicationInstanceId":"5426",
            "integrationId": "integration-id",
            "correlationId":"1",
            "instanceId":"1",
            "configurationId":"1",
            "caseId":"null",
            "dispatchId":"null"
        },
        "name":"missing-field-error",
        "timeStamp": "2022-06-08T17:03:01.95695",
        "type":"ERROR",
        "errors":[{
            "errorCode":"0",
            "args":{
                "arg0":"mangler obligatorisk felt",
                "arg1":"'organisasjonsnummer'"
            }
        }]
    },
    {
        "instanceFlowHeaders": {
            "orgId":"df5f5006-736e-47b0-9d58-seg234",
            "service":"service",
            "sourceApplication":"ACOS",
            "sourceApplicationIntegrationId":"VIK026",
            "sourceApplicationInstanceId":"234g",
            "integrationId": "integration-id",
            "correlationId":"1",
            "instanceId":"null",
            "configurationId":"null",
            "caseId":"null",
            "dispatchId":"null"
        },
        "name":"created-configuration",
        "timeStamp": "2022-01-01T19:13:00.00",
        "type":"INFO",
        "errors":[]
    },
]
