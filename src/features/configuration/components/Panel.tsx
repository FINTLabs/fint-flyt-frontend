import * as React from "react";
import {ISelectableValueTemplate, IValueTemplate} from "../types/NewForm/FormTemplate";
import {useForm} from "react-hook-form";
import {correspondentTest, testSelectTemplates, testStringTemplates} from "../defaults/FormTemplates";
import {CreateSelectables} from "../util/SelectablesUtils";
import {getAbsoluteKey} from "../util/KeyUtils";
import {useDrop} from "react-dnd";
import {ITag} from "../types/Metadata/Tag";
import {Box} from "@mui/material";

const Panel: React.FunctionComponent<any> = (props) => {
    const {register, handleSubmit, control, setValue, getValues} = useForm();
    let inputStyle = {
        width: '350px',
        borderRadius: '3px',
        margin: '5px',
        height: '24px'
    };

    let labelStyle = {
        fontFamily: ["Nunito Sans", 'sans-serif'].join(','),
        fontSize: '16px'
    }

    let selectStyle = {
        width: '350px',
        height: '30px',
        borderRadius: '3px',
        margin: '5px'
    };

    const onSubmit = (data: any) => {
        console.log(data);
    };

    function CreateStringValueComponent(valueTemplate: IValueTemplate, parentAbsoluteKey?: string) {
        let absoluteKey = getAbsoluteKey(valueTemplate.elementConfig, parentAbsoluteKey)
        return (
            <label key={absoluteKey} style={labelStyle}>
                {valueTemplate.elementConfig.displayName}:
                <input type="text"
                       style={inputStyle}
                       {...register(absoluteKey)}
                />
            </label>
        )
    }

    function CreateSelectValueComponent(valueTemplate: ISelectableValueTemplate, parentAbsoluteKey?: string) {
        let absoluteKey = getAbsoluteKey(valueTemplate.elementConfig, parentAbsoluteKey)
        let selectables = CreateSelectables(
            valueTemplate, control, parentAbsoluteKey
        )
        return (
            <label key={absoluteKey} style={labelStyle}>
                {valueTemplate.elementConfig.displayName}:
                <select {...register(absoluteKey)}
                        style={selectStyle}
                        autoComplete={'name'}
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

    function CreateDynamicStringValueComponent(valueTemplate: IValueTemplate, parentAbsoluteKey?: string) {
        let border = 'solid 2px black';
        let templateType = valueTemplate.template.type; // TODO: handle all template types, match to metadata type
        let absoluteKey = getAbsoluteKey(valueTemplate.elementConfig, parentAbsoluteKey)
        const [{canDrop, isOver}, dropRef] = useDrop({
            accept: templateType,
            drop: (tag: ITag) => {
                setValue(absoluteKey, (getValues(absoluteKey) + tag.value))
            },
            collect: monitor => ({
                canDrop: monitor.canDrop(),
                isOver: monitor.isOver()
            })
        })

        if (canDrop && isOver) {
            border = 'solid 3px green';
        } else if (canDrop) {
            border = 'solid 3px blue';
        }

        const dynamicStyle = {
            border: border,
            ...inputStyle,
        }

        return (
            <div ref={dropRef} key={absoluteKey}>
                <label key={absoluteKey} style={labelStyle}>
                    {valueTemplate.elementConfig.displayName}:
                    <input type="text"
                           style={dynamicStyle}
                           {...register(absoluteKey)}
                    />
                </label>
            </div>
        )
    }

    return (
        <>
            <Box className={props.style.sourceApplicationFormContainer}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset style={{display: "grid"}}>
                        {testStringTemplates.map(testTemplate => {
                            return CreateDynamicStringValueComponent(testTemplate, 'sak')
                        })}
                        {testSelectTemplates.map(testSelectTemplate => {
                            return CreateSelectValueComponent(testSelectTemplate, 'sak')
                        })}
                        {correspondentTest.map(testTemplate => {
                            return CreateDynamicStringValueComponent(testTemplate, 'sak.journalpost.korrespondansepart')
                        })}
                    </fieldset>
                    <input type="submit"/>
                </form>
            </Box>
        </>
    );
}
export default Panel;