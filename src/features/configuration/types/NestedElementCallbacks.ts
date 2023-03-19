import {ICollectionTemplate, IObjectTemplate, IValueTemplate} from "./FormTemplate";
import {NestedElementTemplate} from "../components/mapping/ObjectMappingComponent";

export type NestedElementsCallbacks = {

    onNestedObjectOpen: (template: NestedElementTemplate<IObjectTemplate>) => void;
    onNestedObjectClose: (order: string) => void;

    onNestedObjectCollectionOpen: (template: NestedElementTemplate<ICollectionTemplate<IObjectTemplate>>) => void;
    onNestedObjectCollectionClose: (order: string) => void;

    onNestedValueCollectionOpen: (template: NestedElementTemplate<ICollectionTemplate<IValueTemplate>>) => void;
    onNestedValueCollectionClose: (order: string) => void;

    onAllNestedElementsClose: (parentOrder: string) => void;
}

export function prefixNestedElementsCallbacks(orderPrefix: string, displayPath: string[], nestedElementsCallbacks: NestedElementsCallbacks): NestedElementsCallbacks {
    return {
        onNestedObjectOpen: (template: NestedElementTemplate<IObjectTemplate>) =>
            nestedElementsCallbacks.onNestedObjectOpen(prefix(orderPrefix, displayPath, template)),

        onNestedObjectClose: (order: string) =>
            nestedElementsCallbacks.onNestedObjectClose(orderPrefix + "-" + order),

        onNestedObjectCollectionOpen: (template: NestedElementTemplate<ICollectionTemplate<IObjectTemplate>>) =>
            nestedElementsCallbacks.onNestedObjectCollectionOpen(prefix(orderPrefix, displayPath, template)),

        onNestedObjectCollectionClose: (order: string) =>
            nestedElementsCallbacks.onNestedObjectCollectionClose(orderPrefix + "-" + order),

        onNestedValueCollectionOpen: (template: NestedElementTemplate<ICollectionTemplate<IValueTemplate>>) =>
            nestedElementsCallbacks.onNestedValueCollectionOpen(prefix(orderPrefix, displayPath, template)),

        onNestedValueCollectionClose: (order: string) =>
            nestedElementsCallbacks.onNestedValueCollectionClose(orderPrefix + "-" + order),

        onAllNestedElementsClose: (parentOrder: string) => {
            nestedElementsCallbacks.onAllNestedElementsClose(orderPrefix + "-" + parentOrder)
        }
    }
}

export function prefix<T>(orderPrefix: string, displayPath: string[], template: NestedElementTemplate<T>): NestedElementTemplate<T> {
    return {
        ...template,
        displayPath: [...displayPath, ...template.displayPath],
        order: orderPrefix + "-" + template.order
    }
}
