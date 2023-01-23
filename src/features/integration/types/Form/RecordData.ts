import IApplicantData from "./ApplicantData";
import IMainDocumentData from "./MainDocumentData";
import IAttachmentDocumentsData from "./AttachmentDocumentsData";

export default interface IRecordData {
    title: string | null;
    publicTitle: string | null;
    administrativeUnit: string | null;
    recordStatus: string | null;
    recordType: string | null;
    caseWorker: string | null;
    accessCode: string | null;
    paragraph: string | null;
    correspondent: IApplicantData;
    mainDocument: IMainDocumentData;
    attachmentDocuments: IAttachmentDocumentsData;
}
