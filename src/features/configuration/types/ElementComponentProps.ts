import {ICollectionTemplate, IObjectTemplate, IValueTemplate} from "./FormTemplate";
import {NestedElementTemplate} from "../components/mapping/ObjectMappingComponent";

export type NestedElementsCallbacks = {
    onNestedObjectOpen: (template: NestedElementTemplate<IObjectTemplate>) => void;
    onNestedObjectCollectionOpen: (template: NestedElementTemplate<ICollectionTemplate<IObjectTemplate>>) => void;
    onNestedValueCollectionOpen: (template: NestedElementTemplate<ICollectionTemplate<IValueTemplate>>) => void;
    onNestedElementClose: (order: number[]) => void;
}

export function prefixNestedElementsCallbacksOrder(orderPrefix: number[], nestedElementsCallbacks: NestedElementsCallbacks): NestedElementsCallbacks {
    return {
        onNestedObjectOpen: (template: NestedElementTemplate<IObjectTemplate>) =>
            nestedElementsCallbacks.onNestedObjectOpen(prefixOrder(orderPrefix, template)),

        onNestedObjectCollectionOpen: (template: NestedElementTemplate<ICollectionTemplate<IObjectTemplate>>) =>
            nestedElementsCallbacks.onNestedObjectCollectionOpen(prefixOrder(orderPrefix, template)),

        onNestedValueCollectionOpen: (template: NestedElementTemplate<ICollectionTemplate<IValueTemplate>>) =>
            nestedElementsCallbacks.onNestedValueCollectionOpen(prefixOrder(orderPrefix, template)),

        onNestedElementClose: (order: number[]) =>
            nestedElementsCallbacks.onNestedElementClose([...orderPrefix, ...order])
    }
}

export function prefixOrder<T>(orderPrefix: number[], template: NestedElementTemplate<T>): NestedElementTemplate<T> {
    return {
        ...template,
        order: [...orderPrefix, ...template.order]
    }
}
