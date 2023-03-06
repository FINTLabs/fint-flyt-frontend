import * as React from "react";
import {ISelectableValueTemplate, IValueTemplate} from "../types/NewForm/FormTemplate";
import {useForm} from "react-hook-form";
import {getAbsoluteKey} from "../util/FormUtils";
import {testSelectTemplates, testStringTemplates} from "../defaults/FormTemplates";

import {Subject} from "rxjs";
import {createSelectables} from "../util/SelectablesUtils";

const Panel: React.FunctionComponent<any> = (props) => {

    const {register, handleSubmit, getValues} = useForm();
    const onSubmit = (data: any) => {
        console.log(data);
    };
    const elementUpdatedSubjectPerAbsoluteKey: Record<string, Subject<void>> = {};

    function CreateStringValueComponent(parentRef: string, valueTemplate: IValueTemplate) {
        let absoluteKey = getAbsoluteKey(parentRef, valueTemplate.elementConfig)
        return (
            <label key={absoluteKey}>
                {valueTemplate.elementConfig.displayName}:
                <input type="text"
                       {...register(absoluteKey)}
                       onBlur={(e) => elementUpdatedSubjectPerAbsoluteKey[absoluteKey].next()}
                />
            </label>
        )
    }

    function CreateSelectValueComponent(parentRef: string, valueTemplate: ISelectableValueTemplate) {
        let fullKey = getAbsoluteKey(parentRef, valueTemplate.elementConfig)
        let selectables = createSelectables(
            parentRef, valueTemplate, getValues, elementUpdatedSubjectPerAbsoluteKey
        )

        return (
            <label key={fullKey}>
                {valueTemplate.elementConfig.displayName}:
                <select {...register(fullKey)}
                        onChange={(e) => elementUpdatedSubjectPerAbsoluteKey[fullKey].next()}
                        autoComplete={valueTemplate.template.type === 'SEARCH_SELECT' ? 'on' : 'off'}
                >
                    {selectables.map(option => {
                        return (
                            <option key={option.displayName} value={option.value}>
                                {option.displayName}
                            </option>
                        )
                    })}
                </select>
            </label>
        )
    }

    function createDynamicStringValueComponent(parentRef: string, valueTemplate: IValueTemplate) {
        // return input field supporting onChange on drop appending dropped value
        console.log(parentRef, valueTemplate)
        let fullKey = getAbsoluteKey(parentRef, valueTemplate.elementConfig)
        return (
            <label>
                {valueTemplate.elementConfig.displayName}:
                <input type="text"
                       {...register(fullKey)}
                       onBlur={(e) => elementUpdatedSubjectPerAbsoluteKey[fullKey].next()}
                />
            </label>
        )
    }


    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset style={{display: "grid"}}>
                    {testStringTemplates.map(testTemplate => {
                        return CreateStringValueComponent('sak', testTemplate)
                    })}
                    {testStringTemplates.map(testTemplate => {
                        return CreateStringValueComponent('sak.journalpost', testTemplate)
                    })}
                    {testSelectTemplates.map(testSelectTemplate => {
                        return CreateSelectValueComponent('sak', testSelectTemplate)
                    })}
                </fieldset>
                <input type="submit"/>
            </form>
        </>
    );
}
export default Panel;