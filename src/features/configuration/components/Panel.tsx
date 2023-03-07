import * as React from "react";
import {ISelectableValueTemplate, IValueTemplate} from "../types/NewForm/FormTemplate";
import {useForm} from "react-hook-form";
import {testSelectTemplates, testStringTemplates} from "../defaults/FormTemplates";

import {Subject} from "rxjs";
import {createSelectables} from "../util/SelectablesUtils";
import {getAbsoluteKey} from "../util/KeyUtils";

const Panel: React.FunctionComponent<any> = (props) => {

    const {register, handleSubmit, getValues} = useForm();
    const onSubmit = (data: any) => {
        console.log(data);
    };
    const valueUpdateSubjectPerAbsoluteKey: Record<string, Subject<void>> = {};

    function createStringValueComponent(valueTemplate: IValueTemplate, parentAbsoluteKey?: string) {
        let absoluteKey = getAbsoluteKey(valueTemplate.elementConfig, parentAbsoluteKey)
        let onUpdateSubject: Subject<void> = getOrCreateOnUpdateSubject(absoluteKey)
        return (
            <label key={absoluteKey}>
                {valueTemplate.elementConfig.displayName}:
                <input type="text"
                       {...register(absoluteKey)}
                       onBlur={() => onUpdateSubject.next()}
                />
            </label>
        )
    }

    function createSelectValueComponent(valueTemplate: ISelectableValueTemplate, parentAbsoluteKey?: string) {
        let absoluteKey = getAbsoluteKey(valueTemplate.elementConfig, parentAbsoluteKey)
        let onUpdateSubject: Subject<void> = getOrCreateOnUpdateSubject(absoluteKey)
        let selectables = createSelectables(
            valueTemplate, getValues, valueUpdateSubjectPerAbsoluteKey, parentAbsoluteKey
        )
        return (
            <label key={absoluteKey}>
                {valueTemplate.elementConfig.displayName}:
                <select {...register(absoluteKey)}
                        onChange={() => onUpdateSubject.next()}
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

    function createDynamicStringValueComponent(valueTemplate: IValueTemplate, parentAbsoluteKey?: string) {
        // return input field supporting onChange on drop appending dropped value
        console.log(parentAbsoluteKey, valueTemplate)
        let absoluteKey = getAbsoluteKey(valueTemplate.elementConfig, parentAbsoluteKey)
        let onUpdateSubject: Subject<void> = getOrCreateOnUpdateSubject(absoluteKey)
        return (
            <label>
                {valueTemplate.elementConfig.displayName}:
                <input type="text"
                       {...register(absoluteKey)}
                       onBlur={() => onUpdateSubject.next()}
                />
            </label>
        )
    }

    function getOrCreateOnUpdateSubject(absoluteKey: string): Subject<void> {
        if (!valueUpdateSubjectPerAbsoluteKey[absoluteKey]) {
            valueUpdateSubjectPerAbsoluteKey[absoluteKey] = new Subject<void>();
        }
        return valueUpdateSubjectPerAbsoluteKey[absoluteKey]
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset style={{display: "grid"}}>
                    {testStringTemplates.map(testTemplate => {
                        return createStringValueComponent(testTemplate, 'sak')
                    })}
                    {testStringTemplates.map(testTemplate => {
                        return createStringValueComponent(testTemplate, 'sak.journalpost')
                    })}
                    {testSelectTemplates.map(testSelectTemplate => {
                        return createSelectValueComponent(testSelectTemplate, 'sak')
                    })}
                </fieldset>
                <input type="submit"/>
            </form>
        </>
    );
}
export default Panel;