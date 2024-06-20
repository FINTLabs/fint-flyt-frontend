import * as React from "react";
import {forwardRef, useEffect, useState} from "react";
import {ISelectable} from "../../../../types/Selectable";
import {Autocomplete, createFilterOptions, TextField, Typography} from "@mui/material";
import {autoCompleteSX, errorMsgSX} from "../../../../../../util/styles/SystemStyles";
import {Noop} from "react-hook-form/dist/types";
import {ControllerFieldState} from "react-hook-form";
import {HStack, Tooltip} from "@navikt/ds-react";
import {ExclamationmarkTriangleFillIcon} from "@navikt/aksel-icons";

interface Props {
    displayName: string;
    selectables: ISelectable[];
    disabled?: boolean;
    onChange?: (value: string | null) => void;
    onBlur?: Noop;
    name: string;
    value: string | null;
    fieldState?: ControllerFieldState;
}

const SearchSelectValueComponent: React.FunctionComponent<Props> = forwardRef<HTMLDivElement, Props>((props: Props, ref) => {
    SearchSelectValueComponent.displayName = "SearchSelectValueComponent"
    const absoluteKey: string = props.name;
    const [warning, setWarning] = useState<boolean>(false);
    const filterOptions = createFilterOptions({
        matchFrom: 'any',
        stringify: (option: string) => displayNamePerValue[option],
        limit: 250
    });

    const [displayNamePerValue, setDisplayNamePerValue] = useState<Record<string, string>>({});

    console.log(displayNamePerValue)
    console.log(props)

    useEffect(() => {
        console.log('in useEffect', props.selectables)
        const newDisplayNamePerValue: Record<string, string> = {}
        props.selectables.forEach((selectable: ISelectable) => {
            newDisplayNamePerValue[selectable.value] = selectable.displayName;
        })
        setDisplayNamePerValue(newDisplayNamePerValue);
        if(props.value !== null && props.value !== "$dynamic" && props.value !== "$valueConverting") {
            setWarning(!Object.keys(displayNamePerValue).includes(props.value))
        } else {
            setWarning(false)
        }
    }, [props.selectables])

    return <div>
        <HStack gap={"2"} align={"center"}>
            <Autocomplete
                sx={autoCompleteSX(warning)}
                id={absoluteKey}
                filterOptions={filterOptions}
                options={Object.keys(displayNamePerValue)}
                getOptionLabel={(option: string) => option ? displayNamePerValue[option as string] : ''}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        size="small"
                        label={props.displayName}
                        error={!!props.fieldState?.error}
                    />
                )}
                onChange={(_, value: string | null) => {
                    if (props.onChange) {
                        props.onChange(value)
                    }
                }}
                onBlur={props.onBlur}
                value={props.value}
                ref={ref}
                disabled={props.disabled}
            />
            {warning &&  <Tooltip content={`Eksisterende verdi: "${props.value}" fins ikke`}>
                <ExclamationmarkTriangleFillIcon color={"orange"} fontSize="1.5rem"/>
            </Tooltip>
            }
        </HStack>
        {props.fieldState?.error && <Typography sx={errorMsgSX}>{props.fieldState?.error.message}</Typography>}
        {warning && <Typography sx={errorMsgSX}>{`Manglende kodeverk`}</Typography>}
    </div>
})
export default SearchSelectValueComponent;
