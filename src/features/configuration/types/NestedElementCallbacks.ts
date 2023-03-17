import {ICollectionTemplate, IObjectTemplate, IValueTemplate} from "./FormTemplate";
import {NestedElementTemplate} from "../components/mapping/ObjectMappingComponent";

export type NestedElementsCallbacks = {
    onNestedObjectOpen: (template: NestedElementTemplate<IObjectTemplate>) => void;
    onNestedObjectCollectionOpen: (template: NestedElementTemplate<ICollectionTemplate<IObjectTemplate>>) => void;
    onNestedValueCollectionOpen: (template: NestedElementTemplate<ICollectionTemplate<IValueTemplate>>) => void;
    onNestedElementClose: (order: number[]) => void;
    onAllNestedElementsClose: (parentOrder: number[]) => void;
}

export function prefixNestedElementsCallbacks(orderPrefix: number[], displayPath: string[], nestedElementsCallbacks: NestedElementsCallbacks): NestedElementsCallbacks {
    return {
        onNestedObjectOpen: (template: NestedElementTemplate<IObjectTemplate>) =>
            nestedElementsCallbacks.onNestedObjectOpen(prefix(orderPrefix, displayPath, template)),

        onNestedObjectCollectionOpen: (template: NestedElementTemplate<ICollectionTemplate<IObjectTemplate>>) =>
            nestedElementsCallbacks.onNestedObjectCollectionOpen(prefix(orderPrefix, displayPath, template)),

        onNestedValueCollectionOpen: (template: NestedElementTemplate<ICollectionTemplate<IValueTemplate>>) =>
            nestedElementsCallbacks.onNestedValueCollectionOpen(prefix(orderPrefix, displayPath, template)),

        onNestedElementClose: (order: number[]) =>
            nestedElementsCallbacks.onNestedElementClose([...orderPrefix, ...order]),

        onAllNestedElementsClose: (parentOrder: number[]) => {
            nestedElementsCallbacks.onAllNestedElementsClose([...orderPrefix, ...parentOrder])
        }
    }
}

export function prefix<T>(orderPrefix: number[], displayPath: string[], template: NestedElementTemplate<T>): NestedElementTemplate<T> {
    return {
        ...template,
        displayPath: [...displayPath, ...template.displayPath],
        order: [...orderPrefix, ...template.order]
    }
}
