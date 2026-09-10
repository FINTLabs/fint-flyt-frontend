import {
    ICollectionTemplate,
    IElementConfig,
    IElementTemplate,
    IObjectTemplate,
    ISelectableValueTemplate,
    IValueTemplate,
} from '../types/FormTemplate';
import { DependencySatisfiedStatefulValue } from './dependencyUtils';

export function getValueMappingKey(
    absoluteKey: string,
    template: IElementTemplate<IValueTemplate | ISelectableValueTemplate>
): string {
    return absoluteKey + '.valueMappingPerKey.' + template.elementConfig.key;
}

export function getValueCollectionMappingKey(
    absoluteKey: string,
    template: IElementTemplate<ICollectionTemplate<IValueTemplate>>
): string {
    return absoluteKey + '.valueCollectionMappingPerKey.' + template.elementConfig.key;
}

export function getObjectMappingKey(
    absoluteKey: string,
    template: IElementTemplate<IObjectTemplate>
): string {
    return absoluteKey + '.objectMappingPerKey.' + template.elementConfig.key;
}

export function getObjectCollectionMappingKey(
    absoluteKey: string,
    template: IElementTemplate<ICollectionTemplate<IObjectTemplate>>
): string {
    return absoluteKey + '.objectCollectionMappingPerKey.' + template.elementConfig.key;
}

export function shouldShowElementWithOrder(
    order: number,
    showDependencyValuePerOrder: Record<string, boolean>
): boolean | undefined {
    const showDependencyValue: boolean | undefined =
        showDependencyValuePerOrder[order.toString()];
    if (showDependencyValue === undefined || showDependencyValue) {
        return true;
    }
}

export function isDisabledByConfig(
    absoluteKey: string,
    elementConfig: IElementConfig
): boolean | undefined {
    return elementConfig.enableDependency
        ? !DependencySatisfiedStatefulValue(absoluteKey, elementConfig.enableDependency)
        : undefined;
}
