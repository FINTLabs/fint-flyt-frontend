import {Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography} from "@mui/material";
import {Tag} from "./dnd/Tag";
import * as React from "react";
import HelpPopover from "./popover/HelpPopover";
import {useTranslation} from "react-i18next";
import {toTagValue} from "../../util/JsonUtil";
import {useContext} from "react";
import {IntegrationContext} from "../../../context/integrationContext";
import {Link} from 'react-router-dom'
import {SourceApplicationContext} from "../../../context/sourceApplicationContext";

const SourceApplicationForm: React.FunctionComponent<any> = (props) => {
    const { t } = useTranslation('translations', { keyPrefix: 'components.SourceApplicationForm'});
    const { selectedMetadata } = useContext(IntegrationContext)
    const { allMetadata, instanceElementMetadata } = useContext(SourceApplicationContext)
    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };

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
                <Typography variant={"h6"}>{t('header')}: {selectedMetadata.integrationDisplayName}</Typography>
                <HelpPopover popoverContent="sourceApplicationFormPopoverContent"/>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="demo-select-small">Versjon</InputLabel>
                    <Select
                        labelId="version-select"
                        id="version-select"
                        value={age}
                        label="Versjon"
                        onChange={handleChange}
                    >
                        <MenuItem value={10}>...</MenuItem>
{/*                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>*/}
                    </Select>
                </FormControl>
            </Box>
            {instanceElementMetadata && <TagTree items={instanceElementMetadata}/>}
            <Link style={{fontFamily: 'sans-serif'}} to={{pathname: selectedMetadata.sourceApplicationIntegrationUri}} target="_blank">Åpne i skjemaadministrator</Link>

        </Box>
    );
}

export default SourceApplicationForm;
