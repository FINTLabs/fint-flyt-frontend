import * as React from "react";
import {BaseSyntheticEvent, useContext, useEffect, useState} from "react";
import {useDrop} from "react-dnd";
import {ITag} from "../../../../types/Metadata/Tag";
import {ValueType} from "../../../../types/Metadata/IntegrationMetadata"
import {ClassNameMap} from "@mui/styles";
import {IconButton, TextField, Typography} from "@mui/material";
import {Search} from "../../../../util/UrlUtils";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ResourceRepository from "../../../../../../shared/repositories/ResourceRepository";
import {searchResultSX} from "../../../../styles/SystemStyles";
import {ConfigurationContext} from "../../../../../../context/configurationContext";
import {isOutsideCollectionEditContext} from "../../../../util/KeyUtils";
import {ControllerRenderProps} from "react-hook-form/dist/types/controller";

interface Props {
    classes: ClassNameMap;
    displayName?: string;
    search?: Search;
    accept: ValueType[];
    disabled?: boolean;
    field: ControllerRenderProps;
}

const DynamicStringValueComponent: React.FunctionComponent<Props> = (props: Props) => {
    const [searchResult, setSearchResult] = useState<string>()
    const {editCollectionAbsoluteKey} = useContext(ConfigurationContext)
    const absoluteKey: string = props.field.name;

    const [{canDrop, isOver}, dropRef] = useDrop({
        accept: props.accept,
        drop: (tag: ITag) => {
            console.log(tag)
            props.field.value === undefined
                ? props.field.onChange(tag.value)
                : props.field.onChange(props.field.value + tag.value)
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
        <div id={"dnd-value-component-" + absoluteKey} ref={dropRef} key={absoluteKey}>
            <TextField
                {...props.field}
                style={dynamicStyle}
                variant='outlined'
                size='small'
                multiline
                maxRows={3}
                label={props.displayName}
                disabled={
                    props.disabled
                    || isOutsideCollectionEditContext(absoluteKey, editCollectionAbsoluteKey)
                }
                onChange={(e: BaseSyntheticEvent) => {
                    e ? props.field.onChange(e.target.value) : props.field.onChange(null)
                }}
                InputProps={{
                    endAdornment: (
                        <>
                            {props.search && <IconButton sx={{padding: "4px", margin: "-4px"}} onClick={() => {
                                console.log(props.search)
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
            />
            {searchResult && <Typography sx={searchResultSX}>{searchResult}</Typography>}
        </div>
    )
}
export default DynamicStringValueComponent;