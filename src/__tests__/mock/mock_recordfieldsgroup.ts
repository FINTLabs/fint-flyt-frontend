import {IFieldGroup} from "../../features/integration/types/InputField";

export const MOCK_RECORDFIELDSGROUP: IFieldGroup[] = [
    {
        "fields": [
            {
                "input": "DROPZONE_TEXT_FIELD",
                "label": "Tittel",
                "value": {"source": "FORM", "value":"recordData.title"},
                "formValue": "recordData.title",
                "required": [
                    {"type": "VALIDATION", "value": "true"}
                ],
                "error": "recordData.title",
                "helpText": "Tittel kan være en konkret tekststreng, eller en kombinasjon av flere metadatafelt. (Settes opp i henhold til skriveregler for type sak. (Se Noark))"
            },
            {
                "input": "DROPZONE_TEXT_FIELD",
                "label": "Offentlig tittel",
                "value": {"source": "FORM", "value":"recordData.publicTitle"},
                "formValue": "recordData.publicTitle",
                "required": [
                    {"type": "VALIDATION", "value": "false"}
                ],
                "error": "recordData.publicTitle",
                "helpText": "Offentlig tittel, ord som skal skjermes er fjernet fra innholdet i tittelen (erstattet med ******)"
            },
            {
                "input": "AUTOCOMPLETE",
                "label": "Journalposttype",
                "value": {"source": "WATCH", "value":"recordData.recordType"},
                "formValue": "recordData.recordType",
                "options": "recordTypes",
                "required": [
                    {"type": "VALIDATION", "value": "false"}
                ],
                "error": "recordData.recordType",
                "helpText": "Navn på type journalpost.",
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
                "helpText": "Navn på avdeling, kontor eller annen administrativ enhet som har ansvaret for saksbehandlingen."
            },
            {
                "input": "AUTOCOMPLETE",
                "label": "Saksbehandler",
                "value": {"source": "WATCH", "value":"recordData.caseWorker"},
                "formValue": "recordData.caseWorker",
                "options": "archiveResources",
                "required": [
                    {"type": "VALIDATION", "value": "false"}
                ],
                "error": "recordData.caseWorker",
                "helpText": "Navn på person som er saksbehandler. En sak kan ha en ansvarlig saksbehandler men det kan være ulike saksbehandlere på ulike journalposter.",
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
                "helpText": "Status til journalposten, dvs. om dokumentet er registrert, under behandling eller endelig arkivert.",
            },
            {
                "input": "AUTOCOMPLETE",
                "label": "Tilgangskode",
                "value": {"source": "WATCH", "value":"recordData.accessCode"},
                "formValue": "recordData.accessCode",
                "options": "accessCodes",
                "required": [
                    {"type": "VALIDATION", "value": "false"}
                ],
                "error": "recordData.accessCode",
                "helpText": "Angivelse av at dokumentene som tilhører arkivenheten ikke er offentligtilgjengelig i henhold til offentlighetsloven eller av en annen grunn. "
            },
            {
                "input": "AUTOCOMPLETE",
                "label": "Skjermingshjemmel",
                "value": {"source": "WATCH", "value":"recordData.paragraph"},
                "formValue": "recordData.paragraph",
                "options": "paragraphs",
                "required": [
                    {"type": "VALIDATION", "value": "false"}
                ],
                "error": "recordData.paragraph",
                "helpText": "Henvisning til hjemmel (paragraf) i offentlighetsloven, sikkerhetsloven eller beskyttelsesinstruksen."
            }
        ]
    }
]