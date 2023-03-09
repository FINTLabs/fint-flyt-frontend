import * as React from "react";
import {IElementTemplate, ISelectableValueTemplate, IValueTemplate} from "../types/NewForm/FormTemplate";
import {useForm} from "react-hook-form";
import {testSelectTemplates, testStringTemplates} from "../defaults/FormTemplates";

import {CreateSelectables} from "../util/SelectablesUtils";
import {getAbsoluteKey} from "../util/KeyUtils";

const Panel: React.FunctionComponent<any> = () => {
    const {register, handleSubmit, control} = useForm();
    const onSubmit = (data: any) => {
        console.log(data);
    };

    function createStringValueComponent(valueTemplate: IElementTemplate<IValueTemplate>, parentAbsoluteKey?: string) {
        let absoluteKey = getAbsoluteKey(valueTemplate.elementConfig, parentAbsoluteKey)
        return (
            <label key={absoluteKey}>
                {valueTemplate.elementConfig.displayName}:
                <input type="text"
                       {...register(absoluteKey)}
                />
            </label>
        )
    }

    function CreateSelectValueComponent(valueTemplate: IElementTemplate<ISelectableValueTemplate>, parentAbsoluteKey?: string) {
        let absoluteKey = getAbsoluteKey(valueTemplate.elementConfig, parentAbsoluteKey)
        let selectables = CreateSelectables(
            valueTemplate, control, parentAbsoluteKey
        )
        return (
            <label key={absoluteKey}>
                {valueTemplate.elementConfig.displayName}:
                <select {...register(absoluteKey)}
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

    function createDynamicStringValueComponent(valueTemplate: IElementTemplate<IValueTemplate>, parentAbsoluteKey?: string) {
        // return input field supporting onChange on drop appending dropped value
        let absoluteKey = getAbsoluteKey(valueTemplate.elementConfig, parentAbsoluteKey)
        return (
            <label>
                {valueTemplate.elementConfig.displayName}:
                <input type="text"
                       {...register(absoluteKey)}
                />
            </label>
        )
    }


    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset style={{display: "grid"}}>
                    {testStringTemplates.map(testTemplate => {
                        return createStringValueComponent(testTemplate, 'sak')
                    })}
                    {testSelectTemplates.map(testSelectTemplate => {
                        return CreateSelectValueComponent(testSelectTemplate, 'sak')
                    })}
                    {testStringTemplates.map(testTemplate => {
                        return createStringValueComponent(testTemplate, 'sak.journalpost')
                    })}
                </fieldset>
                <input type="submit"/>
            </form>
        </>
    );
}
export default Panel;