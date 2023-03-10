import {
    IElementTemplate,
    IObjectTemplate,
    ISelectableValueTemplate,
    IValueTemplate,
    SelectableValueType,
    ValueType
} from "../types/NewForm/FormTemplate";


export const testStringTemplates: IElementTemplate<IValueTemplate>[] = [
    {
        "order": 0,
        "elementConfig": {
            "key": "tittel",
            "displayName": "Tittel",
            "description": ""
        },
        "template": {
            "type": ValueType.DYNAMIC_STRING
        }
    },
    {
        "order": 1,
        "elementConfig": {
            "key": "offentligTittel",
            "displayName": "Offentlig tittel",
            "description": ""
        },
        "template": {
            "type": ValueType.DYNAMIC_STRING
        }
    },
    {
        "order": 5,
        "elementConfig": {
            "key": "fil",
            "displayName": "Fil",
            "description": ""
        },
        "template": {
            "type": ValueType.FILE
        }
    }
]

export const testSelectTemplates: IElementTemplate<ISelectableValueTemplate>[] = [
    {
        "order": 2,
        "elementConfig": {
            "key": "klassifikasjonssystem",
            "displayName": "Klassifikasjonssystem",
            "description": ""
        },
        "template": {
            "type": SelectableValueType.DROPDOWN,
            "selectables": [
                {
                    displayName: "Statisk valg 1",
                    value: "value1"
                },
                {
                    displayName: "Statisk valg 2",
                    value: "value2"
                }
            ],
            "selectablesSources": [
                {
                    "urlTemplate": "api/intern/arkiv/kodeverk/klassifikasjonssystem"
                }
            ]
        }
    },
    {
        "order": 3,
        "elementConfig": {
            "key": "klasseId",
            "displayName": "KlasseID",
            "description": ""
        },
        "template": {
            "type": SelectableValueType.SEARCH_SELECT,
            "selectables": [
                {
                    displayName: "Statisk valg 1",
                    value: "value1"
                },
                {
                    displayName: "Statisk valg 2",
                    value: "value2"
                }
            ],
            "selectablesSources": [
                {
                    "urlTemplate": "api/intern/arkiv/kodeverk/klasse",
                    "valueRefPerRequestParamKey": {
                        "klassifikasjonssystemLink": "../klassifikasjonssystem.mappingString"
                    }
                },
                {
                    "urlTemplate": "api/intern/arkiv/{a}/saksmappetype",
                    "valueRefPerPathParamKey": {
                        "a": "../tittel.mappingString"
                    }
                }
            ]
        }
    }
]

export const testObjectTemplateJournalpost: IElementTemplate<IObjectTemplate> = {
    "order": 4,
    "elementConfig": {
        "key": "journalpost",
        "displayName": "Journalpost",
        "description": ""
    },
    "template": {
        "valueTemplates": testStringTemplates
    }
}

export const testObjectTemplateSak: IElementTemplate<IObjectTemplate> = {
    "order": 0,
    "elementConfig": {
        "key": "sak",
        "displayName": "Sak",
        "description": ""
    },
    "template": {
        "valueTemplates": testStringTemplates,
        "selectableValueTemplates": testSelectTemplates,
        "objectTemplates": [testObjectTemplateJournalpost]
    }
}
