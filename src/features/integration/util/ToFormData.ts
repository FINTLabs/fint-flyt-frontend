import IFormData from "../types/Form/FormData";
import {IIntegrationConfiguration} from "../types/IntegrationConfiguration";
import {fieldToString} from "./ValueBuilderUtil";

export function toFormData(data: IIntegrationConfiguration): IFormData {
    return {
        name: data.name,
        description: data.description,
        sourceApplication: data.sourceApplication,
        sourceApplicationIntegrationId: data.sourceApplicationIntegrationId,
        version: data.version,
        caseData: {
            caseCreationStrategy: data.caseConfiguration.caseCreationStrategy,
            caseNumber: data.caseConfiguration.caseNumber,
            title: fieldToString(data.caseConfiguration, 'tittel', true),
            publicTitle: fieldToString(data.caseConfiguration, 'offentligTittel', true),
            caseType: fieldToString(data.caseConfiguration, 'caseType'),
            administrativeUnit: fieldToString(data.caseConfiguration, 'administrativenhet'),
            archiveUnit: fieldToString(data.caseConfiguration, 'arkivdel'),
            recordUnit: fieldToString(data.caseConfiguration, 'journalenhet'),
            accessCode: fieldToString(data.caseConfiguration, 'tilgangsrestriksjon'),
            paragraph: fieldToString(data.caseConfiguration, 'skjermingshjemmel'),
            caseWorker: fieldToString(data.caseConfiguration, 'saksansvarlig'),
            primaryClassification: fieldToString(data.caseConfiguration, 'primarordningsprinsipp', true),
            secondaryClassification: fieldToString(data.caseConfiguration, 'sekundarordningsprinsipp', true),
            primaryClass: fieldToString(data.caseConfiguration, 'primarklasse'),
            secondaryClass: fieldToString(data.caseConfiguration, 'sekundarklasse')
        },
        recordData: {
            title: fieldToString(data.recordConfiguration, 'tittel', true),
            publicTitle: fieldToString(data.recordConfiguration, 'offentigTittel', true),
            category: fieldToString(data.recordConfiguration, 'DokumentBeskrivelse.dokumentType'),
            administrativeUnit: fieldToString(data.recordConfiguration, 'administrativenhet'),
            status: fieldToString(data.recordConfiguration, 'journalstatus'),
            accessCode: fieldToString(data.recordConfiguration, 'tilgangsrestriksjon'),
            paragraph: fieldToString(data.recordConfiguration, 'skjermingshjemmel'),
        },
        documentData: {
            title: fieldToString(data.documentConfiguration, 'tittel', true),
            documentStatus: fieldToString(data.documentConfiguration, 'dokumentStatus'),
            accessCode: fieldToString(data.documentConfiguration, 'tilgangsrestriksjon'),
            paragraph: fieldToString(data.documentConfiguration, 'skjermingshjemmel'),
            variant: fieldToString(data.documentConfiguration, 'DokumentBeskrivelse.dokumentObjekt.variantFormat')
        },
        applicantData: {
            type: data.applicantConfiguration.organisationNumber ? 'ORGANISATION' : 'PERSON',
            organisationNumber: data.applicantConfiguration.organisationNumber,
            name: fieldToString(data.applicantConfiguration, 'KorrespondansepartNavn', true),
            address: fieldToString(data.applicantConfiguration, 'Adresse.adresselinje', true),
            postalCode: fieldToString(data.applicantConfiguration, 'Adresse.postnummer', true),
            city: fieldToString(data.applicantConfiguration, 'Adresse.poststed', true),
            phoneNumber: fieldToString(data.applicantConfiguration, 'Kontaktinformasjon.mobiltelefonnummer', true),
            email: fieldToString(data.applicantConfiguration, 'Kontaktinformasjon.epostadresse', true),
            accessCode: fieldToString(data.applicantConfiguration, 'tilgangsrestriksjon'),
            paragraph: fieldToString(data.applicantConfiguration, 'skjermingshjemmel'),
        },
    }
}