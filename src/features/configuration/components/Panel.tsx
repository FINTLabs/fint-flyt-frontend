import * as React from "react";
import {ISelectableValueTemplate, IValueTemplate} from "../types/NewForm/FormTemplate";
import {useForm} from "react-hook-form";
import {testSelectTemplates, testStringTemplates} from "../defaults/FormTemplates";

import {Observable, Subject} from "rxjs";
import {createSelectables} from "../util/SelectablesUtils";
import {getAbsoluteKey} from "../util/KeyUtils";

const Panel: React.FunctionComponent<any> = (props) => {

    const {register, handleSubmit, getValues} = useForm();
    const onSubmit = (data: any) => {
        console.log(data);
    };
    const valueUpdateObservablePerAbsoluteKey: Record<string, Observable<void>> = {};

    function createStringValueComponent(parentAbsoluteKey: string, valueTemplate: IValueTemplate) {
        let absoluteKey = getAbsoluteKey(parentAbsoluteKey, valueTemplate.elementConfig)
        let onUpdateSubject = createOnUpdateSubject(absoluteKey)
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

    function createSelectValueComponent(parentAbsoluteKey: string, valueTemplate: ISelectableValueTemplate) {
        let absoluteKey = getAbsoluteKey(parentAbsoluteKey, valueTemplate.elementConfig)
        let onUpdateSubject = createOnUpdateSubject(absoluteKey)
        let selectables = createSelectables(
            parentAbsoluteKey, valueTemplate, getValues, valueUpdateObservablePerAbsoluteKey
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

    function createDynamicStringValueComponent(parentAbsoluteKey: string, valueTemplate: IValueTemplate) {
        // return input field supporting onChange on drop appending dropped value
        console.log(parentAbsoluteKey, valueTemplate)
        let absoluteKey = getAbsoluteKey(parentAbsoluteKey, valueTemplate.elementConfig)
        let onUpdateSubject = createOnUpdateSubject(absoluteKey)
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

    function createOnUpdateSubject(absoluteKey: string): Subject<void> {
        let onUpdateSubject = new Subject<void>();
        if (valueUpdateObservablePerAbsoluteKey[absoluteKey]) {
            throw new Error("Value update observable already exists for key=" + absoluteKey)
        }
        valueUpdateObservablePerAbsoluteKey[absoluteKey] = onUpdateSubject;
        return onUpdateSubject;
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset style={{display: "grid"}}>
                    {testStringTemplates.map(testTemplate => {
                        return createStringValueComponent('sak', testTemplate)
                    })}
                    {testStringTemplates.map(testTemplate => {
                        return createStringValueComponent('sak.journalpost', testTemplate)
                    })}
                    {testSelectTemplates.map(testSelectTemplate => {
                        return createSelectValueComponent('sak', testSelectTemplate)
                    })}
                </fieldset>
                <input type="submit"/>
            </form>
        </>
    );
}
export default Panel;