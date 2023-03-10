import * as React from "react";
import {useFormContext} from "react-hook-form";
import {useDrop} from "react-dnd";
import {ITag} from "../../types/Metadata/Tag";
import {ElementComponentProps} from "../../types/ElementComponentProps";
import {ValueType} from "../../types/Metadata/IntegrationMetadata"

interface Props extends ElementComponentProps {
    accept: ValueType[]
}

const DynamicStringValueComponent: React.FunctionComponent<Props> = (props: Props) => {
    const {register, setValue, getValues} = useFormContext();
    const [{canDrop, isOver}, dropRef] = useDrop({
        accept: props.accept,
        drop: (tag: ITag) => {
            setValue(props.absoluteKey, (getValues(props.absoluteKey) + tag.value))
        },
        collect: monitor => ({
            canDrop: monitor.canDrop(),
            isOver: monitor.isOver()
        })
    })

    let border = 'solid 1px black';

    const inputStyle = {
        width: '350px',
        borderRadius: '3px',
        margin: '5px',
        height: '24px'
    };

    if (canDrop && isOver) {
        border = 'solid 3px green';
        inputStyle.margin = '3px';
    } else if (canDrop) {
        border = 'solid 3px blue';
        inputStyle.margin = '3px';
    }

    const dynamicStyle = {
        border: border,
        ...inputStyle
    }

    return (
        <div ref={dropRef} key={props.absoluteKey}>
            <label key={props.absoluteKey} className={props.classes.label}>
                {props.displayName}:
                <input type="text"
                       style={dynamicStyle}
                       {...register(props.absoluteKey)}
                />
            </label>
        </div>
    )
}
export default DynamicStringValueComponent;