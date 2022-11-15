import {IFieldGroup} from "../../features/integration/types/InputField";

export const MOCK_CASEFIELDGROUP: IFieldGroup[] = [
    {
        "fields": [
            {
                "input": "DROPZONE_TEXT_FIELD",
                "label": "Tittel",
                "value": {"source": "FORM", "value":"caseData.title"},
                "formValue": "caseData.title",
                "required": [
                    {"type": "VALIDATION", "value": "true"}
                ],
                "error": "caseData.title",
                "searchOption": false,
                "helpText": "",
            },
            {
                "input": "DROPZONE_TEXT_FIELD",
                "label": "Offentlig tittel",
                "value": {"source": "FORM", "value":"caseData.publicTitle"},
                "formValue": "caseData.publicTitle",
                "required": [
                    {"type": "null", "value": "false"}
                ],
                "error": "caseData.publicTitle",
                "searchOption": false,
                "helpText": "",
            },
            {
                "input": "AUTOCOMPLETE",
                "label": "Saksmappetype",
                "value": {"source": "WATCH", "value":"caseData.caseType"},
                "formValue": "caseData.caseType",
                "options": "caseTypes",
                "required": [
                    {"type": "VALIDATION", "value": "true"},
                    {"type": "NOT_FIELD", "key": "caseData.caseCreationStrategy", "value": "COLLECTION"}
                ],
                "error": "caseData.caseType",
                "searchOption": false,
                "helpText": "",
            },
            {
                "input": "AUTOCOMPLETE",
                "label": "Administrativ enhet",
                "value": {"source": "WATCH", "value":"caseData.administrativeUnit"},
                "formValue": "caseData.administrativeUnit",
                "options": "administrativeUnits",
                "required": [
                    {"type": "VALIDATION", "value": "true"},
                    {"type": "NOT_FIELD", "key": "caseData.caseCreationStrategy", "value": "COLLECTION"}
                ],
                "error": "caseData.administrativeUnit",
                "searchOption": false,
                "helpText": "",
            },
            {
                "input": "AUTOCOMPLETE",
                "label": "Ansvarlig saksbehandler",
                "value": {"source": "WATCH", "value":"caseData.caseWorker"},
                "formValue": "caseData.caseWorker",
                "options": "archiveResources",
                "required": [
                    {"type": "VALIDATION", "value": "true"},
                    {"type": "NOT_FIELD", "key": "caseData.caseCreationStrategy", "value": "COLLECTION"}
                ],
                "error": "caseData.caseWorker",
                "searchOption": false,
                "helpText": "",
            },
            {
                "input": "AUTOCOMPLETE",
                "label": "Arkivdel",
                "value": {"source": "WATCH", "value":"caseData.archiveUnit"},
                "formValue": "caseData.archiveUnit",
                "options": "archiveSections",
                "required": [
                    {"type": "VALIDATION", "value": "true"},
                    {"type": "NOT_FIELD", "key": "caseData.caseCreationStrategy", "value": "COLLECTION"}
                ],
                "error": "caseData.archiveUnit",
                "searchOption": false,
                "helpText": "",
            },
            {
                "input": "AUTOCOMPLETE",
                "label": "Journalenhet",
                "value": {"source": "WATCH", "value":"caseData.recordUnit"},
                "formValue": "caseData.recordUnit",
                "options": "administrativeUnits",
                "required": [
                    {"type": "VALIDATION", "value": "true"},
                    {"type": "NOT_FIELD", "key": "caseData.caseCreationStrategy", "value": "COLLECTION"}
                ],
                "error": "caseData.recordUnit",
                "searchOption": false,
                "helpText": "",
            },
            {
                "input": "AUTOCOMPLETE",
                "label": "Status",
                "value": {"source": "WATCH", "value":"caseData.status"},
                "formValue": "caseData.status",
                "options": "statuses",
                "required": [
                    {"type": "VALIDATION", "value": "true"},
                    {"type": "NOT_FIELD", "key": "caseData.caseCreationStrategy", "value": "COLLECTION"}
                ],
                "error": "caseData.status",
                "searchOption": false,
                "helpText": "",
            },
            {
                "input": "AUTOCOMPLETE",
                "label": "Tilgangskode",
                "value": {"source": "WATCH", "value":"caseData.accessCode"},
                "formValue": "caseData.accessCode",
                "options": "accessCodes",
                "required": [
                    {"type": "null", "value": "false"}
                ],
                "error": "caseData.accessCode",
                "searchOption": false,
                "helpText": "",
            },
            {
                "input": "AUTOCOMPLETE",
                "label": "Skjermingshjemmel",
                "value": {"source": "WATCH", "value":"caseData.paragraph"},
                "formValue": "caseData.paragraph",
                "options": "paragraphs",
                "required": [
                    {"type": "null", "value": "false"}
                ],
                "error": "caseData.paragraph",
                "searchOption": false,
                "helpText": "",
            }
        ]
    },
    {
        "header": "Klassering",
        "fields": [
            {
                "input": "AUTOCOMPLETE",
                "label": "Primærordningsprinsipp",
                "value": {"source": "WATCH", "value": "caseData.primaryClassification"},
                "formValue": "caseData.primaryClassification",
                "options": "classificationSystems",
                "required": [
                    {"type": "VALIDATION", "value": "true"},
                ],
                "error": "caseData.primaryClassification",
                "searchOption": false,
                "helpText": ""
            }
        ]
    }
]