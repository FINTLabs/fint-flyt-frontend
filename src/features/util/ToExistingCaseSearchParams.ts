import {VALUE_BUILDER_STRATEGY} from "../integration/types/ValueBuilderStrategy.enum";
import {createValueBuilder} from "./ValueBuilderUtil";
import {IField} from "../integration/types/Field";

export function toExistingCaseSearchParams(data: any): IField[] {
    return [
        {
            field: "primarordningsprinsipp",
            valueBuildStrategy: VALUE_BUILDER_STRATEGY.FIXED_ARCHIVE_CODE_VALUE,
            valueBuilder: {
                value: data.primaryClassification
            }
        },
        {
            field: "primarklasse",
            valueBuildStrategy: VALUE_BUILDER_STRATEGY.COMBINE_STRING_VALUE,
            valueBuilder: createValueBuilder(data.primaryClass),
        },
        {
            field: "primartittel",
            valueBuildStrategy: VALUE_BUILDER_STRATEGY.COMBINE_STRING_VALUE,
            valueBuilder: createValueBuilder(data.primaryTitle)
        },
        {
            field: "sekundarordningsprinsipp",
            valueBuildStrategy: VALUE_BUILDER_STRATEGY.FIXED_ARCHIVE_CODE_VALUE,
            valueBuilder: {
                value: data.secondaryClassification
            }
        },
        {
            field: "sekundarklasse",
            valueBuildStrategy: VALUE_BUILDER_STRATEGY.FIXED_ARCHIVE_CODE_VALUE,
            valueBuilder: {
                value: data.secondaryClass
            }
        },
        {
            field: "sekundartittel",
            valueBuildStrategy: VALUE_BUILDER_STRATEGY.COMBINE_STRING_VALUE,
            valueBuilder: createValueBuilder(data.secondaryTitle)
        },
        {
            field: "tertiarordningsprinsipp",
            valueBuildStrategy: VALUE_BUILDER_STRATEGY.FIXED_ARCHIVE_CODE_VALUE,
            valueBuilder: {
                value: data.tertiaryClassification
            }
        },        {
            field: "tertiarklasse",
            valueBuildStrategy: VALUE_BUILDER_STRATEGY.FIXED_ARCHIVE_CODE_VALUE,
            valueBuilder: {
                value: data.tertiaryClass
            }
        },
        {
            field: "tertiartittel",
            valueBuildStrategy: VALUE_BUILDER_STRATEGY.COMBINE_STRING_VALUE,
            valueBuilder: createValueBuilder(data.tertiaryTitle)
        },
        {
            field: "arkivdel",
            valueBuildStrategy: VALUE_BUILDER_STRATEGY.FIXED_ARCHIVE_CODE_VALUE,
            valueBuilder: {
                value: data.caseData?.archiveUnit
            }
        },
        {
            field: "tilgangsrestriksjon",
            valueBuildStrategy: VALUE_BUILDER_STRATEGY.FIXED_ARCHIVE_CODE_VALUE,
            valueBuilder: {
                value: data.caseData?.accessCode
            }
        },
    ]
}
