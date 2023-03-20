import * as React from "react";
import {useContext} from "react";
import {Controller, useFormContext} from "react-hook-form";
import {useDrop} from "react-dnd";
import {ITag} from "../../types/Metadata/Tag";
import {ValueType} from "../../types/Metadata/IntegrationMetadata"
import {ClassNameMap} from "@mui/styles";
import {TextField} from "@mui/material";
import {ConfigurationContext} from "../../../../context/configurationContext";
import {editCollectionAbsoluteKeyIncludesAbsoluteKey} from "../../util/ObjectUtils";

interface Props {
    classes: ClassNameMap;
    absoluteKey: string;
    displayName: string;
    accept: ValueType[]
    disabled?: boolean
}

const DragAndDropComponent: React.FunctionComponent<Props> = (props: Props) => {
    const {setValue, getValues, control} = useFormContext();
    const {editingCollection} = useContext(ConfigurationContext)
    let disable: boolean = editingCollection ?
        !editCollectionAbsoluteKeyIncludesAbsoluteKey(editingCollection, props.absoluteKey)
        : false;

    const [{canDrop, isOver}, dropRef] = useDrop({
        accept: props.accept,
        drop: (tag: ITag) => {
            getValues(props.absoluteKey) === undefined
                ?
                setValue(props.absoluteKey, tag.value)
                :
                setValue(props.absoluteKey, ('' + tag.value))
        },
        collect: monitor => ({
            canDrop: monitor.canDrop(),
            isOver: monitor.isOver()
        })
    })

    let background = 'white';

    const inputStyle = {
        backgroundColor: 'white',
        width: '350px',
        borderRadius: '4px',
        margin: 'none',
        marginBottom: '16px'
    };

    if (canDrop && isOver) {
        background = 'lightgreen';
    } else if (canDrop) {
        background = 'lightblue';
    } else if (isOver && !canDrop) {
        background = 'red';
    }

    const dynamicStyle: React.CSSProperties = {
        ...inputStyle,
        background
    }

    return (
        <div id={"dnd-value-component-" + props.absoluteKey} ref={disable ? undefined : dropRef}
             key={props.absoluteKey}>
            <Controller
                name={props.absoluteKey}
                control={control}
                defaultValue=""
                render={({field}) =>
                    <TextField
                        InputProps={{
                            readOnly: true,
                        }}
                        style={dynamicStyle}
                        variant='outlined'
                        size='small'
                        multiline
                        maxRows={3}
                        label={props.displayName}
                        {...field}
                    />
                }
            />
        </div>
    )
}
export default DragAndDropComponent;