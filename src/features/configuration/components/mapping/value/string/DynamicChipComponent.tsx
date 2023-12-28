import * as React from "react";
import {forwardRef} from "react";
import {Autocomplete, Chip, TextField, Typography} from "@mui/material";
import {useDrop} from "react-dnd";
import {ITag} from "../../../../types/Metadata/Tag";
import {ValueType} from "../../../../types/Metadata/IntegrationMetadata";
import {Search} from "../../../../util/UrlUtils";
import {Noop} from "react-hook-form/dist/types";
import {ControllerFieldState} from "react-hook-form";
import {errorMsgSX} from "../../../../../../util/styles/SystemStyles";
import {getTagStyles, mappingStringToValueArray, valueArrayToMappingString} from "../../../../util/ValueFieldUtils";
import {useTranslation} from "react-i18next";

export interface Props {
    displayName?: string;
    search?: Search;
    accept: ValueType[];
    disabled?: boolean;
    onChange?: (value: string) => void;
    onBlur?: Noop;
    name: string;
    value: string | null;
    fieldState: ControllerFieldState | undefined
}

const DynamicChipComponent: React.FunctionComponent<Props> = forwardRef<HTMLDivElement, Props>((props: Props, ref) => {
    DynamicChipComponent.displayName = "DynamicChipComponent"
    const [values, setValues] = React.useState<string[]>(props.value ? mappingStringToValueArray(props.value) : []);
    const absoluteKey: string = props.name;
    const { t } = useTranslation("translations", { keyPrefix: "pages.configuration" });

    const [{canDrop, isOver}, dropRef] = useDrop({
        accept: props.accept,
        drop: (tag: ITag) => {
            setValues([...values, tag.value])
            if (!props.disabled) {
                if (props.onChange) {
                    props.onChange(valueArrayToMappingString(values) + tag.value)
                }
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
        width: '352px',
        borderRadius: '4px',
        margin: 'none'
    };

    if (canDrop && isOver && !props.disabled) {
        background = 'lightgreen';
    } else if (canDrop && !props.disabled) {
        background = 'lightblue';
    }

    const dynamicStyle: React.CSSProperties = {
        ...inputStyle,
        background
    }


    return (
        <div id={"dnd-value-component-" + absoluteKey} key={absoluteKey}>
            <Autocomplete
                multiple
                disabled={props.disabled}
                value={values}
                ref={dropRef}
                id="tags-filled"
                options={[]}
                isOptionEqualToValue={() => false} // to allow multiple of same value, i.e. spaces
                defaultValue={[]}
                onChange={(event, newValue) => {
                    newValue ? setValues(newValue) : null;
                    if (props.onChange && newValue) {
                        props.onChange(valueArrayToMappingString(newValue))
                    }
                }}
                renderTags={(tags: readonly string[]) =>
                    tags.map((tag: string, index: number) => {
                            // eslint-disable-next-line react/jsx-key
                            return <Chip
                                title={tag}
                                sx={getTagStyles(tag, props.disabled)}
                                variant="outlined"
                                label={tag}
                                onDelete={undefined}
                                key={index}
                                disabled={false}
                                tabIndex={-1}
                                // {...getTagProps({ index })} // using this will not overwrite onDelete and have an icon
                            />

                        }
                    )
                }
                freeSolo
                renderInput={(params) => (
                    <TextField
                        {...params}
                        size='small'
                        style={dynamicStyle}
                        ref={ref}
                        variant="outlined"
                        label={props.displayName}
                        placeholder={values.length === 0 ? t('label.placeholder') : undefined}
                        disabled={props.disabled}
                    />
                )}
            />
            {props.fieldState?.error && <Typography sx={errorMsgSX}>{t('label.formatError')}</Typography>}
        </div>
    )

})
export default DynamicChipComponent;