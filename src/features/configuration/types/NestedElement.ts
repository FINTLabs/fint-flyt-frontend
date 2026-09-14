import { ReactElement } from "react";
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

export type ColumnElement = {
    path: string[];
    title: string;
    reactElement: ReactElement<{ absoluteKey: string }>;
    nestedColumnElementPerOrder: Record<string, ColumnElement>;
};

export type SimplifiedColumnElement = Omit<ColumnElement, 'nestedColumnElementPerOrder'>;
