import {FieldConfigurationType, IConfigurationPatch, newIConfiguration} from "../../integration/types/Configuration";
import { IFormConfiguration } from "../../integration/types/Form/FormData";

export function toNewConfiguration(data: IFormConfiguration, integrationId: string, configurationId: any, metadataId: number): newIConfiguration {
    console.log(data)
    return {
        integrationId: integrationId,
        id: configurationId,
        completed: data.completed,
        integrationMetadataId: metadataId,
        comment: data.comment,
        elements: [
            {
                key: 'case',
                fieldConfigurations: [
                    {
                        key: "creationStrategy",
                        type: FieldConfigurationType.STRING,
                        value: data.caseData.caseCreationStrategy
                    },
                    {
                        key: "tittel",
                        type: FieldConfigurationType.DYNAMIC_STRING,
                        value: data.caseData?.title
                    },
                    {
                        key: "offentligTittel",
                        type: FieldConfigurationType.DYNAMIC_STRING,
                        value: data.caseData?.publicTitle
                    },
                    {
                        key: "saksmappetype",
                        type: FieldConfigurationType.STRING,
                        value: data.caseData?.caseType
                    },
                    {
                        key: 'administrativenhet',
                        type: FieldConfigurationType.STRING,
                        value: data.caseData?.administrativeUnit

                    },
                    {
                        key: "arkivdel",
                        type: FieldConfigurationType.STRING,
                        value: data.caseData?.archiveUnit

                    },
                    {
                        key: "journalenhet",
                        type: FieldConfigurationType.STRING,
                        value: data.caseData?.recordUnit

                    },
                    {
                        key: "status",
                        type: FieldConfigurationType.STRING,
                        value: data.caseData?.status

                    },
                    {
                        key: "tilgangsrestriksjon",
                        type: FieldConfigurationType.STRING,
                        value: data.caseData?.accessCode

                    },
                    {
                        key: "skjermingshjemmel",
                        type: FieldConfigurationType.STRING,
                        value: data.caseData?.paragraph

                    },
                    {
                        key: "saksansvarlig",
                        type: FieldConfigurationType.STRING,
                        value: data.caseData?.caseWorker

                    },
                    {
                        key: "primarordningsprinsipp",
                        type: FieldConfigurationType.STRING,
                        value: data.caseData?.primaryClassification
                    },
                    {
                        key: "sekundarordningsprinsipp",
                        type: FieldConfigurationType.STRING,
                        value: data.caseData?.secondaryClassification
                    },
                    {
                        key: "tertiarordningsprinsipp",
                        type: FieldConfigurationType.STRING,
                        value: data.caseData?.tertiaryClassification
                    },
                    {
                        key: "primarklasse",
                        type: FieldConfigurationType.DYNAMIC_STRING,
                        value: data.caseData?.primaryClass
                    },
                    {
                        key: "sekundarklasse",
                        type: FieldConfigurationType.DYNAMIC_STRING,
                        value: data.caseData?.secondaryClass
                    },
                    {
                        key: "tertiarklasse",
                        type: FieldConfigurationType.DYNAMIC_STRING,
                        value: data.caseData?.tertiaryClass
                    },
                    {
                        key: "primartittel",
                        type: FieldConfigurationType.DYNAMIC_STRING,
                        value: data.caseData?.primaryTitle
                    },
                    {
                        key: "sekundartittel",
                        type: FieldConfigurationType.DYNAMIC_STRING,
                        value: data.caseData?.secondaryTitle
                    },
                    {
                        key: "tertiartittel",
                        type: FieldConfigurationType.DYNAMIC_STRING,
                        value: data.caseData?.tertiaryTitle
                    }
                ]
            },
            {
                key: 'record',
                fieldConfigurations: [
                    {
                        key: "tittel",
                        type: FieldConfigurationType.DYNAMIC_STRING,
                        value: data.recordData?.title


                    },
                    {
                        key: "offentigTittel",
                        type: FieldConfigurationType.DYNAMIC_STRING,
                        value: data.recordData?.publicTitle

                    },
                    {
                        key: "DokumentBeskrivelse.dokumentType",
                        type: FieldConfigurationType.STRING,
                        value: data.recordData?.documentType

                    },
                    {
                        key: "administrativenhet",
                        type: FieldConfigurationType.STRING,
                        value: data.recordData?.administrativeUnit

                    },
                    {
                        key: "journalstatus",
                        type: FieldConfigurationType.STRING,
                        value: data.recordData?.recordStatus
                    },
                    {
                        key: "journalposttype",
                        type: FieldConfigurationType.STRING,
                        value: data.recordData?.recordType
                    },
                    {
                        key: "saksbehandler",
                        type: FieldConfigurationType.STRING,
                        value: data.recordData?.caseWorker

                    },
                    {
                        key: "tilgangsrestriksjon",
                        type: FieldConfigurationType.STRING,
                        value: data.recordData?.accessCode

                    },
                    {
                        key: "skjermingshjemmel",
                        type: FieldConfigurationType.STRING,
                        value: data.recordData?.paragraph
                    }
                ]
            },
            {
                key: 'document',
                fieldConfigurations: [
                    {
                        key: "tittel",
                        type: FieldConfigurationType.DYNAMIC_STRING,
                        value: data.documentData?.title
                    },
                    {
                        key: "dokumentStatus",
                        type: FieldConfigurationType.STRING,
                        value: data.documentData?.documentStatus
                    },
                    //TODO: what is the corresponding field here
                    {
                        key: "DokumentBeskrivelse.dokumentKategori",
                        type: FieldConfigurationType.STRING,
                        value: data.documentData?.documentCategory
                    },
                    {
                        key: "tilgangsrestriksjon",
                        type: FieldConfigurationType.STRING,
                        value: data.documentData?.accessCode
                    },
                    {
                        key: "skjermingshjemmel",
                        type: FieldConfigurationType.STRING,
                        value: data.documentData?.paragraph

                    },
                    {
                        key: "DokumentBeskrivelse.dokumentObjekt.variantFormat",
                        type: FieldConfigurationType.STRING,
                        value: data.documentData?.variant
                    }
                ]
            },
            {
                key: 'applicant',
                fieldConfigurations: [
                    {
                        key: "type",
                        type: FieldConfigurationType.STRING,
                        value: data.applicantData?.type
                    },
                    {
                        key: "protected",
                        type: FieldConfigurationType.BOOLEAN,
                        value: data.applicantData?.protected?.toString()
                    },
                    {
                        key: "organisasjonsnummer",
                        type: FieldConfigurationType.DYNAMIC_STRING,
                        value: data.applicantData?.organisationNumber
                    },
                    {
                        key: "fødselsnummer",
                        type: FieldConfigurationType.DYNAMIC_STRING,
                        value: data.applicantData?.organisationNumber
                    },
                    {
                        key: "KorrespondansepartNavn",
                        type: FieldConfigurationType.DYNAMIC_STRING,
                        value: data.applicantData?.name
                    },
                    {
                        key: "Adresse.adresselinje",
                        type: FieldConfigurationType.DYNAMIC_STRING,
                        value: data.applicantData?.address
                    },
                    {
                        key: "Adresse.postnummer",
                        type: FieldConfigurationType.DYNAMIC_STRING,
                        value: data.applicantData?.postalCode
                    },
                    {
                        key: "Adresse.poststed",
                        type: FieldConfigurationType.DYNAMIC_STRING,
                        value: data.applicantData?.city
                    },
                    {
                        key: "kontaktperson",
                        type: FieldConfigurationType.DYNAMIC_STRING,
                        value: data.applicantData?.contactPerson
                    },
                    {
                        key: "Kontaktinformasjon.mobiltelefonnummer",
                        type: FieldConfigurationType.DYNAMIC_STRING,
                        value: data.applicantData?.phoneNumber
                    },
                    {
                        key: "Kontaktinformasjon.epostadresse",
                        type: FieldConfigurationType.DYNAMIC_STRING,
                        value: data.applicantData?.email
                    },
                    {
                        key: "tilgangsrestriksjon",
                        type: FieldConfigurationType.STRING,
                        value: data.applicantData?.accessCode
                    },
                    {
                        key: "skjermingshjemmel",
                        type: FieldConfigurationType.STRING,
                        value: data.applicantData?.paragraph
                    }
                ]
            }
        ]
    }
}

export function toConfigurationPatch(data: IFormConfiguration, metadataId: any): IConfigurationPatch {
    return {
        completed: data.completed,
        integrationMetadataId: metadataId,
        comment: data.comment,
        elements: [
            {
                key: 'case',
                fieldConfigurations: [
                    {
                        key: "creationStrategy",
                        type: FieldConfigurationType.STRING,
                        value: data.caseData.caseCreationStrategy
                    },
                    {
                        key: "tittel",
                        type: FieldConfigurationType.DYNAMIC_STRING,
                        value: data.caseData?.title
                    },
                    {
                        key: "offentligTittel",
                        type: FieldConfigurationType.DYNAMIC_STRING,
                        value: data.caseData?.publicTitle
                    },
                    {
                        key: "saksmappetype",
                        type: FieldConfigurationType.STRING,
                        value: data.caseData?.caseType
                    },
                    {
                        key: 'administrativenhet',
                        type: FieldConfigurationType.STRING,
                        value: data.caseData?.administrativeUnit

                    },
                    {
                        key: "arkivdel",
                        type: FieldConfigurationType.STRING,
                        value: data.caseData?.archiveUnit

                    },
                    {
                        key: "journalenhet",
                        type: FieldConfigurationType.STRING,
                        value: data.caseData?.recordUnit

                    },
                    {
                        key: "status",
                        type: FieldConfigurationType.STRING,
                        value: data.caseData?.status

                    },
                    {
                        key: "tilgangsrestriksjon",
                        type: FieldConfigurationType.STRING,
                        value: data.caseData?.accessCode

                    },
                    {
                        key: "skjermingshjemmel",
                        type: FieldConfigurationType.STRING,
                        value: data.caseData?.paragraph

                    },
                    {
                        key: "saksansvarlig",
                        type: FieldConfigurationType.STRING,
                        value: data.caseData?.caseWorker

                    },
                    {
                        key: "primarordningsprinsipp",
                        type: FieldConfigurationType.STRING,
                        value: data.caseData?.primaryClassification
                    },
                    {
                        key: "sekundarordningsprinsipp",
                        type: FieldConfigurationType.STRING,
                        value: data.caseData?.secondaryClassification
                    },
                    {
                        key: "tertiarordningsprinsipp",
                        type: FieldConfigurationType.STRING,
                        value: data.caseData?.tertiaryClassification
                    },
                    {
                        key: "primarklasse",
                        type: FieldConfigurationType.DYNAMIC_STRING,
                        value: data.caseData?.primaryClass
                    },
                    {
                        key: "sekundarklasse",
                        type: FieldConfigurationType.DYNAMIC_STRING,
                        value: data.caseData?.secondaryClass
                    },
                    {
                        key: "tertiarklasse",
                        type: FieldConfigurationType.DYNAMIC_STRING,
                        value: data.caseData?.tertiaryClass
                    },
                    {
                        key: "primartittel",
                        type: FieldConfigurationType.DYNAMIC_STRING,
                        value: data.caseData?.primaryTitle
                    },
                    {
                        key: "sekundartittel",
                        type: FieldConfigurationType.DYNAMIC_STRING,
                        value: data.caseData?.secondaryTitle
                    },
                    {
                        key: "tertiartittel",
                        type: FieldConfigurationType.DYNAMIC_STRING,
                        value: data.caseData?.tertiaryTitle
                    }
                ]
            },
            {
                key: 'record',
                fieldConfigurations: [
                    {
                        key: "tittel",
                        type: FieldConfigurationType.DYNAMIC_STRING,
                        value: data.recordData?.title


                    },
                    {
                        key: "offentigTittel",
                        type: FieldConfigurationType.DYNAMIC_STRING,
                        value: data.recordData?.publicTitle

                    },
                    {
                        key: "DokumentBeskrivelse.dokumentType",
                        type: FieldConfigurationType.STRING,
                        value: data.recordData?.documentType

                    },
                    {
                        key: "administrativenhet",
                        type: FieldConfigurationType.STRING,
                        value: data.recordData?.administrativeUnit

                    },
                    {
                        key: "journalstatus",
                        type: FieldConfigurationType.STRING,
                        value: data.recordData?.recordStatus
                    },
                    {
                        key: "journalposttype",
                        type: FieldConfigurationType.STRING,
                        value: data.recordData?.recordType
                    },
                    {
                        key: "saksbehandler",
                        type: FieldConfigurationType.STRING,
                        value: data.recordData?.caseWorker

                    },
                    {
                        key: "tilgangsrestriksjon",
                        type: FieldConfigurationType.STRING,
                        value: data.recordData?.accessCode

                    },
                    {
                        key: "skjermingshjemmel",
                        type: FieldConfigurationType.STRING,
                        value: data.recordData?.paragraph
                    }
                ]
            },
            {
                key: 'document',
                fieldConfigurations: [
                    {
                        key: "tittel",
                        type: FieldConfigurationType.DYNAMIC_STRING,
                        value: data.documentData?.title
                    },
                    {
                        key: "dokumentStatus",
                        type: FieldConfigurationType.STRING,
                        value: data.documentData?.documentStatus
                    },
                    //TODO: what is the corresponding field here
                    {
                        key: "DokumentBeskrivelse.dokumentKategori",
                        type: FieldConfigurationType.STRING,
                        value: data.documentData?.documentCategory
                    },
                    {
                        key: "tilgangsrestriksjon",
                        type: FieldConfigurationType.STRING,
                        value: data.documentData?.accessCode
                    },
                    {
                        key: "skjermingshjemmel",
                        type: FieldConfigurationType.STRING,
                        value: data.documentData?.paragraph

                    },
                    {
                        key: "DokumentBeskrivelse.dokumentObjekt.variantFormat",
                        type: FieldConfigurationType.STRING,
                        value: data.documentData?.variant
                    }
                ]
            },
            {
                key: 'applicant',
                fieldConfigurations: [
                    {
                        key: "type",
                        type: FieldConfigurationType.STRING,
                        value: data.applicantData?.type
                    },
                    {
                        key: "protected",
                        type: FieldConfigurationType.BOOLEAN,
                        value: data.applicantData?.protected?.toString()
                    },
                    {
                        key: "organisasjonsnummer",
                        type: FieldConfigurationType.DYNAMIC_STRING,
                        value: data.applicantData?.organisationNumber
                    },
                    {
                        key: "fødselsnummer",
                        type: FieldConfigurationType.DYNAMIC_STRING,
                        value: data.applicantData?.organisationNumber
                    },
                    {
                        key: "KorrespondansepartNavn",
                        type: FieldConfigurationType.DYNAMIC_STRING,
                        value: data.applicantData?.name
                    },
                    {
                        key: "Adresse.adresselinje",
                        type: FieldConfigurationType.DYNAMIC_STRING,
                        value: data.applicantData?.address
                    },
                    {
                        key: "Adresse.postnummer",
                        type: FieldConfigurationType.DYNAMIC_STRING,
                        value: data.applicantData?.postalCode
                    },
                    {
                        key: "Adresse.poststed",
                        type: FieldConfigurationType.DYNAMIC_STRING,
                        value: data.applicantData?.city
                    },
                    {
                        key: "kontaktperson",
                        type: FieldConfigurationType.DYNAMIC_STRING,
                        value: data.applicantData?.contactPerson
                    },
                    {
                        key: "Kontaktinformasjon.mobiltelefonnummer",
                        type: FieldConfigurationType.DYNAMIC_STRING,
                        value: data.applicantData?.phoneNumber
                    },
                    {
                        key: "Kontaktinformasjon.epostadresse",
                        type: FieldConfigurationType.DYNAMIC_STRING,
                        value: data.applicantData?.email
                    },
                    {
                        key: "tilgangsrestriksjon",
                        type: FieldConfigurationType.STRING,
                        value: data.applicantData?.accessCode
                    },
                    {
                        key: "skjermingshjemmel",
                        type: FieldConfigurationType.STRING,
                        value: data.applicantData?.paragraph
                    }
                ]
            }
        ]
    }
}

