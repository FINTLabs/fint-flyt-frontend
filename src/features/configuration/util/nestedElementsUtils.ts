import {
    ElementTemplates,
    NestedElementsCallbacks,
    NestedElementTemplate,
} from '../types/NestedElement';

function prefixTemplate<T>(
    orderPrefix: string,
    displayPath: string[],
    template: NestedElementTemplate<T>
): NestedElementTemplate<T> {
    return {
        ...template,
        displayPath: [...displayPath, ...template.displayPath],
        order: orderPrefix + '-' + template.order,
    };
}

function prefixTemplates(
    orderPrefix: string,
    displayPath: string[],
    elementTemplates: ElementTemplates
): ElementTemplates {
    return {
        objects: elementTemplates.objects?.map((template) =>
            prefixTemplate(orderPrefix, displayPath, template)
        ),
        objectCollections: elementTemplates.objectCollections?.map((template) =>
            prefixTemplate(orderPrefix, displayPath, template)
        ),
        valueCollections: elementTemplates.valueCollections?.map((template) =>
            prefixTemplate(orderPrefix, displayPath, template)
        ),
    };
}

export function prefixNestedElementsCallbacks(
    orderPrefix: string,
    displayPath: string[],
    nestedElementsCallbacks: NestedElementsCallbacks
): NestedElementsCallbacks {
    return {
        onElementsOpen: (elementTemplates) =>
            nestedElementsCallbacks.onElementsOpen(
                prefixTemplates(orderPrefix, displayPath, elementTemplates)
            ),

        onElementsClose: (elementOrders: string[], unregister?: boolean) =>
            nestedElementsCallbacks.onElementsClose(
                elementOrders.map((order) => orderPrefix + '-' + order),
                unregister
            ),

        onAllNestedElementsClose: (parentOrder: string) => {
            nestedElementsCallbacks.onAllNestedElementsClose(orderPrefix + '-' + parentOrder);
        },
    };
}
