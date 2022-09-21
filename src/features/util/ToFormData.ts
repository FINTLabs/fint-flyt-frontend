import {fieldToString, newFieldToString} from "./ValueBuilderUtil";
import {IFormConfiguration} from "../integration/types/Form/FormData";
import {IConfiguration, IConfigurationField, newIConfiguration} from "../integration/types/Configuration";

export function toFormConfigData(data: IConfiguration): IFormConfiguration {
    return {
        comment: data.comment,
        completed: data.completed,
        caseData: {
            caseCreationStrategy: data.caseConfiguration?.caseCreationStrategy,
            caseNumber: data.caseConfiguration?.caseNumber,
            title: fieldToString(data.caseConfiguration, 'tittel', true),
            publicTitle: fieldToString(data.caseConfiguration, 'offentligTittel', true),
            caseType: fieldToString(data.caseConfiguration, 'saksmappetype'),
            administrativeUnit: fieldToString(data.caseConfiguration, 'administrativenhet'),
            archiveUnit: fieldToString(data.caseConfiguration, 'arkivdel'),
            recordUnit: fieldToString(data.caseConfiguration, 'journalenhet'),
            status: fieldToString(data.caseConfiguration, 'status'),
            accessCode: fieldToString(data.caseConfiguration, 'tilgangsrestriksjon'),
            paragraph: fieldToString(data.caseConfiguration, 'skjermingshjemmel'),
            caseWorker: fieldToString(data.caseConfiguration, 'saksansvarlig'),
            primaryClassification: fieldToString(data.caseConfiguration, 'primarordningsprinsipp', true),
            secondaryClassification: fieldToString(data.caseConfiguration, 'sekundarordningsprinsipp', true),
            tertiaryClassification: fieldToString(data.caseConfiguration, 'tertiarordningsprinsipp', true),
            primaryClass: fieldToString(data.caseConfiguration, 'primarklasse', true),
            secondaryClass: fieldToString(data.caseConfiguration, 'sekundarklasse'),
            tertiaryClass: fieldToString(data.caseConfiguration, 'tertiarklasse'),
            primaryTitle: fieldToString(data.caseConfiguration, 'primartittel', true),
            secondaryTitle: fieldToString(data.caseConfiguration, 'sekundartittel', true),
            tertiaryTitle: fieldToString(data.caseConfiguration, 'tertiartittel', true)
        },
        recordData: {
            title: fieldToString(data.recordConfiguration, 'tittel', true),
            publicTitle: fieldToString(data.recordConfiguration, 'offentigTittel', true),
            documentType: fieldToString(data.recordConfiguration, 'DokumentBeskrivelse.dokumentType'),
            administrativeUnit: fieldToString(data.recordConfiguration, 'administrativenhet'),
            recordStatus: fieldToString(data.recordConfiguration, 'journalstatus'),
            recordType: fieldToString(data.recordConfiguration, 'journalposttype'),
            caseWorker: fieldToString(data.recordConfiguration, 'saksbehandler'),
            accessCode: fieldToString(data.recordConfiguration, 'tilgangsrestriksjon'),
            paragraph: fieldToString(data.recordConfiguration, 'skjermingshjemmel'),
        },
        documentData: {
            title: fieldToString(data.documentConfiguration, 'tittel', true),
            documentStatus: fieldToString(data.documentConfiguration, 'dokumentStatus'),
            //TODO: whats the correct name for this configField?
            documentCategory: fieldToString(data.documentConfiguration, 'DokumentBeskrivelse.dokumentKategori'),
            accessCode: fieldToString(data.documentConfiguration, 'tilgangsrestriksjon'),
            paragraph: fieldToString(data.documentConfiguration, 'skjermingshjemmel'),
            variant: fieldToString(data.documentConfiguration, 'DokumentBeskrivelse.dokumentObjekt.variantFormat'),
        },
        applicantData: {
            type: data.applicantConfiguration?.organisationNumber ? 'ORGANISATION' : 'PERSON',
            organisationNumber: fieldToString(data.applicantConfiguration, 'organisasjonsnummer', true),
            nationalIdentityNumber: fieldToString(data.applicantConfiguration, 'fødselsnummer', true),
            protected: data.applicantConfiguration?.protected,
            name: fieldToString(data.applicantConfiguration, 'KorrespondansepartNavn', true),
            address: fieldToString(data.applicantConfiguration, 'Adresse.adresselinje', true),
            postalCode: fieldToString(data.applicantConfiguration, 'Adresse.postnummer', true),
            city: fieldToString(data.applicantConfiguration, 'Adresse.poststed', true),
            contactPerson: fieldToString(data.applicantConfiguration, 'kontaktperson', true),
            phoneNumber: fieldToString(data.applicantConfiguration, 'Kontaktinformasjon.mobiltelefonnummer', true),
            email: fieldToString(data.applicantConfiguration, 'Kontaktinformasjon.epostadresse', true),
            accessCode: fieldToString(data.applicantConfiguration, 'tilgangsrestriksjon'),
            paragraph: fieldToString(data.applicantConfiguration, 'skjermingshjemmel'),
        },
    }
}


export function newToFormData(data: newIConfiguration): IFormConfiguration {
    console.log(data)
    const caseFields: IConfigurationField[] = data.configurationFields?.filter(confField => confField.key === 'case');
    const recordFields: IConfigurationField[] = data.configurationFields?.filter(confField => confField.key === 'record');
    const documentFields: IConfigurationField[] = data.configurationFields?.filter(confField => confField.key === 'document');
    const applicantFields: IConfigurationField[] = data.configurationFields?.filter(confField => confField.key === 'applicant');
    return {
        comment: data.comment,
        completed: data.completed,
        caseData: {
            title: newFieldToString(caseFields, 'tittel', true),
            publicTitle: newFieldToString(caseFields, 'tittel', true),
            recordUnit: newFieldToString(caseFields, 'journalenhet'),
            caseType: newFieldToString(caseFields, 'saksmappetype'),
            administrativeUnit: newFieldToString(caseFields, 'administrativenhet'),
            archiveUnit: newFieldToString(caseFields, 'arkivdel'),
            status: newFieldToString(caseFields, 'status'),
            accessCode: newFieldToString(caseFields, 'tilgangsrestriksjon'),
            paragraph: newFieldToString(caseFields, 'skjermingshjemmel'),
            caseWorker: newFieldToString(caseFields, 'saksansvarlig'),
            primaryClassification: newFieldToString(caseFields, 'primarordningsprinsipp', true),
            secondaryClassification: newFieldToString(caseFields, 'sekundarordningsprinsipp', true),
            tertiaryClassification: newFieldToString(caseFields, 'tertiarordningsprinsipp', true),
            primaryClass: newFieldToString(caseFields, 'primarklasse', true),
            secondaryClass: newFieldToString(caseFields, 'sekundarklasse'),
            tertiaryClass: newFieldToString(caseFields, 'tertiarklasse'),
            primaryTitle: newFieldToString(caseFields, 'primartittel', true),
            secondaryTitle: newFieldToString(caseFields, 'sekundartittel', true),
            tertiaryTitle: newFieldToString(caseFields, 'tertiartittel', true)
        },
        recordData: {
            title: newFieldToString(recordFields, 'tittel', true),
            publicTitle: newFieldToString(recordFields, 'offentigTittel', true),
            documentType: newFieldToString(recordFields, 'DokumentBeskrivelse.dokumentType'),
            administrativeUnit: newFieldToString(recordFields, 'administrativenhet'),
            recordStatus: newFieldToString(recordFields, 'journalstatus'),
            recordType: newFieldToString(recordFields, 'journalposttype'),
            caseWorker: newFieldToString(recordFields, 'saksbehandler'),
            accessCode: newFieldToString(recordFields, 'tilgangsrestriksjon'),
            paragraph: newFieldToString(recordFields, 'skjermingshjemmel'),
        },
        documentData: {
            title: newFieldToString(documentFields, 'tittel', true),
            documentStatus: newFieldToString(documentFields, 'dokumentStatus'),
            //TODO: whats the correct name for this configField?
            documentCategory: newFieldToString(documentFields, 'DokumentBeskrivelse.dokumentKategori'),
            accessCode: newFieldToString(documentFields, 'tilgangsrestriksjon'),
            paragraph: newFieldToString(documentFields, 'skjermingshjemmel'),
            variant: newFieldToString(documentFields, 'DokumentBeskrivelse.dokumentObjekt.variantFormat'),
        },
        applicantData: {
            organisationNumber: newFieldToString(applicantFields, 'organisasjonsnummer', true),
            nationalIdentityNumber: newFieldToString(applicantFields, 'fødselsnummer', true),
            name: newFieldToString(applicantFields, 'KorrespondansepartNavn', true),
            address: newFieldToString(applicantFields, 'Adresse.adresselinje', true),
            postalCode: newFieldToString(applicantFields, 'Adresse.postnummer', true),
            city: newFieldToString(applicantFields, 'Adresse.poststed', true),
            contactPerson: newFieldToString(applicantFields, 'kontaktperson', true),
            phoneNumber: newFieldToString(applicantFields, 'Kontaktinformasjon.mobiltelefonnummer', true),
            email: newFieldToString(applicantFields, 'Kontaktinformasjon.epostadresse', true),
            accessCode: newFieldToString(applicantFields, 'tilgangsrestriksjon'),
            paragraph: newFieldToString(applicantFields, 'skjermingshjemmel'),
        },
    }
}
