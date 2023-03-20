import {ICollectionTemplate, IObjectTemplate, IValueTemplate} from "./FormTemplate";
import {NestedElementTemplate} from "../components/mapping/ObjectMappingComponent";

export type ElementTemplates = {
    objects?: NestedElementTemplate<IObjectTemplate>[],
    objectCollections?: NestedElementTemplate<ICollectionTemplate<IObjectTemplate>>[],
    valueCollections?: NestedElementTemplate<ICollectionTemplate<IValueTemplate>>[]
}

export type ElementOrders = {
    objects?: string[],
    objectCollections?: string[],
    valueCollections?: string[]
}

export type NestedElementsCallbacks = {
    onElementsOpen: (elementTemplates: ElementTemplates) => void;
    onElementsClose: (elementOrders: ElementOrders) => void;
    onAllNestedElementsClose: (parentOrder: string) => void;
}

export function prefixNestedElementsCallbacks(orderPrefix: string, displayPath: string[], nestedElementsCallbacks: NestedElementsCallbacks): NestedElementsCallbacks {
    return {
        onElementsOpen: (elementTemplates) =>
            nestedElementsCallbacks.onElementsOpen(prefixTemplates(orderPrefix, displayPath, elementTemplates)),

        onElementsClose: (elementOrders: ElementOrders) =>
            nestedElementsCallbacks.onElementsClose(prefixOrders(orderPrefix, elementOrders)),

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

function prefixOrders(orderPrefix: string, elementOrder: ElementOrders): ElementOrders {
    return {
        objects: elementOrder.objects?.map(order => orderPrefix + "-" + order),
        objectCollections: elementOrder.objectCollections?.map(order => orderPrefix + "-" + order),
        valueCollections: elementOrder.valueCollections?.map(order => orderPrefix + "-" + order)
    }
}

function prefixTemplate<T>(orderPrefix: string, displayPath: string[], template: NestedElementTemplate<T>): NestedElementTemplate<T> {
    return {
        ...template,
        displayPath: [...displayPath, ...template.displayPath],
        order: orderPrefix + "-" + template.order
    }
}
