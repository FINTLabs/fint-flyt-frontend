import {IField} from "../../features/integration/types/InputField";

export const MOCK_RECORDFIELDS: IField[] = [
    {
        "input": "DROPZONE_TEXT_FIELD",
        "label": "Tittel",
        "value": {"source": "FORM", "value":"recordData.title"},
        "formValue": "recordData.title",
        "required": [
            {"type": "VALIDATION", "value": "true"}
        ],
        "error": "recordData.title",
        "searchOption": false,
        "helpText": "",
    },
    {
        "input": "DROPZONE_TEXT_FIELD",
        "label": "Offentlig tittel",
        "value": {"source": "FORM", "value":"recordData.publicTitle"},
        "formValue": "recordData.publicTitle",
        "required": [
            {"type": "null", "value": "false"}
        ],
        "error": "recordData.publicTitle",
        "searchOption": false,
        "helpText": "",
    },
    {
        "input": "AUTOCOMPLETE",
        "label": "Journalposttype",
        "value": {"source": "WATCH", "value":"recordData.recordType"},
        "formValue": "recordData.recordType",
        "options": "recordTypes",
        "required": [
            {"type": "null", "value": "false"}
        ],
        "error": "recordData.recordType",
        "searchOption": false,
        "helpText": "",
    },
    {
        "input": "AUTOCOMPLETE",
        "label": "Administrativ enhet",
        "value": {"source": "WATCH", "value":"recordData.administrativeUnit"},
        "formValue": "recordData.administrativeUnit",
        "options": "administrativeUnits",
        "required": [
            {"type": "VALIDATION", "value": "true"}
        ],
        "error": "recordData.administrativeUnit",
        "searchOption": false,
        "helpText": "",
    },
    {
        "input": "AUTOCOMPLETE",
        "label": "Saksbehandler",
        "value": {"source": "WATCH", "value":"recordData.caseWorker"},
        "formValue": "recordData.caseWorker",
        "options": "archiveResources",
        "required": [
            {"type": "null", "value": "false"}
        ],
        "error": "recordData.caseWorker",
        "searchOption": false,
        "helpText": "",
    },
    {
        "input": "AUTOCOMPLETE",
        "label": "Status",
        "value": {"source": "WATCH", "value":"recordData.recordStatus"},
        "formValue": "recordData.recordStatus",
        "options": "recordStatuses",
        "required": [
            {"type": "VALIDATION", "value": "true"}
        ],
        "error": "recordData.recordStatus",
        "searchOption": false,
        "helpText": "",
    },
    {
        "input": "AUTOCOMPLETE",
        "label": "Tilgangskode",
        "value": {"source": "WATCH", "value":"recordData.accessCode"},
        "formValue": "recordData.accessCode",
        "options": "accessCodes",
        "required": [
            {"type": "null", "value": "false"}
        ],
        "error": "recordData.accessCode",
        "searchOption": false,
        "helpText": "",
    },
    {
        "input": "AUTOCOMPLETE",
        "label": "Skjermingshjemmel",
        "value": {"source": "WATCH", "value":"recordData.paragraph"},
        "formValue": "recordData.paragraph",
        "options": "paragraphs",
        "required": [
            {"type": "null", "value": "false"}
        ],
        "error": "recordData.paragraph",
        "searchOption": false,
        "helpText": "",
    },
]