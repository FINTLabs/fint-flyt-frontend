import {Box, Typography} from "@mui/material";
import {Tag} from "./dnd/Tag";
import * as React from "react";
import HelpPopover from "./popover/HelpPopover";
import {useTranslation} from "react-i18next";
import {MOCK_SKJEMA_METADATA} from "../../../__tests__/mock/mock-skjema-metadata";
import {toTagValue} from "../../util/JsonUtil";

const SourceApplicationForm: React.FunctionComponent<any> = (props) => {
    const { t } = useTranslation('translations', { keyPrefix: 'components.SourceApplicationForm'});

    function TagTree({items, depth = 0}: any ) {
        if (!items || !items.length) {
            return null
        }

        return items.map((item: any) => (
            <React.Fragment key={item.id}>
                {item.children.length > 0 ?
                    <div style={{ paddingLeft: depth * 15 }}>
                        <Typography>{item.displayName}</Typography>
                    </div> :
                    <div style={{ paddingLeft: depth * 15 }}>
                        <Tag name={item.displayName} value={toTagValue(item.id)}/>
                    </div>}
                <TagTree items={item.children} depth={depth + 1}/>
            </React.Fragment>
        ))
    }

    return (
        <Box className={props.style.sourceApplicationForm}>
            <Box className={props.style.row}>
                <Typography variant={"h6"}>{t('header')}: {MOCK_SKJEMA_METADATA.displayName}</Typography>
                <HelpPopover popoverContent="sourceApplicationFormPopoverContent"/>
            </Box>
            {MOCK_SKJEMA_METADATA && <TagTree items={MOCK_SKJEMA_METADATA.instanceElementMetadata}/>}
        </Box>
    );
}

export default SourceApplicationForm;
