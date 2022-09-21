import {IFormConfiguration} from "../integration/types/Form/FormData";
import {VALUE_BUILDER_STRATEGY} from "../integration/types/ValueBuilderStrategy.enum";
import {createValueBuilder} from "./ValueBuilderUtil";
import {newIConfiguration} from "../integration/types/Configuration";

export function toNewConfiguration(data: IFormConfiguration, integrationId?: string, configurationId?: string, metadataId?: number,): newIConfiguration {
    return {
        integrationId: integrationId,
        configurationId: configurationId,
        completed: data.completed,
        metadataId: metadataId,
        comment: data.comment,
        configurationFields: [
            {
                key: 'case',
                children: [
                    {
                        key: "tittel",
                        valueBuildStrategy: VALUE_BUILDER_STRATEGY.COMBINE_STRING_VALUE,
                        valueBuilder: createValueBuilder(data.caseData?.title)
                    },
                    {
                        key: "offentligTittel",
                        valueBuildStrategy: VALUE_BUILDER_STRATEGY.COMBINE_STRING_VALUE,
                        valueBuilder: createValueBuilder(data.caseData?.publicTitle)
                    },
                    {
                        key: "saksmappetype",
                        valueBuildStrategy: VALUE_BUILDER_STRATEGY.FIXED_ARCHIVE_CODE_VALUE,
                        valueBuilder: {
                            value: data.caseData?.caseType
                        }
                    },
                    {
                        key: 'administrativenhet',
                        valueBuildStrategy: VALUE_BUILDER_STRATEGY.FIXED_ARCHIVE_CODE_VALUE,
                        valueBuilder: {
                            value: data.caseData?.administrativeUnit
                        }
                    },
                    {
                        key: "arkivdel",
                        valueBuildStrategy: VALUE_BUILDER_STRATEGY.FIXED_ARCHIVE_CODE_VALUE,
                        valueBuilder: {
                            value: data.caseData?.archiveUnit
                        }
                    },
                    {
                        key: "journalenhet",
                        valueBuildStrategy: VALUE_BUILDER_STRATEGY.FIXED_ARCHIVE_CODE_VALUE,
                        valueBuilder: {
                            value: data.caseData?.recordUnit
                        }
                    },
                    {
                        key: "status",
                        valueBuildStrategy: VALUE_BUILDER_STRATEGY.FIXED_ARCHIVE_CODE_VALUE,
                        valueBuilder: {
                            value: data.caseData?.status
                        }
                    },
                    {
                        key: "tilgangsrestriksjon",
                        valueBuildStrategy: VALUE_BUILDER_STRATEGY.FIXED_ARCHIVE_CODE_VALUE,
                        valueBuilder: {
                            value: data.caseData?.accessCode
                        }
                    },
                    {
                        key: "skjermingshjemmel",
                        valueBuildStrategy: VALUE_BUILDER_STRATEGY.FIXED_ARCHIVE_CODE_VALUE,
                        valueBuilder: {
                            value: data.caseData?.paragraph
                        }
                    },
                    {
                        key: "saksansvarlig",
                        valueBuildStrategy: VALUE_BUILDER_STRATEGY.FIXED_ARCHIVE_CODE_VALUE,
                        valueBuilder: {
                            value: data.caseData?.caseWorker
                        }
                    },
                    {
                        key: "primarordningsprinsipp",
                        valueBuildStrategy: VALUE_BUILDER_STRATEGY.COMBINE_STRING_VALUE,
                        valueBuilder: createValueBuilder(data.caseData?.primaryClassification)
                    },
                    {
                        key: "sekundarordningsprinsipp",
                        valueBuildStrategy: VALUE_BUILDER_STRATEGY.COMBINE_STRING_VALUE,
                        valueBuilder: createValueBuilder(data.caseData?.secondaryClassification)
                    },
                    {
                        key: "tertiarordningsprinsipp",
                        valueBuildStrategy: VALUE_BUILDER_STRATEGY.COMBINE_STRING_VALUE,
                        valueBuilder: createValueBuilder(data.caseData?.tertiaryClassification)
                    },
                    {
                        key: "primarklasse",
                        valueBuildStrategy: VALUE_BUILDER_STRATEGY.COMBINE_STRING_VALUE,
                        valueBuilder: createValueBuilder(data.caseData?.primaryClass),
                    },
                    {
                        key: "sekundarklasse",
                        valueBuildStrategy: VALUE_BUILDER_STRATEGY.FIXED_ARCHIVE_CODE_VALUE,
                        valueBuilder: createValueBuilder(data.caseData?.secondaryClass)
                    },
                    {
                        key: "tertiarklasse",
                        valueBuildStrategy: VALUE_BUILDER_STRATEGY.FIXED_ARCHIVE_CODE_VALUE,
                        valueBuilder: createValueBuilder(data.caseData?.tertiaryClass)
                    },
                    {
                        key: "primartittel",
                        valueBuildStrategy: VALUE_BUILDER_STRATEGY.COMBINE_STRING_VALUE,
                        valueBuilder: createValueBuilder(data.caseData?.primaryTitle)
                    },
                    {
                        key: "sekundartittel",
                        valueBuildStrategy: VALUE_BUILDER_STRATEGY.COMBINE_STRING_VALUE,
                        valueBuilder: createValueBuilder(data.caseData?.secondaryTitle)
                    },
                    {
                        key: "tertiartittel",
                        valueBuildStrategy: VALUE_BUILDER_STRATEGY.COMBINE_STRING_VALUE,
                        valueBuilder: createValueBuilder(data.caseData?.tertiaryTitle)
                    }
                ]
            },
            {
                key: 'record',
                children: [
                    {
                        key: "tittel",
                        valueBuildStrategy: VALUE_BUILDER_STRATEGY.COMBINE_STRING_VALUE,
                        valueBuilder: createValueBuilder(data.recordData?.title)

                    },
                    {
                        key: "offentigTittel",
                        valueBuildStrategy: VALUE_BUILDER_STRATEGY.COMBINE_STRING_VALUE,
                        valueBuilder: createValueBuilder(data.recordData?.publicTitle)

                    },
                    {
                        key: "DokumentBeskrivelse.dokumentType",
                        valueBuildStrategy: VALUE_BUILDER_STRATEGY.FIXED_ARCHIVE_CODE_VALUE,
                        valueBuilder: {
                            value: data.recordData?.documentType
                        }
                    },
                    {
                        key: "administrativenhet",
                        valueBuildStrategy: VALUE_BUILDER_STRATEGY.FIXED_ARCHIVE_CODE_VALUE,
                        valueBuilder: {
                            value: data.recordData?.administrativeUnit
                        }
                    },
                    {
                        key: "journalstatus",
                        valueBuildStrategy: VALUE_BUILDER_STRATEGY.FIXED_ARCHIVE_CODE_VALUE,
                        valueBuilder: {
                            value: data.recordData?.recordStatus
                        }
                    },
                    {
                        key: "journalposttype",
                        valueBuildStrategy: VALUE_BUILDER_STRATEGY.FIXED_ARCHIVE_CODE_VALUE,
                        valueBuilder: {
                            value: data.recordData?.recordType
                        }
                    },
                    {
                        key: "saksbehandler",
                        valueBuildStrategy: VALUE_BUILDER_STRATEGY.FIXED_ARCHIVE_CODE_VALUE,
                        valueBuilder: {
                            value: data.recordData?.caseWorker
                        }
                    },
                    {
                        key: "tilgangsrestriksjon",
                        valueBuildStrategy: VALUE_BUILDER_STRATEGY.FIXED_ARCHIVE_CODE_VALUE,
                        valueBuilder: {
                            value: data.recordData?.accessCode
                        }
                    },
                    {
                        key: "skjermingshjemmel",
                        valueBuildStrategy: VALUE_BUILDER_STRATEGY.FIXED_ARCHIVE_CODE_VALUE,
                        valueBuilder: {
                            value: data.recordData?.paragraph
                        }
                    }
                ]
            },
            {
                key: 'document',
                children: [
                    {
                        key: "tittel",
                        valueBuildStrategy: VALUE_BUILDER_STRATEGY.COMBINE_STRING_VALUE,
                        valueBuilder: createValueBuilder(data.documentData?.title)
                    },
                    {
                        key: "dokumentStatus",
                        valueBuildStrategy: VALUE_BUILDER_STRATEGY.FIXED_ARCHIVE_CODE_VALUE,
                        valueBuilder: {
                            value: data.documentData?.documentStatus
                        }
                    },
                    //TODO: what is the corresponding field here
                    {
                        key: "DokumentBeskrivelse.dokumentKategori",
                        valueBuildStrategy: VALUE_BUILDER_STRATEGY.FIXED_ARCHIVE_CODE_VALUE,
                        valueBuilder: {
                            value: data.documentData?.documentCategory
                        }
                    },
                    {
                        key: "tilgangsrestriksjon",
                        valueBuildStrategy: VALUE_BUILDER_STRATEGY.FIXED_ARCHIVE_CODE_VALUE,
                        valueBuilder: {
                            value: data.documentData?.accessCode
                        }
                    },
                    {
                        key: "skjermingshjemmel",
                        valueBuildStrategy: VALUE_BUILDER_STRATEGY.FIXED_ARCHIVE_CODE_VALUE,
                        valueBuilder: {
                            value: data.documentData?.paragraph
                        }
                    },
                    {
                        key: "DokumentBeskrivelse.dokumentObjekt.variantFormat",
                        valueBuildStrategy: VALUE_BUILDER_STRATEGY.FIXED_ARCHIVE_CODE_VALUE,
                        valueBuilder: {
                            value: data.documentData?.variant
                        }
                    }
                ]
            },
            {
                key: 'applicant',
                children: [
                    {
                        key: "organisasjonsnummer",
                        valueBuildStrategy: VALUE_BUILDER_STRATEGY.COMBINE_STRING_VALUE,
                        valueBuilder: createValueBuilder(data.applicantData?.organisationNumber)
                    },
                    {
                        key: "fødselsnummer",
                        valueBuildStrategy: VALUE_BUILDER_STRATEGY.COMBINE_STRING_VALUE,
                        valueBuilder: createValueBuilder(data.applicantData?.nationalIdentityNumber)
                    },
                    {
                        key: "KorrespondansepartNavn",
                        valueBuildStrategy: VALUE_BUILDER_STRATEGY.COMBINE_STRING_VALUE,
                        valueBuilder: createValueBuilder(data.applicantData?.name)
                    },
                    {
                        key: "Adresse.adresselinje",
                        valueBuildStrategy: VALUE_BUILDER_STRATEGY.COMBINE_STRING_VALUE,
                        valueBuilder: createValueBuilder(data.applicantData?.address)
                    },
                    {
                        key: "Adresse.postnummer",
                        valueBuildStrategy: VALUE_BUILDER_STRATEGY.COMBINE_STRING_VALUE,
                        valueBuilder: createValueBuilder(data.applicantData?.postalCode)
                    },
                    {
                        key: "Adresse.poststed",
                        valueBuildStrategy: VALUE_BUILDER_STRATEGY.COMBINE_STRING_VALUE,
                        valueBuilder: createValueBuilder(data.applicantData?.city)
                    },
                    {
                        key: "kontaktperson",
                        valueBuildStrategy: VALUE_BUILDER_STRATEGY.COMBINE_STRING_VALUE,
                        valueBuilder: createValueBuilder(data.applicantData?.contactPerson)
                    },
                    {
                        key: "Kontaktinformasjon.mobiltelefonnummer",
                        valueBuildStrategy: VALUE_BUILDER_STRATEGY.COMBINE_STRING_VALUE,
                        valueBuilder: createValueBuilder(data.applicantData?.phoneNumber)
                    },
                    {
                        key: "Kontaktinformasjon.epostadresse",
                        valueBuildStrategy: VALUE_BUILDER_STRATEGY.COMBINE_STRING_VALUE,
                        valueBuilder: createValueBuilder(data.applicantData?.email)
                    },
                    {
                        key: "tilgangsrestriksjon",
                        valueBuildStrategy: VALUE_BUILDER_STRATEGY.FIXED_ARCHIVE_CODE_VALUE,
                        valueBuilder: {
                            value: data.applicantData?.accessCode
                        }
                    },
                    {
                        key: "skjermingshjemmel",
                        valueBuildStrategy: VALUE_BUILDER_STRATEGY.FIXED_ARCHIVE_CODE_VALUE,
                        valueBuilder: {
                            value: data.applicantData?.paragraph
                        }
                    }
                ]
            }
        ]
    }
}

