import {IFieldGroup} from "../../features/integration/types/InputField";

export const MOCK_DOCUMENTFIELDGROUP: IFieldGroup[] = [
    {
        "header": "Dokumentbeskrivelse",
        "fields": [
            {
                "input": "DROPZONE_TEXT_FIELD",
                "label": "Tittel",
                "value": {"source": "FORM", "value":"documentData.title"},
                "formValue": "documentData.title",
                "required": [
                    {"type": "null", "value": "false"}
                ],
                "error": "documentData.title",
                "searchOption": false,
                "helpText": "dokumenttittel hei hei",
            },
            {
                "input": "AUTOCOMPLETE",
                "label": "Dokumentstatus",
                "value": {"source": "WATCH", "value":"documentData.documentStatus"},
                "formValue": "documentData.documentStatus",
                "options": "documentStatuses",
                "required": [
                    {"type": "VALIDATION", "value": "true"}
                ],
                "error": "documentData.documentStatus",
                "searchOption": false,
                "helpText": "Dokumentstatus hei hei",
            },
            {
                "input": "AUTOCOMPLETE",
                "label": "Dokumenttype",
                "value": {"source": "WATCH", "value":"documentData.documentType"},
                "formValue": "documentData.documentType",
                "options": "documentTypes",
                "required": [
                    {"type": "VALIDATION", "value": "true"}
                ],
                "error": "documentData.documentType",
                "searchOption": false,
                "helpText": "dokumenttype hei hei",
            }
        ]
    },
    {
        "header": "Objektbeskrivelse",
        "fields": [
            {
                "input": "AUTOCOMPLETE",
                "label": "Variant",
                "value": {"source": "WATCH", "value":"documentData.variant"},
                "formValue": "documentData.variant",
                "options": "variants",
                "required": [
                    {"type": "VALIDATION", "value": "true"}
                ],
                "error": "documentData.variant",
                "searchOption": false,
                "helpText": "variant hei hei",
            }
        ]
    }

]