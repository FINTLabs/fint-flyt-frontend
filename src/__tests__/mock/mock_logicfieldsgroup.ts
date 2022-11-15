import {IFieldGroup} from "../../features/integration/types/InputField";

export const MOCK_LOGICFIELDGROUP: IFieldGroup[] = [
    {
        "header": "Integrasjonslogikk",
        "fields": [
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
    }
]