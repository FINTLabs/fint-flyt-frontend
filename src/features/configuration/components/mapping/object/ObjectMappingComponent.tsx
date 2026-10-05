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
    filterVisibleByOrder,
    getObjectCollectionMappingKey,
    getObjectMappingKey,
    getValueCollectionMappingKey,
    getValueMappingKey,
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
        .forEach(([order, elementAbsoluteKey, dependency]: [number, string, IDependency]) =>
            useDependencySatisfied(absoluteKey, dependency, (value) => {
                showDependencyValuePerOrder.current[order] = value;
                if (!value && getValues(elementAbsoluteKey) !== undefined) {
                    unregister(elementAbsoluteKey);
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
                ...filterVisibleByOrder(
                    template.valueTemplates,
                    showDependencyValuePerOrder.current
                ).map<ReactElement<{ order: number }>>(
                    (valueTemplate: IElementTemplate<IValueTemplate>, index) => (
                        <ValueMappingComponent
                            key={index}
                            order={valueTemplate.order}
                            absoluteKey={getValueMappingKey(absoluteKey, valueTemplate)}
                            displayName={valueTemplate.elementConfig.displayName}
                            description={valueTemplate.elementConfig.description}
                            template={valueTemplate.template}
                            disabled={
                                valueTemplate.elementConfig.enableDependency
                                    ? !useDependencySatisfied(
                                          absoluteKey,
                                          valueTemplate.elementConfig.enableDependency
                                      )
                                    : undefined
                            }
                        />
                    )
                ),

                ...filterVisibleByOrder(
                    template.selectableValueTemplates,
                    showDependencyValuePerOrder.current
                ).map<ReactElement<{ order: number }>>(
                    (
                        selectableValueTemplate: IElementTemplate<ISelectableValueTemplate>,
                        index
                    ) => (
                        <SelectableValueMappingComponent
                            key={index}
                            order={selectableValueTemplate.order}
                            absoluteKey={getValueMappingKey(absoluteKey, selectableValueTemplate)}
                            displayName={selectableValueTemplate.elementConfig.displayName}
                            description={selectableValueTemplate.elementConfig.description}
                            template={selectableValueTemplate.template}
                            disabled={
                                selectableValueTemplate.elementConfig.enableDependency
                                    ? !useDependencySatisfied(
                                          absoluteKey,
                                          selectableValueTemplate.elementConfig.enableDependency
                                      )
                                    : undefined
                            }
                        />
                    )
                ),

                ...filterVisibleByOrder(
                    template.valueCollectionTemplates,
                    showDependencyValuePerOrder.current
                ).map<ReactElement<{ order: number }>>(
                    (
                        valueCollectionTemplate: IElementTemplate<
                            ICollectionTemplate<IValueTemplate>
                        >,
                        index
                    ) => (
                        <ToggleElementButton
                            key={index}
                            order={valueCollectionTemplate.order}
                            displayName={valueCollectionTemplate.elementConfig.displayName}
                            onSelect={() => {
                                nestedElementCallbacks.onElementsOpen({
                                    valueCollections: [
                                        {
                                            order: valueCollectionTemplate.order.toString(),
                                            absoluteKey: getValueCollectionMappingKey(
                                                absoluteKey,
                                                valueCollectionTemplate
                                            ),
                                            displayPath: [],
                                            displayName:
                                                valueCollectionTemplate.elementConfig.displayName,
                                            description:
                                                valueCollectionTemplate.elementConfig.description,
                                            template: valueCollectionTemplate.template,
                                        },
                                    ],
                                });
                            }}
                            onUnselect={() => {
                                nestedElementCallbacks.onElementsClose([
                                    valueCollectionTemplate.order.toString(),
                                ]);
                            }}
                            disabled={
                                valueCollectionTemplate.elementConfig.enableDependency
                                    ? !useDependencySatisfied(
                                          absoluteKey,
                                          valueCollectionTemplate.elementConfig.enableDependency
                                      )
                                    : undefined
                            }
                        />
                    )
                ),

                ...filterVisibleByOrder(
                    template.objectTemplates,
                    showDependencyValuePerOrder.current
                ).map<ReactElement<{ order: number }>>(
                    (objectTemplate: IElementTemplate<IObjectTemplate>, index) => (
                        <ToggleElementButton
                            key={index}
                            order={objectTemplate.order}
                            displayName={objectTemplate.elementConfig.displayName}
                            onSelect={() => {
                                nestedElementCallbacks.onElementsOpen({
                                    objects: [
                                        {
                                            order: objectTemplate.order.toString(),
                                            absoluteKey: getObjectMappingKey(
                                                absoluteKey,
                                                objectTemplate
                                            ),
                                            displayPath: [],
                                            displayName: objectTemplate.elementConfig.displayName,
                                            description: objectTemplate.elementConfig.description,
                                            template: objectTemplate.template,
                                        },
                                    ],
                                });
                            }}
                            onUnselect={() => {
                                nestedElementCallbacks.onElementsClose([
                                    objectTemplate.order.toString(),
                                ]);
                            }}
                            disabled={
                                objectTemplate.elementConfig.enableDependency
                                    ? !useDependencySatisfied(
                                          absoluteKey,
                                          objectTemplate.elementConfig.enableDependency
                                      )
                                    : undefined
                            }
                        />
                    )
                ),

                ...filterVisibleByOrder(
                    template.objectCollectionTemplates,
                    showDependencyValuePerOrder.current
                ).map<ReactElement<{ order: number }>>(
                    (
                        objectCollectionTemplate: IElementTemplate<
                            ICollectionTemplate<IObjectTemplate>
                        >,
                        index
                    ) => (
                        <ToggleElementButton
                            key={index}
                            order={objectCollectionTemplate.order}
                            displayName={objectCollectionTemplate.elementConfig.displayName}
                            onSelect={() => {
                                nestedElementCallbacks.onElementsOpen({
                                    objectCollections: [
                                        {
                                            order: objectCollectionTemplate.order.toString(),
                                            absoluteKey: getObjectCollectionMappingKey(
                                                absoluteKey,
                                                objectCollectionTemplate
                                            ),
                                            displayPath: [],
                                            displayName:
                                                objectCollectionTemplate.elementConfig.displayName,
                                            description:
                                                objectCollectionTemplate.elementConfig.description,
                                            template: objectCollectionTemplate.template,
                                        },
                                    ],
                                });
                            }}
                            onUnselect={() => {
                                nestedElementCallbacks.onElementsClose([
                                    objectCollectionTemplate.order.toString(),
                                ]);
                            }}
                            disabled={
                                objectCollectionTemplate.elementConfig.enableDependency
                                    ? !useDependencySatisfied(
                                          absoluteKey,
                                          objectCollectionTemplate.elementConfig.enableDependency
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
