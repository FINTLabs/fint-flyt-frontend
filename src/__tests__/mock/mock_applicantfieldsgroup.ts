import {IFieldGroup} from "../../features/integration/types/InputField";

export const MOCK_APPLICANTFIELDGROUP: IFieldGroup[] = [
    {
        "header": "Avsender",
        "fields": [
            {
                "input": "RADIO",
                "label": "Velg avsendertype",
                "value": {"source": "WATCH", "value":"applicantData.type"},
                "formValue": "applicantData.type",
                "options": "applicantOptions",
                "helpText": "Integrasjonslogikk",
            },
            {
                "input": "DROPZONE_TEXT_FIELD",
                "label": "Organisasjonsnummer",
                "value": {"source": "FORM", "value":"applicantData.organisationNumber"},
                "formValue": "applicantData.organisationNumber",
                "required": [
                    {"type": "VALIDATION", "value": "false"}
                ],
                "hidden": {"type": "NOT_FIELD", "key": "applicantData.type", "value": "ORGANISATION"},
                "error": "applicantData.organisationNumber",
                "searchOption": false,
                "helpText": "",
            },
            {
                "input": "DROPZONE_TEXT_FIELD",
                "label": "Navn",
                "value": {"source": "FORM", "value":"applicantData.nationalIdentityNumber"},
                "formValue": "applicantData.nationalIdentityNumber",
                "required": [
                    {"type": "VALIDATION", "value": "false"}
                ],
                "hidden": {"type": "FIELD", "key": "applicantData.type", "value": "ORGANISATION"},

                "error": "applicantData.nationalIdentityNumber",
                "searchOption": false,
                "helpText": "",
            },
            {
                "input": "DROPZONE_TEXT_FIELD",
                "label": "Navn",
                "value": {"source": "FORM", "value":"applicantData.name"},
                "formValue": "applicantData.name",
                "required": [
                    {"type": "VALIDATION", "value": "true"}
                ],
                "error": "applicantData.name",
                "searchOption": false,
                "helpText": "",
            },
            {
                "input": "DROPZONE_TEXT_FIELD",
                "label": "Adresse",
                "value": {"source": "FORM", "value":"applicantData.address"},
                "formValue": "applicantData.address",
                "required": [
                    {"type": "VALIDATION", "value": "false"}
                ],
                "error": "applicantData.address",
                "searchOption": false,
                "helpText": "",
            },
            {
                "input": "DROPZONE_TEXT_FIELD",
                "label": "Postnummer",
                "value": {"source": "FORM", "value":"applicantData.postalCode"},
                "formValue": "applicantData.postalCode",
                "required": [
                    {"type": "VALIDATION", "value": "false"}
                ],
                "error": "applicantData.postalCode",
                "searchOption": false,
                "helpText": "",
            },
            {
                "input": "DROPZONE_TEXT_FIELD",
                "label": "Poststed",
                "value": {"source": "FORM", "value":"applicantData.city"},
                "formValue": "applicantData.city",
                "required": [
                    {"type": "VALIDATION", "value": "false"}
                ],
                "error": "applicantData.city",
                "searchOption": false,
                "helpText": "",
            },
            {
                "input": "DROPZONE_TEXT_FIELD",
                "label": "Kontaktperson",
                "value": {"source": "FORM", "value":"applicantData.contactPerson"},
                "formValue": "applicantData.contactPerson",
                "required": [
                    {"type": "VALIDATION", "value": "false"}
                ],
                "hidden": {"type": "NOT_FIELD", "key": "applicantData.type", "value": "ORGANISATION"},
                "error": "applicantData.contactPerson",
                "searchOption": false,
                "helpText": "",
            },
            {
                "input": "DROPZONE_TEXT_FIELD",
                "label": "Telefonnummer",
                "value": {"source": "FORM", "value":"applicantData.phoneNumber"},
                "formValue": "applicantData.phoneNumber",
                "required": [
                    {"type": "VALIDATION", "value": "false"}
                ],
                "error": "applicantData.phoneNumber",
                "searchOption": false,
                "helpText": "",
            },
            {
                "input": "DROPZONE_TEXT_FIELD",
                "label": "Epost",
                "value": {"source": "FORM", "value":"applicantData.email"},
                "formValue": "applicantData.email",
                "required": [
                    {"type": "VALIDATION", "value": "false"}
                ],
                "error": "applicantData.email",
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
                "value": {"source": "WATCH", "value":"applicantData.paragraph"},
                "formValue": "applicantData.paragraph",
                "options": "paragraphs",
                "required": [
                    {"type": "null", "value": "false"}
                ],
                "error": "applicantData.paragraph",
                "searchOption": false,
                "helpText": "",
            }
        ]
    }
]