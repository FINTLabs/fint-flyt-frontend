import {IConfigurationElement} from "../integration/types/Configuration";

export function configurationFieldToString(configuration: IConfigurationElement[], configurationField: string): string | null {
    if(configuration[0] !== undefined && configuration[0].fieldConfigurations) {
        const configField = configuration[0].fieldConfigurations.filter((configField) => configField.key === configurationField)
        return (configField.length > 0 && configField[0]?.value) ? (configField[0]?.value).toString() : null;
    }
    return null;
}

export function configurationFieldToBoolean(configuration: IConfigurationElement[], configurationField: string): boolean {
    if(configuration[0] !== undefined && configuration[0].fieldConfigurations) {
        const configField = configuration[0].fieldConfigurations.filter((configField) => configField.key === configurationField)
        if (configField[0].value) {
            return JSON.parse(configField[0].value);
        }
    }
    return false;
}
