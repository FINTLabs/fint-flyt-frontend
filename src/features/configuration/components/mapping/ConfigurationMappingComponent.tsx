import { Box } from '@navikt/ds-react';
import * as React from 'react';
import { useContext, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { EditingContext } from '../../context/EditingContext';
import {
    ICollectionTemplate,
    IMappingTemplate,
    IObjectTemplate,
    IValueTemplate,
} from '../../types/FormTemplate';
import {
    ColumnElement,
    ElementTemplates,
    NestedElementsCallbacks,
    NestedElementTemplate,
    SimplifiedColumnElement,
} from '../../types/NestedElement';
import { findFromCollectionMappingAbsoluteKeys } from '../../util/KeyUtils';
import ValueWatchComponent from '../ValueWatchComponent';
import ObjectCollectionMappingComponent from './collection/ObjectCollectionMappingComponent';
import ValueCollectionMappingComponent from './collection/ValueCollectionMappingComponent';
import ColumnElementComponent from './ColumnElementComponent';
import ObjectMappingComponent from './object/ObjectMappingComponent';
import {
    findDeepestColumnIndex,
    getElementsByColumn,
    getEntriesWithKeyStartingWith,
    openNestedColumnElement,
} from '../../util/mappingUtils';

interface Props {
    mappingTemplate: IMappingTemplate;
    onCollectionReferencesInEditContextChange: (collectionReferences: string[]) => void;
}

const ConfigurationMappingComponent: React.FunctionComponent<Props> = (props: Props) => {
    const { unregister } = useFormContext();
    const { editCollectionAbsoluteKey } = useContext(EditingContext);

    function createRootElement(): ColumnElement {
        const nestedColumnElements = {};
        return {
            path: [],
            title: props.mappingTemplate.displayName,
            reactElement: (
                <ObjectMappingComponent
                    absoluteKey={'mapping'}
                    template={props.mappingTemplate.rootObjectTemplate}
                    nestedElementCallbacks={createNestedElementsCallbacks([], nestedColumnElements)}
                />
            ),
            nestedColumnElementPerOrder: nestedColumnElements,
        };
    }

    const rootElement = createRootElement();
    const [displayRootElement, setDisplayRootElement] = useState<ColumnElement>(rootElement);

    function createNestedElementsCallbacks(
        displayPath: string[],
        nestedColumnElements: Record<string, ColumnElement>
    ): NestedElementsCallbacks {
        return {
            onElementsOpen: (elementTemplates: ElementTemplates) => {
                elementTemplates.objects?.forEach(
                    (template: NestedElementTemplate<IObjectTemplate>) => {
                        openNestedColumnElement(
                            displayPath,
                            nestedColumnElements,
                            template,
                            (childDisplayPath, newNestedColumnElements) => (
                                <ObjectMappingComponent
                                    key={template.absoluteKey}
                                    absoluteKey={template.absoluteKey}
                                    template={template.template}
                                    nestedElementCallbacks={createNestedElementsCallbacks(
                                        childDisplayPath,
                                        newNestedColumnElements
                                    )}
                                />
                            )
                        );
                    }
                );

                elementTemplates.objectCollections?.forEach(
                    (template: NestedElementTemplate<ICollectionTemplate<IObjectTemplate>>) => {
                        openNestedColumnElement(
                            displayPath,
                            nestedColumnElements,
                            template,
                            (childDisplayPath, newNestedColumnElements) => (
                                <ObjectCollectionMappingComponent
                                    key={template.absoluteKey}
                                    absoluteKey={template.absoluteKey}
                                    elementTemplate={template.template.elementTemplate}
                                    nestedElementCallbacks={createNestedElementsCallbacks(
                                        childDisplayPath,
                                        newNestedColumnElements
                                    )}
                                />
                            )
                        );
                    }
                );

                elementTemplates.valueCollections?.forEach(
                    (template: NestedElementTemplate<ICollectionTemplate<IValueTemplate>>) => {
                        openNestedColumnElement(displayPath, nestedColumnElements, template, () => (
                            <ValueCollectionMappingComponent
                                key={template.absoluteKey}
                                absoluteKey={template.absoluteKey}
                                elementTemplate={template.template.elementTemplate}
                            />
                        ));
                    }
                );

                setDisplayRootElement({ ...rootElement });

                // Scroll to the last added column
                // Find the deepest (rightmost) column
                setTimeout(() => {
                    const lastColumnIndex = findDeepestColumnIndex(displayRootElement);
                    const lastColumnElement = document.getElementById(`column-${lastColumnIndex}`);
                    if (lastColumnElement) {
                        lastColumnElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'nearest',
                            inline: 'center',
                        });
                    }
                }, 100);
            },

            onElementsClose: (elementOrders: string[], unregisterKeys?: boolean) => {
                elementOrders.forEach((order: string) => {
                    const absoluteKey: string | undefined =
                        nestedColumnElements[order]?.reactElement.props.absoluteKey;
                    delete nestedColumnElements[order];
                    if (unregisterKeys && absoluteKey) {
                        unregister(absoluteKey);
                    }
                });
                setDisplayRootElement({ ...rootElement });
            },

            onAllNestedElementsClose: (parentOrder: string) => {
                getEntriesWithKeyStartingWith(nestedColumnElements, parentOrder).forEach(
                    ([order]) => {
                        delete nestedColumnElements[order];
                    }
                );
                setDisplayRootElement({ ...rootElement });
            },
        };
    }

    return (
        <>
            <ValueWatchComponent
                key={editCollectionAbsoluteKey}
                names={
                    editCollectionAbsoluteKey
                        ? findFromCollectionMappingAbsoluteKeys(editCollectionAbsoluteKey).map(
                              (fromCollectionMappingAbsoluteKey: string) =>
                                  fromCollectionMappingAbsoluteKey +
                                  '.instanceCollectionReferencesOrdered'
                          )
                        : []
                }
                onValuesChange={(values: string[]) => {
                    props.onCollectionReferencesInEditContextChange(
                        values
                            .filter((value) => !!value)
                            .flat()
                            .filter((value) => !!value)
                            .filter((value: string) => value.length > 0)
                    );
                }}
            />
            {getElementsByColumn(displayRootElement).map(
                (columns: SimplifiedColumnElement[], columnIndex) => (
                    <Box
                        id={'column-' + columnIndex}
                        key={'column-' + columnIndex}
                        style={{
                            marginRight: '18px',
                            minWidth: 'fit-content',
                            overflowY: 'auto',
                            overflowX: 'hidden',
                            height: 'fit-content',
                        }}
                    >
                        {columns.map(
                            (
                                columnElement: SimplifiedColumnElement,
                                columnElementIndex: number
                            ) => {
                                return (
                                    <ColumnElementComponent
                                        key={
                                            'column-' +
                                            columnIndex +
                                            '-element-' +
                                            columnElementIndex
                                        }
                                        index={columnElementIndex}
                                        path={columnElement.path}
                                        title={columnElement.title}
                                        content={columnElement.reactElement}
                                    />
                                );
                            }
                        )}
                    </Box>
                )
            )}
        </>
    );
};

export default ConfigurationMappingComponent;
