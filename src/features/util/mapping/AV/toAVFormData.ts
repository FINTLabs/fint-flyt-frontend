import {
    ICollectionElement,
    IConfigurationElement,
    IFixedFieldConfiguration, IFromCollectionFieldConfiguration,
    newIConfiguration
} from "../../../integration/types/Configuration";
import {configurationFieldToBoolean, configurationFieldToString} from "../../MappingUtil";
import {IFormConfiguration} from "../../../integration/types/Form/FormData";

export function toAVFormData(data: newIConfiguration): IFormConfiguration {
    // saksfelter
    const caseFields: IConfigurationElement[] = data.elements?.filter(confField => confField.key === 'sak');
    // journalpostfelter
    const recordFields: IConfigurationElement[] = data.elements?.filter(confField => confField.key === 'journalpost');

    // dokumentbeskrivelse samling
    const documentDescriptionCollection: ICollectionElement[] = recordFields[0].collectionElements ? recordFields[0].collectionElements.filter(confField => confField.key === 'dokumentbeskrivelse') : [];

    // hoveddokument objektbeskrivelse
    const mainDocumentDescFixed: IFixedFieldConfiguration[] = documentDescriptionCollection[0].fixed ? documentDescriptionCollection[0].fixed : []

    const mainDocumentObject: ICollectionElement[] = mainDocumentDescFixed[0].collectionElements ? mainDocumentDescFixed[0].collectionElements.filter(confField => confField.key === 'dokumentObjekt') : [];
    // hoveddokument objektbeskrivelse
    const fixedMainDocuDesc: IFixedFieldConfiguration[] = mainDocumentObject[0].fixed ? mainDocumentObject[0].fixed : [];

    const fromCollectionDocumentDesc: IFromCollectionFieldConfiguration[] = documentDescriptionCollection[0].fromCollection ? documentDescriptionCollection[0].fromCollection.filter(collEl => collEl.collectionReference === 'vedlegg') : []

    const attachmentDocumentDesc = fromCollectionDocumentDesc[0].collectionElements ? fromCollectionDocumentDesc[0].collectionElements.filter(collEl => collEl.key === 'dokumentObjekt') : []

    // vedlegg objektbeskrivelse
    const fixedAttachmentDocuDesc: IFixedFieldConfiguration[] = attachmentDocumentDesc[0].fixed ? attachmentDocumentDesc[0].fixed : [];

    // korrespondansepartfelter
    const correspondentFields: ICollectionElement[] = recordFields[0].collectionElements ? recordFields[0].collectionElements.filter(confField => confField.key === 'korrespondansepart') : [];
    const fixedCorresponentFields: IFixedFieldConfiguration[] = correspondentFields[0].fixed ? correspondentFields[0].fixed : []
    // korrespondansepartfelter adresse
    const addressFields = fixedCorresponentFields[0].elements ? fixedCorresponentFields[0].elements.filter(confField => confField.key === 'adresse') : [];
    // korrespondansepartfelter kontaktinfo
    const contactFields = fixedCorresponentFields[0].elements ? fixedCorresponentFields[0].elements.filter(confField => confField.key === 'kontaktinformasjon') : [];
    // korrespondansepartfelter skjerming
    const protectionFields = fixedCorresponentFields[0].elements ? fixedCorresponentFields[0].elements.filter(confField => confField.key === 'skjerming') : [];

    return {
        comment: data.comment,
        completed: data.completed,
        caseData: {
            caseNumber: configurationFieldToString(caseFields, 'id'),
            title: configurationFieldToString(caseFields, 'tittel'),
            publicTitle: configurationFieldToString(caseFields, 'offentligTittel'),
            recordUnit: configurationFieldToString(caseFields, 'journalenhet'),
            caseCreationStrategy: configurationFieldToString(caseFields, 'type'),
            caseType: configurationFieldToString(caseFields, 'saksmappetype'),
            administrativeUnit: configurationFieldToString(caseFields, 'administrativenhet'),
            archiveUnit: configurationFieldToString(caseFields, 'arkivdel'),
            status: configurationFieldToString(caseFields, 'status'),
            accessCode: configurationFieldToString(caseFields, 'tilgangsrestriksjon'),
            paragraph: configurationFieldToString(caseFields, 'skjermingshjemmel'),
            caseWorker: configurationFieldToString(caseFields, 'saksansvarlig'),
            primaryClassification: configurationFieldToString(caseFields, 'primarordningsprinsipp'),
            secondaryClassification: configurationFieldToString(caseFields, 'sekundarordningsprinsipp'),
            tertiaryClassification: configurationFieldToString(caseFields, 'tertiarordningsprinsipp'),
            primaryClass: configurationFieldToString(caseFields, 'primarklasse'),
            secondaryClass: configurationFieldToString(caseFields, 'sekundarklasse'),
            tertiaryClass: configurationFieldToString(caseFields, 'tertiarklasse'),
            primaryTitle: configurationFieldToString(caseFields, 'primartittel'),
            secondaryTitle: configurationFieldToString(caseFields, 'sekundartittel'),
            tertiaryTitle: configurationFieldToString(caseFields, 'tertiartittel')
        },
        recordData: {
            title: configurationFieldToString(recordFields, 'tittel'),
            publicTitle: configurationFieldToString(recordFields, 'offentligTittel'),
            administrativeUnit: configurationFieldToString(recordFields, 'administrativenhet'),
            recordStatus: configurationFieldToString(recordFields, 'journalstatus'),
            recordType: configurationFieldToString(recordFields, 'journalposttype'),
            caseWorker: configurationFieldToString(recordFields, 'saksbehandler'),
            accessCode: configurationFieldToString(recordFields, 'tilgangsrestriksjon'),
            paragraph: configurationFieldToString(recordFields, 'skjermingshjemmel'),
            mainDocument: {
                title: configurationFieldToString(mainDocumentDescFixed, 'tittel'),
                documentStatus: configurationFieldToString(mainDocumentDescFixed, 'dokumentstatus'),
                documentType: configurationFieldToString(mainDocumentDescFixed, 'dokumentType'),
                role: configurationFieldToString(mainDocumentDescFixed, 'tilknyttetRegistreringSom'),
                format: configurationFieldToString(fixedMainDocuDesc, 'variantformat'),
                variant: configurationFieldToString(fixedMainDocuDesc, 'format'),
                file: configurationFieldToString(fixedMainDocuDesc, 'fil'),
            },
            attachmentDocuments: {
                title: configurationFieldToString(fromCollectionDocumentDesc, 'tittel'),
                documentStatus: configurationFieldToString(fromCollectionDocumentDesc, 'dokumentstatus'),
                documentType: configurationFieldToString(fromCollectionDocumentDesc, 'dokumentType'),
                role: configurationFieldToString(fromCollectionDocumentDesc, 'tilknyttetRegistreringSom'),
                format: configurationFieldToString(fixedAttachmentDocuDesc, 'variantformat'),
                variant: configurationFieldToString(fixedAttachmentDocuDesc, 'format'),
                file: configurationFieldToString(fixedAttachmentDocuDesc, 'fil'),
            },
            correspondent: {
                protected: configurationFieldToBoolean(fixedCorresponentFields, 'protected'),
                organisationNumber: configurationFieldToString(fixedCorresponentFields, 'organisasjonsnummer'),
                nationalIdentityNumber: configurationFieldToString(fixedCorresponentFields, 'fødselsnummer'),
                contactPerson: configurationFieldToString(fixedCorresponentFields, 'kontaktperson'),
                name: configurationFieldToString(fixedCorresponentFields, 'KorrespondansepartNavn'),
                address: configurationFieldToString(addressFields, 'adresselinje'),
                postalCode: configurationFieldToString(addressFields, 'postnummer'),
                city: configurationFieldToString(addressFields, 'poststed'),
                phoneNumber: configurationFieldToString(contactFields, 'telefonnummer'),
                mobilePhoneNumber: configurationFieldToString(contactFields, 'mobiltelefonnummer'),
                email: configurationFieldToString(contactFields, 'epostadresse'),
                accessCode: configurationFieldToString(protectionFields, 'tilgangsrestriksjon'),
                paragraph: configurationFieldToString(protectionFields, 'skjermingshjemmel'),
            }
        }
    }

}
