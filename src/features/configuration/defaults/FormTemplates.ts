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
            "type": SelectableValueType.SEARCH_SELECT,
            "selectablesSources": [
                {
                    "urlTemplate": "api/intern/arkiv/kodeverk/klassifikasjonssystem.mappingString"
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
            "type": SelectableValueType.DYNAMIC_STRING_OR_SEARCH_SELECT,
            "selectablesSources": [
                {
                    "urlTemplate": "api/intern/arkiv/kodeverk/klasse",
                    "valueRefPerRequestParamKey": {
                        "klassifikasjonssystemLink": "klassifikasjonssystem.mappingString"
                    }
                },
                {
                    "urlTemplate": "api/intern/arkiv/{a}/saksmappetype",
                    "valueRefPerPathParamKey": {
                        "a": "tittel.mappingString"
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
