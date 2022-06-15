import {Box, Typography} from "@mui/material";
import {Tag} from "./dnd/Tag";
import * as React from "react";
import HelpPopover from "./popover/HelpPopover";
import {useTranslation} from "react-i18next";
import {MOCK_SKJEMA_METADATA} from "../../../__tests__/mock/mock-skjema-metadata";
import {IGroup, IStep} from "../types/FormMetadata";
import {toTagValue} from "../../util/JsonUtil";

const SourceApplicationForm: React.FunctionComponent<any> = (props) => {
    const { t } = useTranslation('translations', { keyPrefix: 'components.SourceApplicationForm'});
    return (
        <Box className={props.style.sourceApplicationForm}>
            <Box className={props.style.row}>
                <Typography variant={"h6"}>{t('header')}</Typography>
                <HelpPopover popoverContent="sourceApplicationFormPopoverContent"/>
            </Box>
            {MOCK_SKJEMA_METADATA.steps.map((step: IStep) => {
                return (
                    <Box>
                        {/*<Typography>{step.name}</Typography>*/}
                        {step.groups.map((group: IGroup) => {
                            return (
                                <div>
                                    <Typography>{group.name}</Typography>
                                    {group.elements.map((element, index) => {
                                        return element.type === 'inputBox' && (
                                            <Tag key={index} value={toTagValue(element.name)} name={element.name}/>
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </Box>
                )
            })}
        </Box>
    );
}

export default SourceApplicationForm;
