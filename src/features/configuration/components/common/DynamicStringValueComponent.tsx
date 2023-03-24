import * as React from "react";
import {useContext, useEffect, useState} from "react";
import {Controller, useFormContext} from "react-hook-form";
import {useDrop} from "react-dnd";
import {ITag} from "../../types/Metadata/Tag";
import {ValueType} from "../../types/Metadata/IntegrationMetadata"
import {ClassNameMap} from "@mui/styles";
import {IconButton, TextField, Typography} from "@mui/material";
import {SourceApplicationContext} from "../../../../context/sourceApplicationContext";
import {Search} from "../../util/UrlUtils";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ResourceRepository from "../../../../shared/repositories/ResourceRepository";
import {searchResultSX} from "../../styles/SystemStyles";

interface Props {
    classes: ClassNameMap;
    absoluteKey: string;
    displayName: string;
    search?: Search;
    accept: ValueType[];
    disabled?: boolean;
}

const DynamicStringValueComponent: React.FunctionComponent<Props> = (props: Props) => {
    const {getInstanceObjectCollectionMetadata} = useContext(SourceApplicationContext)
    const {setValue, getValues, control} = useFormContext();
    const [searchResult, setSearchResult] = useState<string>()

    const [{canDrop, isOver}, dropRef] = useDrop({
        accept: props.accept,
        drop: (tag: ITag) => {
            getValues(props.absoluteKey) === undefined
                ? setValue(props.absoluteKey, tag.value)
                : setValue(props.absoluteKey, (getValues(props.absoluteKey) + tag.value))
            if (tag.type === ValueType.COLLECTION && tag.tagKey !== undefined) {
                getInstanceObjectCollectionMetadata(tag.tagKey)
            }
        },
        collect: monitor => ({
            canDrop: monitor.canDrop(),
            isOver: monitor.isOver()
        })
    })

    useEffect(() => {
        setSearchResult(undefined)
    }, [props.search])

    let background = 'white';

    const inputStyle = {
        backgroundColor: 'white',
        width: '352px',
        borderRadius: '4px',
        margin: 'none'
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
        <div id={"dnd-value-component-" + props.absoluteKey} ref={dropRef} key={props.absoluteKey}>
            <Controller
                name={props.absoluteKey}
                control={control}
                defaultValue=""
                render={({field}) =>
                    <TextField
                        style={dynamicStyle}
                        variant='outlined'
                        size='small'
                        multiline
                        maxRows={3}
                        label={props.displayName}
                        disabled={props.disabled}
                        InputProps={{
                            endAdornment: (
                                <>
                                    {props.search && <IconButton sx={{padding: "4px", margin: "-4px"}} onClick={() => {
                                        if (props.search?.source) {
                                            ResourceRepository.search(props.search.source)
                                                .then((result: { value: string } | undefined) => {
                                                    setSearchResult("Søkeresultat: " + (result ? result.value : "Ingen treff"));
                                                })
                                        }
                                    }}>
                                        <SearchRoundedIcon/>
                                    </IconButton>}
                                </>
                            ),
                        }}
                        {...field}
                        value={getValues(props.absoluteKey)}
                    />
                }
            />
            {searchResult && <Typography sx={searchResultSX}>{searchResult}</Typography>}
        </div>
    )
}
export default DynamicStringValueComponent;