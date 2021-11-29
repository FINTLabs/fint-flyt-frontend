import IFormData from "../types/Form/FormData";
import {IConfigurationDto} from "../types/ConfigurationDto";
import {VALUE_BUILDER_STRATEGY} from "../types/ValueBuilderStrategy.enum";

export function toIntegrationConfiguration(data: IFormData): IConfigurationDto {
    return {
        id: data.id,
        name: data.name,
        description: data.description,
        caseConfiguration: {
            caseCreationStrategy: data.caseData?.caseCreationStrategy,
            fields: [
                {
                    field: "tittel",
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.COMBINE_STRING_VALUE,
                    valueBuilder: {
                        value: data.caseData?.title
                    }
                },
                {
                    field: "offentligTittel",
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.COMBINE_STRING_VALUE,
                    valueBuilder: {
                        value: data.caseData?.publicTitle
                    }
                },
                {
                    field: "caseType",
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.FIXED_ARCHIVE_CODE_VALUE,
                    valueBuilder: {
                        value: data.caseData?.caseType
                    }
                },
                {
                    field: 'administrativenhet',
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.FIXED_ARCHIVE_CODE_VALUE,
                    valueBuilder: {
                        value: data.caseData?.administrativeUnit
                    }
                },
                {
                    field: "arkivdel",
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.FIXED_ARCHIVE_CODE_VALUE,
                    valueBuilder: {
                        value: data.caseData?.archiveUnit
                    }
                },
                {
                    field: "journalenhet",
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.FIXED_ARCHIVE_CODE_VALUE,
                    valueBuilder: {
                        value: data.caseData?.recordUnit
                    }
                },
                {
                    field: "tilgangsrestriksjon",
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.FIXED_ARCHIVE_CODE_VALUE,
                    valueBuilder: {
                        value: data.caseData?.accessCode
                    }
                },
                {
                    field: "skjermingshjemmel",
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.FIXED_ARCHIVE_CODE_VALUE,
                    valueBuilder: {
                        value: data.caseData?.paragraph
                    }
                },
                {
                    field: "saksansvarlig",
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.FIXED_ARCHIVE_CODE_VALUE,
                    valueBuilder: {
                        value: data.caseData?.caseWorker
                    }
                },
                {
                    field: "primarordningsprinsipp",
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.COMBINE_STRING_VALUE,
                    valueBuilder: {
                        value: data.caseData?.primaryClassification
                       
                    }
                },
                {
                    field: "primarklasse",
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.FIXED_ARCHIVE_CODE_VALUE,
                    valueBuilder: {
                        value: data.caseData?.primaryClass
                    }
                },
                {
                    field: "sekundarklasse",
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.COMBINE_STRING_VALUE,
                    valueBuilder: {
                        value: data.caseData?.secondaryClass
                    }
                }
            ]
        },
        recordConfiguration: {
            fields: [
                {
                    field: "tittel",
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.COMBINE_STRING_VALUE,
                    valueBuilder: {
                        value: data.recordData?.title
                    }
                },
                {
                    field: "offentigTittel",
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.COMBINE_STRING_VALUE,
                    valueBuilder: {
                        value: data.recordData?.publicTitle
                    }
                },
                {
                    field: "DokumentBeskrivelse.dokumentType",
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.FIXED_ARCHIVE_CODE_VALUE,
                    valueBuilder: {
                        value: data.recordData?.category
                    }
                },
                {
                    field: "administrativenhet",
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.FIXED_ARCHIVE_CODE_VALUE,
                    valueBuilder: {
                        value: data.recordData?.administrativeUnit
                    }
                },
                {
                    field: "journalstatus",
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.FIXED_ARCHIVE_CODE_VALUE,
                    valueBuilder: {
                        value: data.recordData?.status
                    }
                },
                {
                    field: "tilgangsrestriksjon",
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.FIXED_ARCHIVE_CODE_VALUE,
                    valueBuilder: {
                        value: data.recordData?.accessCode
                    }
                },
                {
                    field: "skjermingshjemmel",
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.FIXED_ARCHIVE_CODE_VALUE,
                    valueBuilder: {
                        value: data.recordData?.paragraph
                    }
                }
            ]
        },
        documentConfiguration: {
            fields: [
                {
                    field: "tittel",
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.COMBINE_STRING_VALUE,
                    valueBuilder: {
                        value: data.documentData?.title
                    }
                },
                {
                    field: "dokumentStatus",
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.COMBINE_STRING_VALUE,
                    valueBuilder: {
                        value: data.documentData?.documentStatus
                    }
                },
                {
                    field: "tilgangsrestriksjon",
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.FIXED_ARCHIVE_CODE_VALUE,
                    valueBuilder: {
                        value: data.documentData?.accessCode
                    }
                },
                {
                    field: "skjermingshjemmel",
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.FIXED_ARCHIVE_CODE_VALUE,
                    valueBuilder: {
                        value: data.documentData?.paragraph
                    }
                },
                {
                    field: "DokumentBeskrivelse.dokumentObjekt.variantFormat",
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.FIXED_ARCHIVE_CODE_VALUE,
                    valueBuilder: {
                        value: data.documentData?.variant
                    }
                },
                {
                    field: "DokumentBeskrivelse.dokumentObjekt.filformat",
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.FIXED_ARCHIVE_CODE_VALUE,
                    valueBuilder: {
                        value: data.documentData?.format
                    }
                }
            ]
        },
        applicantConfiguration: {
            fields: [
                {
                    field: "korrespondasepartNavn",
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.COMBINE_STRING_VALUE,
                    valueBuilder: {
                        value: data.applicantData?.name
                    }
                },
                {
                    field: "Adresse.adresselinje",
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.COMBINE_STRING_VALUE,
                    valueBuilder: {
                        value: data.applicantData?.address
                    }
                },
                {
                    field: "Adresse.postnummer",
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.COMBINE_STRING_VALUE,
                    valueBuilder: {
                        value: data.applicantData?.postalCode
                    }
                },
                {
                    field: "Adresse.poststed",
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.COMBINE_STRING_VALUE,
                    valueBuilder: {
                        value: data.applicantData?.city
                    }
                },
                {
                    field: "Kontaktinformasjon.mobiltelefonnummer",
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.COMBINE_STRING_VALUE,
                    valueBuilder: {
                        value: data.applicantData?.address
                    }
                },
                {
                    field: "Kontaktinformasjon.epostadresse",
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.COMBINE_STRING_VALUE,
                    valueBuilder: {
                        value: data.applicantData?.email
                    }
                },
                {
                    field: "tilgangsrestriksjon",
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.FIXED_ARCHIVE_CODE_VALUE,
                    valueBuilder: {
                        value: data.applicantData?.accessCode
                    }
                },
                {
                    field: "skjermingshjemmel",
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.FIXED_ARCHIVE_CODE_VALUE,
                    valueBuilder: {
                        value: data.applicantData?.paragraph
                    }
                },
            ]
        }
    }
}
