import { VStack } from '@navikt/ds-react';
import * as React from 'react';
import { MutableRefObject, ReactElement, useRef } from 'react';
import { useFormContext } from 'react-hook-form';

import {
    ICollectionTemplate,
    IDependency,
    IElementConfig,
    IElementTemplate,
    IObjectTemplate,
    ISelectableValueTemplate,
    IValueTemplate,
} from '../../../types/FormTemplate';
import { NestedElementsCallbacks } from '../../../types/NestedElement';
import { DependencySatisfiedStatefulValue } from '../../../util/DependencyUtils';
import FieldsetElementComponent from '../../FieldsetElementComponent';
import ToggleButtonComponent from '../../ToggleButtonComponent';
import SelectableValueMappingComponent from '../value/SelectableValueMappingComponent';
import ValueMappingComponent from '../value/ValueMappingComponent';

export interface Props {
    absoluteKey: string;
    template: IObjectTemplate;
    nestedElementCallbacks: NestedElementsCallbacks;
}

const ObjectMappingComponent: React.FunctionComponent<Props> = (props: Props) => {
    const { unregister, getValues } = useFormContext();

    const showDependencyValuePerOrder: MutableRefObject<Record<string, boolean>> = useRef<
        Record<string, boolean>
    >({});
    [...(props.template.valueTemplates ?? []), ...(props.template.selectableValueTemplates ?? [])]
        .map((elementTemplate: IElementTemplate<IValueTemplate | ISelectableValueTemplate>) => [
            elementTemplate.order,
            getValueMappingKey(elementTemplate),
            elementTemplate.elementConfig.showDependency,
        ])
        .filter((entry): entry is [number, string, IDependency] => !!entry[2])
        .forEach(([order, absoluteKey, dependency]: [number, string, IDependency]) =>
            DependencySatisfiedStatefulValue(props.absoluteKey, dependency, (value) => {
                showDependencyValuePerOrder.current[order] = value;
                if (!value && getValues(absoluteKey) !== undefined) {
                    unregister(absoluteKey);
                }
            })
        );
    [
        ...(props.template.valueCollectionTemplates ?? []),
        ...(props.template.objectTemplates ?? []),
        ...(props.template.objectCollectionTemplates ?? []),
    ]
        .map(
            (
                elementTemplate: IElementTemplate<
                    IObjectTemplate | ICollectionTemplate<IObjectTemplate | IValueTemplate>
                >
            ) => [elementTemplate.order, elementTemplate.elementConfig.showDependency]
        )
        .filter((entry): entry is [number, IDependency] => !!entry[1])
        .forEach(([order, dependency]: [number, IDependency]) =>
            DependencySatisfiedStatefulValue(props.absoluteKey, dependency, (value) => {
                showDependencyValuePerOrder.current[order] = value;
                if (!value) {
                    props.nestedElementCallbacks.onElementsClose([order.toString()], true);
                }
            })
        );

    function getValueMappingKey(
        template: IElementTemplate<IValueTemplate | ISelectableValueTemplate>
    ): string {
        return props.absoluteKey + '.valueMappingPerKey.' + template.elementConfig.key;
    }

    function getValueCollectionMappingKey(
        template: IElementTemplate<ICollectionTemplate<IValueTemplate>>
    ): string {
        return props.absoluteKey + '.valueCollectionMappingPerKey.' + template.elementConfig.key;
    }

    function getObjectMappingKey(template: IElementTemplate<IObjectTemplate>): string {
        return props.absoluteKey + '.objectMappingPerKey.' + template.elementConfig.key;
    }

    function getObjectCollectionMappingKey(
        template: IElementTemplate<ICollectionTemplate<IObjectTemplate>>
    ): string {
        return props.absoluteKey + '.objectCollectionMappingPerKey.' + template.elementConfig.key;
    }

    function shouldShowElementWithOrder(order: number) {
        const showDependencyValue: boolean | undefined =
            showDependencyValuePerOrder.current[order.toString()];
        if (showDependencyValue === undefined || showDependencyValue) {
            return true;
        }
    }

    function isDisabledByConfig(elementConfig: IElementConfig): boolean | undefined {
        return elementConfig.enableDependency
            ? !DependencySatisfiedStatefulValue(props.absoluteKey, elementConfig.enableDependency)
            : undefined;
    }

    return (
        <VStack gap={'4'}>
            {[
                ...(props.template.valueTemplates ?? [])
                    .filter((template: IElementTemplate<IValueTemplate>) => {
                        return shouldShowElementWithOrder(template.order);
                    })
                    .map<ReactElement<{ order: number }>>(
                        (template: IElementTemplate<IValueTemplate>, index) => (
                            <ValueMappingComponent
                                key={index}
                                order={template.order}
                                absoluteKey={getValueMappingKey(template)}
                                displayName={template.elementConfig.displayName}
                                description={template.elementConfig.description}
                                template={template.template}
                                disabled={isDisabledByConfig(template.elementConfig)}
                            />
                        )
                    ),

                ...(props.template.selectableValueTemplates ?? [])
                    .filter((template: IElementTemplate<ISelectableValueTemplate>) => {
                        return shouldShowElementWithOrder(template.order);
                    })
                    .map<ReactElement<{ order: number }>>(
                        (template: IElementTemplate<ISelectableValueTemplate>, index) => (
                            <SelectableValueMappingComponent
                                key={index}
                                order={template.order}
                                absoluteKey={getValueMappingKey(template)}
                                displayName={template.elementConfig.displayName}
                                description={template.elementConfig.description}
                                template={template.template}
                                disabled={isDisabledByConfig(template.elementConfig)}
                            />
                        )
                    ),

                ...(props.template.valueCollectionTemplates ?? [])
                    .filter((template: IElementTemplate<ICollectionTemplate<IValueTemplate>>) => {
                        return shouldShowElementWithOrder(template.order);
                    })
                    .map<ReactElement<{ order: number }>>(
                        (
                            template: IElementTemplate<ICollectionTemplate<IValueTemplate>>,
                            index
                        ) => (
                            <ToggleButtonComponent
                                key={index}
                                order={template.order}
                                displayName={template.elementConfig.displayName}
                                description={template.elementConfig.description}
                                onSelect={() => {
                                    props.nestedElementCallbacks.onElementsOpen({
                                        valueCollections: [
                                            {
                                                order: template.order.toString(),
                                                absoluteKey: getValueCollectionMappingKey(template),
                                                displayPath: [],
                                                displayName: template.elementConfig.displayName,
                                                template: template.template,
                                            },
                                        ],
                                    });
                                }}
                                onUnselect={() => {
                                    props.nestedElementCallbacks.onElementsClose([
                                        template.order.toString(),
                                    ]);
                                }}
                                disabled={isDisabledByConfig(template.elementConfig)}
                            />
                        )
                    ),

                ...(props.template.objectTemplates ?? [])
                    .filter((template: IElementTemplate<IObjectTemplate>) => {
                        return shouldShowElementWithOrder(template.order);
                    })
                    .map<ReactElement<{ order: number }>>(
                        (template: IElementTemplate<IObjectTemplate>, index) => (
                            <ToggleButtonComponent
                                key={index}
                                order={template.order}
                                displayName={template.elementConfig.displayName}
                                description={template.elementConfig.description}
                                onSelect={() => {
                                    props.nestedElementCallbacks.onElementsOpen({
                                        objects: [
                                            {
                                                order: template.order.toString(),
                                                absoluteKey: getObjectMappingKey(template),
                                                displayPath: [],
                                                displayName: template.elementConfig.displayName,
                                                template: template.template,
                                            },
                                        ],
                                    });
                                }}
                                onUnselect={() => {
                                    props.nestedElementCallbacks.onElementsClose([
                                        template.order.toString(),
                                    ]);
                                }}
                                disabled={isDisabledByConfig(template.elementConfig)}
                            />
                        )
                    ),

                ...(props.template.objectCollectionTemplates ?? [])
                    .filter((template: IElementTemplate<ICollectionTemplate<IObjectTemplate>>) => {
                        return shouldShowElementWithOrder(template.order);
                    })
                    .map<ReactElement<{ order: number }>>(
                        (
                            template: IElementTemplate<ICollectionTemplate<IObjectTemplate>>,
                            index
                        ) => (
                            <ToggleButtonComponent
                                key={index}
                                order={template.order}
                                displayName={template.elementConfig.displayName}
                                description={template.elementConfig.description}
                                onSelect={() => {
                                    props.nestedElementCallbacks.onElementsOpen({
                                        objectCollections: [
                                            {
                                                order: template.order.toString(),
                                                absoluteKey:
                                                    getObjectCollectionMappingKey(template),
                                                displayPath: [],
                                                displayName: template.elementConfig.displayName,
                                                template: template.template,
                                            },
                                        ],
                                    });
                                }}
                                onUnselect={() => {
                                    props.nestedElementCallbacks.onElementsClose([
                                        template.order.toString(),
                                    ]);
                                }}
                                disabled={isDisabledByConfig(template.elementConfig)}
                            />
                        )
                    ),
            ]
                .sort(
                    (a: ReactElement<{ order: number }>, b: ReactElement<{ order: number }>) =>
                        a.props.order - b.props.order
                )
                .map((reactElement: ReactElement, index: number) => (
                    <FieldsetElementComponent key={index} content={reactElement} />
                ))}
        </VStack>
    );
};
export default ObjectMappingComponent;
