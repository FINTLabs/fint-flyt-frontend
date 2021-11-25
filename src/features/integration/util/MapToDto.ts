import IFormData from "../types/Form/FormData";
import {ConfigurationDto} from "../types/ConfigurationDto";
import {createValueBuilder, VALUE_BUILDER_STRATEGY} from "./util";

export function mapToDto(data: IFormData): ConfigurationDto {
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
                    valueBuilder: createValueBuilder(data.caseData?.title?.value)
                },
                {
                    field: "offentligTittel",
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.COMBINE_STRING_VALUE,
                    valueBuilder: createValueBuilder(data.caseData?.publicTitle?.value)
                },
                {
                    field: "sakstype",
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.FIXED_ARCHIVE_CODE_VALUE,
                    valueBuilder: {
                        value: data.caseData?.caseType
                    }
                },
                {
                    field: 'administrativEnhet',
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.FIXED_ARCHIVE_CODE_VALUE,
                    valueBuilder: {
                        value: data.caseData?.administrativeUnit
                    }
                },
                {
                    field: "arkivenhet",
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
                    field: "tilgangskode",
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.FIXED_ARCHIVE_CODE_VALUE,
                    valueBuilder: {
                        value: data.caseData?.accessCode
                    }
                },
                {
                    field: "hjemmel",
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
                    field: "klassifisering",
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.COMBINE_STRING_VALUE,
                    valueBuilder: createValueBuilder(data.caseData?.classification?.value)
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
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.FIXED_ARCHIVE_CODE_VALUE,
                    valueBuilder: {
                        value: data.caseData?.secondaryClass
                    }
                },
                {
                    field: "opprettetAv",
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.FIXED_ARCHIVE_CODE_VALUE,
                    valueBuilder: {
                        value: data.caseData?.createdBy
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
                        value: data.recordData?.title,
                        properties: []
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
                    field: "dokumentkategori",
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.FIXED_ARCHIVE_CODE_VALUE,
                    valueBuilder: {
                        value: data.recordData?.category
                    }
                },
                {
                    field: "administrativEnhet",
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.FIXED_ARCHIVE_CODE_VALUE,
                    valueBuilder: {
                        value: data.recordData?.administrativeUnit
                    }
                },
                {
                    field: "status",
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.FIXED_ARCHIVE_CODE_VALUE,
                    valueBuilder: {
                        value: data.recordData?.status
                    }
                },
                {
                    field: "saksansvarlig",
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.FIXED_ARCHIVE_CODE_VALUE,
                    valueBuilder: {
                        value: data.recordData?.caseWorker
                    }
                },
                {
                    field: "hjemmel",
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
                    field: "tilgangskode",
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.FIXED_ARCHIVE_CODE_VALUE,
                    valueBuilder: {
                        value: data.documentData?.accessCode
                    }
                },
                {
                    field: "hjemmel",
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.FIXED_ARCHIVE_CODE_VALUE,
                    valueBuilder: {
                        value: data.documentData?.paragraph
                    }
                },
                {
                    field: "variant",
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.FIXED_ARCHIVE_CODE_VALUE,
                    valueBuilder: {
                        value: data.documentData?.variant
                    }
                },
                {
                    field: "format",
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
                    field: "navn",
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.COMBINE_STRING_VALUE,
                    valueBuilder: {
                        value: data.applicantData?.name
                    }
                },
                {
                    field: "adresselinje",
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.COMBINE_STRING_VALUE,
                    valueBuilder: {
                        value: data.applicantData?.address
                    }
                },
                {
                    field: "postnummer",
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.COMBINE_STRING_VALUE,
                    valueBuilder: {
                        value: data.applicantData?.postalCode
                    }
                },
                {
                    field: "poststed",
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.COMBINE_STRING_VALUE,
                    valueBuilder: {
                        value: data.applicantData?.city
                    }
                },
                {
                    field: "telefonnummer",
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.COMBINE_STRING_VALUE,
                    valueBuilder: {
                        value: data.applicantData?.address
                    }
                },
                {
                    field: "epostadresse",
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.COMBINE_STRING_VALUE,
                    valueBuilder: {
                        value: data.applicantData?.email
                    }
                },
                {
                    field: "skjerming",
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.FIXED_ARCHIVE_CODE_VALUE,
                    valueBuilder: {
                        value: data.applicantData?.visibility
                    }
                }
            ]
        }
    }
}