import { VStack } from '@navikt/ds-react';
import * as React from 'react';
import { ReactElement, useRef } from 'react';
import { useFormContext } from 'react-hook-form';

import {
    ICollectionTemplate,
    IDependency,
    IElementTemplate,
    IObjectTemplate,
    ISelectableValueTemplate,
    IValueTemplate,
} from '../../../types/FormTemplate';
import { NestedElementsCallbacks } from '../../../types/NestedElement';
import { useDependencySatisfied } from '../../../util/dependencyUtils';
import {
    getObjectCollectionMappingKey,
    getObjectMappingKey,
    getValueCollectionMappingKey,
    getValueMappingKey,
    shouldShowElementWithOrder,
} from '../../../util/objectMappingUtils';
import ToggleElementButton from '../../buttons/ToggleElementButton';
import FieldsetElementComponent from '../../FieldsetElementComponent';
import SelectableValueMappingComponent from '../value/SelectableValueMappingComponent';
import ValueMappingComponent from '../value/ValueMappingComponent';

export interface Props {
    absoluteKey: string;
    template: IObjectTemplate;
    nestedElementCallbacks: NestedElementsCallbacks;
}

const ObjectMappingComponent: React.FunctionComponent<Props> = ({
    absoluteKey,
    template,
    nestedElementCallbacks,
}: Props) => {
    const { unregister, getValues } = useFormContext();

    const showDependencyValuePerOrder = useRef<Record<string, boolean>>({});

    // Value/selectable fields: hide + unregister when showDependency is not satisfied
    [...(template.valueTemplates ?? []), ...(template.selectableValueTemplates ?? [])]
        .map((elementTemplate: IElementTemplate<IValueTemplate | ISelectableValueTemplate>) => [
            elementTemplate.order,
            getValueMappingKey(absoluteKey, elementTemplate),
            elementTemplate.elementConfig.showDependency,
        ])
        .filter((entry): entry is [number, string, IDependency] => !!entry[2])
        .forEach(([order, absoluteKey, dependency]: [number, string, IDependency]) =>
            useDependencySatisfied(absoluteKey, dependency, (value) => {
                showDependencyValuePerOrder.current[order] = value;
                if (!value && getValues(absoluteKey) !== undefined) {
                    unregister(absoluteKey);
                }
            })
        );

    // Nested objects/collections: hide + close nested panels when showDependency is not satisfied
    [
        ...(template.valueCollectionTemplates ?? []),
        ...(template.objectTemplates ?? []),
        ...(template.objectCollectionTemplates ?? []),
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
            useDependencySatisfied(absoluteKey, dependency, (value) => {
                showDependencyValuePerOrder.current[order] = value;
                if (!value) {
                    nestedElementCallbacks.onElementsClose([order.toString()], true);
                }
            })
        );

    return (
        <VStack gap={'4'}>
            {[
                ...(template.valueTemplates ?? [])
                    .filter((template: IElementTemplate<IValueTemplate>) => {
                        return shouldShowElementWithOrder(
                            template.order,
                            showDependencyValuePerOrder.current
                        );
                    })
                    .map<ReactElement<{ order: number }>>(
                        (template: IElementTemplate<IValueTemplate>, index) => (
                            <ValueMappingComponent
                                key={index}
                                order={template.order}
                                absoluteKey={getValueMappingKey(absoluteKey, template)}
                                displayName={template.elementConfig.displayName}
                                description={template.elementConfig.description}
                                template={template.template}
                                disabled={
                                    template.elementConfig.enableDependency
                                        ? !useDependencySatisfied(
                                              absoluteKey,
                                              template.elementConfig.enableDependency
                                          )
                                        : undefined
                                }
                            />
                        )
                    ),

                ...(template.selectableValueTemplates ?? [])
                    .filter((template: IElementTemplate<ISelectableValueTemplate>) => {
                        return shouldShowElementWithOrder(
                            template.order,
                            showDependencyValuePerOrder.current
                        );
                    })
                    .map<ReactElement<{ order: number }>>(
                        (template: IElementTemplate<ISelectableValueTemplate>, index) => (
                            <SelectableValueMappingComponent
                                key={index}
                                order={template.order}
                                absoluteKey={getValueMappingKey(absoluteKey, template)}
                                displayName={template.elementConfig.displayName}
                                description={template.elementConfig.description}
                                template={template.template}
                                disabled={
                                    template.elementConfig.enableDependency
                                        ? !useDependencySatisfied(
                                              absoluteKey,
                                              template.elementConfig.enableDependency
                                          )
                                        : undefined
                                }
                            />
                        )
                    ),

                ...(template.valueCollectionTemplates ?? [])
                    .filter((template: IElementTemplate<ICollectionTemplate<IValueTemplate>>) => {
                        return shouldShowElementWithOrder(
                            template.order,
                            showDependencyValuePerOrder.current
                        );
                    })
                    .map<ReactElement<{ order: number }>>(
                        (
                            template: IElementTemplate<ICollectionTemplate<IValueTemplate>>,
                            index
                        ) => (
                            <ToggleElementButton
                                key={index}
                                order={template.order}
                                displayName={template.elementConfig.displayName}
                                description={template.elementConfig.description}
                                onSelect={() => {
                                    nestedElementCallbacks.onElementsOpen({
                                        valueCollections: [
                                            {
                                                order: template.order.toString(),
                                                absoluteKey: getValueCollectionMappingKey(
                                                    absoluteKey,
                                                    template
                                                ),
                                                displayPath: [],
                                                displayName: template.elementConfig.displayName,
                                                template: template.template,
                                            },
                                        ],
                                    });
                                }}
                                onUnselect={() => {
                                    nestedElementCallbacks.onElementsClose([
                                        template.order.toString(),
                                    ]);
                                }}
                                disabled={
                                    template.elementConfig.enableDependency
                                        ? !useDependencySatisfied(
                                              absoluteKey,
                                              template.elementConfig.enableDependency
                                          )
                                        : undefined
                                }
                            />
                        )
                    ),

                ...(template.objectTemplates ?? [])
                    .filter((template: IElementTemplate<IObjectTemplate>) => {
                        return shouldShowElementWithOrder(
                            template.order,
                            showDependencyValuePerOrder.current
                        );
                    })
                    .map<ReactElement<{ order: number }>>(
                        (template: IElementTemplate<IObjectTemplate>, index) => (
                            <ToggleElementButton
                                key={index}
                                order={template.order}
                                displayName={template.elementConfig.displayName}
                                description={template.elementConfig.description}
                                onSelect={() => {
                                    nestedElementCallbacks.onElementsOpen({
                                        objects: [
                                            {
                                                order: template.order.toString(),
                                                absoluteKey: getObjectMappingKey(
                                                    absoluteKey,
                                                    template
                                                ),
                                                displayPath: [],
                                                displayName: template.elementConfig.displayName,
                                                template: template.template,
                                            },
                                        ],
                                    });
                                }}
                                onUnselect={() => {
                                    nestedElementCallbacks.onElementsClose([
                                        template.order.toString(),
                                    ]);
                                }}
                                disabled={
                                    template.elementConfig.enableDependency
                                        ? !useDependencySatisfied(
                                              absoluteKey,
                                              template.elementConfig.enableDependency
                                          )
                                        : undefined
                                }
                            />
                        )
                    ),

                ...(template.objectCollectionTemplates ?? [])
                    .filter((template: IElementTemplate<ICollectionTemplate<IObjectTemplate>>) => {
                        return shouldShowElementWithOrder(
                            template.order,
                            showDependencyValuePerOrder.current
                        );
                    })
                    .map<ReactElement<{ order: number }>>(
                        (
                            template: IElementTemplate<ICollectionTemplate<IObjectTemplate>>,
                            index
                        ) => (
                            <ToggleElementButton
                                key={index}
                                order={template.order}
                                displayName={template.elementConfig.displayName}
                                description={template.elementConfig.description}
                                onSelect={() => {
                                    nestedElementCallbacks.onElementsOpen({
                                        objectCollections: [
                                            {
                                                order: template.order.toString(),
                                                absoluteKey: getObjectCollectionMappingKey(
                                                    absoluteKey,
                                                    template
                                                ),
                                                displayPath: [],
                                                displayName: template.elementConfig.displayName,
                                                template: template.template,
                                            },
                                        ],
                                    });
                                }}
                                onUnselect={() => {
                                    nestedElementCallbacks.onElementsClose([
                                        template.order.toString(),
                                    ]);
                                }}
                                disabled={
                                    template.elementConfig.enableDependency
                                        ? !useDependencySatisfied(
                                              absoluteKey,
                                              template.elementConfig.enableDependency
                                          )
                                        : undefined
                                }
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
