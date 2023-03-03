import {IElementConfig, IUrlBuilder} from "../types/NewForm/FormTemplate";
import ResourceRepository from "../../../shared/repositories/ResourceRepository";
import {ISelectable} from "../components/FormPanel";

export function containsOnlyStaticUrls(selectableSources: IUrlBuilder[]): boolean {
    return selectableSources.every(isStaticUrl)
}

export function isStaticUrl(builder: IUrlBuilder): boolean {
    return (builder.valueKeyPerPathParamKey ? Object.keys(builder.valueKeyPerPathParamKey).length === 0 : true)
        && (builder.valueKeyPerRequestParamKey ? Object.keys(builder.valueKeyPerRequestParamKey).length === 0 : true)
}

export function getAbsoluteKey(parentRef: string, elementConfig: IElementConfig) {
    return (parentRef ? parentRef + '.' : '') + elementConfig.key
}

export function updateSelectables(sources: string[]) {
   return Promise.all(
        sources.map(source =>
            ResourceRepository.getCodeworkResource('/' + source)
                .then(response => {
                    let list: ISelectable[] = [];
                    let data = response.data;
                    if (data) {
                        data.sort((a: any, b: any) => {
                            if (a.displayName < b.displayName) {
                                return -1;
                            }
                            return data;
                        });
                        data.map((resource: any) => list.push({displayName: resource.displayName, value: resource.id}))
                        return list;
                    }
                })
        )).then(result => { return result !== undefined ? result.flat() : [] }
    ).catch((err) => {
       console.error(err);
        return [];
    })
}