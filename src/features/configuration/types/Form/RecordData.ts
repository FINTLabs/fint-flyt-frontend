import ICorrespondentData from "./CorrespondentData";
import IShieldingData from "./ShieldingData";
import IDocumentData from "./DocumentData";

export default interface IRecordData {
    title: string | null;
    publicTitle: string | null;
    administrativeUnit: string | null;
    recordStatus: string | null;
    recordType: string | null;
    caseWorker: string | null;
    shielding: IShieldingData;
    correspondent: ICorrespondentData;
    mainDocument: IDocumentData;
    attachmentDocuments: IDocumentData;
}
