import INewCaseData from "./NewCaseData";

export default interface ICaseData {
    caseCreationStrategy: string | null;
    id: string | null | undefined;
    newCase: INewCaseData;
}
