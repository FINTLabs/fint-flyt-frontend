export default interface ICaseData {
    caseCreationStrategy: string | null;
    caseNumber: string | null | undefined;
    title: string | null;
    publicTitle: string | null;
    caseType: string | null;
    administrativeUnit: string | null;
    archiveUnit: string | null;
    recordUnit: string | null;
    status: string | null;
    accessCode: string | null;
    paragraph: string | null;
    caseWorker: string | null;
    primaryClassification: string | null;
    secondaryClassification: string | null;
    tertiaryClassification: string | null;
    primaryClass: string | null;
    secondaryClass: string | null;
    tertiaryClass: string | null;
    primaryTitle: string | null;
    secondaryTitle: string | null;
    tertiaryTitle: string | null;
}
