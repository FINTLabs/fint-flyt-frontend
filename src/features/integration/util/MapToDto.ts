import IFormData from "../types/Form/FormData";
import {ConfigurationDto} from "../types/ConfigurationDto";
import {createValueBuilder} from "./util";
import {VALUE_BUILDER_STRATEGY} from "../types/ValueBuilderStrategy.enum";

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
                    valueBuilder: createValueBuilder(data.recordData?.title?.value)
                },
                {
                    field: "offentigTittel",
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.COMBINE_STRING_VALUE,
                    valueBuilder: createValueBuilder(data.recordData?.publicTitle?.value)
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
                    valueBuilder: createValueBuilder(data.documentData?.title?.value)
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
                    valueBuilder: createValueBuilder(data.applicantData?.name?.value)
                },
                {
                    field: "adresselinje",
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.COMBINE_STRING_VALUE,
                    valueBuilder: createValueBuilder(data.applicantData?.address?.value)
                },
                {
                    field: "postnummer",
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.COMBINE_STRING_VALUE,
                    valueBuilder: createValueBuilder(data.applicantData?.postalCode?.value)
                },
                {
                    field: "poststed",
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.COMBINE_STRING_VALUE,
                    valueBuilder: createValueBuilder(data.applicantData?.city?.value)
                },
                {
                    field: "kontaktperson",
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.COMBINE_STRING_VALUE,
                    valueBuilder: createValueBuilder(data.applicantData?.contact?.value)
                },
                {
                    field: "telefonnummer",
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.COMBINE_STRING_VALUE,
                    valueBuilder: createValueBuilder(data.applicantData?.phoneNumber?.value)
                },
                {
                    field: "epostadresse",
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.COMBINE_STRING_VALUE,
                    valueBuilder: createValueBuilder(data.applicantData?.email?.value)
                },
                {
                    field: "skjerming",
                    valueBuildStrategy: VALUE_BUILDER_STRATEGY.FIXED_ARCHIVE_CODE_VALUE,
                    valueBuilder: {
                        value: data.applicantData?.hidden
                    }
                }
            ]
        }
    }
}