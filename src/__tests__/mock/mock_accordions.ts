import {MOCK_RECORDFIELDS} from "./mock_recordfields";
import {MOCK_CASEFIELDS} from "./mock_casefields";
import {MOCK_DOCUMENTFIELDS} from "./mock_documentfields";
import {MOCK_CASEFIELDGROUP} from "./mock_casefieldsgroup";
import {MOCK_RECORDFIELDSGROUP} from "./mock_recordfieldsgroup";
import {MOCK_DOCUMENTFIELDGROUP} from "./mock_documentfieldsgroup";

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
    ],
    "inputFieldGroups": [],
  },
  {
    "id": "case-form",
    "header":"Sak",
    "defaultExpanded": {"key": "completed", "value": "true"},
    "hidden": {"type": "FIELD", "key": "caseData.caseCreationStrategy", "value": "COLLECTION"},
    "inputFields": MOCK_CASEFIELDS,
    "inputFieldGroups": MOCK_CASEFIELDGROUP
  },
  {
    "id": "record-form",
    "header":"Journalpost",
    "defaultExpanded": {"key": "completed", "value": "true"},
    "inputFields": MOCK_RECORDFIELDS,
    "inputFieldGroups": MOCK_RECORDFIELDSGROUP

  },
  {
    "id": "document-object-form",
    "header":"Dokument- og objektbeskrivelse",
    "defaultExpanded": {"key": "completed", "value": "true"},
    "inputFields": MOCK_DOCUMENTFIELDS,
    "inputFieldGroups": MOCK_DOCUMENTFIELDGROUP

  },
  {
    "id": "applicant-form",
    "header":"Avsender",
    "defaultExpanded": {"key": "completed", "value": "true"},
    "inputFields": [],
    "inputFieldGroups": []
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