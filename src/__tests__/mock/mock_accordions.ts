export const MOCK_ACCS = [
  {
    "id": "case-information",
    "header":"Logikk",
    "defaultExpanded": {"key": "completed", "value": "true"}},
  {
    "id": "case-form",
    "header":"Sak",
    "defaultExpanded": {"key": "completed", "value": "true"},
    "hidden": {"type": "FIELD", "key": "caseData.caseCreationStrategy", "value": "COLLECTION"}
  },
  {
    "id": "record-form",
    "header":"Journalpost",
    "defaultExpanded": {"key": "completed", "value": "true"}
  },
  {
    "id": "document-object-form",
    "header":"Dokument- og objektbeskrivelse",
    "defaultExpanded": {"key": "completed", "value": "true"}
  },
  {
    "id": "applicant-form",
    "header":"Avsender",
    "defaultExpanded": {"key": "completed", "value": "true"}},
]

export const MOCK_ACCS1 = [
  {
    "id": "case-form",
    "header":"Sak",
    "defaultExpanded": {"key": "null", "value": "true"},
    "hidden": {"type": "FIELD", "key": "caseData.caseCreationStrategy", "value": "COLLECTION"}
  }
]