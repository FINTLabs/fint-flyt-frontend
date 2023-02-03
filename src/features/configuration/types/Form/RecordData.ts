import ICorrespondentData from "./CorrespondentData";
import IMainDocumentData from "./MainDocumentData";
import IAttachmentDocumentsData from "./AttachmentDocumentsData";
import IShieldingData from "./ShieldingData";

export default interface IRecordData {
    title: string | null;
    publicTitle: string | null;
    administrativeUnit: string | null;
    recordStatus: string | null;
    recordType: string | null;
    caseWorker: string | null;
    shielding: IShieldingData;
    correspondent: ICorrespondentData;
    mainDocument: IMainDocumentData;
    attachmentDocuments: IAttachmentDocumentsData;
}
