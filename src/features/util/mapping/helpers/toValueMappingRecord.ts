import ICaseData from "../../../configuration/types/Form/CaseData";
import {IElementMapping, IValueMapping} from "../../../configuration/types/Configuration";
import {FieldType} from "../../../configuration/types/AVConfiguration";
import IRecordData from "../../../configuration/types/Form/RecordData";
import INewCaseData from "../../../configuration/types/Form/NewCaseData";
import IShieldingData from "../../../configuration/types/Form/ShieldingData";
import {IClassData} from "../../../configuration/types/Form/ClassData";
import IMainDocumentData from "../../../configuration/types/Form/DocumentData";
import ICorrespondentData from "../../../configuration/types/Form/CorrespondentData";

function cleanedRecord(inputArray: ({ mappingString: string | null; type: string; key: string })[]): Record<string, IValueMapping> {
    let record: Record<string, IValueMapping> = {} as Record<string, IValueMapping>;
    let cleanedArray = inputArray.filter((rec) => {return rec.mappingString !== null})

    cleanedArray.forEach(cf => {
        record[cf.key] = {type: cf.type, mappingString: cf.mappingString}
    })
    return record;
}

export function removeEmpty(record: Record<string, IElementMapping>): Record<string, IElementMapping> {
    let newRecord: Record<string, IElementMapping> = {} as Record<string, IElementMapping>;
    console.log(record)
    return newRecord;
}

export function caseDataToRecord(data: ICaseData): Record<string, IValueMapping> {
 let caseFieldsArray = [
        {key: "type", type: FieldType.STRING, mappingString: data.caseCreationStrategy},
        {key: "id", type: FieldType.DYNAMIC_STRING, mappingString: data.id ? data.id : null},
    ]
    return cleanedRecord(caseFieldsArray);
}

export function classDataToRecord(data: IClassData, order: string): Record<string, IValueMapping> {
  let caseFieldsArray = [
        {key: "klassifikasjonssystem", type: FieldType.DYNAMIC_STRING, mappingString: data.classification},
        {key: "klasseId", type: FieldType.DYNAMIC_STRING, mappingString: data.class},
        {key: "tittel", type: FieldType.DYNAMIC_STRING, mappingString: data.classification !== null ? data.title : null},
        {key: "rekkefølge", type: FieldType.DYNAMIC_STRING, mappingString: data.classification !== null ? order : null},
    ]
    return cleanedRecord(caseFieldsArray);
}

export function newCaseDataToRecord(data: INewCaseData): Record<string, IValueMapping> {
    let caseFieldsArray = [
        {key: "tittel", type: FieldType.DYNAMIC_STRING, mappingString: data.title !== '' ? data.title : null},
        {key: "offentligTittel", type: FieldType.DYNAMIC_STRING, mappingString: data.publicTitle !== '' ? data.publicTitle : null},
        {key: "saksmappetype", type: FieldType.STRING, mappingString: data.caseType},
        {key: "administrativenhet", type: FieldType.STRING, mappingString: data.administrativeUnit},
        {key: "arkivdel", type: FieldType.STRING, mappingString: data.archiveUnit},
        {key: "journalenhet", type: FieldType.STRING, mappingString: data.recordUnit},
        {key: "saksstatus", type: FieldType.STRING, mappingString: data.status},
        {key: "saksansvarlig", type: FieldType.STRING, mappingString: data.caseWorker}
    ]
    return cleanedRecord(caseFieldsArray);
}

export function recordDataToRecord(data: IRecordData): Record<string, IValueMapping> {
    let caseFieldsArray = [
        {key: "tittel", type: FieldType.DYNAMIC_STRING, mappingString: data.title !== '' ? data.title : null},
        {key: "offentligTittel", type: FieldType.DYNAMIC_STRING, mappingString: data.publicTitle !== '' ? data.publicTitle : null},
        {key: "journalposttype", type: FieldType.STRING, mappingString: data.recordType},
        {key: "journalstatus", type: FieldType.STRING, mappingString: data.recordStatus},
        {key: "administrativenhet", type: FieldType.STRING, mappingString: data.administrativeUnit},
        {key: "saksansvarlig", type: FieldType.STRING, mappingString: data.caseWorker}
    ]
    return cleanedRecord(caseFieldsArray);
}

export function documentDescriptionDataToRecord(data: IMainDocumentData): Record<string, IValueMapping> {
    let caseFieldsArray = [
        {key: "tittel", type: FieldType.DYNAMIC_STRING, mappingString: data.title !== '' ? data.title : null},
        {key: "dokumentstatus", type: FieldType.STRING, mappingString: data.documentStatus},
        {key: "dokumentType", type: FieldType.STRING, mappingString: data.documentType},
        {key: "tilknyttetRegistreringSom", type: FieldType.STRING, mappingString: data.role}
    ]
    return cleanedRecord(caseFieldsArray);
}

export function documentObjectDataToRecord(data: IMainDocumentData): Record<string, IValueMapping> {
    let caseFieldsArray = [
        {key: "filformat", type: FieldType.STRING, mappingString: data.fileFormat},
        {key: "variantformat", type: FieldType.STRING, mappingString: data.variant},
        {key: "fil", type: FieldType.FILE, mappingString: data.file !== '' ? data.file : null}
    ]
    return cleanedRecord(caseFieldsArray);
}

export function shieldingDataToRecord(data: IShieldingData): Record<string, IValueMapping> {
    let caseFieldsArray = [
        {key: "tilgangsrestriksjon", type: FieldType.STRING, mappingString: data.accessCode},
        {key: "skjermingshjemmel", type: FieldType.STRING, mappingString: data.paragraph},
    ]
    return cleanedRecord(caseFieldsArray);
}

export function correspondentDataToRecord(data: ICorrespondentData): Record<string, IValueMapping> {
    let caseFieldsArray = [
        {key: "fødselsnummer", type: FieldType.DYNAMIC_STRING, mappingString: data.nationalIdentityNumber !== '' ? data.nationalIdentityNumber : null},
        {key: "organisasjonsnummer", type: FieldType.DYNAMIC_STRING, mappingString: data.organisationNumber !== '' ? data.organisationNumber : null},
        {key: "kontaktperson", type: FieldType.DYNAMIC_STRING, mappingString: data.contactPerson !== '' ? data.contactPerson : null},
        {key: "korrespondansepartNavn", type: FieldType.DYNAMIC_STRING, mappingString: data.name !== '' ? data.name : null},
        {key: "korrespondanseparttype", type: FieldType.STRING, mappingString: data.type !== '' ? data.type : null}
    ]
    return cleanedRecord(caseFieldsArray);
}

export function contactInfoDataToRecord(data: ICorrespondentData): Record<string, IValueMapping> {
    let caseFieldsArray = [
        {key: "epostadresse", type: FieldType.DYNAMIC_STRING, mappingString: data.email !== '' ? data.email : null},
        {key: "mobiltelefonnummer", type: FieldType.DYNAMIC_STRING, mappingString: data.mobilePhoneNumber !== '' ? data.mobilePhoneNumber : null},
        {key: "telefonnummer", type: FieldType.DYNAMIC_STRING, mappingString: data.phoneNumber !== '' ? data.phoneNumber : null},
    ]
    return cleanedRecord(caseFieldsArray);
}

export function addressDataToRecord(data: ICorrespondentData): Record<string, IValueMapping> {
    let caseFieldsArray = [
        {key: "adresselinje", type: FieldType.DYNAMIC_STRING, mappingString: data.address !== '' ? data.address : null},
        {key: "postnummer", type: FieldType.DYNAMIC_STRING, mappingString: data.postalCode !== '' ? data.postalCode : null},
        {key: "poststed", type: FieldType.DYNAMIC_STRING, mappingString: data.city !== '' ? data.city : null},
    ]
    return cleanedRecord(caseFieldsArray);
}