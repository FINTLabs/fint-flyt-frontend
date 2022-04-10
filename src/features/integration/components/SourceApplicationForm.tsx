import {Box, Typography} from "@mui/material";
import {Tag} from "./dnd/Tag";
import {sourceApplicationFormPopoverContent, tagList} from "../defaults/DefaultValues";
import * as React from "react";
import HelpPopover from "./popover/HelpPopover";
import { useTranslation } from "react-i18next";

const SourceApplicationForm: React.FunctionComponent<any> = (props) => {
    const { t } = useTranslation('translations', { keyPrefix: 'components.SourceApplicationForm'});
    return (
        <Box className={props.style.sourceApplicationForm}>
            <Box className={props.style.row}>
                <Typography variant={"h6"}>{t('header')}</Typography>
                <HelpPopover popoverContent="sourceApplicationFormPopoverContent"/>
            </Box>
            {tagList.map((tag, index) => {
                    return (
                        <Tag key={index} value={tag.value} name={tag.name}/>
                    )}
                )}
        </Box>
    );
}

export default SourceApplicationForm;