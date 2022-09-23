import {Box, Typography} from "@mui/material";
import {Tag} from "./dnd/Tag";
import * as React from "react";
import HelpPopover from "./popover/HelpPopover";
import {useTranslation} from "react-i18next";
import {toTagValue} from "../../util/JsonUtil";
import {useContext} from "react";
import {IntegrationContext} from "../../../context/integrationContext";
import {Link} from 'react-router-dom'

const SourceApplicationForm: React.FunctionComponent<any> = (props) => {
    const { t } = useTranslation('translations', { keyPrefix: 'components.SourceApplicationForm'});
    const { selectedForm } = useContext(IntegrationContext)

    function TagTree({items, depth = 0}: any ) {
        if (!items || !items.length) {
            return null
        }

        return items.map((item: any) => (
            <React.Fragment key={item.displayName}>
                {item.children.length > 0 ?
                    <div style={{ paddingLeft: depth * 15 }}>
                        <Typography>{item.displayName}</Typography>
                    </div> :
                    <div style={{ paddingLeft: depth * 15 }}>
                        <Tag name={item.displayName + ' {' + (item.key) + '}'} value={toTagValue(item.key)}/>
                    </div>}
                <TagTree items={item.children} depth={depth + 1}/>
            </React.Fragment>
        ))
    }

    return (
        <Box className={props.style.sourceApplicationForm}>
            <Box className={props.style.row}>
                <Typography variant={"h6"}>{t('header')}: {selectedForm.integrationDisplayName}</Typography>
                <HelpPopover popoverContent="sourceApplicationFormPopoverContent"/>
            </Box>
            {selectedForm && <TagTree items={selectedForm.instanceElementMetadata}/>}
            <Link style={{fontFamily: 'sans-serif'}} to={{pathname: selectedForm.sourceApplicationIntegrationUri}} target="_blank">Åpne i skjemaadministrator</Link>

        </Box>
    );
}

export default SourceApplicationForm;
