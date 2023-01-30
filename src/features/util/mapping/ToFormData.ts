import {configurationFieldToBoolean, configurationFieldToString} from "../MappingUtil";
import {IFormConfiguration} from "../../integration/types/Form/FormData";
import {IConfigurationElement, newIConfiguration} from "../../integration/types/Configuration";

export function newToFormData(data: newIConfiguration): IFormConfiguration {
    const caseFields: IConfigurationElement[] = data.elements?.filter(confField => confField.key === 'case');
    const recordFields: IConfigurationElement[] = data.elements?.filter(confField => confField.key === 'record');
    const mainDocumentFields: IConfigurationElement[] = recordFields[0].elements ? recordFields[0].elements.filter(confField => confField.key === 'mainDocument') : [];
    const attachmentDocumentFields: IConfigurationElement[] =recordFields[0].elements ? recordFields[0].elements.filter(confField => confField.key === 'attachmentDocuments') : [];
    const correspondentFields: IConfigurationElement[] = recordFields[0].elements ? recordFields[0].elements.filter(confField => confField.key === 'correspondent') : [];

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
                title: configurationFieldToString(recordFields, 'tittel'),
                documentStatus: configurationFieldToString(mainDocumentFields, 'dokumentstatus'),
                documentType: configurationFieldToString(mainDocumentFields, 'dokumentType'),
                role: configurationFieldToString(mainDocumentFields, 'tilknyttetRegistreringSom'),
                format: configurationFieldToString(mainDocumentFields, 'dokumentObjekt.format'),
                variant: configurationFieldToString(mainDocumentFields, 'dokumentObjekt.variantformat'),
                file: configurationFieldToString(mainDocumentFields, 'dokumentObjekt.fil'),
            },
            attachmentDocuments: {
                title: configurationFieldToString(attachmentDocumentFields, 'tittel'),
                documentStatus: configurationFieldToString(attachmentDocumentFields, 'dokumentstatus'),
                documentType: configurationFieldToString(attachmentDocumentFields, 'dokumentType'),
                role: configurationFieldToString(attachmentDocumentFields, 'tilknyttetRegistreringSom'),
                format: configurationFieldToString(attachmentDocumentFields, 'dokumentObjekt.format'),
                variant: configurationFieldToString(attachmentDocumentFields, 'dokumentObjekt.variantformat'),
                file: configurationFieldToString(attachmentDocumentFields, 'dokumentObjekt.fil')
            },
            correspondent: {
                protected: configurationFieldToBoolean(correspondentFields, 'protected'),
                type: configurationFieldToString(correspondentFields, 'korrespondanseparttype'),
                organisationNumber: configurationFieldToString(correspondentFields, 'organisasjonsnummer'),
                nationalIdentityNumber: configurationFieldToString(correspondentFields, 'fødselsnummer'),
                name: configurationFieldToString(correspondentFields, 'korrespondansepartNavn'),
                address: configurationFieldToString(correspondentFields, 'Adresse.adresselinje'),
                postalCode: configurationFieldToString(correspondentFields, 'Adresse.postnummer'),
                city: configurationFieldToString(correspondentFields, 'Adresse.poststed'),
                contactPerson: configurationFieldToString(correspondentFields, 'kontaktperson'),
                phoneNumber: configurationFieldToString(correspondentFields, 'Kontaktinformasjon.mobiltelefonnummer'),
                mobilePhoneNumber: configurationFieldToString(correspondentFields, 'Kontaktinformasjon.mobiltelefonnummer'),
                email: configurationFieldToString(correspondentFields, 'Kontaktinformasjon.epostadresse'),
                accessCode: configurationFieldToString(correspondentFields, 'tilgangsrestriksjon'),
                paragraph: configurationFieldToString(correspondentFields, 'skjermingshjemmel'),
            }
        }
    }
}
