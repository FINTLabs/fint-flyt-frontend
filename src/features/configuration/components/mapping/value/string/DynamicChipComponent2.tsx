import * as React from "react";
import {forwardRef} from "react";
import {Autocomplete, Chip, TextField, Typography} from "@mui/material";
import {ClassNameMap} from "@mui/styles";
import {useDrop} from "react-dnd";
import {ITag} from "../../../../types/Metadata/Tag";
import {ValueType} from "../../../../types/Metadata/IntegrationMetadata";
import {Search} from "../../../../util/UrlUtils";
import {Noop} from "react-hook-form/dist/types";
import {ControllerFieldState} from "react-hook-form";
import {errorMsgSX} from "../../../../../../util/styles/SystemStyles";

export interface Props {
    classes: ClassNameMap
    displayName?: string;
    search?: Search;
    accept?: ValueType[];
    disabled?: boolean;
    onChange?: (value: string) => void;
    onBlur?: Noop;
    name: string;
    value?: string | null;
    fieldState?: ControllerFieldState | undefined
}


const DynamicChipCompponent2: React.FunctionComponent<Props> = forwardRef<HTMLDivElement, Props>((props: Props, ref) => {
    DynamicChipCompponent2.displayName = "DynamicChipCompponent2"
    const [values, setValues] = React.useState<string[]>([]);
    const stringValue = values.join("")
    const absoluteKey: string = props.name;


    const [{canDrop, isOver}, dropRef] = useDrop({
        accept: ValueType.STRING,
        drop: (tag: ITag) => {
            setValues([...values, tag.value])
            if (props.onChange) {
                props.onChange(values.join("") + tag.value)
            }
        },
        collect: monitor => ({
            canDrop: monitor.canDrop(),
            isOver: monitor.isOver()
        })
    })

    let background = 'white';

    const inputStyle = {
        backgroundColor: 'white',
        width: '400px',
        borderRadius: '4px',
        margin: 'none'
    };

    if (canDrop && isOver) {
        background = 'lightgreen';
    } else if (canDrop) {
        background = 'lightblue';
    }

    const dynamicStyle: React.CSSProperties = {
        ...inputStyle,
        background
    }

    console.log(values)
    console.log(stringValue)

    return (
        <div id={"dnd-value-component-" + absoluteKey} key={absoluteKey}>
            <Autocomplete
                multiple
                value={values}
                ref={dropRef}
                id="tags-filled"
                options={[]}
                isOptionEqualToValue={(option, value) => false} // to allow multiple of same value, i.e. spaces
                defaultValue={[]}
                onChange={(event, newValue) => {
                    newValue ? setValues(newValue) : null;
                    if (props.onChange) {
                        props.onChange(stringValue)
                    }
                }}
                renderTags={(value: readonly string[], getTagProps) =>
                    value.map((option: string, index: number) => (
                        // eslint-disable-next-line react/jsx-key
                        <Chip
                            sx={{borderRadius: '3px'}}
                            variant="outlined"
                            label={option}
                            onDelete={undefined}
                            key={index}
                            disabled={false}
                            tabIndex={-1}
                            // {...getTagProps({ index })} // using this will not overwrite onDelete an have an icon
                        />
                    ))
                }
                freeSolo
                renderInput={(params) => (
                    <TextField
                        {...params}
                        style={dynamicStyle}
                        variant="outlined"
                        label={props.name || "dnd"}
                        placeholder={values.length === 0 ? "Skriv eller trekk inn fra metadata" : undefined}
                    />
                )}
            />
            {props.fieldState?.error && <Typography sx={errorMsgSX}>Feltet oppfyller ikke påkrevd format</Typography>}
        </div>
    )

})
export default DynamicChipCompponent2;