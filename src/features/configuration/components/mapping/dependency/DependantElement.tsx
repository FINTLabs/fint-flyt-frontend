import {IElementTemplate, IObjectTemplate, IValueTemplate} from "../../../types/FormTemplate";
import {getObjectMappingKeyFromTemplate, getValueMappingKeyFromTemplate} from "../ConfigurationKeyUtils";

export type DependantElement = {
    order: string,
    configurationKey: string
}

export type DependencyCallbacks = {
    onShowDependencyChange: (dependantElement: DependantElement, value: boolean) => void
    onEnableDependencyChange: (dependantElement: DependantElement, value: boolean) => void
    onSearchUrlDependencyChange: (dependantElement: DependantElement, value: string) => void // TODO eivindmorch 20/06/2023 : Kun visning, så ikke nødvendig her?
    onSelectablesSourcesUrlDependencyChange: (dependantElement: DependantElement, value: string) => void
}

export function prefixDependantElement(dependantElement: DependantElement, orderPrefix: string, configurationKeyPrefix: string): DependantElement {
    return {
        order: orderPrefix + "." + dependantElement.order,
        configurationKey: configurationKeyPrefix + "." + dependantElement.configurationKey
    }
}

export function createPrefixedOnDependencyChangeFunction<T>(
    onChange: (dependantElement: DependantElement, value: T) => void,
    orderPrefix: string,
    configurationKeyPrefix: string
)
    : (dependantElement: DependantElement, value: T) => void {
    return (dependantElement: DependantElement, value: T) => {
        onChange(
            prefixDependantElement(dependantElement, orderPrefix, configurationKeyPrefix),
            value
        )
    }
}

function createPrefixedObjectOnDependencyChangeFunction<T>(
    onChange: (dependantElement: DependantElement, value: T) => void,
    template: IElementTemplate<IObjectTemplate>
)
    : (dependantElement: DependantElement, value: T) => void {
    return createPrefixedOnDependencyChangeFunction(
        onChange,
        template.order.toString(),
        getObjectMappingKeyFromTemplate(template)
    )
}

function createPrefixedValueOnDependencyChangeFunction<T>(
    onChange: (dependantElement: DependantElement, value: T) => void,
    template: IElementTemplate<IValueTemplate>
)
    : (dependantElement: DependantElement, value: T) => void {
    return createPrefixedOnDependencyChangeFunction(
        onChange,
        template.order.toString(),
        getValueMappingKeyFromTemplate(template)
    )
}

export function createPrefixedObjectDependencyCallbacks(
    dependencyCallbacks: DependencyCallbacks,
    elementTemplate: IElementTemplate<IObjectTemplate>
)
    : DependencyCallbacks {
    return {
        onShowDependencyChange:
            createPrefixedObjectOnDependencyChangeFunction(
                dependencyCallbacks.onShowDependencyChange,
                elementTemplate
            ),
        onEnableDependencyChange:
            createPrefixedObjectOnDependencyChangeFunction(
                dependencyCallbacks.onEnableDependencyChange,
                elementTemplate
            ),
        onSearchUrlDependencyChange:
            createPrefixedObjectOnDependencyChangeFunction(
                dependencyCallbacks.onSearchUrlDependencyChange,
                elementTemplate
            ),
        onSelectablesSourcesUrlDependencyChange:
            createPrefixedObjectOnDependencyChangeFunction(
                dependencyCallbacks.onSelectablesSourcesUrlDependencyChange,
                elementTemplate
            )
    }
}
