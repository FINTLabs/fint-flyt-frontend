import IFormData from "../integration/types/Form/FormData";
import {IIntegrationConfiguration} from "../integration/types/IntegrationConfiguration";
import {VALUE_BUILDER_STRATEGY} from "../integration/types/ValueBuilderStrategy.enum";
import {createValueBuilder} from "./ValueBuilderUtil";
import {CreationStrategy} from "../integration/types/CreationStrategy";

export function toIntegrationConfiguration(data: IFormData, sourceApplicationIntegrationId?: string): IIntegrationConfiguration {
    const newCaseCreationStrategy: boolean = data.caseData?.caseCreationStrategy !== CreationStrategy.COLLECTION
    return {
        name: data.name,
        description: data.description,
        sourceApplicationId: data.sourceApplicationId,
        sourceApplicationIntegrationId: data.sourceApplicationIntegrationId,
        destination: data.destination,
        published: data.published,
        caseConfiguration: newCaseCreationStrategy ?
            {
                caseCreationStrategy: data.caseData?.caseCreationStrategy,
                fields: [
                    {
                        field: "tittel",
                        valueBuildStrategy: VALUE_BUILDER_STRATEGY.COMBINE_STRING_VALUE,
                        valueBuilder: createValueBuilder(data.caseData?.title)
                    },
                    {
                        field: "offentligTittel",
                        valueBuildStrategy: VALUE_BUILDER_STRATEGY.COMBINE_STRING_VALUE,
                        valueBuilder: createValueBuilder(data.caseData?.publicTitle)
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
                        field: "status",
                        valueBuildStrategy: VALUE_BUILDER_STRATEGY.FIXED_ARCHIVE_CODE_VALUE,
                        valueBuilder: {
                            value: data.caseData?.status
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
                        valueBuilder: createValueBuilder(data.caseData?.primaryClassification)
                    },
                    {
                        field: "sekundarordningsprinsipp",
                        valueBuildStrategy: VALUE_BUILDER_STRATEGY.COMBINE_STRING_VALUE,
                        valueBuilder: createValueBuilder(data.caseData?.secondaryClassification)
                    },
                    {
                        field: "tertiarordningsprinsipp",
                        valueBuildStrategy: VALUE_BUILDER_STRATEGY.COMBINE_STRING_VALUE,
                        valueBuilder: createValueBuilder(data.caseData?.tertiaryClassification)
                    },
                    {
                        field: "primarklasse",
                        valueBuildStrategy: VALUE_BUILDER_STRATEGY.COMBINE_STRING_VALUE,
                        valueBuilder: createValueBuilder(data.caseData?.primaryClass),
                    },
                    {
                        field: "sekundarklasse",
                        valueBuildStrategy: VALUE_BUILDER_STRATEGY.FIXED_ARCHIVE_CODE_VALUE,
                        valueBuilder: createValueBuilder(data.caseData?.secondaryClass)
                    },
                    {
                        field: "tertiarklasse",
                        valueBuildStrategy: VALUE_BUILDER_STRATEGY.FIXED_ARCHIVE_CODE_VALUE,
                        valueBuilder: createValueBuilder(data.caseData?.tertiaryClass)
                    },
                    {
                        field: "primartittel",
                        valueBuildStrategy: VALUE_BUILDER_STRATEGY.COMBINE_STRING_VALUE,
                        valueBuilder: createValueBuilder(data.caseData?.primaryTitle)
                    },
                    {
                        field: "sekundartittel",
                        valueBuildStrategy: VALUE_BUILDER_STRATEGY.COMBINE_STRING_VALUE,
                        valueBuilder: createValueBuilder(data.caseData?.secondaryTitle)
                    },
                    {
                        field: "tertiartittel",
                        valueBuildStrategy: VALUE_BUILDER_STRATEGY.COMBINE_STRING_VALUE,
                        valueBuilder: createValueBuilder(data.caseData?.tertiaryTitle)
                    }
                ]
            } : {
                caseCreationStrategy: data.caseData?.caseCreationStrategy,
                caseNumber: data.caseData?.caseNumber,
                fields: []
            },
        recordConfiguration: {
            fields: [
                {
                    field: "tittel",
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.COMBINE_STRING_VALUE,
                    valueBuilder: createValueBuilder(data.recordData?.title)

                },
                {
                    field: "offentigTittel",
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.COMBINE_STRING_VALUE,
                    valueBuilder: createValueBuilder(data.recordData?.publicTitle)

                },
                {
                    field: "DokumentBeskrivelse.dokumentType",
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.FIXED_ARCHIVE_CODE_VALUE,
                    valueBuilder: {
                        value: data.recordData?.documentType
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
                        value: data.recordData?.recordStatus
                    }
                },
                {
                    field: "saksbehandler",
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.FIXED_ARCHIVE_CODE_VALUE,
                    valueBuilder: {
                        value: data.recordData?.caseWorker
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
                    valueBuilder: createValueBuilder(data.documentData?.title)
                },
                {
                    field: "dokumentStatus",
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.FIXED_ARCHIVE_CODE_VALUE,
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
                }
            ]
        },
        applicantConfiguration: {
            applicantType: data.applicantData?.type,
            organisationNumber: !!data.applicantData?.organisationNumber,
            fields: [
                data.applicantData?.type === 'ORGANISATION' ?
                    {
                    field: "organisasjonsnummer",
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.COMBINE_STRING_VALUE,
                    valueBuilder: createValueBuilder(data.applicantData?.organisationNumber)
                    } :
                    {
                    field: "fødselsnummer",
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.COMBINE_STRING_VALUE,
                    valueBuilder: createValueBuilder(data.applicantData?.nationalIdentityNumber)
                    },
                {
                    field: "KorrespondansepartNavn",
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.COMBINE_STRING_VALUE,
                    valueBuilder: createValueBuilder(data.applicantData?.name)
                },
                {
                    field: "Adresse.adresselinje",
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.COMBINE_STRING_VALUE,
                    valueBuilder: createValueBuilder(data.applicantData?.address)
                },
                {
                    field: "Adresse.postnummer",
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.COMBINE_STRING_VALUE,
                    valueBuilder: createValueBuilder(data.applicantData?.postalCode)
                },
                {
                    field: "Adresse.poststed",
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.COMBINE_STRING_VALUE,
                    valueBuilder: createValueBuilder(data.applicantData?.city)
                },
                {
                    field: "kontaktperson",
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.COMBINE_STRING_VALUE,
                    valueBuilder: createValueBuilder(data.applicantData?.contactPerson)
                },
                {
                    field: "Kontaktinformasjon.mobiltelefonnummer",
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.COMBINE_STRING_VALUE,
                    valueBuilder: createValueBuilder(data.applicantData?.phoneNumber)
                },
                {
                    field: "Kontaktinformasjon.epostadresse",
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.COMBINE_STRING_VALUE,
                    valueBuilder: createValueBuilder(data.applicantData?.email)
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
