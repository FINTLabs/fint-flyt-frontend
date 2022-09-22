import {newFieldToString} from "../ValueBuilderUtil";
import {IFormConfiguration} from "../../integration/types/Form/FormData";
import {IConfigurationField, newIConfiguration} from "../../integration/types/Configuration";
import {CreationStrategy} from "../../integration/types/CreationStrategy";
import {ApplicantType} from "../../integration/types/ApplicantType";

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
            publicTitle: newFieldToString(caseFields, 'offentligTittel', true),
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
            //TODO: fix mapping of type
            type: ApplicantType.PERSON,
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
