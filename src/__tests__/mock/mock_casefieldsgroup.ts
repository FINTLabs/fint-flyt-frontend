import {IFieldGroup} from "../../features/integration/types/InputField";
import {classificationsWithDynamicField} from "../../features/integration/defaults/DefaultValues";

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
                "helpText":  "Tittel kan være en konkret tekststreng, eller en kombinasjon av flere metadatafelt. (Settes opp i henhold til skriveregler for type sak.  (Se Noark))",
            },
            {
                "input": "DROPZONE_TEXT_FIELD",
                "label": "Offentlig tittel",
                "value": {"source": "FORM", "value":"caseData.publicTitle"},
                "formValue": "caseData.publicTitle",
                "required": [
                    {"type": "VALIDATION", "value": "false"}
                ],
                "error": "caseData.publicTitle",
                "helpText": "Offentlig tittel på arkivenheten, ord som skal skjermes er fjernet fra innholdet i tittelen (erstattet med ******)"
            },
            {
                "input": "AUTOCOMPLETE",
                "label": "Saksmappetype",
                "value": {"source": "WATCH", "value":"caseData.caseType"},
                "formValue": "caseData.caseType",
                "options": "caseTypes",
                "required": [
                    {"type": "VALIDATION", "value": "true"},
                    {"type": "NOT_FIELD", "key": "caseData.caseCreationStrategy", "value": "BY_ID"}
                ],
                "error": "caseData.caseType",
                "helpText": "Type saksmappe. Eksempel: Kompetanse, personal, rekruttering etc."
            },
            {
                "input": "AUTOCOMPLETE",
                "label": "Administrativ enhet",
                "value": {"source": "WATCH", "value":"caseData.administrativeUnit"},
                "formValue": "caseData.administrativeUnit",
                "options": "administrativeUnits",
                "required": [
                    {"type": "VALIDATION", "value": "true"},
                    {"type": "NOT_FIELD", "key": "caseData.caseCreationStrategy", "value": "BY_ID"}
                ],
                "error": "caseData.administrativeUnit",
                "helpText": "Navn på avdeling, kontor eller annen administrativ enhet som har ansvaret for saksbehandlingen.",
            },
            {
                "input": "AUTOCOMPLETE",
                "label": "Ansvarlig saksbehandler",
                "value": {"source": "WATCH", "value":"caseData.caseWorker"},
                "formValue": "caseData.caseWorker",
                "options": "archiveResources",
                "required": [
                    {"type": "VALIDATION", "value": "true"},
                    {"type": "NOT_FIELD", "key": "caseData.caseCreationStrategy", "value": "BY_ID"}
                ],
                "error": "caseData.caseWorker",
                "helpText": "Navn på person som er saksansvarlig."
            },
            {
                "input": "AUTOCOMPLETE",
                "label": "Arkivdel",
                "value": {"source": "WATCH", "value":"caseData.archiveUnit"},
                "formValue": "caseData.archiveUnit",
                "options": "archiveSections",
                "required": [
                    {"type": "VALIDATION", "value": "true"},
                    {"type": "NOT_FIELD", "key": "caseData.caseCreationStrategy", "value": "BY_ID"}
                ],
                "error": "caseData.archiveUnit",
                "helpText": "Arkivdel som mappe tilhører. Eksempel: kompetanse, sakarkiv, personal",
            },
            {
                "input": "AUTOCOMPLETE",
                "label": "Journalenhet",
                "value": {"source": "WATCH", "value":"caseData.recordUnit"},
                "formValue": "caseData.recordUnit",
                "options": "administrativeUnits",
                "required": [
                    {"type": "VALIDATION", "value": "true"},
                    {"type": "NOT_FIELD", "key": "caseData.caseCreationStrategy", "value": "BY_ID"}
                ],
                "error": "caseData.recordUnit",
                "helpText": "Navn på enhet som har det arkivmessige ansvaret for kvalitetssikring av arkivdanningen, og eventuelt registrering (journalføring) og arkivering av fysiske dokumenter.",
            },
            {
                "input": "AUTOCOMPLETE",
                "label": "Status",
                "value": {"source": "WATCH", "value":"caseData.status"},
                "formValue": "caseData.status",
                "options": "statuses",
                "required": [
                    {"type": "VALIDATION", "value": "true"},
                    {"type": "NOT_FIELD", "key": "caseData.caseCreationStrategy", "value": "BY_ID"}
                ],
                "error": "caseData.status",
                "helpText": "Registreres automatisk gjennom forskjellig saksbehandlings- funksjonalitet, eller overstyres manuelt."   },
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
                "helpText": "Angivelse av at dokumentene som tilhører arkivenheten ikke er offentligtilgjengelig i henhold til offentlighetsloven eller av en annen grunn. "
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
                "helpText": "Henvisning til hjemmel (paragraf) i offentlighetsloven, sikkerhetsloven eller beskyttelsesinstruksen."
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
                "helpText": "Det må kunne settes flere klasseringer på en sak, slik at sjemaet kan lete fram riktig sak. Eksempel: Primærkode=K-koder 'Sekundærkode=organisasjonsnummer eller personnummer'"
            },
            {
                "input": "DROPZONE_TEXT_FIELD",
                "label": "Primærklasse",
                "value": {"source": "FORM", "value":"caseData.primaryClass"},
                "formValue": "caseData.primaryClass",
                "required": [
                    {"type": "VALIDATION", "value": "true"}
                ],
                "hidden": {"type": "FIELD_NOT_CONTAINS", "key": "caseData.primaryClassification", "value": classificationsWithDynamicField},
                "error": "caseData.primaryClass",
                "helpText": "Vi må kunne fylle ut verdi og betegnelse.Eksempel: K-kode: Verdi 003, Betegnelse: Målbruk.Person: verdi: fødselsnummer."
            },
            {
                "input": "AUTOCOMPLETE",
                "label": "Primærklasse",
                "value": {"source": "WATCH", "value": "caseData.primaryClass"},
                "formValue": "caseData.primaryClass",
                "options": "primaryClass",
                "required": [
                    {"type": "VALIDATION", "value": "true"},
                ],
                "hidden": {"type": "FIELD_CONTAINS", "key": "caseData.primaryClassification", "value": classificationsWithDynamicField},
                "error": "caseData.primaryClass",
                "helpText": "Vi må kunne fylle ut verdi og betegnelse.Eksempel: K-kode: Verdi 003, Betegnelse: Målbruk.Person: verdi: fødselsnummer."
            },
            {
                "input": "DROPZONE_TEXT_FIELD",
                "label": "Primærtittel",
                "value": {"source": "FORM", "value":"caseData.primaryTitle"},
                "formValue": "caseData.primaryTitle",
                "required": [
                    {"type": "VALIDATION", "value": "true"}
                ],
                "error": "caseData.primaryTitle",
                "helpText": "Tittel/Beskrivelse",
            },
            {
                "input": "AUTOCOMPLETE",
                "label": "Sekundærordningsprinsipp",
                "value": {"source": "WATCH", "value": "caseData.secondaryClassification"},
                "formValue": "caseData.secondaryClassification",
                "options": "classificationSystems",
                "required": [
                    {"type": "VALIDATION", "value": "true"},
                ],
                "error": "caseData.secondaryClassification",
                "helpText": "Det må kunne settes flere klasseringer på en sak, slik at sjemaet kan lete fram riktig sak. Eksempel: Primærkode=K-koder 'Sekundærkode=organisasjonsnummer eller personnummer'"
            },
            {
                "input": "DROPZONE_TEXT_FIELD",
                "label": "Sekundærklasse",
                "value": {"source": "FORM", "value":"caseData.secondaryClass"},
                "formValue": "caseData.secondary",
                "required": [
                    {"type": "VALIDATION", "value": "true"}
                ],
                "hidden": {"type": "FIELD_NOT_CONTAINS", "key": "caseData.secondaryClassification", "value": classificationsWithDynamicField},
                "error": "caseData.secondaryClass",
                "helpText": "Vi må kunne fylle ut verdi og betegnelse.Eksempel: K-kode: Verdi 003, Betegnelse: Målbruk.Person: verdi: fødselsnummer."
            },
            {
                "input": "AUTOCOMPLETE",
                "label": "Sekundærklasse",
                "value": {"source": "WATCH", "value": "caseData.secondaryClass"},
                "formValue": "caseData.secondaryClass",
                "options": "secondaryClass",
                "required": [
                    {"type": "VALIDATION", "value": "true"},
                ],
                "hidden": {"type": "FIELD_CONTAINS", "key": "caseData.secondaryClassification", "value": classificationsWithDynamicField},
                "error": "caseData.secondaryClass",
                "helpText": "Vi må kunne fylle ut verdi og betegnelse.Eksempel: K-kode: Verdi 003, Betegnelse: Målbruk.Person: verdi: fødselsnummer."
            },
            {
                "input": "DROPZONE_TEXT_FIELD",
                "label": "Sekundærtittel",
                "value": {"source": "FORM", "value":"caseData.secondaryTitle"},
                "formValue": "caseData.secondaryTitle",
                "required": [
                    {"type": "VALIDATION", "value": "true"}
                ],
                "error": "caseData.secondaryTitle",
                "helpText": "Tittel/Beskrivelse",
            },
            {
                "input": "AUTOCOMPLETE",
                "label": "Tertiærordningsprinsipp",
                "value": {"source": "WATCH", "value": "caseData.tertiaryClassification"},
                "formValue": "caseData.tertiaryClassification",
                "options": "classificationSystems",
                "required": [
                    {"type": "VALIDATION", "value": "true"},
                ],
                "error": "caseData.tertiaryClassification",
                "helpText": "Det må kunne settes flere klasseringer på en sak, slik at sjemaet kan lete fram riktig sak. Eksempel: Primærkode=K-koder 'Sekundærkode=organisasjonsnummer eller personnummer'"
            },
            {
                "input": "DROPZONE_TEXT_FIELD",
                "label": "Tertiærklasse",
                "value": {"source": "FORM", "value":"caseData.tertiaryClass"},
                "formValue": "caseData.tertiaryClass",
                "required": [
                    {"type": "VALIDATION", "value": "true"}
                ],
                "hidden": {"type": "FIELD_NOT_CONTAINS", "key": "caseData.tertiaryClassification", "value": classificationsWithDynamicField},
                "error": "caseData.tertiaryClass",
                "helpText": "Vi må kunne fylle ut verdi og betegnelse.Eksempel: K-kode: Verdi 003, Betegnelse: Målbruk.Person: verdi: fødselsnummer."
            },
            {
                "input": "AUTOCOMPLETE",
                "label": "Tertiærklasse",
                "value": {"source": "WATCH", "value": "caseData.tertiaryClass"},
                "formValue": "caseData.tertiaryClass",
                "options": "tertiaryClass",
                "required": [
                    {"type": "VALIDATION", "value": "true"},
                ],
                "hidden": {"type": "FIELD_CONTAINS", "key": "caseData.tertiaryClassification", "value": classificationsWithDynamicField},
                "error": "caseData.tertiaryClass",
                "helpText": "Vi må kunne fylle ut verdi og betegnelse.Eksempel: K-kode: Verdi 003, Betegnelse: Målbruk.Person: verdi: fødselsnummer."
            },
            {
                "input": "DROPZONE_TEXT_FIELD",
                "label": "Tertiærtittel",
                "value": {"source": "FORM", "value":"caseData.tertiaryTitle"},
                "formValue": "caseData.tertiaryTitle",
                "required": [
                    {"type": "VALIDATION", "value": "true"}
                ],
                "error": "caseData.tertiaryTitle",
                "helpText": "Tittel/Beskrivelse",
            }
        ]
    }
]