import {MOCK_CASEFIELDGROUP} from "./mock_casefieldsgroup";
import {MOCK_RECORDFIELDSGROUP} from "./mock_recordfieldsgroup";
import {MOCK_DOCUMENTFIELDGROUP} from "./mock_documentfieldsgroup";
import {MOCK_APPLICANTFIELDGROUP} from "./mock_applicantfieldsgroup";
import {MOCK_LOGICFIELDGROUP} from "./mock_logicfieldsgroup";

export const MOCK_ACCS = [
  {
    "id": "case-information",
    "header":"Oppsett",
    "defaultExpanded": {"key": "completed", "value": "true"},
    "inputFieldGroups": MOCK_LOGICFIELDGROUP
  },
  {
    "id": "case-form",
    "header":"Sak",
    "defaultExpanded": {"key": "completed", "value": "true"},
    "hidden": {"type": "FIELD", "key": "caseData.caseCreationStrategy", "value": "COLLECTION"},
    "inputFieldGroups": MOCK_CASEFIELDGROUP
  },
  {
    "id": "record-form",
    "header":"Journalpost",
    "defaultExpanded": {"key": "completed", "value": "true"},
    "inputFieldGroups": MOCK_RECORDFIELDSGROUP
  },
  {
    "id": "document-object-form",
    "header":"Dokument- og objektbeskrivelse",
    "defaultExpanded": {"key": "completed", "value": "true"},
    "inputFieldGroups": MOCK_DOCUMENTFIELDGROUP
  },
  {
    "id": "applicant-form",
    "header":"Avsender",
    "defaultExpanded": {"key": "completed", "value": "true"},
    "inputFieldGroups": MOCK_APPLICANTFIELDGROUP
  },

]

export const MOCK_ACCS1 = [
  {
    "id": "record-form",
    "header":"Journalpost",
    "defaultExpanded": {"key": "completed", "value": "true"},
    "hidden": {"type": "FIELD", "key": "caseData.caseCreationStrategy", "value": "COLLECTION"},
    "inputFieldGroups": MOCK_RECORDFIELDSGROUP
  },
]