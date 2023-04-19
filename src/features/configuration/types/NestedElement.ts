import {ICollectionTemplate, IObjectTemplate, IValueTemplate} from "./FormTemplate";

export type NestedElementTemplate<T> = {
    order: string;
    absoluteKey: string;
    displayPath: string[];
    displayName: string;
    template: T;
}

export type ElementTemplates = {
    objects?: NestedElementTemplate<IObjectTemplate>[],
    objectCollections?: NestedElementTemplate<ICollectionTemplate<IObjectTemplate>>[],
    valueCollections?: NestedElementTemplate<ICollectionTemplate<IValueTemplate>>[]
}

export type NestedElementsCallbacks = {
    onElementsOpen: (elementTemplates: ElementTemplates) => void;
    onElementsClose: (elementOrders: string[], unregister?: boolean) => void;
    onAllNestedElementsClose: (parentOrder: string) => void;
}

export function prefixNestedElementsCallbacks(orderPrefix: string, displayPath: string[], nestedElementsCallbacks: NestedElementsCallbacks): NestedElementsCallbacks {
    return {
        onElementsOpen: (elementTemplates) =>
            nestedElementsCallbacks.onElementsOpen(prefixTemplates(orderPrefix, displayPath, elementTemplates)),

        onElementsClose: (elementOrders: string[], unregister?: boolean) =>
            nestedElementsCallbacks.onElementsClose(elementOrders.map(order => orderPrefix + "-" + order), unregister),

        onAllNestedElementsClose: (parentOrder: string) => {
            nestedElementsCallbacks.onAllNestedElementsClose(orderPrefix + "-" + parentOrder)
        }
    }
}

function prefixTemplates(orderPrefix: string, displayPath: string[], elementTemplates: ElementTemplates): ElementTemplates {
    return {
        objects: elementTemplates.objects?.map(template => prefixTemplate(orderPrefix, displayPath, template)),
        objectCollections: elementTemplates.objectCollections?.map(template => prefixTemplate(orderPrefix, displayPath, template)),
        valueCollections: elementTemplates.valueCollections?.map(template => prefixTemplate(orderPrefix, displayPath, template)),
    }
}

function prefixTemplate<T>(orderPrefix: string, displayPath: string[], template: NestedElementTemplate<T>): NestedElementTemplate<T> {
    return {
        ...template,
        displayPath: [...displayPath, ...template.displayPath],
        order: orderPrefix + "-" + template.order
    }
}
