import {
    ICollectionTemplate,
    IElementTemplate,
    IObjectTemplate,
    ISelectableValueTemplate,
    IValueTemplate,
} from '../types/FormTemplate';

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

export function filterVisibleByOrder<T extends { order: number }>(
    elementTemplates: T[] | undefined,
    showDependencyValuePerOrder: Record<string, boolean>
  ): T[] {
    return (elementTemplates ?? []).filter((elementTemplate: T) =>
      shouldShowElementWithOrder(elementTemplate.order, showDependencyValuePerOrder)
    );
  }
