import {Box, Typography} from "@mui/material";
import {Tag} from "./Tag";
import {helpTextTag, tagList} from "../../util/DefaultValues";
import * as React from "react";
import InfoPopover from "../popover/InfoPopover";

const TagList: React.FunctionComponent<any> = (props) => {
    return (
        <Box className={props.style.tagList}>
            <Box className={props.style.row}>
                <Typography variant={"h6"}>Data fra skjema</Typography>
                <InfoPopover popoverContent={helpTextTag}/>
            </Box>
            {tagList.map((tag, index) => {
                    return (
                        <Tag key={index} value={tag.value} name={tag.name}/>
                    )}
                )}
        </Box>
    );
}


export default TagList;