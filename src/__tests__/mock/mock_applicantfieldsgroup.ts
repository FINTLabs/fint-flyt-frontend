import {IFieldGroup} from "../../features/integration/types/InputField";

export const MOCK_APPLICANTFIELDGROUP: IFieldGroup[] = [
    {
        "fields": [
            {
                "input": "RADIO",
                "label": "Velg avsendertype",
                "value": {"source": "WATCH", "value":"applicantData.type"},
                "formValue": "applicantData.type",
                "options": "applicantOptions",
                "helpText": "Person eller organisasjon/bedrift",
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
                "helpText": "Orgnr for avsenderbedrift",
            },
            {
                "input": "DROPZONE_TEXT_FIELD",
                "label": "Fødselsnummer",
                "value": {"source": "FORM", "value":"applicantData.nationalIdentityNumber"},
                "formValue": "applicantData.nationalIdentityNumber",
                "required": [
                    {"type": "VALIDATION", "value": "false"}
                ],
                "hidden": {"type": "FIELD", "key": "applicantData.type", "value": "ORGANISATION"},

                "error": "applicantData.nationalIdentityNumber",
                "helpText": "Fødselsnummer for avsender",
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
                "helpText": "Navn på bedrift/org, eller person",
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
                "helpText": "Postadresse",
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
                "helpText": "Postkode",
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
                "helpText": "Poststed",
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
                "helpText": "Tittel eller navn på arkivenheten.",
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
                "helpText": "Telefonnummer",
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
                "helpText": "Epostadresse",
            },
            {
                "input": "CHECKBOX",
                "label": "Skjermet",
                "checked": {"source": "WATCH", "value":"applicantData.protected"},
                "formValue": "applicantData.protected",
                "required": [
                    {"type": "VALIDATION", "value": "false"}
                ],
                "error": "applicantData.protected",
                "helpText": "Skjerming av avsender krever tilgangskode og skjermingshjemmel"
            }
        ]
    }
    ,
    {
        "header": "Skjerming",
        "hidden": {"type": "BOOLEAN_FIELD", "key": "applicantData.protected", "value": "false"},
        "fields": [
            {
                "input": "AUTOCOMPLETE",
                "label": "Tilgangskode",
                "value": {"source": "WATCH", "value":"applicantData.accessCode"},
                "formValue": "applicantData.accessCode",
                "options": "accessCodes",
                "required": [
                    {"type": "BOOLEAN_FIELD", "key": "applicantData.protected", "value": "true"}
                ],
                "error": "applicantData.accessCode",
                "helpText": "Angivelse av at dokumentene som tilhører arkivenheten ikke er offentligtilgjengelig i henhold til offentlighetsloven eller av en annen grunn."
            },
            {
                "input": "AUTOCOMPLETE",
                "label": "Skjermingshjemmel",
                "value": {"source": "WATCH", "value":"applicantData.paragraph"},
                "formValue": "applicantData.paragraph",
                "options": "paragraphs",
                "required": [
                    {"type": "BOOLEAN_FIELD", "key": "applicantData.protected", "value": "true"}
                ],
                "error": "applicantData.paragraph",
                "helpText": "Henvisning til hjemmel (paragraf) i offentlighetsloven, sikkerhetsloven eller beskyttelsesinstruksen.",
            }
        ]
    }
]