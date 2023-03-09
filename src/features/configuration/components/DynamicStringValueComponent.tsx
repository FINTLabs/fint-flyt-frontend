import * as React from "react";
import {IValueTemplate} from "../types/NewForm/FormTemplate";
import {useFormContext} from "react-hook-form";
import {getAbsoluteKey} from "../util/KeyUtils";
import {useDrop} from "react-dnd";
import {ITag} from "../types/Metadata/Tag";
import {TemplateComponentProps} from "../types/ValueComponentProps";

const DynamicStringValueComponent: React.FunctionComponent<any> = (props: TemplateComponentProps<IValueTemplate>) => {
    const {register, setValue, getValues} = useFormContext();
    const absoluteKey = getAbsoluteKey(props.template.elementConfig, props.parentAbsoluteKey)
    const templateType = props.template.template.type; // TODO: handle all template types, match to metadata type
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

    let border = 'solid 2px black';

    const inputStyle = {
        width: '350px',
        borderRadius: '3px',
        margin: '5px',
        height: '24px'
    };

    if (canDrop && isOver) {
        border = 'solid 3px green';
    } else if (canDrop) {
        border = 'solid 3px blue';
    }

    const dynamicStyle = {
        border: border,
        ...inputStyle
    }

    return (
        <div ref={dropRef} key={absoluteKey}>
            <label key={absoluteKey} className={props.classes.label}>
                {props.template.elementConfig.displayName}:
                <input type="text"
                       style={dynamicStyle}
                       {...register(absoluteKey)}
                />
            </label>
        </div>
    )
}
export default DynamicStringValueComponent;