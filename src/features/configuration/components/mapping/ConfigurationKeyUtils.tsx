import {
    ICollectionTemplate,
    IElementTemplate,
    IObjectTemplate,
    ISelectableValueTemplate,
    IValueTemplate
} from "../../types/FormTemplate";

export const VALUE_MAPPING_PER_KEY: string = "valueMappingPerKey";
export const VALUE_MAPPING_STRING: string = "mappingString";
export const OBJECT_MAPPING_PER_KEY: string = "objectMappingPerKey";
export const VALUE_COLLECTION_MAPPING_PER_KEY: string = "valueCollectionMappingPerKey";
export const OBJECT_COLLECTION_MAPPING_PER_KEY: string = "objectCollectionMappingPerKey";

// TODO eivindmorch 22/06/2023 : Rydd opp
export function getValueMappingKeyFromTemplate(template: IElementTemplate<IValueTemplate | ISelectableValueTemplate>): string {
    return getValueMappingKey(template.elementConfig.key);
}

export function getValueMappingKey(elementKey: string, withMappingStringSuffix: boolean = false) {
    return "valueMappingPerKey." + elementKey + withMappingStringSuffix ? ".mappingString" : "";
}

export function getValueCollectionMappingKeyFromTemplate(template: IElementTemplate<ICollectionTemplate<IValueTemplate>>): string {
    return getValueCollectionMappingKey(template.elementConfig.key);
}

export function getValueCollectionMappingKey(elementKey: string) {
    return "valueCollectionMappingPerKey." + elementKey;
}

export function getObjectMappingKeyFromTemplate(template: IElementTemplate<IObjectTemplate>): string {
    return getObjectMappingKey(template.elementConfig.key);
}

export function getObjectMappingKey(elementKey: string): string {
    return "objectMappingPerKey." + elementKey;
}

export function getObjectCollectionMappingKeyFromTemplate(template: IElementTemplate<ICollectionTemplate<IObjectTemplate>>): string {
    return getObjectCollectionMappingKey(template.elementConfig.key);
}

export function getObjectCollectionMappingKey(elementKey: string): string {
    return "objectCollectionMappingPerKey." + elementKey;
}