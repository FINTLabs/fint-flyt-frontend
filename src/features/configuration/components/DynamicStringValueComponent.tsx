import * as React from "react";
import {useFormContext} from "react-hook-form";
import {useDrop} from "react-dnd";
import {ITag} from "../types/Metadata/Tag";
import {ElementComponentProps} from "../types/ValueComponentProps";
import {ValueType} from "../types/Metadata/IntegrationMetadata"

const DynamicStringValueComponent: React.FunctionComponent<any> = (props: ElementComponentProps & { accept: ValueType[] }) => {
    const {register, setValue, getValues} = useFormContext();
    const mappingStringAbsoluteKey = props.absoluteKey + ".mappingString";
    const [{canDrop, isOver}, dropRef] = useDrop({
        accept: props.accept,
        drop: (tag: ITag) => {
            setValue(mappingStringAbsoluteKey, (getValues(mappingStringAbsoluteKey) + tag.value))
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
        <div ref={dropRef} key={mappingStringAbsoluteKey}>
            <label key={mappingStringAbsoluteKey} className={props.classes.label}>
                {props.displayName}:
                <input type="text"
                       style={dynamicStyle}
                       {...register(mappingStringAbsoluteKey)}
                />
            </label>
        </div>
    )
}
export default DynamicStringValueComponent;