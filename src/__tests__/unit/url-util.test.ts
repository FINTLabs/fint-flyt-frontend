import {createValueRefPerAbsoluteKey} from "../../features/configuration/util/UrlUtils";
import {IUrlBuilder} from "../../features/configuration/types/FormTemplate";

const sourceUrlBuilder: IUrlBuilder[] = [
    {
        urlTemplate: "api/intern/arkiv/kodeverk/klasse",
        valueRefPerRequestParamKey: {
            klassifikasjonssystemLink: "klassifikasjonssystem"
        }
    }
];
const absoluteKey = 'mapping.objectMappingPerKey.newCase.objectCollectionMappingPerKey.klasse.elementMappings.0'
const expectedValueRefRecord: Record<string, string> = {
    'mapping.objectMappingPerKey.newCase.objectCollectionMappingPerKey.klasse.elementMappings.0.valueMappingPerKey.klassifikasjonssystem.mappingString': "klassifikasjonssystem"
}


test('It should create value ref per absolute key', () => {
    createValueRefPerAbsoluteKey(sourceUrlBuilder, absoluteKey);
    expect(createValueRefPerAbsoluteKey(sourceUrlBuilder, absoluteKey)).toEqual(expectedValueRefRecord)
});
