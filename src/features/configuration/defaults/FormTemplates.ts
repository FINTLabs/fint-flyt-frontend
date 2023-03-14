import {
    ICollectionTemplate,
    IElementTemplate,
    IObjectTemplate,
    ISelectableValueTemplate,
    IValueTemplate,
    SelectableValueType,
    ValueType
} from "../types/FormTemplate";


export const testStringTemplates: IElementTemplate<IValueTemplate>[] = [
    {
        "order": 0,
        "elementConfig": {
            "key": "tittel",
            "displayName": "Tittel",
            "description": "Tittel"
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
            "description": "Offentlig tittel"
        },
        "template": {
            "type": ValueType.DYNAMIC_STRING
        }
    },
    {
        "order": 4,
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
            "description": "Klassifikasjonssystem, f.eks emnekode, tilgangskode"
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
            "description": "klasseid"
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
    "order": 5,
    "elementConfig": {
        "key": "journalpost",
        "displayName": "Journalpost",
        "description": ""
    },
    "template": {
        "valueTemplates": testStringTemplates,
        "objectTemplates": [{
            "order": 5,
            "elementConfig": {
                "key": "avsender",
                "displayName": "Avsender",
                "description": ""
            },
            "template": {
                "valueTemplates": testStringTemplates
            }
        }]
    }
}

export const testObjectCollectionTemplate: IElementTemplate<ICollectionTemplate<IObjectTemplate>> = {
    "order": 6,
    "elementConfig": {
        "key": "journalposter",
        "displayName": "Journalposter",
        "description": ""
    },
    template: {
        "elementTemplate": testObjectTemplateJournalpost.template
    }
}

export const testValueCollectionTemplate: IElementTemplate<ICollectionTemplate<IValueTemplate>> = {
    "order": 6,
    "elementConfig": {
        "key": "venner",
        "displayName": "Venner",
        "description": ""
    },
    template: {
        "elementTemplate": {
            "type": ValueType.DYNAMIC_STRING
        }
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
        "objectTemplates": [testObjectTemplateJournalpost],
        "objectCollectionTemplates": [testObjectCollectionTemplate],
        "valueCollectionTemplates": [testValueCollectionTemplate]
    }
}
