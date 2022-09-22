import {VALUE_BUILDER_STRATEGY} from "./ValueBuilderStrategy.enum";
import {ValueBuilder} from "./ValueBuilder";


export interface IConfigurationField {
    key: string;
    valueBuildStrategy?: VALUE_BUILDER_STRATEGY,
    valueBuilder?: ValueBuilder;
    children?: IConfigurationField[];
}

export interface newIConfiguration {
    configurationId?: string;
    integrationId?: string;
    comment?: string;
    version?: number;
    metadataId?: number;
    completed?: boolean;

    configurationFields: IConfigurationField[];
}
