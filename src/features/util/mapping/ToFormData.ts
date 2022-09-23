import {newFieldToString} from "../ValueBuilderUtil";
import {IFormConfiguration} from "../../integration/types/Form/FormData";
import {IConfigurationElement, newIConfiguration} from "../../integration/types/Configuration";
import {CreationStrategy} from "../../integration/types/CreationStrategy";
import {ApplicantType} from "../../integration/types/ApplicantType";

export function newToFormData(data: newIConfiguration): IFormConfiguration {
    const caseFields: IConfigurationElement[] = data.elements?.filter(confField => confField.key === 'case');
    const recordFields: IConfigurationElement[] = data.elements?.filter(confField => confField.key === 'record');
    const documentFields: IConfigurationElement[] = data.elements?.filter(confField => confField.key === 'document');
    const applicantFields: IConfigurationElement[] = data.elements?.filter(confField => confField.key === 'applicant');
    return {
        comment: data.comment,
        completed: data.completed,
        caseData: {
            title: newFieldToString(caseFields, 'tittel'),
            publicTitle: newFieldToString(caseFields, 'offentligTittel'),
            recordUnit: newFieldToString(caseFields, 'journalenhet'),
            //TODO: fix this
            caseCreationStrategy: CreationStrategy.NEW,
            caseType: newFieldToString(caseFields, 'saksmappetype'),
            administrativeUnit: newFieldToString(caseFields, 'administrativenhet'),
            archiveUnit: newFieldToString(caseFields, 'arkivdel'),
            status: newFieldToString(caseFields, 'status'),
            accessCode: newFieldToString(caseFields, 'tilgangsrestriksjon'),
            paragraph: newFieldToString(caseFields, 'skjermingshjemmel'),
            caseWorker: newFieldToString(caseFields, 'saksansvarlig'),
            primaryClassification: newFieldToString(caseFields, 'primarordningsprinsipp'),
            secondaryClassification: newFieldToString(caseFields, 'sekundarordningsprinsipp'),
            tertiaryClassification: newFieldToString(caseFields, 'tertiarordningsprinsipp'),
            primaryClass: newFieldToString(caseFields, 'primarklasse'),
            secondaryClass: newFieldToString(caseFields, 'sekundarklasse'),
            tertiaryClass: newFieldToString(caseFields, 'tertiarklasse'),
            primaryTitle: newFieldToString(caseFields, 'primartittel'),
            secondaryTitle: newFieldToString(caseFields, 'sekundartittel'),
            tertiaryTitle: newFieldToString(caseFields, 'tertiartittel')
        },
        recordData: {
            title: newFieldToString(recordFields, 'tittel'),
            publicTitle: newFieldToString(recordFields, 'offentigTittel'),
            documentType: newFieldToString(recordFields, 'DokumentBeskrivelse.dokumentType'),
            administrativeUnit: newFieldToString(recordFields, 'administrativenhet'),
            recordStatus: newFieldToString(recordFields, 'journalstatus'),
            recordType: newFieldToString(recordFields, 'journalposttype'),
            caseWorker: newFieldToString(recordFields, 'saksbehandler'),
            accessCode: newFieldToString(recordFields, 'tilgangsrestriksjon'),
            paragraph: newFieldToString(recordFields, 'skjermingshjemmel'),
        },
        documentData: {
            title: newFieldToString(documentFields, 'tittel'),
            documentStatus: newFieldToString(documentFields, 'dokumentStatus'),
            //TODO: whats the correct name for this configField?
            documentCategory: newFieldToString(documentFields, 'DokumentBeskrivelse.dokumentKategori'),
            accessCode: newFieldToString(documentFields, 'tilgangsrestriksjon'),
            paragraph: newFieldToString(documentFields, 'skjermingshjemmel'),
            variant: newFieldToString(documentFields, 'DokumentBeskrivelse.dokumentObjekt.variantFormat'),
        },
        applicantData: {
            //TODO: fix mapping of type
            type: ApplicantType.PERSON,
            organisationNumber: newFieldToString(applicantFields, 'organisasjonsnummer'),
            nationalIdentityNumber: newFieldToString(applicantFields, 'fødselsnummer'),
            name: newFieldToString(applicantFields, 'KorrespondansepartNavn'),
            address: newFieldToString(applicantFields, 'Adresse.adresselinje'),
            postalCode: newFieldToString(applicantFields, 'Adresse.postnummer'),
            city: newFieldToString(applicantFields, 'Adresse.poststed'),
            contactPerson: newFieldToString(applicantFields, 'kontaktperson'),
            phoneNumber: newFieldToString(applicantFields, 'Kontaktinformasjon.mobiltelefonnummer'),
            email: newFieldToString(applicantFields, 'Kontaktinformasjon.epostadresse'),
            accessCode: newFieldToString(applicantFields, 'tilgangsrestriksjon'),
            paragraph: newFieldToString(applicantFields, 'skjermingshjemmel'),
        },
    }
}
