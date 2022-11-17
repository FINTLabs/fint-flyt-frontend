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
                "helpText": "Tittel kan være en konkret tekststreng, eller en kombinasjon av flere metadatafelt. (Settes opp i henhold til skriveregler for type sak. (Se Noark))"
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
                "helpText": "Status til dokumentet. Eksempel: B, F"
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
                "helpText": "Eksempel: Avtaler, Innsynsbehandling, Følgebrev, Juridisk .."
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
                "helpText": "Angivelse av hvilken variant et dokument forekommer. - Produksjonsformat"
            }
        ]
    }
]