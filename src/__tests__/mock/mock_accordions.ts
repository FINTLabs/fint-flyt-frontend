import {MOCK_RECORDFIELDS} from "./mock_recordfields";
import {MOCK_CASEFIELDS} from "./mock_casefields";

export const MOCK_ACCS = [
  {
    "id": "case-information",
    "header":"Logikk",
    "defaultExpanded": {"key": "completed", "value": "true"},
    "inputFields": [
      {
        "input": "RADIO",
        "label": "Velg hvordan skjema skal sendes til arkivet",
        "value": {"source": "WATCH", "value":"caseData.caseCreationStrategy"},
        "formValue": "caseData.caseCreationStrategy",
        "options": "creationStrategies",
        "helpText": "Integrasjonslogikk",
      },
      {
        "input": "TEXT_FIELD",
        "label": "Saksnummer",
        "value": {"source": "WATCH", "value":"caseData.caseNumber"},
        "hidden": {"type": "NOT_FIELD", "key": "caseData.caseCreationStrategy", "value": "COLLECTION"},
        "formValue": "caseData.caseNumber",
        "required": [
          {"type": "FIELD", "key": "caseData.caseCreationStrategy", "value": "COLLECTION"},
          {"type": "VALIDATION", "value": "true"}
        ],
        "error": "caseData.caseNumber",
        "searchOption": true,
        "helpText": "Eksempel 2021/12345",
        "disabled": {"key": "completed", "value": "true"}
      }
    ]
  },
  {
    "id": "case-form",
    "header":"Sak",
    "defaultExpanded": {"key": "completed", "value": "true"},
    "hidden": {"type": "FIELD", "key": "caseData.caseCreationStrategy", "value": "COLLECTION"},
    "inputFields": MOCK_CASEFIELDS
  },
  {
    "id": "record-form",
    "header":"Journalpost",
    "defaultExpanded": {"key": "completed", "value": "true"},
    "inputFields": MOCK_RECORDFIELDS
  },
  {
    "id": "document-object-form",
    "header":"Dokument- og objektbeskrivelse",
    "defaultExpanded": {"key": "completed", "value": "true"},
    "inputFields": [
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
    "id": "applicant-form",
    "header":"Avsender",
    "defaultExpanded": {"key": "completed", "value": "true"},
    "inputFields": []
  },

]

export const MOCK_ACCS1 = [
  {
    "id": "case-form",
    "header":"Sak",
    "defaultExpanded": {"key": "null", "value": "true"},
    "hidden": {"type": "FIELD", "key": "caseData.caseCreationStrategy", "value": "COLLECTION"}
  }
]