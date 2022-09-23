import {IConfigurationElement} from "../../features/integration/types/Configuration";

export const MOCK_CASE_FIELDS: IConfigurationElement[] = [
    {
        "fieldConfigurations": [
            {
                "key": "tittel",
                "type": "DYNAMIC_STRING",
                "value": "Title of case"
            },
            {
                "key": "offentligTittel",
                "type": "DYNAMIC_STRING",
                "value": "public title $iem{test}"
            },
            {
                "key": "saksmappetype",
                "type": "STRING",
                "value": "casetype"

            },
            {
                "key": "administrativenhet",
                "type": "STRING",
                "value": "unit4"

            },
            {
                "key": "arkivdel",
                "type": "STRING",
                "value": "unit3"

            },
            {
                "key": "journalenhet",
                "type": "STRING",
                "value": "unit0"

            },
            {
                "key": "status",
                "type": "STRING",
                "value": ""

            },
            {
                "key": "tilgangsrestriksjon",
                "type": "STRING",
                "value": "code42"
            },
            {
                "key": "skjermingshjemmel",
                "type": "STRING",
                "value": "number6"

            },
            {
                "key": "saksansvarlig",
                "type": "STRING",
                "value": "rand"

            },
            {
                "key": "primarordningsprinsipp",
                "type": "STRING",
                "value": "prim"
            },
            {
                "key": "sekundarordningsprinsipp",
                "type": "STRING",
                "value": "rose"
            },
            {
                "key": "tertiarordningsprinsipp",
                "type": "STRING",

                "value": "everdeen"
            },
            {
                "key": "primarklasse",
                "type": "DYNAMIC_STRING",
                "value": "1class"

            },
            {
                "key": "sekundarklasse",
                "type": "DYNAMIC_STRING",
                "value": "2class"

            },
            {
                "key": "tertiarklasse",
                "type": "DYNAMIC_STRING",
                "value": "3class"

            },
            {
                "key": "primartittel",
                "type": "DYNAMIC_STRING",
                "value": "primTitle"
            },
            {
                "key": "sekundartittel",
                "type": "DYNAMIC_STRING",
                "value": "secTitle"
            },
            {
                "key": "tertiartittel",
                "type": "DYNAMIC_STRING",
                "value": "tertTitle"
            }
        ],
        "key": "case"
    }
]
