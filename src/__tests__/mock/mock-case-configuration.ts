import {ICaseConfiguration} from "../../features/integration/types/IntegrationConfiguration";

export const MOCK_CASE_CONFIGURATION: ICaseConfiguration = {
    "caseCreationStrategy": "NEW",
        "fields": [
        {
            "field": "tittel",
            "valueBuildStrategy": 1,
            "valueBuilder": {
                "properties": [
                    {
                        "key": "tags",
                        "order": 0,
                        "source": "FORM"
                    }
                ],
                "value": "Title of case with %s"
            }
        },
        {
            "field": "offentligTittel",
            "valueBuildStrategy": 1,
            "valueBuilder": {
                "properties": [
                    {
                        "key": "two",
                        "order": 0,
                        "source": "FORM"
                    },
                    {
                        "key": "tags",
                        "order": 1,
                        "source": "FORM"
                    }
                ],
                "value": "public title also with %s %s"
            }
        },
        {
            "field": "caseType",
            "valueBuildStrategy": 0,
            "valueBuilder": {
                "value": "casetype"
            }
        },
        {
            "field": "administrativenhet",
            "valueBuildStrategy": 0,
            "valueBuilder": {
                "value": "unit4"
            }
        },
        {
            "field": "arkivdel",
            "valueBuildStrategy": 0,
            "valueBuilder": {
                "value": "unit3"
            }
        },
        {
            "field": "journalenhet",
            "valueBuildStrategy": 0,
            "valueBuilder": {
                "value": "unit0"
            }
        },
        {
            "field": "tilgangsrestriksjon",
            "valueBuildStrategy": 0,
            "valueBuilder": {
                "value": "code42"
            }
        },
        {
            "field": "skjermingshjemmel",
            "valueBuildStrategy": 0,
            "valueBuilder": {
                "value": "number6"
            }
        },
        {
            "field": "saksansvarlig",
            "valueBuildStrategy": 0,
            "valueBuilder": {
                "value": "rand"
            }
        },
        {
            "field": "primarordningsprinsipp",
            "valueBuildStrategy": 1,
            "valueBuilder": {
                "properties": [],
                "value": "prim"
            }
        },
        {
            "field": "sekundarordningsprinsipp",
            "valueBuildStrategy": 1,
            "valueBuilder": {
                "properties": [],
                "value": "rose"
            }
        },
        {
            "field": "primarklasse",
            "valueBuildStrategy": 0,
            "valueBuilder": {
                "value": "1class"
            }
        },
        {
            "field": "sekundarklasse",
            "valueBuildStrategy": 0,
            "valueBuilder": {
                "properties": [],
                "value": "2class"
            }
        }
    ]
}