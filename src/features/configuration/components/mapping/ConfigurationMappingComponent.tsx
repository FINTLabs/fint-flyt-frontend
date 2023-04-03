import {ClassNameMap} from "@mui/styles";
import * as React from "react";
import {ReactElement, useContext, useState} from "react";
import ObjectMappingComponent from "./object/ObjectMappingComponent";
import {ICollectionTemplate, IMappingTemplate, IObjectTemplate, IValueTemplate} from "../../types/FormTemplate";
import {ElementTemplates, NestedElementsCallbacks, NestedElementTemplate} from "../../types/NestedElement";
import ValueCollectionMappingComponent from "./collection/ValueCollectionMappingComponent";
import ObjectCollectionMappingComponent from "./collection/ObjectCollectionMappingComponent";
import ColumnElementComponent from "./ColumnElementComponent";
import {range} from "lodash";
import {useFormContext} from "react-hook-form";
import ValueWatchComponent from "../common/ValueWatchComponent";
import {findFromCollectionMappingAbsoluteKeys} from "../../util/KeyUtils";
import {EditingContext} from "../../../../context/editingContext";

interface Props {
    classes: ClassNameMap
    mappingTemplate: IMappingTemplate;
    onCollectionReferencesInEditContextChange: (collectionReferences: string[]) => void;
}

const ConfigurationMappingComponent: React.FunctionComponent<Props> = (props: Props) => {
    const {unregister} = useFormContext();
    const {editCollectionAbsoluteKey} = useContext(EditingContext)

    type ColumnElement = {
        path: string[],
        title: string,
        reactElement: ReactElement<{ absoluteKey: string }>,
        nestedColumnElementPerOrder: Record<string, ColumnElement>
    }

    function createRootElement(): ColumnElement {
        const nestedColumnElements = {};
        return {
            path: [],
            title: props.mappingTemplate.displayName,
            reactElement: <ObjectMappingComponent
                classes={props.classes}
                absoluteKey={"mapping"}
                template={props.mappingTemplate.rootObjectTemplate}
                nestedElementCallbacks={createNestedElementsCallbacks(
                    [],
                    nestedColumnElements
                )}
            />,
            nestedColumnElementPerOrder: nestedColumnElements
        }
    }

    const rootElement = createRootElement();
    const [displayRootElement, setDisplayRootElement] = useState<ColumnElement>(rootElement);

    function createNestedElementsCallbacks(displayPath: string[], nestedColumnElements: Record<string, ColumnElement>): NestedElementsCallbacks {
        return {
            onElementsOpen: (elementTemplates: ElementTemplates) => {
                elementTemplates.objects?.forEach(
                    (template: NestedElementTemplate<IObjectTemplate>) => {
                        const newNestedColumnElements: Record<string, ColumnElement> = {};
                        nestedColumnElements[template.order.toString()] =
                            {
                                path: [...displayPath, ...template.displayPath],
                                title: template.displayName,
                                reactElement: <ObjectMappingComponent
                                    classes={props.classes}
                                    key={template.absoluteKey}
                                    absoluteKey={template.absoluteKey}
                                    template={template.template}
                                    nestedElementCallbacks={createNestedElementsCallbacks(
                                        [...displayPath, ...template.displayPath, template.displayName],
                                        newNestedColumnElements
                                    )}
                                />,
                                nestedColumnElementPerOrder: newNestedColumnElements
                            }

                    })
                elementTemplates.objectCollections?.forEach(
                    (template: NestedElementTemplate<ICollectionTemplate<IObjectTemplate>>) => {
                        const newNestedColumnElements: Record<string, ColumnElement> = {};
                        nestedColumnElements[template.order.toString()] =
                            {
                                path: [...displayPath, ...template.displayPath],
                                title: template.displayName,
                                reactElement: <ObjectCollectionMappingComponent
                                    classes={props.classes}
                                    key={template.absoluteKey}
                                    absoluteKey={template.absoluteKey}
                                    elementTemplate={template.template.elementTemplate}
                                    nestedElementCallbacks={
                                        createNestedElementsCallbacks(
                                            [...displayPath, ...template.displayPath, template.displayName],
                                            newNestedColumnElements
                                        )
                                    }
                                />,
                                nestedColumnElementPerOrder: newNestedColumnElements
                            }
                    })
                elementTemplates.valueCollections?.forEach(
                    (template: NestedElementTemplate<ICollectionTemplate<IValueTemplate>>) => {
                        const newNestedColumnElements: Record<string, ColumnElement> = {};
                        nestedColumnElements[template.order.toString()] =
                            {
                                path: [...displayPath, ...template.displayPath],
                                title: template.displayName,
                                reactElement: <ValueCollectionMappingComponent
                                    classes={props.classes}
                                    key={template.absoluteKey}
                                    absoluteKey={template.absoluteKey}
                                    elementTemplate={template.template.elementTemplate}
                                />,
                                nestedColumnElementPerOrder: newNestedColumnElements
                            }
                    }
                )
                setDisplayRootElement({...rootElement});
            },

            onElementsClose: (elementOrders: string[], unregisterKeys?: boolean) => {
                elementOrders.forEach((order: string) => {
                    const absoluteKey: string | undefined = nestedColumnElements[order]?.reactElement.props.absoluteKey;
                    delete nestedColumnElements[order]
                    if (unregisterKeys && absoluteKey) {
                        unregister(absoluteKey)
                    }
                })
                setDisplayRootElement({...rootElement});
            },

            onAllNestedElementsClose: (parentOrder: string) => {
                getEntriesWithKeyStartingWith(nestedColumnElements, parentOrder)
                    .forEach(([order, value]) => {
                            delete nestedColumnElements[order]
                        }
                    );
                setDisplayRootElement({...rootElement});
            }
        }
    }

    function getEntriesWithKeyStartingWith<T>(record: Record<string, T>, startingWith: string): [string, T][] {
        return Object.entries(record)
            .filter(([order]: [string, T]) => order.startsWith(startingWith))
    }

    function getElementsByColumn(columnElement: ColumnElement): Omit<ColumnElement, 'nestedColumnElementPerOrder'>[][] {
        return [
            [columnElement],
            ...Object.entries(columnElement.nestedColumnElementPerOrder)
                .sort(([key1], [key2]) => key1.localeCompare(key2, undefined, {numeric: true}))
                .map(([order, nestedColumnElement]) => getElementsByColumn(nestedColumnElement))
                .reduce((combinedChildColumns: Omit<ColumnElement, 'nestedColumnElementPerOrder'>[][], childColumns: Omit<ColumnElement, 'nestedColumnElementPerOrder'>[][]) => {
                    range(0, childColumns.length)
                        .forEach((columnIndex: number) => {
                            if (!combinedChildColumns[columnIndex]) {
                                combinedChildColumns[columnIndex] = []
                            }
                            combinedChildColumns[columnIndex] = combinedChildColumns[columnIndex].concat(childColumns[columnIndex])
                        })
                    return combinedChildColumns;
                }, [])
        ]
    }

    return (
        <>
            <ValueWatchComponent
                key={editCollectionAbsoluteKey}
                classes={props.classes}
                names={
                    editCollectionAbsoluteKey
                        ? findFromCollectionMappingAbsoluteKeys(editCollectionAbsoluteKey)
                            .map((fromCollectionMappingAbsoluteKey: string) =>
                                fromCollectionMappingAbsoluteKey + ".instanceCollectionReferencesOrdered"
                            )
                        : []
                }
                onValuesChange={(values: string[]) => {
                    props.onCollectionReferencesInEditContextChange(
                        values
                            .filter(value => !!value)
                            .flat()
                            .filter(value => !!value)
                            .filter((value: string) => value.length > 0)
                    )
                }}
            />
            {getElementsByColumn(displayRootElement).map((columns: Omit<ColumnElement, 'nestedColumnElementPerOrder'>[], columnIndex) =>
                <div id={'column-' + columnIndex} key={'column-' + columnIndex}
                     className={props.classes.column}>
                    {
                        columns.map((columnElement: Omit<ColumnElement, 'nestedColumnElementPerOrder'>, columnElementIndex: number) => {
                                return <ColumnElementComponent
                                    classes={props.classes}
                                    key={'column-' + columnIndex + '-element-' + columnElementIndex}
                                    index={columnElementIndex}
                                    path={columnElement.path}
                                    title={columnElement.title}
                                    content={columnElement.reactElement}
                                />
                            }
                        )
                    }
                </div>
            )}
        </>
    )
}

export default ConfigurationMappingComponent;
